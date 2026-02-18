
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
                _key: 'hero',
                _type: 'hero',
                enabled: true,
                heading: 'Slow Mail For The Women Still Becoming',
                subheading: 'A slow print club for women who are becoming. This is a quiet space for reflection — something to hold, read and sit with.',
                ctaText: 'Join the Print Club',
                ctaLink: '/subscribe',
                image: heroImg
            },
            {
                _key: 'philosophy',
                _type: 'textBlock',
                enabled: true,
                heading: 'A Softer Place',
                content: [
                    {
                        _key: 'b1',
                        _type: 'block',
                        style: 'normal',
                        children: [{ _key: 's1', _type: 'span', text: 'We believe in showing up quietly. In a world that demands constant noise and hustle, The Quiet Bloom offers a gentle return to yourself. We value growth that happens gently and privately, taking small, steady steps towards who you are becoming.' }]
                    }
                ]
            },
            {
                _key: 'features',
                _type: 'featureList',
                enabled: true,
                heading: 'The Print Club Experience',
                features: [
                    { _key: 'f1', title: 'Moment of Pause', description: 'Social media is noisy. Slow mail is a quiet tap on the shoulder, inviting you to stop and breathe.', icon: 'Coffee' },
                    { _key: 'f2', title: 'Physical Connection', description: 'Something tangible to hold. High-quality paper, beautiful art, and words that stay with you.', icon: 'Mail' },
                    { _key: 'f3', title: 'Inner Reflection', description: 'Prompts and essays designed to help you reconnect with your inner voice and intuition.', icon: 'Feather' }
                ]
            },
            {
                _key: 'faq',
                _type: 'faqSection',
                enabled: true,
                title: 'Common Questions',
                items: [
                    { _key: 'q1', _type: 'faq', question: 'How does the Print Club work?', answer: 'Every month, you will receive a curated selection of writing and art in your letterbox. It is a physical invitation to slow down.' },
                    { _key: 'q2', _type: 'faq', question: 'Do you ship internationally?', answer: 'Yes, we ship to most countries. Shippings costs are calculated at checkout or included in the International tier.' }
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
                    children: [{ _key: 's1', _type: 'span', text: 'Our Philosophy' }]
                },
                {
                    _key: 'b2',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's2', _type: 'span', text: 'To create a softer place and slower rhythm for women rediscovering themselves quietly.' }]
                }
            ]
        },
        {
            _id: 'privacy',
            _type: 'legalPage',
            title: 'Privacy Policy',
            slug: { _type: 'slug', current: 'privacy-policy' },
            content: [
                {
                    _key: 'b1',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'We respect your privacy and handle your data with care.' }]
                }
            ]
        },
        {
            _id: 'terms',
            _type: 'legalPage',
            title: 'Terms of Service',
            slug: { _type: 'slug', current: 'terms-of-service' },
            content: [
                {
                    _key: 'b1',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'These are the terms for participating in our community.' }]
                }
            ]
        }
    ]

    // 5. Sample Blog Posts
    const posts = [
        {
            _id: 'post-finding-stillness',
            _type: 'post',
            title: 'Finding Stillness in a Noisy World',
            slug: { _type: 'slug', current: 'finding-stillness' },
            publishedAt: new Date().toISOString(),
            mainImage: blogImg1,
            excerpt: 'In a world that demands constant attention, finding a moment of quiet is an act of rebellion.',
            body: [
                {
                    _key: 'b1',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'We live in an age of constant noise. Notifications, updates, breaking news—it all demands our attention. But stillness isn\'t just the absence of sound; it\'s the presence of self.' }]
                }
            ]
        },
        {
            _id: 'post-art-of-slow-living',
            _type: 'post',
            title: 'The Art of Slow Living',
            slug: { _type: 'slug', current: 'art-of-slow-living' },
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            mainImage: blogImg2,
            excerpt: 'Slowing down isn\'t about doing less; it\'s about doing things with more intention.',
            body: [
                {
                    _key: 'b1',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'Slow living is a choice to prioritize quality over quantity. It is about savoring the morning coffee and the ritual of reading.' }]
                }
            ]
        },
        {
            _id: 'post-ritual-of-tea',
            _type: 'post',
            title: 'The Ritual of Tea',
            slug: { _type: 'slug', current: 'ritual-of-tea' },
            publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            mainImage: blogImg3,
            excerpt: 'Finding peace in the simple act of preparing a cup of tea.',
            body: [
                {
                    _key: 'b1',
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: 's1', _type: 'span', text: 'There is a profound silence in the boiling of water. The ritual of tea is not just about the drink; it is about the pause.' }]
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
