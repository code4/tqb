import { render } from '@react-email/render'
import { NewsletterWelcomeEmail } from './emails/newsletter-welcome'
import fs from 'fs'
import path from 'path'

async function compileEmail() {
    try {
        console.log("Compiling NewsletterWelcomeEmail to static HTML...")
        const html = await render(NewsletterWelcomeEmail())
        
        const outputPath = path.join(process.cwd(), 'newsletter-welcome-compiled.html')
        fs.writeFileSync(outputPath, html)
        
        console.log(`✅ Successfully compiled! HTML saved to: ${outputPath}`)
    } catch (error) {
        console.error("Compilation error:", error)
    }
}

compileEmail()
