/**
 * @mkultraman/guild
 *
 * Shared config and schema generator for the guild network.
 *
 * Usage:
 *   import { GUILD_SITES, generateGuildSchema } from "@mkultraman/guild"
 */

export {
  GUILD_NAME,
  GUILD_DESCRIPTION,
  GUILD_SITES,
  type GuildSite,
  type SiteSocials,
  type SiteSchemaType,
} from "./guild-config";

export {
  generateGuildSchema,
  generateGuildSchemaScript,
} from "./guild-schema";
