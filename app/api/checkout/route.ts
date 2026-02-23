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

        let actualPriceId = priceId

        // If no priceId passed, infer it from the payment link URLs
        if (!actualPriceId) {
            if (tier?.includes("UK")) {
                // E.g., https://buy.stripe.com/cNidR95WpdwXdi7dUnenS00 is actually a payment link, we need the underlying Price ID
                // Alternatively, we just extract the ID if the user provided the actual Price ID in the ENV var by mistake
                actualPriceId = process.env.STRIPE_UK_PRICE_ID || "price_1T31N3Gm4B3XN0EEFKTzSv2s"
            } else if (tier?.includes("International")) {
                actualPriceId = process.env.STRIPE_INTL_PRICE_ID || "price_1T31N3Gm4B3XN0EEFKTzSv2s"
            }
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            custom_fields: [
                {
                    key: "birthdaymonth",
                    label: { type: "custom", custom: "Birthday Month" },
                    type: "dropdown",
                    optional: true,
                    dropdown: {
                        options: [
                            { label: "January", value: "january" },
                            { label: "February", value: "february" },
                            { label: "March", value: "march" },
                            { label: "April", value: "april" },
                            { label: "May", value: "may" },
                            { label: "June", value: "june" },
                            { label: "July", value: "july" },
                            { label: "August", value: "august" },
                            { label: "September", value: "september" },
                            { label: "October", value: "october" },
                            { label: "November", value: "november" },
                            { label: "December", value: "december" },
                        ],
                    },
                },
            ],
            shipping_address_collection: {
                allowed_countries: tier?.includes("UK") ? ["GB"] : ["US", "CA", "AU", "NZ", "IE", "FR", "DE", "IT", "ES", "NL", "SE"],
            },
            line_items: [
                {
                    price: actualPriceId,
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
