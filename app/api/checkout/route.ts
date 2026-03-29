import { NextResponse } from "next/server"
import Stripe from "stripe"
import { env } from "@/lib/env"

const stripe = new Stripe(env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-01-28.clover",
})

export async function POST(req: Request) {
    try {
        const { tier, priceId, isGift } = await req.json()

        let actualPriceId = priceId

        // If no priceId passed, infer from tier name
        if (!actualPriceId) {
            if (isGift) {
                // Gift: one-time payment prices
                if (tier?.includes("UK")) {
                    actualPriceId = process.env.STRIPE_GIFT_UK_PRICE_ID
                } else if (tier?.includes("International")) {
                    actualPriceId = process.env.STRIPE_GIFT_INTL_PRICE_ID
                }
            } else {
                // Regular: recurring subscription prices
                if (tier?.includes("UK")) {
                    actualPriceId = process.env.STRIPE_UK_PRICE_ID || "price_1T31N3Gm4B3XN0EEFKTzSv2s"
                } else if (tier?.includes("International")) {
                    actualPriceId = process.env.STRIPE_INTL_PRICE_ID || "price_1T31N3Gm4B3XN0EEFKTzSv2s"
                }
            }
        }

        // Base custom fields (always present)
        const customFields: Stripe.Checkout.SessionCreateParams.CustomField[] = [
            {
                key: "birthdaymonth",
                label: { type: "custom", custom: isGift ? "Recipient's Birthday Month" : "Birthday Month" },
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
        ]

        // Gift-specific custom fields
        if (isGift) {
            customFields.push(
                {
                    key: "recipientname",
                    label: { type: "custom", custom: "Recipient's Full Name" },
                    type: "text",
                    optional: false,
                },
                {
                    key: "giftmessage",
                    label: { type: "custom", custom: "Gift Message (e.g. Happy Birthday! — Sarah)" },
                    type: "text",
                    optional: true,
                },
            )
        }

        const giftDuration = parseInt(process.env.GIFT_DURATION_MONTHS || "3", 10)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: isGift ? "payment" : "subscription",
            custom_fields: customFields,
            metadata: {
                isGift: isGift ? "true" : "false",
                tier: tier || "",
                ...(isGift ? { giftDurationMonths: String(giftDuration) } : {}),
            },
            shipping_address_collection: {
                allowed_countries: tier?.includes("UK")
                    ? ["GB"]
                    : ["US", "CA", "AU", "NZ", "IE", "FR", "DE", "IT", "ES", "NL", "SE"],
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
