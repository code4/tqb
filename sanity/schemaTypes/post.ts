import { defineField, defineType } from 'sanity'

export const post = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'A short summary for the blog listing card.',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }),
    ],

    preview: {
        select: {
            title: 'title',
            publishedAt: 'publishedAt',
            media: 'mainImage',
        },
        prepare(selection) {
            const { title, publishedAt, media } = selection
            const formattedDate = publishedAt
                ? new Date(publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
                : 'No date set'

            return {
                title,
                subtitle: formattedDate,
                media
            }
        },
    },
    orderings: [
        {
            title: 'Published Date, Newest First',
            name: 'publishedDateDesc',
            by: [
                { field: 'publishedAt', direction: 'desc' }
            ]
        },
        {
            title: 'Published Date, Oldest First',
            name: 'publishedDateAsc',
            by: [
                { field: 'publishedAt', direction: 'asc' }
            ]
        }
    ]
})
