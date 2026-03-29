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
            <Preview>Welcome to The Quiet Bloom</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={headerSection}>
                        <Heading style={h1}>The Quiet Bloom</Heading>
                        <Text style={locationText}>London</Text>
                    </Section>

                    <Section style={bodySection}>
                        <Text style={text}>
                            Hello, I am Ash. I'm the person behind The Quiet Bloom - a small project to recreate the joy of receiving thoughtful letters.
                        </Text>
                        <Text style={text}>
                            As someone who balances work, motherhood, everyday responsibilities, this has become my way of returning to creativity.
                        </Text>
                        <Text style={text}>
                            The Quiet Bloom exists for the woman who is still becoming.<br />
                            Not loudly.<br />
                            Not urgently.<br />
                            But in her own time.
                        </Text>
                        <Text style={text}>
                            In a world that rewards speed, visibility, and constant output, it can be easy to forget that growth does not need to be witnessed to be real. That becoming is not something to perform, but something to live.
                        </Text>
                        <Text style={text}>
                            There are parts of us that unfold slowly. Parts that do not respond to pressure. Parts that simply wait for space.
                        </Text>
                        <Text style={text}>
                            The Quiet Bloom was created to honour that space. It is not here to guide you toward becoming someone else. It is here to accompany you as you return to yourself.
                        </Text>
                        <Text style={signature}>
                            Ash x
                        </Text>

                        <Hr style={divider} />

                        <Text style={noticingTextItalic}>
                            Right now, I'm just noticing.<br />
                            Not solving.
                        </Text>
                        <Text style={noticingText}>
                            What feels heavy is ...
                        </Text>
                        <Text style={noticingText}>
                            Ease for today, might look like....
                        </Text>
                        <Text style={noticingText}>
                            And the smallest step I can take is..
                        </Text>

                        <Hr style={divider} />

                        <Text style={headingText}>The Quiet Bloom-Reflection Prompts</Text>
                        
                        <ul style={list}>
                            <li style={listItem}>What feels heavy right now?</li>
                            <li style={listItem}>What would ease look like today?</li>
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
                            Mind/ Body /Emotions/Energy.
                        </Text>
                        <Text style={text}>
                            You don't need a perfect answer. Even a few words like "pressure," "uncertainty," "too many small tasks," "emotional load" are enough.
                        </Text>
                        <Text style={text}>
                            For the second question, you're not looking for a life overhaul—just something that shifts your day.
                        </Text>
                        <Text style={text}>
                            After your reflection, ask :<br />
                            "What is one small thing I can do in the next hour that honours what I just discovered?"
                        </Text>

                        <Text style={footerTagline}>
                            Pause.Reflect.Reconnect.
                        </Text>
                    </Section>

                    <Section style={footer}>
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

const locationText = {
    color: "#78716c", // stone-500
    fontSize: "16px",
    textAlign: "center" as const,
    margin: "8px 0 0 0",
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
}

const bodySection = {
    backgroundColor: "#ffffff",
    padding: "48px 40px",
    borderRadius: "2px",
    border: "1px solid #e7e5e4",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
}

const divider = {
    borderColor: "#e7e5e4", // stone-200
    margin: "32px 0",
}

const text = {
    color: "#57534e", // stone-600
    fontSize: "16px",
    lineHeight: "26px",
    fontWeight: "300",
    margin: "0 0 16px 0",
}

const noticingText = {
    color: "#1c1917", 
    fontSize: "18px",
    lineHeight: "28px",
    fontWeight: "400",
    margin: "0 0 24px 0",
    fontFamily: "Georgia, serif",
}

const noticingTextItalic = {
    ...noticingText,
    fontStyle: "italic",
}

const headingText = {
    color: "#1c1917",
    fontSize: "20px",
    lineHeight: "32px",
    fontWeight: "400",
    fontFamily: "Georgia, serif",
    margin: "0 0 16px 0",
}

const signature = {
    color: "#1c1917", // stone-900
    fontSize: "20px",
    lineHeight: "26px",
    fontWeight: "400",
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
    marginTop: "24px",
}

const list = {
    margin: "0 0 16px 0",
    paddingLeft: "24px",
}

const listItem = {
    color: "#57534e", // stone-600
    fontSize: "16px",
    lineHeight: "26px",
    fontWeight: "300",
    marginBottom: "8px",
}

const footerTagline = {
    color: "#1c1917", // stone-900
    fontSize: "18px",
    lineHeight: "26px",
    fontWeight: "400",
    textAlign: "center" as const,
    fontFamily: "Georgia, serif",
    marginTop: "48px",
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
