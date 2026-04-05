/**
 * Guild Page — Drop-in React component
 *
 * Usage in any Next.js App Router site:
 *
 *   import { GuildPage, guildMetadata } from "@mkultraman/guild/page";
 *   import "@mkultraman/guild/guild.css";
 *
 *   export const metadata = guildMetadata;
 *   export default function Page() {
 *     return <GuildPage domain="yoursite.com" />;
 *   }
 */

import {
  GUILD_NAME,
  GUILD_DESCRIPTION,
  GUILD_SITES,
  type GuildSite,
} from "./guild-config";
import { generateGuildSchema } from "./guild-schema";

export interface GuildPageProps {
  /** The domain of the current site (e.g. "japanesejesus.com") */
  domain: string;
}

/**
 * Pre-built metadata for the guild page. Spread or assign in your page's metadata export.
 */
export const guildMetadata = {
  title: GUILD_NAME,
  description: GUILD_DESCRIPTION,
  robots: { index: false, follow: true },
};

/**
 * Self-contained guild page component.
 * Renders the full guild grid excluding the current site.
 */
export function GuildPage({ domain }: GuildPageProps) {
  const schema = generateGuildSchema(domain);
  const otherSites = GUILD_SITES.filter((s) => s.domain !== domain);

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
          {otherSites.map((site: GuildSite) => (
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
