
import { createClient } from 'next-sanity'

process.loadEnvFile('.env.local')

// Client WITHOUT token - simulating public access
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-02-17',
    useCdn: false,
    // No token here
})

async function check() {
    console.log('Attempting public fetch of subscribePage...')
    try {
        const data = await client.fetch(`*[_type == "subscribePage"][0]`)
        console.log('Result:', data ? 'Success (Found)' : 'Failure (Null)')
        if (data) {
            console.log('Title:', data.title)
        }
    } catch (err: any) {
        console.error('Fetch error:', err.message)
    }
}

check()
