import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Site Description',
            type: 'text',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
            description: 'Displayed on social media shares (1200x630px).',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
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
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'footer',
            title: 'Footer Settings',
            type: 'object',
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
