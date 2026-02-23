import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { env } from "@/lib/env"
import { client } from "@/sanity/lib/client"
import { Resend } from "resend"
import WelcomeEmail from "@/emails/welcome"

import UnsubscribedEmail from "@/emails/unsubscribed"

const stripe = new Stripe(env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-01-28.clover",
})

const resend = new Resend(env.RESEND_API_KEY || "re_dummy_key_for_build")

export async function POST(req: Request) {
    const body = await req.text()

    // Fallback if missing secret during early dev
    const signature = (await headers()).get("Stripe-Signature") as string

    let event: Stripe.Event

    try {
        if (!env.STRIPE_WEBHOOK_SECRET) {
            console.warn("⚠️ STRIPE_WEBHOOK_SECRET is not set. Webhook verification skipped. Do not do this in production.")
            event = JSON.parse(body) // Only for local testing without CLI
        } else {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                env.STRIPE_WEBHOOK_SECRET
            )
        }
    } catch (error: any) {
        console.error("Webhook signature verification failed:", error.message)
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session

                // 1. Get Customer Email
                const customerEmail = session.customer_details?.email
                if (!customerEmail) {
                    throw new Error("No customer email found in session")
                }

                // 2. Fetch Email Content from Sanity
                let emailContent = {
                    subject: "Welcome to The Quiet Bloom",
                    heading: "Welcome to our quiet corner of the internet.",
                    bodyText: "Thank you for subscribing. By becoming a patron, you're not just supporting our work—you're joining a community that values intentionality, reflection, and quiet luxury.\n\nEach month, you will receive a digital letter curated carefully to bring a moment of pause to your day.\n\nWe are so glad you are here.",
                    signoff: "Warmly,\nThe Quiet Bloom",
                }

                if (env.SANITY_API_TOKEN) {
                    try {
                        const fetchedContent = await client.fetch(`*[_type == "welcomeEmail"][0]`)
                        if (fetchedContent) {
                            emailContent = { ...emailContent, ...fetchedContent }
                        }
                    } catch (err) {
                        console.error("Failed to fetch Welcome Email content from Sanity:", err)
                    }
                }

                // 3. Send Welcome Email via Resend & Sync Contact
                if (env.RESEND_API_KEY) {
                    const { data: emailData, error: emailError } = await resend.emails.send({
                        from: "The Quiet Bloom <hello@thequietbloom.co.uk>",
                        to: [customerEmail],
                        subject: emailContent.subject,
                        react: WelcomeEmail({
                            email: customerEmail,
                            heading: emailContent.heading,
                            bodyText: emailContent.bodyText,
                            signoff: emailContent.signoff,
                        }),
                    })

                    if (emailError) {
                        console.error(`❌ Failed to send Welcome Email to ${customerEmail}:`, emailError)
                    } else {
                        console.log(`✉️ Automated Welcome Email sent to ${customerEmail}`)
                    }

                    // Add to Resend Audience
                    if (env.RESEND_AUDIENCE_ID) {
                        try {
                            await resend.contacts.create({
                                email: customerEmail,
                                firstName: session.customer_details?.name?.split(' ')[0] || "",
                                lastName: session.customer_details?.name?.split(' ').slice(1).join(' ') || "",
                                audienceId: env.RESEND_AUDIENCE_ID,
                                unsubscribed: false,
                            })
                            console.log(`👥 Added ${customerEmail} to Resend Audience.`)
                        } catch (contactErr) {
                            console.error(`❌ Failed to add ${customerEmail} to Resend Audience:`, contactErr)
                        }
                    } else {
                        console.warn("⚠️ RESEND_AUDIENCE_ID is not set. Skipping audience sync.")
                    }
                } else {
                    console.warn("⚠️ RESEND_API_KEY is not set. Skipping Welcome Email.")
                }

                // 3. Save Subscriber to Sanity
                if (env.SANITY_API_TOKEN) {
                    const existing = await client.fetch(
                        `*[_type == "subscriber" && email == $email][0]`,
                        { email: customerEmail }
                    )

                    if (!existing) {
                        await client.create({
                            _type: 'subscriber',
                            email: customerEmail,
                            status: 'active',
                            signedUpAt: new Date().toISOString()
                        }, {
                            token: env.SANITY_API_TOKEN
                        })
                        console.log(`📝 Subscriber ${customerEmail} saved to Sanity.`)
                    }
                } else {
                    console.warn("⚠️ SANITY_API_TOKEN is not set. Skipping Sanity save.")
                }

                break
            }



            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription

                // Fetch customer to get email since it's not on the subscription object directly
                const customerId = subscription.customer as string
                const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer
                const customerEmail = customer.email

                if (!customerEmail) break

                // 1. Fetch Unsubscribed Content from Sanity
                let emailContent = {
                    subject: "Your Subscription has been Cancelled",
                    heading: "Farewell for now.",
                    bodyText: "We are writing to confirm that your subscription to The Quiet Bloom has been successfully cancelled.\n\nYou will not be billed again. We are honored to have shared our quiet corner of the internet with you, even if just for a little while.\n\nThe door is always open should you choose to return.",
                    signoff: "Warmly,\nThe Quiet Bloom",
                }

                if (env.SANITY_API_TOKEN) {
                    try {
                        const fetchedContent = await client.fetch(`*[_type == "unsubscribedEmail"][0]`)
                        if (fetchedContent) {
                            emailContent = { ...emailContent, ...fetchedContent }
                        }
                    } catch (err) { }
                }

                // 2. Send Cancellation Email via Resend
                if (env.RESEND_API_KEY) {
                    await resend.emails.send({
                        from: "The Quiet Bloom <hello@thequietbloom.co.uk>",
                        to: [customerEmail],
                        subject: emailContent.subject,
                        react: UnsubscribedEmail({
                            email: customerEmail,
                            heading: emailContent.heading,
                            bodyText: emailContent.bodyText,
                            signoff: emailContent.signoff,
                        }),
                    })
                    console.log(`✉️ Automated Cancellation Email sent to ${customerEmail}`)

                    // Unsubscribe them in the Resend Audience
                    if (env.RESEND_AUDIENCE_ID) {
                        try {
                            // Find the contact id first to delete them
                            const contactList = await resend.contacts.list({ audienceId: env.RESEND_AUDIENCE_ID })
                            const targetContact = contactList.data?.data.find(c => c.email === customerEmail)

                            if (targetContact?.id) {
                                await resend.contacts.remove({
                                    audienceId: env.RESEND_AUDIENCE_ID,
                                    id: targetContact.id
                                })
                                console.log(`👥 Removed ${customerEmail} from Resend Audience.`)
                            }
                        } catch (err) { }
                    }
                }

                // 3. Update Sanity Status
                if (env.SANITY_API_TOKEN) {
                    try {
                        const existing = await client.fetch(`*[_type == "subscriber" && email == $email][0]`, { email: customerEmail })
                        if (existing) {
                            await client.patch(existing._id)
                                .set({ status: 'cancelled' })
                                .commit({ token: env.SANITY_API_TOKEN })
                            console.log(`📝 Marked ${customerEmail} as cancelled in Sanity.`)
                        }
                    } catch (err) { }
                }

                break
            }
            default:
                console.log(`Unhandled event type: ${event.type}`)
        }

        return NextResponse.json({ received: true })
    } catch (error: any) {
        console.error("Webhook handler error:", error)
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 500 }
        )
    }
}
