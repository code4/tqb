import { client } from "@/sanity/lib/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
        }

        // Find the subscriber
        const existing = await client.fetch(
            `*[_type == "subscriber" && email == $email][0]`,
            { email }
        )

        if (!existing) {
            return NextResponse.json({ error: "Email not found in our records" }, { status: 404 })
        }

        if (existing.status === 'unsubscribed') {
            return NextResponse.json({ message: "You have already been unsubscribed." }, { status: 200 })
        }

        // Update status to unsubscribed
        await client
            .patch(existing._id)
            .set({ status: 'unsubscribed' })
            .commit({
                token: process.env.SANITY_API_TOKEN
            })

        return NextResponse.json({ message: "You have been successfully unsubscribed." }, { status: 200 })
    } catch (error) {
        console.error("Newsletter Unsubscribe Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
