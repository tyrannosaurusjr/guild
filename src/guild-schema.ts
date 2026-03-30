/**
 * Guild JSON-LD Schema Generator
 *
 * Generates structured data linking all guild sites via schema.org.
 * Uses Organization with multiple WebSite entries connected by `subOrganization`
 * and `isPartOf` relationships.
 *
 * Inject the output of `generateGuildSchema(currentDomain)` into each site's <head>.
 */

import { GUILD_NAME, GUILD_DESCRIPTION, GUILD_SITES, type GuildSite } from "./guild-config";

function siteToSchemaWebSite(site: GuildSite) {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    isPartOf: {
      "@id": "https://guild.network/#organization",
    },
  };
}

function siteToSameAs(site: GuildSite) {
  return site.url;
}

/**
 * Generate the full JSON-LD schema for a given site.
 * @param currentDomain - The domain of the site embedding this schema (e.g. "japanesejesus.com")
 */
export function generateGuildSchema(currentDomain: string): object {
  const currentSite = GUILD_SITES.find((s) => s.domain === currentDomain);

  return {
    "@context": "https://schema.org",
    "@graph": [
      // The guild as an Organization
      {
        "@type": "Organization",
        "@id": "https://guild.network/#organization",
        name: GUILD_NAME,
        description: GUILD_DESCRIPTION,
        sameAs: GUILD_SITES.map(siteToSameAs),
        subOrganization: GUILD_SITES.map((site) => ({
          "@type": "Organization",
          "@id": `${site.url}/#org`,
          name: site.name,
          url: site.url,
        })),
      },
      // Every guild site as a WebSite
      ...GUILD_SITES.map(siteToSchemaWebSite),
      // The current site with enhanced detail
      ...(currentSite
        ? [
            {
              "@type": "WebSite",
              "@id": `${currentSite.url}/#current`,
              name: currentSite.name,
              url: currentSite.url,
              description: currentSite.description,
              isPartOf: {
                "@id": "https://guild.network/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: `${currentSite.url}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ]
        : []),
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
