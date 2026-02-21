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

interface UnsubscribedEmailProps {
    email?: string
    heading?: string
    bodyText?: string
    signoff?: string
}

export const UnsubscribedEmail = ({
    email = "reader@example.com",
    heading = "Farewell for now.",
    bodyText = "We are writing to confirm that your subscription to The Quiet Bloom has been successfully cancelled.\n\nYou will not be billed again. We are honored to have shared our quiet corner of the internet with you, even if just for a little while.\n\nThe door is always open should you choose to return.",
    signoff = "Warmly,\nThe Quiet Bloom",
}: UnsubscribedEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Your Subscription has been Cancelled</Preview>
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
                            You received this because you were subscribed to{" "}
                            <Link href="https://thequietbloom.co.uk" style={footerLink}>
                                thequietbloom.co.uk
                            </Link>.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

export default UnsubscribedEmail

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
