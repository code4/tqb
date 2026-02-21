import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
    Section,
    Link,
    Hr,
} from "@react-email/components"
import * as React from "react"

interface RenewalEmailProps {
    email?: string
    heading?: string
    bodyText?: string
    signoff?: string
}

export const RenewalEmail = ({
    email = "reader@example.com",
    heading = "Thank you for another month of patronage.",
    bodyText = "Your subscription has successfully renewed. We are currently curating this month's selections and will be dispatching your envelope shortly.\n\nAs always, we hope it brings a moment of quiet reflection to your day.",
    signoff = "Warmly,\nThe Quiet Bloom",
}: RenewalEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Your Quiet Bloom Envelope is Being Prepared</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={headerSection}>
                        <Heading style={h1}>The Quiet Bloom</Heading>
                    </Section>

                    <Section style={bodySection}>
                        <Text style={headingText}>
                            {heading}
                        </Text>

                        <Hr style={divider} />

                        {bodyText.split('\n').map((paragraph: string, idx: number) => (
                            paragraph.trim() !== '' ? <Text key={idx} style={text}>{paragraph}</Text> : <br key={idx} />
                        ))}

                        <Text style={signature}>
                            {signoff.split('\n').map((line, idx) => (
                                <React.Fragment key={idx}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </Text>
                    </Section>

                    <Section style={footer}>
                        <Text style={footerText}>
                            You received this because you are subscribed to{" "}
                            <Link href="https://thequietbloom.co.uk" style={footerLink}>
                                thequietbloom.co.uk
                            </Link>.
                            <br />
                            <br />
                            To manage or cancel your subscription, please visit the{" "}
                            <Link href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL || "https://billing.stripe.com"} style={footerLink}>
                                Customer Portal
                            </Link>.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

export default RenewalEmail

// Styles
const main = {
    backgroundColor: "#f5f5f4", // stone-50
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
    margin: "0 auto",
    padding: "40px 20px",
    maxWidth: "600px",
}

const headerSection = {
    padding: "20px 0",
}

const h1 = {
    color: "#1c1917", // stone-900
    fontSize: "28px",
    fontWeight: "400",
    textAlign: "center" as const,
    margin: "0",
    fontFamily: "Georgia, serif",
}

const bodySection = {
    backgroundColor: "#ffffff",
    padding: "48px 40px",
    borderRadius: "12px",
    borderTop: "4px solid #1c1917", // Adds a strong brand line at the top of the card
    borderLeft: "1px solid #e7e5e4",
    borderRight: "1px solid #e7e5e4",
    borderBottom: "1px solid #e7e5e4",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
}

const headingText = {
    color: "#1c1917",
    fontSize: "20px",
    lineHeight: "32px",
    fontWeight: "400",
    textAlign: "center" as const,
    fontFamily: "Georgia, serif",
    margin: "0 0 24px 0",
}

const divider = {
    borderColor: "#e7e5e4", // stone-200
    margin: "24px 0",
}

const text = {
    color: "#57534e", // stone-600
    fontSize: "16px",
    lineHeight: "28px",
    fontWeight: "300",
    margin: "0 0 16px 0",
}

const signature = {
    color: "#1c1917", // stone-900
    fontSize: "16px",
    lineHeight: "26px",
    fontWeight: "400",
    marginTop: "40px",
}

const footer = {
    padding: "32px 20px",
}

const footerText = {
    color: "#a8a29e", // stone-400
    fontSize: "13px",
    textAlign: "center" as const,
}

const footerLink = {
    color: "#57534e", // stone-600
    textDecoration: "underline",
}
