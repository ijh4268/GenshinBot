import { getEnvVar } from "./utils/env.js";

export const Keys = {
    discordToken: getEnvVar("DISCORD_TOKEN"),
} as const;

export default Keys;