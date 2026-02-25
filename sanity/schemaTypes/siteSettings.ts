import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
        { name: 'general', title: 'General', default: true },
        { name: 'navigation', title: 'Navigation' },
        { name: 'footer', title: 'Footer' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
            group: 'general',
        }),
        defineField({
            name: 'description',
            title: 'Site Description',
            type: 'text',
            group: 'general',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            group: 'general',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
            group: 'general',
            description: 'Displayed on social media shares (1200x630px).',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            group: 'general',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Platform' },
                        { name: 'url', type: 'url', title: 'URL' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'seoKeywords',
            title: 'SEO Keywords',
            type: 'array',
            group: 'general',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'mainMenu',
            title: 'Main Menu (Desktop)',
            type: 'array',
            group: 'navigation',
            description: 'Links that appear in the top header on desktop devices.',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'url', type: 'string', title: 'URL' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'mobileMenu',
            title: 'Mobile Menu',
            type: 'array',
            group: 'navigation',
            description: 'Links that appear inside the hamburger menu on mobile devices.',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'url', type: 'string', title: 'URL' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'subscribeButtonText',
            title: 'Subscribe Button Text',
            type: 'string',
            group: 'navigation',
            description: 'Text for the primary CTA button in the header (e.g., "Subscribe" or "Subscribe Now").',
            initialValue: 'Subscribe',
        }),
        defineField({
            name: 'footer',
            title: 'Footer Settings',
            type: 'object',
            group: 'footer',
            fields: [
                {
                    name: 'brandDescription',
                    title: 'Brand Description',
                    type: 'text',
                    description: 'The short blurb below the logo/title in the footer.',
                },
                {
                    name: 'exploreLinks',
                    title: 'Explore Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', type: 'string', title: 'Label' },
                                { name: 'url', type: 'string', title: 'URL' },
                            ],
                        },
                    ],
                },
                {
                    name: 'supportLinks',
                    title: 'Support Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'label', type: 'string', title: 'Label' },
                                { name: 'url', type: 'string', title: 'URL (e.g., /legal/privacy)' },
                            ],
                        },
                    ],
                },
                {
                    name: 'newsletterHeading',
                    title: 'Newsletter Heading',
                    type: 'string',
                },
                {
                    name: 'newsletterDescription',
                    title: 'Newsletter Description',
                    type: 'text',
                },
                {
                    name: 'contactEmail',
                    title: 'Contact Email',
                    type: 'string',
                    description: 'Email address for the contact link (e.g., hello@thequietbloom.com). Leave empty to hide.',
                },
                {
                    name: 'contactText',
                    title: 'Contact Text',
                    type: 'string',
                    description: 'Short text to display above the email link (e.g., Have a question?).',
                }
            ],
        }),
    ],
})
