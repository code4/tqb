import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"
import { Resend } from "resend"
import { env } from "@/lib/env"
import { NewsletterWelcomeEmail } from "@/emails/newsletter-welcome"

const resend = new Resend(env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
        }

        // Check if already subscribed in Sanity
        const existing = await client.fetch(
            `*[_type == "subscriber" && email == $email][0]`,
            { email }
        )

        if (existing) {
            return NextResponse.json({ message: "Already subscribed" }, { status: 200 })
        }

        // Add to Resend Audience First
        const targetAudienceId = env.RESEND_LEADS_AUDIENCE_ID || env.RESEND_AUDIENCE_ID
        if (targetAudienceId) {
            try {
                const { data, error } = await resend.contacts.create({
                    email: email,
                    audienceId: targetAudienceId,
                    unsubscribed: false,
                })
                if (error) {
                    console.error("Resend Audience Add Error (API):", error)
                } else {
                    console.log("Added to Resend Audience successfully.")
                }
            } catch (resendError) {
                console.error("Resend Audience Add Exception:", resendError)
                // We're letting this pass through even if it fails, so Sanity still captures them
            }
        }

        // Create new subscriber in Sanity Content Lake
        await client.create({
            _type: 'subscriber',
            email,
            status: 'active',
            tier: 'free',
            signedUpAt: new Date().toISOString()
        }, {
            token: process.env.SANITY_API_TOKEN // Ensure write token is used
        })

        try {
            // Send the free tier welcome email
            const { data, error } = await resend.emails.send({
                // Note: Resend's free tier requires sending FROM onboarding@resend.dev 
                // and TO your verified email address.
                from: process.env.EMAIL_FROM || "The Quiet Bloom <onboarding@resend.dev>",
                to: email,
                subject: "Welcome to our quiet corner of the internet.",
                react: NewsletterWelcomeEmail(),
            })

            if (error) {
                console.error("Resend Delivery Error:", error)
            } else {
                console.log("Welcome email sent successfully:", data)
            }
        } catch (emailError) {
            console.error("Welcome Email Sending Error:", emailError)
        }

        return NextResponse.json({ message: "Successfully subscribed" }, { status: 201 })
    } catch (error) {
        console.error("Newsletter Subscription Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
