/**
 * Guild Content Brief Generator
 *
 * Generates structured content briefs from the content matrix.
 * Use programmatically or via the build script to output briefs as JSON/Markdown.
 */

import { GUILD_SITES, type GuildSite } from "./guild-config";
import { CONTENT_MATRIX, type ContentPiece } from "./content-matrix";

export interface ContentBrief {
  /** Working title */
  title: string;
  /** Publishing site */
  publisher: GuildSite;
  /** Subject site being written about */
  subject: GuildSite;
  /** The angle connecting both sites */
  angle: string;
  /** Target keywords */
  keywords: string[];
  /** Suggested word count */
  wordCount: number;
  /** Current status */
  status: ContentPiece["status"];
  /** Internal link to embed (the subject's URL) */
  linkTo: string;
  /** Suggested anchor text variations */
  anchorTexts: string[];
  /** Publishing site's niche (for tone guidance) */
  publisherNiche: string;
  /** Subject site's niche */
  subjectNiche: string;
}

function findSite(domain: string): GuildSite | undefined {
  return GUILD_SITES.find((s) => s.domain === domain);
}

/**
 * Generate a full content brief from a content matrix entry.
 */
export function generateBrief(piece: ContentPiece): ContentBrief | null {
  const publisher = findSite(piece.publisher);
  const subject = findSite(piece.subject);
  if (!publisher || !subject) return null;

  return {
    title: piece.title,
    publisher,
    subject,
    angle: piece.angle,
    keywords: piece.keywords,
    wordCount: piece.wordCount,
    status: piece.status,
    linkTo: subject.url,
    anchorTexts: [
      subject.name,
      subject.domain,
      subject.tagline,
    ],
    publisherNiche: publisher.category,
    subjectNiche: subject.category,
  };
}

/**
 * Get all briefs for a specific publishing site.
 */
export function getBriefsForPublisher(domain: string): ContentBrief[] {
  return CONTENT_MATRIX
    .filter((p) => p.publisher === domain)
    .map(generateBrief)
    .filter((b): b is ContentBrief => b !== null);
}

/**
 * Get all briefs where a site is the subject (posts linking TO this site).
 */
export function getBriefsAbout(domain: string): ContentBrief[] {
  return CONTENT_MATRIX
    .filter((p) => p.subject === domain)
    .map(generateBrief)
    .filter((b): b is ContentBrief => b !== null);
}

/**
 * Get all briefs filtered by status.
 */
export function getBriefsByStatus(status: ContentPiece["status"]): ContentBrief[] {
  return CONTENT_MATRIX
    .filter((p) => p.status === status)
    .map(generateBrief)
    .filter((b): b is ContentBrief => b !== null);
}

/**
 * Summary stats for the content matrix.
 */
export function getContentStats() {
  const total = CONTENT_MATRIX.length;
  const planned = CONTENT_MATRIX.filter((p) => p.status === "planned").length;
  const drafted = CONTENT_MATRIX.filter((p) => p.status === "drafted").length;
  const published = CONTENT_MATRIX.filter((p) => p.status === "published").length;

  const byPublisher: Record<string, { planned: number; drafted: number; published: number }> = {};
  for (const piece of CONTENT_MATRIX) {
    if (!byPublisher[piece.publisher]) {
      byPublisher[piece.publisher] = { planned: 0, drafted: 0, published: 0 };
    }
    byPublisher[piece.publisher][piece.status]++;
  }

  return { total, planned, drafted, published, byPublisher };
}

/**
 * Render a brief as Markdown (for export or review).
 */
export function briefToMarkdown(brief: ContentBrief): string {
  return `# ${brief.title}

**Publisher:** ${brief.publisher.name} (${brief.publisher.domain})
**About:** ${brief.subject.name} (${brief.subject.domain})
**Status:** ${brief.status}
**Word count:** ${brief.wordCount}

## Angle

${brief.angle}

## Keywords

${brief.keywords.map((k) => `- ${k}`).join("\n")}

## Link

- **URL:** ${brief.linkTo}
- **Anchor text options:** ${brief.anchorTexts.map((a) => `"${a}"`).join(", ")}

## Tone guidance

Write from the perspective of **${brief.publisher.name}** (${brief.publisherNiche}).
The subject is **${brief.subject.name}** (${brief.subjectNiche}).
The post should be genuinely useful to ${brief.publisher.name}'s audience while
naturally linking to ${brief.subject.name}.
`;
}
