import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error("Missing Sanity credentials")
    process.exit(1)
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})

async function migrateContent() {
    try {
        console.log("Fetching existing landing page...")
        const landingPage = await client.fetch(`*[_type == "landingPage"][0]`)

        if (!landingPage) {
            console.error("Landing page not found in Sanity. Please create one first.")
            return
        }

        console.log("Updating landing page content...")

        // Construct the new sections based on Substack content
        const newSections = [
            {
                _type: 'hero',
                _key: 'hero-section',
                enabled: true,
                heading: 'Slow Mail For\nThe Women\nStill\nBecoming.',
                subheading: 'A slow print club for women who are becoming. This is a quiet space for reflection — something to hold, read and sit with.',
                ctaText: 'Subscribe',
                ctaLink: '#pricing'
            },
            {
                _type: 'textBlock',
                _key: 'why-this',
                enabled: true,
                heading: 'Why this, why now',
                content: [
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'As a girl, I loved having pen pals. I remember the quiet thrill of receiving a letter — an envelope traveled from somewhere else, carrying a life, a voice, a small piece of another world.' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'I’m trying to recreate that joy now. Something Slower. More Human 🌷.' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'Because somewhere between roles and responsibilities, I felt parts of myself growing quiet. This isn’t about reinvention or hustle. It’s about remembering.' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'Growth doesn’t always need an audience. Sometimes it just needs space 🌷' }]
                    }
                ]
            },
            {
                _type: 'textBlock',
                _key: 'what-it-is',
                enabled: true,
                heading: 'What it is?',
                content: [
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'The Quiet Bloom is a monthly letter or print club for women who want to slow down, reflect and reconnect - with themselves and with others. Each month, you’ll receive a thoughtfully curated kit designed to encourage calm, connection and gentle self expression.' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'No Pressure. No Noise. No Rush. Just space to breathe.' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'It is not about productivity. It is not about fixing yourself. It is about the honouring the beauty of unfolding. For growth that does not require an audience. Where becoming is allowed to be quiet.' }]
                    }
                ]
            },
            {
                _type: 'featureList',
                _key: 'who-and-what',
                enabled: true,
                heading: 'Who is it for?',
                features: [
                    {
                        _type: 'object',
                        _key: 'f1',
                        title: 'You find joy in receiving',
                        description: 'A physical letter in the mail.',
                        icon: 'Mail'
                    },
                    {
                        _type: 'object',
                        _key: 'f2',
                        title: 'You value reflection',
                        description: 'Over performance.',
                        icon: 'BookOpen'
                    },
                    {
                        _type: 'object',
                        _key: 'f3',
                        title: 'You enjoy prints and words',
                        description: 'And believe in the beauty of small moments.',
                        icon: 'Image'
                    },
                    {
                        _type: 'object',
                        _key: 'f4',
                        title: 'You feel you are still becoming',
                        description: 'A monthly ritual to unfold, hold and pause.',
                        icon: 'Leaf'
                    }
                ]
            },
            {
                _type: 'textBlock',
                _key: 'what-arrives',
                enabled: true,
                heading: 'What arrives each month?',
                content: [
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'Every Quiet Bloom envelope includes:' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        listItem: 'bullet',
                        children: [{ _type: 'span', text: 'A5 Illustration Print' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        listItem: 'bullet',
                        children: [{ _type: 'span', text: 'A Prompt Card / A Kindness Card' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        listItem: 'bullet',
                        children: [{ _type: 'span', text: 'A Sticker' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        listItem: 'bullet',
                        children: [{ _type: 'span', text: 'A gentle note from me' }]
                    }
                ]
            },
            {
                _type: 'faqSection',
                _key: 'faq-section',
                enabled: true,
                title: 'How does it work?',
                items: [
                    {
                        _type: 'faq',
                        _key: 'q1',
                        question: 'When will my Print Club arrive?',
                        answer: 'Once you join the Print Club, subscriptions will be sent between the 20th-31st of every month. If you sign up after the 20th of a calendar month, you will receive your first letter in the following month.'
                    },
                    {
                        _type: 'faq',
                        _key: 'q2',
                        question: 'How long does shipping take?',
                        answer: 'UK Print Clubs are sent via Royal Mail 2nd Class and take 1-5 days. International Print Clubs are sent Standard International and take 3-21 days. All services are untracked to keep costs low.'
                    },
                    {
                        _type: 'faq',
                        _key: 'q3',
                        question: 'Can I cancel anytime?',
                        answer: 'Yes, you can manage or cancel your subscription at any time via the Customer Portal link in the website footer or your email.'
                    },
                    {
                        _type: 'faq',
                        _key: 'q4',
                        question: 'How do I contact you?',
                        answer: 'If you have any questions, please contact me at thequietbloom.uk at gmail.com'
                    }
                ]
            },
            {
                _type: 'pricing',
                _key: 'pricing-section',
                enabled: true,
                heading: 'Join the Print Club',
                subheading: 'A monthly ritual delivered to your door.',
            },
            {
                _type: 'latestPosts',
                _key: 'latest-posts',
                enabled: true,
                heading: 'Latest Dispatches',
                count: 3
            },
            {
                _type: 'cta',
                _key: 'cta-section',
                enabled: false,
                heading: 'Stay in the loop',
                subheading: 'Subscribe to our quiet reflections',
                buttonText: 'Subscribe',
                buttonLink: '/subscribe'
            }
        ]

        // Patch the document
        await client.patch(landingPage._id)
            .set({ sections: newSections })
            .commit()

        console.log("Successfully updated landing page content!")
    } catch (e) {
        console.error("Migration failed:", e)
    }
}

migrateContent()
