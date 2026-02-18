
import { createClient } from 'next-sanity'

process.loadEnvFile('.env.local')

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-02-17',
    useCdn: false,
})

async function check() {
    console.log('Checking for subscribePage...')
    const data = await client.fetch(`*[_type == "subscribePage"]`)
    console.log('Found documents:', data.length)
    if (data.length > 0) {
        console.log('First document:', JSON.stringify(data[0], null, 2))
    } else {
        console.log('No subscribePage documents found.')
    }
}

check()
