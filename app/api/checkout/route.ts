import { NextResponse } from "next/server"
import Stripe from "stripe"
import { env } from "@/lib/env"

const stripe = new Stripe(env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-01-28.clover",
})

export async function POST(req: Request) {
    try {
        const { tier, priceId } = await req.json()

        // We can pass a specific priceId if you have products set up in Stripe Dashboard, 
        // or we can use price_data for dynamic pricing.
        // For subscriptions, you typically MUST use a pre-created Price ID from your dashboard.
        // since we don't know your price IDs yet, we will set up a placeholder session 
        // that you can replace with your actual Stripe Price IDs later.

        // Fallback or dynamic configuration
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            shipping_address_collection: {
                // If it's a UK tier, we could lock it to 'GB', but since we use one route dynamically for both right now
                // we allow a wide range. You can restrict this later if you want strict validation.
                allowed_countries: ["GB", "US", "CA", "AU", "NZ", "IE", "FR", "DE"],
            },
            line_items: [
                {   // Test mode price fallback
                    price: priceId || "price_1T31N3Gm4B3XN0EEFKTzSv2s",
                    quantity: 1,
                },
            ],
            success_url: `${env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${env.NEXT_PUBLIC_SITE_URL}/subscribe`,
        })

        return NextResponse.json({ url: session.url })
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error)
        return NextResponse.json(
            { error: error?.message || "Internal Server Error" },
            { status: 500 }
        )
    }
}
