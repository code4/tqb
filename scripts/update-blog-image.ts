
import { createClient } from 'next-sanity'
import path from 'path'
import fs from 'fs'

// Load environment variables
process.loadEnvFile('.env.local')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing required environment variables (ID, Dataset, or Token).')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2024-02-17',
    useCdn: false,
})

async function uploadImage(filePath: string) {
    console.log(`Uploading image from ${filePath}...`)
    try {
        const buffer = fs.readFileSync(filePath)
        const asset = await client.assets.upload('image', buffer, {
            filename: path.basename(filePath)
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
        throw error
    }
}

async function updateBlogImage(imagePath: string, postTitlePartial: string) {
    try {
        // 1. Upload the image
        const imageAsset = await uploadImage(imagePath)

        // 2. Find the Blog Post
        // We search for a post where the title contains the string
        const query = `*[_type == "post" && title match "${postTitlePartial}*"][0]`
        const post = await client.fetch(query)

        if (!post) {
            console.error(`❌ Post not found matching title: "${postTitlePartial}"`)
            return
        }

        console.log(`Found post: "${post.title}" (${post._id})`)
        console.log(`Patching 'mainImage'...`)

        // 3. Patch the document
        await client
            .patch(post._id)
            .set({ mainImage: imageAsset })
            .commit()

        console.log('✅ Blog post image updated successfully!')

    } catch (err) {
        console.error('❌ Error updating blog post image:', err)
    }
}

// Check for arguments
const targetImage = process.argv[2]
// Default to the known title if not provided, or take from args
const targetPostTitle = process.argv[3] || "Finding Stillness"

if (!targetImage) {
    console.error('Please provide the path to the image file.')
    console.error('Usage: npx tsx scripts/update-blog-image.ts <path-to-image> [post-title-partial]')
    process.exit(1)
}

updateBlogImage(targetImage, targetPostTitle).catch(console.error)
