import { defineQuery } from 'next-sanity'

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    ...,
    logo { asset->, hotspot, crop },
    ogImage { asset->, hotspot, crop },
    socialLinks[] { platform, url },
    mainMenu[] { label, url },
    mobileMenu[] { label, url },
    subscribeButtonText,
    footer {
      brandDescription,
      exploreLinks[] { label, url },
      supportLinks[] { label, url },
      newsletterHeading,
      newsletterDescription,
      contactEmail,
      contactText
    }
  }
`)
export const landingPageQuery = defineQuery(`
  *[_type == "landingPage"][0] {
    ...,
    sections[] {
      ...,
      _type == 'hero' => {
        ...,
        image { asset->, hotspot, crop }
      },
      _type == 'textBlock' => {
        ...,
        content[]
      },
      _type == 'featureList' => {
        ...,
        features[]
      },
      _type == 'testimonials' => {
        ...,
        items[]
      },
      _type == 'faqSection' => {
        ...,
        items[]
      },
      _type == 'pricing' => {
        ...,
        tiers[] {
          ...,
          features[]
        }
      },
      _type == 'latestPosts' => {
        ...
      },
      _type == 'founderBio' => {
        ...,
        image { asset->, hotspot, crop },
        bio[]
      },
      _type == 'cta' => {
        ...
      }
    }
  }
`)

export const legalPageQuery = defineQuery(`
  *[_type == "legalPage" && slug.current == $slug][0] {
    title,
    content
  }
`)

export const subscribePageQuery = defineQuery(`
  *[_type == "subscribePage"][0] {
    ...,
    tiers[] {
      ...,
      features[]
    }
  }
`)

export const postsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      asset->,
      hotspot,
      crop
    }
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    publishedAt,
    mainImage {
      asset->,
      hotspot,
      crop
    },
    body,
    "author": author->name,
    "next": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0] {
      title,
      "slug": slug.current
    },
    "prev": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc)[0] {
      title,
      "slug": slug.current
    }
  }
`)
