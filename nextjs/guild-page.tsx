/**
 * Guild Page — Next.js App Router
 *
 * Drop-in page component for any Next.js site in the guild.
 *
 * Usage:
 *   1. Copy this file to your app directory: app/guild/page.tsx
 *   2. Copy guild.css to your app directory: app/guild/guild.css
 *   3. Update CURRENT_DOMAIN to match your site
 *
 * The page is noindex by default (unlinked, hidden page).
 */

import type { Metadata } from "next";
import { GUILD_NAME, GUILD_DESCRIPTION, GUILD_SITES } from "./guild-config";
import { generateGuildSchema } from "./guild-schema";
import "./guild.css";

// ---- CONFIGURE THIS PER SITE ----
const CURRENT_DOMAIN = "japanesejesus.com"; // Change to your domain
// ---------------------------------

export const metadata: Metadata = {
  title: `${GUILD_NAME}`,
  description: GUILD_DESCRIPTION,
  robots: { index: false, follow: true },
};

export default function GuildPage() {
  const schema = generateGuildSchema(CURRENT_DOMAIN);
  const otherSites = GUILD_SITES.filter((s) => s.domain !== CURRENT_DOMAIN);

  return (
    <div className="guild-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="guild-container">
        <header className="guild-header">
          <h1 className="guild-title">{GUILD_NAME}</h1>
          <p className="guild-description">{GUILD_DESCRIPTION}</p>
        </header>

        <div className="guild-grid">
          {otherSites.map((site) => (
            <a
              key={site.domain}
              href={site.url}
              className="guild-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="guild-card-header">
                <h2 className="guild-card-name">{site.name}</h2>
                <span className="guild-card-domain">{site.domain}</span>
              </div>
              <p className="guild-card-tagline">{site.tagline}</p>
              <p className="guild-card-description">{site.description}</p>
              <div className="guild-card-meta">
                <span className="guild-card-tag">{site.category}</span>
                <span className="guild-card-tag">{site.platform}</span>
              </div>
            </a>
          ))}
        </div>

        <footer className="guild-footer">
          {GUILD_SITES.length} sites &middot; {GUILD_NAME}
        </footer>
      </div>
    </div>
  );
}
