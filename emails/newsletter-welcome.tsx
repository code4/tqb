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

export const NewsletterWelcomeEmail = () => {
    return (
        <Html>
            <Head />
            <Preview>The Quiet Bloom: Reflection Prompts & Welcome</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Document 1: Reflection Prompts */}
                    <Section style={bodySection}>
                        <Text style={h2}>The Quiet Bloom-Reflection Prompts</Text>
                        
                        <ul style={list}>
                            <li style={listItemBold}>What feels heavy right now?</li>
                            <li style={listItemBold}>What would ease look like today?</li>
                        </ul>

                        <Text style={text}>
                            Before answering, take 10–20 seconds to breathe or pause. Reflection works best when your mind is not in "problem-solving mode" but in "noticing mode."
                        </Text>

                        <Text style={text}>
                            A few ways to shift into noticing:
                        </Text>
                        <ul style={list}>
                            <li style={listItem}>Put a hand on your chest or stomach and take one slow breath.</li>
                            <li style={listItem}>Relax your jaw or shoulders for a moment.</li>
                        </ul>

                        <Text style={text}>
                            Break the question to micro prompts and scan different parts of your life.<br />
                            <span style={italicSpan}>Mind / Body / Emotions / Energy.</span>
                        </Text>

                        <Text style={text}>
                            You don't need a perfect answer. Even a few words like "pressure," "uncertainty," "too many small tasks," "emotional load" are enough.
                        </Text>

                        <Text style={text}>
                            For the second question, you're not looking for a life overhaul—just something that shifts your day.
                        </Text>

                        <Text style={textItalicCentered}>
                            After your reflection, ask :<br />
                            "What is one small thing I can do in the next hour that honours what I just discovered?"
                        </Text>
                    </Section>

                    <Hr style={divider} />

                    {/* Document 2: Intro / Welcome */}
                    <Section style={bodySection}>
                        <Heading style={h1}>The Quiet Bloom</Heading>
                        <Text style={locationText}>London</Text>
                        
                        <Text style={text}>
                            Hello, I am Ash. I'm the person behind The Quiet Bloom - a small project to recreate the joy of receiving thoughtful letters.
                        </Text>
                        <Text style={text}>
                            As someone who balances work, motherhood, everyday responsibilities, this has become my way of returning to creativity.
                        </Text>

                        <Text style={text}>
                            The Quiet Bloom exists for the woman who is still becoming.<br />
                            <span style={italicSpan}>
                                Not loudly.<br />
                                Not urgently.<br />
                                But in her own time.
                            </span>
                        </Text>

                        <Text style={text}>
                            In a world that rewards speed, visibility, and constant output, it can be easy to forget that growth does not need to be witnessed to be real. That becoming is not something to perform, but something to live.
                        </Text>
                        <Text style={text}>
                            There are parts of us that unfold slowly. Parts that do not respond to pressure. Parts that simply wait for space.
                        </Text>

                        <Text style={textIndent}>
                            The Quiet Bloom was created to honour that space. It is not here to guide you toward becoming someone else. It is here to accompany you as you return to yourself.
                        </Text>

                        <Text style={signature}>
                            Ash x
                        </Text>
                    </Section>

                    <Hr style={divider} />

                    {/* Document 3: Noticing template */}
                    <Section style={bodySection}>
                        <Text style={subtleHeader}>The Quiet Bloom</Text>

                        <Text style={h2Italic}>
                            Right now, I'm just noticing.<br />
                            Not solving.
                        </Text>

                        <Text style={noticingPrompt}>
                            What feels heavy is ...
                        </Text>

                        <Text style={noticingPrompt}>
                            Ease for today, might look like....
                        </Text>

                        <Text style={noticingPrompt}>
                            And the smallest step I can take is..
                        </Text>
                    </Section>

                    <Hr style={divider} />

                    {/* Footer Signature */}
                    <Section style={footerSection}>
                        <Text style={footerTagline}>
                            Pause.Reflect.Reconnect.
                        </Text>

                        <Text style={footerText}>
                            You received this because you subscribed at{" "}
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

export default NewsletterWelcomeEmail

// --- PREMUIM UI/UX STYLES ---

const COLORS = {
    bgApp: "#F7F5F0", // Elegant creamy parchment background
    bgCard: "#FAF9F5", // Slightly lighter text-area background
    textDark: "#2B2A27", // Soft ink black
    textMedium: "#4D4C47", // Charcoal grey
    border: "#D6D3CD", // Subtle dividing line
}

const FONTS = {
    serif: 'Georgia, "Times New Roman", Times, serif',
}

const main = {
    backgroundColor: COLORS.bgApp,
    fontFamily: FONTS.serif,
    padding: "40px 0",
}

const container = {
    margin: "0 auto",
    maxWidth: "600px",
    backgroundColor: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.03)",
    padding: "0",
}

