/**
 * Guild JSON-LD Schema Generator
 *
 * Generates structured data for each guild site:
 *   1. A robust standalone schema for the site itself (Organization, Person, etc.)
 *   2. The guild Organization linking all member sites
 *   3. A WebSite entry with SearchAction for the current site
 *
 * The guild is rooted at mkultraman.com — all @id references use that domain.
 */

import {
  GUILD_NAME,
  GUILD_DESCRIPTION,
  GUILD_SITES,
  type GuildSite,
  type SiteSocials,
} from "./guild-config";

const GUILD_ORG_ID = "https://mkultraman.com/guild/#organization";

function socialsToSameAs(socials?: SiteSocials): string[] {
  if (!socials) return [];
  return Object.values(socials).filter((v): v is string => !!v);
}

/**
 * Build the standalone entity schema for a site (Organization, Person, etc.)
 */
function buildSiteEntity(site: GuildSite): object {
  const sameAs = socialsToSameAs(site.socials);

  const entity: Record<string, unknown> = {
    "@type": site.schemaType,
    "@id": `${site.url}/#entity`,
    name: site.name,
    url: site.url,
    description: site.description,
  };

  if (site.logo) {
    entity.logo = {
      "@type": "ImageObject",
      url: site.logo,
    };
    entity.image = site.logo;
  }

  if (site.location) {
    entity.location = {
      "@type": "Place",
      name: site.location,
    };
    // Organization-like types get areaServed
    if (site.schemaType !== "Person") {
      entity.areaServed = site.location;
    }
  }

  if (site.founder) {
    entity.founder = {
      "@type": "Person",
      name: site.founder,
    };
  }

  if (site.foundingDate && site.schemaType !== "Person") {
    entity.foundingDate = site.foundingDate;
  }

  if (site.email) {
    entity.email = site.email;
  }

  if (sameAs.length > 0) {
    entity.sameAs = sameAs;
  }

  if (site.keywords && site.keywords.length > 0) {
    entity.knowsAbout = site.keywords;
  }

  // Link back to the guild
  entity.memberOf = { "@id": GUILD_ORG_ID };

  return entity;
}

/**
 * Build the WebSite schema entry for a site.
 */
function buildWebSiteEntry(site: GuildSite, isCurrent: boolean): object {
  const ws: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: site.language || "en",
    isPartOf: { "@id": GUILD_ORG_ID },
    publisher: { "@id": `${site.url}/#entity` },
  };

  if (isCurrent) {
    ws.potentialAction = {
      "@type": "SearchAction",
      target: `${site.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    };
  }

  return ws;
}

/**
 * Build the guild Organization node.
 */
function buildGuildOrganization(): object {
  return {
    "@type": "Organization",
    "@id": GUILD_ORG_ID,
    name: GUILD_NAME,
    description: GUILD_DESCRIPTION,
    url: "https://mkultraman.com/guild",
    sameAs: GUILD_SITES.map((s) => s.url),
    member: GUILD_SITES.map((site) => ({
      "@type": site.schemaType === "Person" ? "Person" : "Organization",
      "@id": `${site.url}/#entity`,
      name: site.name,
      url: site.url,
    })),
  };
}

/**
 * Generate the full JSON-LD schema graph for a given site.
 *
 * The output includes:
 *   - The guild Organization (linking all sites)
 *   - The current site's standalone entity (Organization/Person/etc.)
 *   - The current site's WebSite entry (with SearchAction)
 *   - Lightweight WebSite entries for all other guild sites
 *
 * @param currentDomain - The domain of the site embedding this schema (e.g. "japanesejesus.com")
 */
export function generateGuildSchema(currentDomain: string): object {
  const currentSite = GUILD_SITES.find((s) => s.domain === currentDomain);

  return {
    "@context": "https://schema.org",
    "@graph": [
      // The guild as an Organization
      buildGuildOrganization(),

      // The current site gets a full standalone entity
      ...(currentSite ? [buildSiteEntity(currentSite)] : []),

      // WebSite entries for every site (current site gets SearchAction)
      ...GUILD_SITES.map((site) =>
        buildWebSiteEntry(site, site.domain === currentDomain)
      ),
    ],
  };
}

/**
 * Generate the JSON-LD as a string ready for injection into a <script> tag.
 */
export function generateGuildSchemaScript(currentDomain: string): string {
  const schema = generateGuildSchema(currentDomain);
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}
