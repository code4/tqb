import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"
import { Resend } from "resend"
import { env } from "@/lib/env"

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
        if (env.RESEND_AUDIENCE_ID) {
            try {
                await resend.contacts.create({
                    email: email,
                    audienceId: env.RESEND_AUDIENCE_ID,
                    unsubscribed: false,
                })
            } catch (resendError) {
                console.error("Resend Audience Add Error:", resendError)
                // We're letting this pass through even if it fails, so Sanity still captures them
            }
        }

        // Create new subscriber in Sanity Content Lake
        await client.create({
            _type: 'subscriber',
            email,
            status: 'active',
            signedUpAt: new Date().toISOString()
        }, {
            token: process.env.SANITY_API_TOKEN // Ensure write token is used
        })

        return NextResponse.json({ message: "Successfully subscribed" }, { status: 201 })
    } catch (error) {
        console.error("Newsletter Subscription Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
