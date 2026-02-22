import { defineField, defineType } from 'sanity'

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
            of: [
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
                    ],
                },
                // 2. Text Block
                {
                    type: 'object',
                    name: 'textBlock',
                    title: 'Text Block',
                    fields: [
                        { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
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
                        { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
                        { name: 'heading', type: 'string', title: 'Heading' },
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
                        { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
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
                        { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
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
                        { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
                        { name: 'heading', type: 'string', title: 'Heading' },
                        { name: 'subheading', type: 'text', title: 'Subheading' },
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
                        }
                    ],
                },
                // 7. Latest Posts
                {
                    type: 'object',
                    name: 'latestPosts',
                    title: 'Latest Posts',
                    fields: [
                        { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
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
                        { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
                        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                        { name: 'name', type: 'string', title: 'Name' },
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
            ],
        }),
    ],
})
