# Guild

Shared schema, guild page, and cross-site linking for all sites in the network.

## What's in here

```
src/
  guild-config.ts    # Canonical registry of all 10 guild sites
  guild-schema.ts    # JSON-LD schema generator (Organization + WebSite graph)
  guild.css          # Self-contained dark styles for the guild page
  build.ts           # Generates dist/ static assets

nextjs/
  guild-page.tsx     # Drop-in Next.js App Router page component

dist/                # Generated (run `npm run build`)
  guild.html         # Self-contained static guild page (WordPress/Squarespace)
  schemas/           # Per-site JSON-LD schema files
  snippets/          # Per-site <script> tags ready to paste into <head>
```

## Build

```bash
npm install
npm run build
```

## Integration by platform

### Next.js sites (japanesejesus.com, wildmeatjapan.com, musicinjapan.com, japancraftbeer.com)

**Install the package:**

```bash
npm install github:tyrannosaurusjr/guild
```

To pull the latest config after changes:

```bash
npm update @mkultraman/guild
```

**Guild page:**

1. Copy `nextjs/guild-page.tsx` to `app/guild/page.tsx`
2. Update `CURRENT_DOMAIN` in the page file to match your site
3. Copy `src/guild.css` to wherever the page imports it from

**JSON-LD schema in `<head>`:**

In your root `layout.tsx`:

```tsx
import { generateGuildSchema } from "@mkultraman/guild";

// In the <head> of your layout:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateGuildSchema("yoursite.com"))
  }}
/>
```

### WordPress sites (mkultraman.com, akiyaz.io, kaalamusic.com)

**Guild page:**

1. Create a new page in WordPress at `/guild`
2. Use a "Custom HTML" block or full-page HTML template
3. Paste the contents of `dist/guild.html`

**JSON-LD schema in `<head>`:**

1. Find your site's snippet in `dist/snippets/` (e.g., `mkultraman-com.html`)
2. Add it via your theme's `header.php`, a custom plugin, or a "Header Scripts" plugin

### Squarespace sites (heatherdobbin.com, thedelphinetwork.com, thomsmithart.com)

**Guild page:**

1. Create a new page at `/guild`
2. Add a "Code" block and paste the contents of `dist/guild.html`
3. Alternatively, use Page Settings > Advanced > Page Header Code Injection for the full HTML

**JSON-LD schema in `<head>`:**

1. Find your site's snippet in `dist/snippets/`
2. Go to Settings > Advanced > Code Injection > Header
3. Paste the snippet

## Adding a new site

1. Add the site to `GUILD_SITES` in `src/guild-config.ts`
2. Run `npm run build` to regenerate all static assets
3. Re-deploy the updated guild page and schema to all existing sites

## The guild page

The `/guild` page is intentionally **unlinked** — it doesn't appear in any navigation. It's a hidden room that connects all sites. Visitors who know about it can find every site in the network from any entry point.

The page uses a self-contained dark design that doesn't match any individual site's brand, reinforcing the feeling of stepping into a shared space.
