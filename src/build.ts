/**
 * Build script — generates dist/guild.html (self-contained static page)
 * and dist/guild-schema.json (pre-built schema for each site).
 *
 * Run: npx tsx src/build.ts
 */

import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { GUILD_NAME, GUILD_DESCRIPTION, GUILD_SITES } from "./guild-config";
import { generateGuildSchema } from "./guild-schema";

const ROOT = dirname(__dirname);
const DIST = join(ROOT, "dist");
mkdirSync(DIST, { recursive: true });

// --- Read CSS ---
const css = readFileSync(join(ROOT, "src", "guild.css"), "utf-8");

// --- Build static HTML (uses __CURRENT_DOMAIN__ as a placeholder) ---
function buildGuildHTML(): string {
  const siteCards = GUILD_SITES.map(
    (site) => `
      <a href="${site.url}" class="guild-card" target="_blank" rel="noopener noreferrer">
        <div class="guild-card-header">
          <h2 class="guild-card-name">${site.name}</h2>
          <span class="guild-card-domain">${site.domain}</span>
        </div>
        <p class="guild-card-tagline">${site.tagline}</p>
        <p class="guild-card-description">${site.description}</p>
        <div class="guild-card-meta">
          <span class="guild-card-tag">${site.category}</span>
          <span class="guild-card-tag">${site.platform}</span>
        </div>
      </a>`
  ).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, follow">
  <title>${GUILD_NAME}</title>
  <meta name="description" content="${GUILD_DESCRIPTION}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>${css}</style>
  <script>
    // Guild: hide the card for the current site
    document.addEventListener("DOMContentLoaded", function() {
      var host = window.location.hostname.replace(/^www\\./, "");
      var cards = document.querySelectorAll(".guild-card");
      cards.forEach(function(card) {
        var domain = card.querySelector(".guild-card-domain");
        if (domain && domain.textContent.trim() === host) {
          card.style.display = "none";
        }
      });
    });
  </script>
</head>
<body class="guild-page">
  <div class="guild-container">
    <header class="guild-header">
      <h1 class="guild-title">${GUILD_NAME}</h1>
      <p class="guild-description">${GUILD_DESCRIPTION}</p>
    </header>

    <div class="guild-grid">
${siteCards}
    </div>

    <footer class="guild-footer">
      ${GUILD_SITES.length} sites &middot; ${GUILD_NAME}
    </footer>
  </div>
</body>
</html>`;
}

// --- Write dist/guild.html ---
writeFileSync(join(DIST, "guild.html"), buildGuildHTML(), "utf-8");
console.log("Built dist/guild.html");

// --- Write per-site schema JSON files ---
const schemasDir = join(DIST, "schemas");
mkdirSync(schemasDir, { recursive: true });

for (const site of GUILD_SITES) {
  const schema = generateGuildSchema(site.domain);
  const filename = site.domain.replace(/\./g, "-") + ".json";
  writeFileSync(join(schemasDir, filename), JSON.stringify(schema, null, 2), "utf-8");
}
console.log(`Built ${GUILD_SITES.length} schema files in dist/schemas/`);

// --- Write a single combined schema snippet file for easy embedding ---
const snippetsDir = join(DIST, "snippets");
mkdirSync(snippetsDir, { recursive: true });

for (const site of GUILD_SITES) {
  const schema = generateGuildSchema(site.domain);
  const snippet = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  const filename = site.domain.replace(/\./g, "-") + ".html";
  writeFileSync(join(snippetsDir, filename), snippet, "utf-8");
}
console.log(`Built ${GUILD_SITES.length} snippet files in dist/snippets/`);
