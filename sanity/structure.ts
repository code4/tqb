import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            // Singleton (Global) Pages
            S.listItem()
                .title('Site Settings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
                .title('Landing Page')
                .child(S.document().schemaType('landingPage').documentId('landingPage')),
            S.listItem()
                .title('Subscribe Page')
                .child(S.document().schemaType('subscribePage').documentId('subscribePage')),
            S.listItem()
                .title('Success Page')
                .child(S.document().schemaType('successPage').documentId('successPage')),
            S.listItem()
                .title('Welcome Email')
                .child(S.document().schemaType('welcomeEmail').documentId('welcomeEmail')),
            S.listItem()
                .title('Renewal Email')
                .child(S.document().schemaType('renewalEmail').documentId('renewalEmail')),
            S.listItem()
                .title('Unsubscribed Email')
                .child(S.document().schemaType('unsubscribedEmail').documentId('unsubscribedEmail')),
            S.divider(),
            // Content Types
            ...S.documentTypeListItems().filter(
                (listItem) =>
                    !['siteSettings', 'landingPage', 'subscribePage', 'successPage', 'welcomeEmail', 'renewalEmail', 'unsubscribedEmail'].includes(
                        listItem.getId() as string
                    )
            ),
        ])