const bodySection = {
    padding: "48px 56px 24px 56px",
}

const footerSection = {
    padding: "0 56px 48px 56px",
}

const h1 = {
    color: COLORS.textDark,
    fontSize: "26px",
    fontWeight: "400",
    textAlign: "center" as const,
    margin: "0 0 8px 0",
    letterSpacing: "0.5px",
}

const h2 = {
    color: COLORS.textDark,
    fontSize: "22px",
    fontWeight: "400",
    textAlign: "center" as const,
    margin: "0 0 32px 0",
    letterSpacing: "0.5px",
}

const h2Italic = {
    ...h2,
    fontStyle: "italic",
    textAlign: "left" as const,
    margin: "32px 0 48px 0",
    lineHeight: "34px",
}

const locationText = {
    color: COLORS.textMedium,
    fontSize: "16px",
    textAlign: "center" as const,
    margin: "0 0 40px 0",
    fontStyle: "italic",
}

const subtleHeader = {
    color: COLORS.textMedium,
    fontSize: "14px",
    margin: "0",
    letterSpacing: "0.5px",
}

const divider = {
    borderColor: COLORS.border,
    margin: "0 56px",
    opacity: 0.6,
}

const text = {
    color: COLORS.textDark,
    fontSize: "16px",
    lineHeight: "28px",
    fontWeight: "400",
    margin: "0 0 24px 0",
}

const textIndent = {
    ...text,
    paddingLeft: "24px",
    fontStyle: "italic",
    color: COLORS.textMedium,
}

const textItalicCentered = {
    ...text,
    fontStyle: "italic",
    textAlign: "center" as const,
    margin: "32px 0 0 0",
}

const italicSpan = {
    fontStyle: "italic",
    color: COLORS.textMedium,
}

const noticingPrompt = {
    color: COLORS.textDark,
    fontSize: "18px",
    lineHeight: "28px",
    fontWeight: "400",
    fontStyle: "italic",
    margin: "0 0 56px 0",
}

const signature = {
    color: COLORS.textDark,
    fontSize: "22px",
    lineHeight: "28px",
    fontWeight: "400",
    fontStyle: "italic",
    textAlign: "right" as const,
    margin: "32px 0 0 0",
}

const list = {
    margin: "0 0 24px 0",
    paddingLeft: "24px",
}

const listItem = {
    color: COLORS.textDark,
    fontSize: "16px",
    lineHeight: "28px",
    fontWeight: "400",
    marginBottom: "12px",
}

const listItemBold = {
    ...listItem,
    fontWeight: "bold",
    fontStyle: "italic",
}

const footerTagline = {
    color: COLORS.textDark,
    fontSize: "18px",
    lineHeight: "28px",
    fontWeight: "400",
    textAlign: "center" as const,
    marginTop: "24px",
}

const footerText = {
    color: COLORS.textMedium,
    fontSize: "12px",
    textAlign: "center" as const,
    marginTop: "48px",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
}

const footerLink = {
    color: COLORS.textDark,
    textDecoration: "underline",
}
