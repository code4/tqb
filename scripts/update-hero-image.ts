
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

async function updateHeroImage(imagePath: string) {
    try {
        // 1. Upload the image
        const imageAsset = await uploadImage(imagePath)

        // 2. Fetch the landing page
        const landingPage = await client.fetch(`*[_type == "landingPage"][0]`)

        if (!landingPage) {
            console.error('Landing page not found!')
            return
        }

        // 3. Find the Hero section
        const heroSectionIndex = landingPage.sections.findIndex((s: any) => s._type === 'hero')

        if (heroSectionIndex === -1) {
            console.error('Hero section not found in landing page!')
            return
        }

        // 4. Patch the document
        // We construct the path to the specific section item
        // e.g., sections[0].image
        const sectionPath = `sections[${heroSectionIndex}].image`

        console.log(`Patching 'landingPage' at ${sectionPath}...`)

        await client
            .patch(landingPage._id)
            .set({ [sectionPath]: imageAsset })
            .commit()

        console.log('✅ Hero image updated successfully!')

    } catch (err) {
        console.error('❌ Error updating hero image:', err)
    }
}

// Check for argument
const targetImage = process.argv[2]
if (!targetImage) {
    console.error('Please provide the path to the image file.')
    console.error('Usage: npx tsx scripts/update-hero-image.ts <path-to-image>')
    process.exit(1)
}

updateHeroImage(targetImage).catch(console.error)
