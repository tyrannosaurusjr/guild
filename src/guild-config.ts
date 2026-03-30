/**
 * Guild — Canonical site registry
 *
 * Single source of truth for all sites in the network.
 * Used by JSON-LD schema generation, the /guild page, and cross-site linking.
 */

/** Schema.org type for the site's primary entity */
export type SiteSchemaType =
  | "Organization"
  | "ProfessionalService"
  | "Person"
  | "MusicGroup"
  | "LocalBusiness"
  | "WebSite";

export interface SiteSocials {
  instagram?: string;
  twitter?: string;
  youtube?: string;
  facebook?: string;
  linkedin?: string;
  bandcamp?: string;
  spotify?: string;
  github?: string;
}

export interface GuildSite {
  /** Display name */
  name: string;
  /** Live domain (no protocol) */
  domain: string;
  /** Full URL */
  url: string;
  /** One-line tagline */
  tagline: string;
  /** 2-3 sentence description */
  description: string;
  /** Primary topic/category */
  category: string;
  /** Platform: nextjs | wordpress | squarespace */
  platform: "nextjs" | "wordpress" | "squarespace";
  /** GitHub repo (if applicable) */
  repo?: string;

  // --- Rich per-site schema fields ---

  /** Schema.org type for the site's primary entity */
  schemaType: SiteSchemaType;
  /** URL to the site's logo (square, min 112x112) */
  logo?: string;
  /** Social profile URLs */
  socials?: SiteSocials;
  /** Founder or primary person name */
  founder?: string;
  /** Location string (e.g. "Tokyo, Japan") */
  location?: string;
  /** ISO 8601 founding date (e.g. "2019") */
  foundingDate?: string;
  /** Contact email (public-facing) */
  email?: string;
  /** Primary language (BCP 47, defaults to "en") */
  language?: string;
  /** Keywords / topics for the site */
  keywords?: string[];
}

export const GUILD_NAME = "The Guild";

export const GUILD_DESCRIPTION =
  "A network of independent sites spanning music, food, travel, art, and storytelling — built across Japan and beyond.";

