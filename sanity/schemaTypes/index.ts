import { type SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import { siteSettings } from './siteSettings'
import { legalPage } from './legalPage'
import { landingPage } from './landingPage'
import { subscribePage } from './subscribePage'
import { successPage } from './successPage'
import { welcomeEmail } from './welcomeEmail'
import { renewalEmail } from './renewalEmail'
import { unsubscribedEmail } from './unsubscribedEmail'

import { testimonial } from './testimonial'
import { faq } from './faq'

import { post } from './post'
import { subscriber } from './subscriber'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [blockContent, siteSettings, legalPage, landingPage, subscribePage, successPage, welcomeEmail, renewalEmail, unsubscribedEmail, testimonial, faq, post, subscriber],
}
