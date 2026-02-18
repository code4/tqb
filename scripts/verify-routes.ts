
const BASE_URL = 'http://localhost:3000';
const ROUTES = [
    '/',
    '/about',
    '/blog',
    '/subscribe',
    '/legal/privacy-policy',
    '/legal/terms-of-service',
];

async function verifyRoutes() {
    console.log(`Verifying routes on ${BASE_URL}...`);
    let hasErrors = false;

    for (const route of ROUTES) {
        try {
            const response = await fetch(`${BASE_URL}${route}`);
            if (response.ok) {
                console.log(`[PASS] ${route} - Status: ${response.status}`);
            } else {
                console.error(`[FAIL] ${route} - Status: ${response.status}`);
                hasErrors = true;
            }
        } catch (error) {
            console.error(`[ERROR] ${route} - Failed to fetch: ${(error as Error).message}`);
            hasErrors = true;
        }
    }

    if (hasErrors) {
        console.log("\nSome routes failed verification.");
        process.exit(1);
    } else {
        console.log("\nAll routes verified successfully!");
    }
}

verifyRoutes();
