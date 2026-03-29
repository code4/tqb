import { defineField, defineType } from 'sanity'

const commonFields = [
    { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
    {
        name: 'backgroundColor',
        type: 'string',
        title: 'Background Color',
        options: {
            list: [
                { title: 'White', value: 'white' },
                { title: 'Stone (Light)', value: 'stone' },
                { title: 'Stone (Extra Light)', value: 'stone-light' },
                { title: 'Dark', value: 'dark' },
            ],
        },
        initialValue: 'white',
    },
    { name: 'ctaText', type: 'string', title: 'Bottom CTA Text (Optional)' },
    { name: 'ctaLink', type: 'string', title: 'Bottom CTA Link (Optional)' },
]

export const pageSections = [
    // 1. Hero
    {
        type: 'object',
        name: 'hero',
        title: 'Hero Section',
        fields: [
            { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'subheading', type: 'text', title: 'Subheading' },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'ctaText', type: 'string', title: 'CTA Text' },
            { name: 'ctaLink', type: 'string', title: 'CTA Link' },
            {
                name: 'variant',
                type: 'string',
                title: 'Layout Variant',
                options: {
                    list: [
                        { title: 'Split (Homepage)', value: 'split' },
                        { title: 'Centered (Gift Page)', value: 'centered' },
                    ],
                },
                initialValue: 'split',
            },
            {
                name: 'backgroundColor',
                type: 'string',
                title: 'Background Color',
                options: {
                    list: [
                        { title: 'White', value: 'white' },
                        { title: 'Stone (Light)', value: 'stone' },
                        { title: 'Stone (Extra Light)', value: 'stone-light' },
                        { title: 'Dark', value: 'dark' },
                    ],
                },
                initialValue: 'stone',
            },
        ],
    },
    // 2. Text Block
    {
        type: 'object',
        name: 'textBlock',
        title: 'Text Block',
        fields: [
            ...commonFields,
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'content', type: 'blockContent', title: 'Content' },
        ],
    },
    // 3. Feature List
    {
        type: 'object',
        name: 'featureList',
        title: 'Feature List',
        fields: [
            ...commonFields,
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'showNumbers', type: 'boolean', title: 'Show Numbers instead of Icons', initialValue: false },
            {
                name: 'features',
                type: 'array',
                of: [
                    {
                        type: 'object',
                        fields: [
                            { name: 'title', type: 'string', title: 'Title' },
                            { name: 'description', type: 'text', title: 'Description' },
                            { name: 'icon', type: 'string', title: 'Icon Name (Lucide)' },
                        ],
                    },
                ],
            },
        ],
    },
    // 4. Testimonials
    {
        type: 'object',
        name: 'testimonials',
        title: 'Testimonials',
        fields: [
            ...commonFields,
            { name: 'heading', type: 'string', title: 'Heading' },
            {
                name: 'items',
                type: 'array',
                of: [{ type: 'testimonial' }],
            },
        ],
    },
    // 5. FAQ
    {
        type: 'object',
        name: 'faqSection',
        title: 'FAQ Section',
        fields: [
            ...commonFields,
            { name: 'title', type: 'string', title: 'Section Title' },
            {
                name: 'items',
                type: 'array',
                of: [{ type: 'faq' }],
            },
        ],
    },
    // 6. Pricing
    {
        type: 'object',
        name: 'pricing',
        title: 'Pricing',
        fields: [
            ...commonFields,
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'subheading', type: 'text', title: 'Subheading' },
            { name: 'isGift', type: 'boolean', title: 'Is Gift Pricing (One-time)', initialValue: false },
            {
                name: 'tiers',
                title: 'Pricing Tiers',
                type: 'array',
                of: [
                    {
                        type: 'object',
                        fields: [
                            { name: 'name', type: 'string', title: 'Tier Name' },
                            { name: 'price', type: 'string', title: 'Price (Display)' },
                            { name: 'ctaText', type: 'string', title: 'CTA Button Text' },
                            { name: 'features', type: 'array', of: [{ type: 'string' }] },
                            { name: 'recommended', type: 'boolean', title: 'Recommended' },
                        ],
                    },
                ],
            },
        ],
    },
    // 7. Latest Posts
    {
        type: 'object',
        name: 'latestPosts',
        title: 'Latest Posts',
        fields: [
            ...commonFields,
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'count', type: 'number', title: 'Number of Posts', initialValue: 3 },
        ],
    },
    // 8. Founder Bio
    {
        type: 'object',
        name: 'founderBio',
        title: 'Founder Bio',
        fields: [
            ...commonFields,
            { name: 'heading', type: 'string', title: 'Heading (e.g., About The Founder)' },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'name', type: 'string', title: 'Name (Signoff at bottom)' },
            { name: 'bio', type: 'blockContent', title: 'Bio' },
        ],
    },
    // 9. CTA
    {
        type: 'object',
        name: 'cta',
        title: 'Call to Action',
        fields: [
            { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'subheading', type: 'string', title: 'Subheading' },
            { name: 'buttonText', type: 'string', title: 'Button Text' },
            { name: 'buttonLink', type: 'string', title: 'Button Link' },
        ],
    },
    // 10. Gift CTA
    {
        type: 'object',
        name: 'giftCTA',
        title: 'Gift CTA',
        fields: [
            { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
            { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Give the Gift of Pause' },
            { name: 'description', type: 'text', title: 'Description', initialValue: 'Know someone who deserves a moment of stillness? Gift them three months of handwritten letters, delivered to their door.' },
            { name: 'buttonText', type: 'string', title: 'Button Text', initialValue: 'Gift Someone' },
        ],
    },
]

export const landingPage = defineType({
    name: 'landingPage',
    title: 'Landing Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: pageSections as any,
        }),
    ],
})
