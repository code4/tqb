
import { createClient } from 'next-sanity'

// Load environment variables
process.loadEnvFile('.env.local')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing required environment variables for seeding (ID, Dataset, or Token).')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    token, // Write token required
    apiVersion: '2024-02-17',
    useCdn: false,
})

async function uploadImageFromUrl(url: string) {
    console.log(`Uploading image from ${url}...`)
    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`)
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const asset = await client.assets.upload('image', buffer, {
            filename: url.split('/').pop() || 'image.jpg'
        })
        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id
            }
        }
    } catch (error) {
        console.error(`Error uploading image:`, error)
        return undefined
    }
}

async function seed() {
    console.log('🌱 Seeding content for "The Quiet Bloom"...')

    // 0. Asset Uploads (Curation for premium feel - Using reliable Unsplash IDs)
    const heroImg = await uploadImageFromUrl('https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2000&auto=format&fit=crop')
    const bioImg = await uploadImageFromUrl('https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop')
    const blogImg1 = await uploadImageFromUrl('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2000&auto=format&fit=crop') // Stillness
    const blogImg2 = await uploadImageFromUrl('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop') // Slow Living
    const blogImg3 = await uploadImageFromUrl('https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=2000&auto=format&fit=crop') // Tea Ritual

    // 1. Site Settings
    const siteSettings = {
        _id: 'siteSettings',
        _type: 'siteSettings',
        title: 'The Quiet Bloom',
        description: 'Slow Mail For The Women Still Becoming. A quiet space for reflection.',
        socialLinks: [
            { _key: 'ig', platform: 'Instagram', url: 'https://instagram.com/thequietbloom' }
        ],
        seoKeywords: ['slow living', 'print subscription', 'personal reflection', 'quiet luxury', 'art and writing', 'mindfulness']
    }

    // 2. Landing Page
    const landingPage = {
        _id: 'landingPage',
        _type: 'landingPage',
        title: 'Home',
        sections: [
            {
                _type: 'hero',
                _key: 'hero-section',
                enabled: true,
                heading: 'Slow Mail For\nThe Women\nStill\nBecoming.',
                subheading: 'A slow print club for women who are still becoming. A quiet sanctuary to simply be — something beautiful to hold, read, and sit with.',
                ctaText: 'Subscribe',
                ctaLink: '/subscribe',
                image: heroImg
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
                _key: 'pricing',
                _type: 'pricing',
                enabled: true,
                heading: 'Choose Your Rhythm',
                subheading: 'Whether you prefer a digital connection or the tangible experience of slow mail, there is a place for you here.',
                tiers: [
                    {
                        _key: 't1',
                        name: 'Digital Reader',
                        price: 'Free',
                        features: ['Weekly Public Newsletter', 'Digital Essays', 'Community Updates']
                    },
                    {
                        _key: 't2',
                        name: 'Print Club (UK)',
                        price: '£8',
                        recommended: true,
                        features: ['Monthly Physical Print Mail', 'Tangible Reflection Prompts', 'Exclusive Art Prints', 'UK Shipping Included', 'A Moment of True Pause']
                    },
                    {
                        _key: 't3',
                        name: 'Print Club (International)',
                        price: '£11',
                        features: ['Monthly Physical Print Mail', 'Tangible Reflection Prompts', 'Exclusive Art Prints', 'International Shipping Included', 'A Moment of True Pause']
                    }
                ]
            },
            {
                _key: 'latestPosts',
                _type: 'latestPosts',
                enabled: true,
                heading: 'Recent Reflections'
            },
            {
                _key: 'founder',
                _type: 'founderBio',
                enabled: true,
                name: 'A Note from the Founder',
                image: bioImg,
                bio: [
                    {
                        _key: 'b1',
                        _type: 'block',
                        style: 'normal',
                        children: [{ _key: 's1', _type: 'span', text: 'The Quiet Bloom started as a whisper. I wanted to create something that felt like a long, honest letter from a friend. This club is for those of us who are still becoming, still learning, and still finding beauty in the slow moments.' }]
                    }
                ]
            }
        ]
    }

    // 3. Subscribe Page
    const subscribePage = {
        _id: 'subscribePage',
        _type: 'subscribePage',
        title: 'Choose Your Rhythm',
        description: 'Whether you prefer a digital connection or the tangible experience of slow mail, there is a place for you here.',
        tiers: [
            {
                _key: 't1',
                name: 'Digital Reader',
                price: 'Free',
                ctaText: 'Join for Free',
                ctaLink: '#',
                features: ['Weekly Public Newsletter', 'Digital Essays', 'Community Updates']
            },
            {
                _key: 't2',
                name: 'Print Club (UK)',
                price: '£8',
                ctaText: 'Join (UK)',
                ctaLink: '#',
                recommended: true,
                features: ['Monthly Physical Print Mail', 'Tangible Reflection Prompts', 'Exclusive Art Prints', 'UK Shipping Included', 'A Moment of True Pause']
            },
            {
                _key: 't3',
                name: 'Print Club (International)',
                price: '£11',
                ctaText: 'Join (Intl)',
                ctaLink: '#',
                features: ['Monthly Physical Print Mail', 'Tangible Reflection Prompts', 'Exclusive Art Prints', 'International Shipping Included', 'A Moment of True Pause']
            }
        ]
    }

    // 4. Legal Pages
    const legalPages = [
        {
            _id: 'manifesto',
            _type: 'legalPage',
            title: 'The Manifesto',
            slug: { _type: 'slug', current: 'manifesto' },
            content: [
                {
                    _key: 'b1',
                    _type: 'block',
                    style: 'h2',
                    children: [{ _key: 's1', _type: 'span', text: 'Built Slowly, Alongside a Full Life' }]
                },
                {
                    _key: 'b2',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's2', _type: 'span', text: 'I don’t live a slow life. I live a full one. There’s work, family, responsibility, noise — all the ordinary things that make up a grown woman’s days. And somewhere within that, there’s also a quieter part of me that didn’t want to disappear just because life became busy.' }]
                },
                {
                    _key: 'b3',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's3', _type: 'span', text: 'This project wasn’t born from having loads of free time or a grand plan. It came from a feeling — that gentle ache of knowing there’s more inside us than the roles we move through each day. Daughter. Mother. Employee. Carer. The list grows, and we show up. We always do. But I missed the slower parts of myself.' }]
                },
                {
                    _key: 'b4',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's4', _type: 'span', text: 'I missed how it felt to receive something physical — something that had travelled, that had been held by another human before reaching me. So The Quiet Bloom is being shaped the same way I’m living right now: slowly, imperfectly, with care.' }]
                },
                {
                    _key: 'b5',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's5', _type: 'span', text: 'This space is for women like me. Women who are still becoming, even if no one is watching. Women who don’t need fixing, motivating, or reinventing — just a little room to breathe and remember themselves. If you’re building something gently too — or even just tending to something quiet inside — you’re not behind. You’re right on time.' }]
                }
            ]
        },
        {
            _id: 'privacy',
            _type: 'legalPage',
            title: 'Privacy Policy',
            slug: { _type: 'slug', current: 'privacy' },
            content: [
                {
                    _key: 'b1',
                    _type: 'block',
                    style: 'h3',
                    children: [{ _key: 's1', _type: 'span', text: '1. A Quiet Promise' }]
                },
                {
                    _key: 'b2',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's2', _type: 'span', text: 'The Quiet Bloom was created as a sanctuary from the noise of the digital world. In that same spirit, we handle your personal information with the utmost respect, care, and restraint. We only collect what is absolutely necessary to deliver your letters to your door and maintain our connection with you.' }]
                },
                {
                    _key: 'b3',
                    _type: 'block',
                    style: 'h3',
                    children: [{ _key: 's3', _type: 'span', text: '2. Information We Collect' }]
                },
                {
                    _key: 'b4',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's4', _type: 'span', text: 'To send you your physical Print Club mail, we collect your name and shipping address. For digital communications and account management, we collect your email address. Payment processing is handled entirely and securely by Stripe; we never see or store your credit card details.' }]
                },
                {
                    _key: 'b5',
                    _type: 'block',
                    style: 'h3',
                    children: [{ _key: 's5', _type: 'span', text: '3. How We Use Your Information' }]
                },
                {
                    _key: 'b6',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's6', _type: 'span', text: 'Your physical address is used exclusively to mail your monthly subscription. Your email address is used to send payment receipts, shipping notifications, and our newsletter (if you have opted in). We will never sell, rent, or trade your personal information to any third party. Your details remain entirely confidential.' }]
                },
                {
                    _key: 'b7',
                    _type: 'block',
                    style: 'h3',
                    children: [{ _key: 's7', _type: 'span', text: '4. Your Rights' }]
                },
                {
                    _key: 'b8',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's8', _type: 'span', text: 'You have the right to request access to the personal data we hold about you, or ask that we delete it entirely. You can manage your subscription and communication preferences at any time via the Customer Portal link in our footer. For any privacy-related inquiries, please write to us at thequietbloom.uk@gmail.com.' }]
                }
            ]
        },
        {
            _id: 'terms',
            _type: 'legalPage',
            title: 'Terms of Service',
            slug: { _type: 'slug', current: 'terms' },
            content: [
                {
                    _key: 'b1',
                    _type: 'block',
                    style: 'h3',
                    children: [{ _key: 's1', _type: 'span', text: '1. Welcome to the Club' }]
                },
                {
                    _key: 'b2',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's2', _type: 'span', text: 'By subscribing to The Quiet Bloom, you agree to these gentle terms, which are designed to ensure clarity and protect both our creative work and your experience.' }]
                },
                {
                    _key: 'b3',
                    _type: 'block',
                    style: 'h3',
                    children: [{ _key: 's3', _type: 'span', text: '2. Subscriptions & Billing' }]
                },
                {
                    _key: 'b4',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's4', _type: 'span', text: 'The Print Club is a recurring monthly subscription. You will be billed on the anniversary of your initial sign-up date. You may cancel your subscription at any time without penalty via the Customer Portal. Upon cancellation, you will receive any mail you have already paid for, but future billing will cease immediately.' }]
                },
                {
                    _key: 'b5',
                    _type: 'block',
                    style: 'h3',
                    children: [{ _key: 's5', _type: 'span', text: '3. Shipping Timelines' }]
                },
                {
                    _key: 'b6',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's6', _type: 'span', text: 'Because this is a slow mail service crafted with care, our shipping schedule is intentional. All monthly envelopes are dispatched between the 20th and 31st of the month. If you subscribe after the 20th, your first letter will be included in the following month’s batch. UK delivery takes 1-5 days post-dispatch; International delivery takes 3-21 days. We utilize untracked services to keep the subscription affordable for you.' }]
                },
                {
                    _key: 'b7',
                    _type: 'block',
                    style: 'h3',
                    children: [{ _key: 's7', _type: 'span', text: '4. Copyright & Intellectual Property' }]
                },
                {
                    _key: 'b8',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's8', _type: 'span', text: 'All written content, essays, illustrations, and tangible art enclosed in your letter are the original intellectual property of The Quiet Bloom. They are for your personal, private enjoyment only. They may not be reproduced, scanned, sold, or distributed without explicit written permission.' }]
                },
                {
                    _key: 'b9',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's9', _type: 'span', text: 'If you have any questions, please reach out thoughtfully to thequietbloom.uk@gmail.com.' }]
                }
            ]
        }
    ]

    // 5. Sample Blog Posts
    const posts = [
        {
            _id: 'post-finding-joy',
            _type: 'post',
            title: 'Finding Joy in the Making',
            slug: { _type: 'slug', current: 'finding-joy-in-the-making' },
            publishedAt: new Date().toISOString(),
            mainImage: blogImg1,
            excerpt: 'Deciding what feels right in the hand, not just what looks good on a screen.',
            body: [
                {
                    _key: 'b1',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'Lately, my days have been filled with paper. Not just any paper — envelopes, card stocks, samples, textures. I’ve been researching, ordering, testing. Comparing finishes. Holding sheets up to the light.' }]
                },
                {
                    _key: 'b2',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'With technology, so much can be done online. Designs can be mocked up in minutes, files sent across the vendors in seconds. And yet, the physical process still asks for patience. Iterations. Waiting. Trying again. Nothing arrives perfect the first time — and perhaps that’s part of the point.' }]
                },
                {
                    _key: 'b3',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'Work, of course, continues at full pace... And yet — beneath it all — there’s this quiet spark. A creative adventure that keeps me awake in the best way. After the children are asleep, I tiptoe back into the evening to finish what I didn’t get to earlier. This is how The Quiet Bloom is being made. Slowly. With love. Growing quietly amid the fullness of an ordinary life.' }]
                }
            ]
        },
        {
            _id: 'post-cost-of-belief',
            _type: 'post',
            title: 'The Cost of Believing in Myself',
            slug: { _type: 'slug', current: 'the-cost-of-believing-in-myself' },
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            mainImage: blogImg2,
            excerpt: 'Launching a website makes it real. It means I am no longer experimental in the safety of my home. It means this matters to me.',
            body: [
                {
                    _key: 'b1',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'I have been circling the idea of launching a website for weeks. Not because I don’t want it. But because I understand, very clearly, what it costs. There is the visible cost — the domain name, the hosting plan. But the deeper cost is not financial. It is the cost of belief.' }]
                },
                {
                    _key: 'b2',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'I made a small decision. I stopped buying lunches at work. Not dramatically. Not as punishment. Just gently. I pack something from home. I make tea instead of purchasing another coffee. And in doing so, I create space — financial and psychological — to experiment. It is intentional investment. In creativity. In self-trust. In the quiet parts of me that do not shout but still deserve attention.' }]
                },
                {
                    _key: 'b3',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'Because the greater failure, I think, would be never attempting it at all. Never allowing this spark to see daylight. I am learning that believing in myself may be the most valuable investment I ever make.' }]
                }
            ]
        },
        {
            _id: 'post-permission-to-pause',
            _type: 'post',
            title: 'Permission to Pause',
            slug: { _type: 'slug', current: 'permission-to-pause' },
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            mainImage: blogImg3,
            excerpt: 'Growth doesn’t always need an audience. Sometimes it just needs space.',
            body: [
                {
                    _key: 'b1',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'Life keeps unfolding. It is not about productivity. It is not about fixing yourself. It is about the honouring the beauty of unfolding. For growth that does not require an audience.' }]
                }
            ]
        }
    ]

    console.log('Pushing documents to Sanity...')
    const transaction = client.transaction()
    transaction.createOrReplace(siteSettings)
    transaction.createOrReplace(landingPage)
    transaction.createOrReplace(subscribePage)
    for (const page of legalPages) transaction.createOrReplace(page)
    for (const post of posts) transaction.createOrReplace(post)

    try {
        await transaction.commit()
        console.log('✅ Content seeded successfully!')
        console.log('👉 Refresh your local site: http://localhost:3000')
    } catch (err) {
        console.error('❌ Error seeding content:', err)
    }
}

seed().catch(console.error)
