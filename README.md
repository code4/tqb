# The Quiet Bloom (V2)

A premium marketing website built with **Next.js 14+ (App Router)**, **Tailwind CSS**, and **Sanity CMS**. Designed with a "Quiet Luxury" aesthetic.

## 🚀 Getting Started

### 1. Project Setup

First, install dependencies:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory (or use the one provided) and populate it with your keys:

```bash
# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe (Links)
NEXT_PUBLIC_STRIPE_UK_URL=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_INTL_URL=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_PORTAL_URL=https://billing.stripe.com/...

# Sanity CMS (Required for Content)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here_optional_for_read
```

> **Note**: If you don't have a Sanity project ID yet, the site will show placeholder content.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📝 Managing Content (CMS)

This project uses [Sanity Studio](https://www.sanity.io/) embedded directly in the application.

1.  Start the development server (`npm run dev`).
2.  Navigate to **[http://localhost:3000/studio](http://localhost:3000/studio)**.
3.  Log in with your Sanity account.

### Creating Content

You need to publish specific document types for the site to function fully:

-   **Site Settings**: Global configuration for Logo, SEO title/description, and Social Links.
-   **Landing Page**: The homepage content.
    -   Add sections like `Hero`, `Features`, `Testimonials`, etc.
    -   **Important**: Make sure to toggle "Enabled" on for each section you want to show.
-   **Subscribe Page**: Configure pricing tiers and benefits.
-   **Legal Pages**: Create pages like "Privacy Policy" or "Terms of Service" (accessible at `/legal/[slug]`).

---

## 🛠️ Deployment

This project is optimized for [Vercel](https://vercel.com).

1.  Push your code to a Git repository.
2.  Import the project into Vercel.
3.  Add the **Environment Variables** from your `.env.local` to the Vercel project settings.
4.  Deploy.

### Build Verification
Run `npm run build` locally to ensure type safety and valid environment configuration before deploying.
