/**
 * Guild — Canonical site registry
 *
 * Single source of truth for all sites in the network.
 * Used by JSON-LD schema generation, the /guild page, and cross-site linking.
 */

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
}

export const GUILD_NAME = "The Guild";

export const GUILD_DESCRIPTION =
  "A network of independent sites spanning music, food, travel, art, and storytelling — built across Japan and beyond.";

export const GUILD_SITES: GuildSite[] = [
  {
    name: "Japanese Jesus",
    domain: "japanesejesus.com",
    url: "https://japanesejesus.com",
    tagline: "The legend lives in Shingo.",
    description:
      "An interactive narrative about the real-world legend that Jesus survived the crucifixion, fled to Japan, and died at 106 in Shingo Village, Aomori Prefecture. Part editorial site, part alternate reality game.",
    category: "Storytelling",
    platform: "nextjs",
    repo: "tyrannosaurusjr/japanese-jesus",
  },
  {
    name: "Wild Meat Japan",
    domain: "wildmeatjapan.com",
    url: "https://wildmeatjapan.com",
    tagline: "Japan's wild game provider directory.",
    description:
      "The most comprehensive directory of wild game meat providers in Japan. Find verified processors, wholesalers, and retailers for deer, boar, bear, and more.",
    category: "Food",
    platform: "nextjs",
    repo: "tyrannosaurusjr/jibier-site",
  },
  {
    name: "Music In Japan",
    domain: "musicinjapan.com",
    url: "https://musicinjapan.com",
    tagline: "Live music across Japan.",
    description:
      "A guide to Japan's live music scene — venues, events, and the underground. Successor to Kaala Music, expanded nationwide.",
    category: "Music",
    platform: "nextjs",
    repo: "tyrannosaurusjr/kaala-v2",
  },
  {
    name: "Japan Craft Beer",
    domain: "japancraftbeer.com",
    url: "https://japancraftbeer.com",
    tagline: "Craft beer culture in Japan.",
    description:
      "Exploring Japan's craft beer scene — breweries, taprooms, and the people behind them.",
    category: "Food & Drink",
    platform: "nextjs",
    repo: "tyrannosaurusjr/japan-craft-beer",
  },
  {
    name: "MKULTRAMAN",
    domain: "mkultraman.com",
    url: "https://mkultraman.com",
    tagline: "Ultra Sauce and beyond.",
    description:
      "Home of Ultra Sauce and the MKULTRAMAN universe. Hot sauce, creative projects, and controlled chaos.",
    category: "Brand",
    platform: "wordpress",
  },
  {
    name: "Akiyazio",
    domain: "akiyaz.io",
    url: "https://akiyaz.io",
    tagline: "Akiyazio.",
    description:
      "Akiyazio — creative studio and digital presence.",
    category: "Creative",
    platform: "wordpress",
  },
  {
    name: "Kaala Music",
    domain: "kaalamusic.com",
    url: "https://kaalamusic.com",
    tagline: "Tokyo's underground, documented.",
    description:
      "The original platform for Tokyo's underground music scene. Predecessor to Music In Japan, still standing as an archive of the city's DIY culture.",
    category: "Music",
    platform: "wordpress",
  },
  {
    name: "Heather Dobbin",
    domain: "heatherdobbin.com",
    url: "https://heatherdobbin.com",
    tagline: "Art and illustration.",
    description:
      "Portfolio and creative work of Heather Dobbin — art, illustration, and visual storytelling.",
    category: "Art",
    platform: "squarespace",
  },
  {
    name: "The Delphi Network",
    domain: "thedelphinetwork.com",
    url: "https://thedelphinetwork.com",
    tagline: "The Delphi Network.",
    description:
      "The Delphi Network — a creative and strategic collective.",
    category: "Network",
    platform: "squarespace",
  },
  {
    name: "Thom Smith Art",
    domain: "thomsmithart.com",
    url: "https://thomsmithart.com",
    tagline: "Art by Thom Smith.",
    description:
      "Portfolio and works of Thom Smith — visual art and creative practice.",
    category: "Art",
    platform: "squarespace",
  },
];
