import { getEnvVar } from "./utils/env.js";

export const Keys = {
  discordToken: getEnvVar("DISCORD_TOKEN"),
  discordClientToken: getEnvVar("DISCORD_CLIENT_ID"),
  discordGuildToken: getEnvVar("DISCORD_GUILD_ID"),
} as const;

export default Keys;