export const GUILD_SITES: GuildSite[] = [
  {
    name: "Japanese Jesus",
    domain: "japanesejesus.com",
    url: "https://japanesejesus.com",
    tagline: "Alternate reality game meets Japanese legend.",
    description:
      "Explores the real-world legend that Jesus survived crucifixion and died in Shingo Village, Japan. Functions as both an editorial site and multi-layer ARG (alternate reality game) with hidden puzzles embedded throughout the user experience.",
    category: "Storytelling",
    platform: "nextjs",
    repo: "tyrannosaurusjr/japanese-jesus",
    schemaType: "WebSite",
    location: "Shingo Village, Aomori, Japan",
    foundingDate: "2024",
    language: "en",
    keywords: ["japanese jesus", "shingo village", "ARG", "alternate reality game", "japan legend", "aomori"],
  },
  {
    name: "Wild Meat Japan",
    domain: "wildmeatjapan.com",
    url: "https://wildmeatjapan.com",
    tagline: "Japan's wild game provider directory.",
    description:
      "The most comprehensive directory of wild game meat providers in Japan. Connects hunters, processors, wholesalers, and retailers for deer, boar, bear, and other gibier across all prefectures with verified business listings.",
    category: "Food",
    platform: "nextjs",
    repo: "tyrannosaurusjr/jibier-site",
    schemaType: "WebSite",
    location: "Japan",
    foundingDate: "2024",
    language: "en",
    keywords: ["gibier", "wild game", "venison", "boar meat", "japan hunting", "jibier"],
  },
  {
    name: "Music In Japan",
    domain: "musicinjapan.com",
    url: "https://musicinjapan.com",
    tagline: "Tokyo's underground, no filter.",
    description:
      "Born from 15 years of scene experience, tracks 400+ monthly shows across 22 underground venues. Offers curated picks, advance ticket access, and tour booking for Tokyo's metal, punk, hardcore, and noise scenes.",
    category: "Music",
    platform: "nextjs",
    repo: "tyrannosaurusjr/kaala-v2",
    schemaType: "Organization",
    location: "Tokyo, Japan",
    foundingDate: "2024",
    language: "en",
    keywords: ["tokyo music", "underground music japan", "live music tokyo", "metal", "punk", "hardcore", "noise"],
    socials: {
      instagram: "https://www.instagram.com/musicinjapan",
    },
  },
  {
    name: "Japan Craft Beer",
    domain: "japancraftbeer.com",
    url: "https://japancraftbeer.com",
    tagline: "Business intelligence for Japan's craft brewing.",
    description:
      "Comprehensive intelligence platform tracking 800+ breweries across Japan's craft beer market. Provides digital presence audits, business analysis, and automated data collection via specialized agent swarm system.",
    category: "Food & Drink",
    platform: "nextjs",
    repo: "tyrannosaurusjr/japan-craft-beer",
    schemaType: "WebSite",
    location: "Japan",
    foundingDate: "2024",
    language: "en",
    keywords: ["japan craft beer", "japanese brewery", "craft brewing japan", "brewery directory"],
  },
  {
    name: "MKULTRAMAN",
    domain: "mkultraman.com",
    url: "https://mkultraman.com",
    tagline: "Digital strategy, systems, and execution by design.",
    description:
      "Creative consultancy specializing in audacious brand building through minimalist design and unconventional digital strategy. Based in Tokyo, focuses on web design, SEO optimization, and strategic consulting informed by Japan market experience.",
    category: "Strategy",
    platform: "wordpress",
    schemaType: "ProfessionalService",
    location: "Tokyo, Japan",
    foundingDate: "2020",
    language: "en",
    keywords: ["digital strategy", "brand consulting", "web design", "SEO", "tokyo consultancy"],
    socials: {
      instagram: "https://www.instagram.com/mkultraman",
    },
  },
  {
    name: "Akiyaz",
    domain: "akiyaz.io",
    url: "https://akiyaz.io",
    tagline: "Build Japan's future with Akiyaz.",
    description:
      "Rural revitalization platform transforming vacant spaces into vibrant communities. Helps investors and expats acquire akiya (abandoned homes) with comprehensive consulting, visa guidance, and renovation support to address Japan's depopulation challenge.",
    category: "Real Estate",
    platform: "wordpress",
    schemaType: "ProfessionalService",
    location: "Japan",
    language: "en",
    keywords: ["akiya", "abandoned house japan", "rural revitalization", "japan real estate", "japan investment"],
  },
  {
    name: "Kaala Music",
    domain: "kaalamusic.com",
    url: "https://kaalamusic.com",
    tagline: "Japan's underground music scene finder.",
    description:
      "Direct access to Japan's underground music ecosystem through band discovery, venue mapping, and curated content. Predecessor to Music In Japan, solving the invisibility problem of Japanese underground music for international and domestic newcomers.",
    category: "Music",
    platform: "wordpress",
    schemaType: "Organization",
    location: "Tokyo, Japan",
    foundingDate: "2010",
    language: "en",
    keywords: ["kaala", "tokyo underground", "japanese punk", "japanese metal", "live music tokyo"],
    socials: {
      instagram: "https://www.instagram.com/kaaboron",
      youtube: "https://www.youtube.com/@kaaboron",
    },
  },
  {
    name: "Heather Dobbin",
    domain: "heatherdobbin.com",
    url: "https://heatherdobbin.com",
    tagline: "Elevate your leadership potential.",
    description:
      "Tokyo-based executive coaching focusing on sustainable leadership through somatic techniques, mindfulness, and cognitive-behavioral approaches. Specializes in burnout recovery, women's leadership, and authentic professional development for global executives.",
    category: "Coaching",
    platform: "squarespace",
    schemaType: "Person",
    location: "Tokyo, Japan",
    language: "en",
    keywords: ["executive coaching", "leadership development", "burnout recovery", "women leadership", "tokyo coach"],
  },
  {
    name: "The Delphi Network",
    domain: "thedelphinetwork.com",
    url: "https://thedelphinetwork.com",
    tagline: "Elite executive networking in Japan.",
    description:
      "Tokyo's premier networking platform for foreign professionals navigating Japan's business landscape. Provides curated peer networks, business intelligence, exclusive events, and relationship-building for country managers and international leaders.",
    category: "Network",
    platform: "squarespace",
    schemaType: "Organization",
    location: "Tokyo, Japan",
    language: "en",
    keywords: ["executive networking japan", "business network tokyo", "expat professionals japan"],
  },
  {
    name: "Thom Smith Art",
    domain: "thomsmithart.com",
    url: "https://thomsmithart.com",
    tagline: "Unique artwork rooted in underground culture.",
    description:
      "Tokyo-based illustration and design practice specializing in album artwork, posters, and merchandise graphics. Offers commission services, risograph prints, and a portfolio spanning drawing, printmaking, and photography with underground music scene connections.",
    category: "Art",
    platform: "squarespace",
    schemaType: "Person",
    location: "Tokyo, Japan",
    language: "en",
    keywords: ["illustration", "album artwork", "risograph", "tokyo artist", "music art", "poster design"],
    socials: {
      instagram: "https://www.instagram.com/thomsmithart",
    },
  },
];
