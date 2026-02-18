
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
    console.log(`Uploading logo from ${filePath}...`)
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

async function updateSiteLogo(imagePath: string) {
    try {
        // 1. Upload the image
        const imageAsset = await uploadImage(imagePath)

        // 2. Fetch or create siteSettings
        const siteSettingsId = 'siteSettings'

        console.log(`Patching 'siteSettings' with new logo...`)

        await client
            .patch(siteSettingsId)
            .set({ logo: imageAsset })
            .commit()

        console.log('✅ Site Logo updated successfully!')

    } catch (err) {
        console.error('❌ Error updating site logo:', err)
    }
}

// Check for argument
const targetImage = process.argv[2]
if (!targetImage) {
    console.error('Please provide the path to the logo image file.')
    console.error('Usage: npx tsx scripts/update-site-logo.ts <path-to-image>')
    process.exit(1)
}

updateSiteLogo(targetImage).catch(console.error)
