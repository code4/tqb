> [!IMPORTANT]
> **Agent Instructions**: Please review this document to understand the project flow before making any structural changes to the application. If you notice any missing details or implement new features, **it is your responsibility to keep this document updated**.

# 🌸 The Quiet Bloom - System Architecture & Flow Overview

"The Quiet Bloom" is a premium, quiet luxury digital platform operating natively on the web. The platform allows users to sign up for a free weekly newsletter or subscribe to a paid "Print Club" (UK and International tiers) to receive curated physical letters each month.

---

## 🏗️ 1. Technical Stack & Architecture

- **Framework**: Next.js 15 (App Router, Turbopack) built with React 19.
- **Content Management (CMS)**: Sanity (Content Lake & embedded Sanity Studio at `/studio`).
- **Payments & Subscriptions**: Stripe (Checkout & Webhooks).
- **Email Delivery**: Resend (Transactional emails and Audience management).
- **Styling**: Tailwind CSS v4, `lucide-react` icons, Framer Motion for micro-animations, and `shadcn/ui` foundation.
- **Analytics**: Vercel Analytics and Umami.

---

## 👥 2. User Flows & Lifecycle

### Free Subscriber Flow (Digital Reader)

1. **User Action**: The visitor enters their email on the `/subscribe` page or the global footer newsletter form.
2. **API Execution (`/api/newsletter/subscribe`)**:
   - The application checks **Sanity** to see if the user's email already exists as a `subscriber` document.
   - **Protection Mechanism**: If the email exists, the API returns a silent `200 OK` early so that duplicate subscribers and spam emails are not triggered.
   - If the email is new, it syncs the contact to the **Resend Audience** (`RESEND_LEADS_AUDIENCE_ID` or `RESEND_AUDIENCE_ID`).
   - A new `subscriber` document is generated in **Sanity** with `tier: 'free'` and `status: 'active'`.
3. **Automated Engagement**: 
   - A bespoke, heavily designed automated welcome email is dispatched to the user via **Resend**.
   - This email is rendered using `@react-email/components` (`emails/newsletter-welcome.tsx`) containing the "Noticing" micro-prompts.
   - Behind the scenes, the `from` alias leverages `process.env.EMAIL_FROM` or defaults conditionally to test mode safety parameters (`onboarding@resend.dev`).

### Paid Subscriber Flow (Print Club)

1. **User Action**: The visitor selects either the "UK" or "International" tier on the Subscribe overlay/page.
2. **Checkout Initiation (`/api/checkout`)**:
   - Next.js provisions a dedicated **Stripe Checkout Session**.
   - During checkout, custom details are dynamically explicitly requested, such as a **Shipping Address** (limited to allowed countries based on the tier) and an optional **Birthday Month** dropdown.
3. **Payment Completion & Stripe Webhook (`/api/webhooks/stripe`)**:
   - Upon successful payment, Stripe fires a `checkout.session.completed` event asynchronously to the backend.
   - The webhook queries **Sanity** for dynamically editable Welcome Email templates (`*[_type == "welcomeEmail"]`).
   - A `subscriber` document is created in **Sanity** with `tier: 'paid'` and `status: 'active'`.
   - The user's name and email are synchronized to the main **Resend Audience**.
   - An automated, high-fidelity React Welcome Email (`emails/welcome.tsx`) is deployed to the user.

### Cancellation & Churn Flow

1. **User Action**: A paid subscriber accesses the Stripe Customer Portal via a login link and elects to cancel their active subscription.
2. **Cancellation Webhook (`/api/webhooks/stripe`)**:
   - Stripe fires a `customer.subscription.deleted` event.
   - The backend looks up the corresponding Stripe Customer ID to retrieve the user's email address.
   - **Sanity** is queried for the dynamically editable Goodbye/Unsubscribe Email templates.
   - A thoughtful, automated Farewell Email is dispatched to the ex-subscriber (`emails/unsubscribed.tsx`).
   - The user is permanently **removed** from the active Resend Audience to stop future mailings.
   - The `subscriber` document in **Sanity** is automatically patched to update its status to `status: 'cancelled'`.

---

## 💾 3. Data Schema & Content Modeling

The Sanity Content Lake serves as the system of record. Key document schemas include:

- **`subscriber`**: Stores `email`, `status` (Active/Unsubscribed), `tier` (Free/Paid), and `signedUpAt`.
- **`post`**: Standard content format for editorial blog posts (Title, Slug, Main Image, Rich Text Block Content).
- **`landingPage` & `subscribePage` & `successPage`**: Enables the site admin to edit headline copy, images, benefits, and call-to-actions without touching code.
- **`siteSettings`**: Global state like the logo, brand colors, copyright, navigation links, and SEO defaults.
- **`welcomeEmail` & `unsubscribedEmail`**: Gives Ash (the creator) the ability to tweak automated email copy dynamically without triggering a Vercel code redeploy.

## 🔐 4. Environmental Configuration & State Boundaries

- Because the app leverages Stripe Webhooks and Resend automation, it requires stringent environment variable barriers.
- **Local Testing**: On the `free` tier of Resend, the application intercepts outgoing traffic and defaults strictly to a verified sandbox context (e.g. sending FROM `onboarding@resend.dev` TO a registered testing email) to prevent sandbox crashes. Sanity also blocks repeated local tests if the identical test email isn't manually deleted from the `subscriber` collection first.
