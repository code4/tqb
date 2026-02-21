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

        const newSections = [
            {
                _type: 'hero',
                _key: 'hero-section',
                enabled: true,
                heading: 'Slow Mail For\nThe Women\nStill\nBecoming.',
                subheading: 'A slow print club for women who are still becoming. A quiet sanctuary to simply be — something beautiful to hold, read, and sit with.',
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
                        children: [{ _type: 'span', text: 'I’m an ordinary woman, and I say that with intention.' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'I balance a busy career, motherhood, and the myriad of roles life demands—daughter, parent, employee, mentor. Somewhere in the beautiful fullness of all that living, I felt a quieter part of myself beginning to fade. Not lost entirely, but waiting.' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'I missed the slow thrill of receiving a real letter. An envelope traveling from somewhere else, carrying a voice, a thought, a fragment of another world. A grounding retreat from the endless notifications and the exhaustion of hustle culture.' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'Because somewhere between the roles and responsibilities, I realized a vital truth: Growth doesn’t always need an audience. Sometimes, it just needs space 🌷' }]
                    }
                ]
            },
            {
                _type: 'textBlock',
                _key: 'what-it-is',
                enabled: true,
                heading: 'What is it?',
                content: [
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'The Quiet Bloom is a monthly print club and sanctuary for women seeking to slow down, reflect, and reconnect—both with themselves and with others. Every month, a thoughtfully curated art kit arrives at your door. It is a physical invitation to pause.' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'There is no pressure to be productive. No digital noise. No rush to "fix" yourself. Just space to breathe.' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: 'It is about honoring the beauty of your own unfolding. It is a reminder that you are allowed to bloom gently, privately, and entirely in your own time.' }]
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
                        title: 'You crave the tangible',
                        description: 'You miss the forgotten joy of receiving physical mail that isn\'t a bill or a flyer.',
                        icon: 'Mail'
                    },
                    {
                        _type: 'object',
                        _key: 'f2',
                        title: 'You value reflection',
                        description: 'You desperately want a gentle break from the relentless noise of performance and hustle.',
                        icon: 'BookOpen'
                    },
                    {
                        _type: 'object',
                        _key: 'f3',
                        title: 'You seek quiet moments',
                        description: 'You believe in the restorative power of art, words, and sitting with your own thoughts.',
                        icon: 'Image'
                    },
                    {
                        _type: 'object',
                        _key: 'f4',
                        title: 'You are still becoming',
                        description: 'You want a dedicated monthly ritual to unfold, hold yourself, and simply pause.',
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
                        children: [{ _type: 'span', text: 'Every Quiet Bloom envelope is packed slowly, with intention, and includes:' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        listItem: 'bullet',
                        children: [{ _type: 'span', text: 'A beautifully crafted A5 Illustration Print' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        listItem: 'bullet',
                        children: [{ _type: 'span', text: 'A tangible Prompt or Kindness Card for reflection' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        listItem: 'bullet',
                        children: [{ _type: 'span', text: 'An exclusive Quiet Bloom Sticker' }]
                    },
                    {
                        _type: 'block',
                        style: 'normal',
                        listItem: 'bullet',
                        children: [{ _type: 'span', text: 'A gentle, honest letter from me to you' }]
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
