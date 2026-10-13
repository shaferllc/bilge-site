# bilge-site

Bilge's website: a Keel app on dply Edge (Workers runtime), styled like the app's Deck (and Binnacle's site).

- `/` marketing, with a live Smart Scan demo on sample data (`public/demo.js`)
- `/buy` → shafer.llc/account/buy/bilge (Stripe Checkout; shafer.llc issues the license)
- `/download` → dl.shafer.llc/bilge/Bilge.dmg (R2) · `/appcast.xml` → dl.shafer.llc/bilge/appcast.xml

Release: bump `VERSION` in the app repo, commit and push, then run Shipyard's
`~/Projects/Apps/desktop/shipyard/ship.sh ~/Projects/Apps/desktop/bilge`. It builds, signs,
notarizes, creates the GitHub release with the Sparkle feed, and `scripts/publish-downloads.sh`
copies it to R2. Bump `version` in `src/config.ts` and deploy the site.

Dev: `npm install && npx wrangler dev`.
