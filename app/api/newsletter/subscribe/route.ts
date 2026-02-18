import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
        }

        // Check if already subscribed
        const existing = await client.fetch(
            `*[_type == "subscriber" && email == $email][0]`,
            { email }
        )

        if (existing) {
            return NextResponse.json({ message: "Already subscribed" }, { status: 200 })
        }

        // Create new subscriber
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
