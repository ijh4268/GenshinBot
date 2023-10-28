import { Client, GatewayIntentBits } from "discord.js";
import { registerEvents } from "./utils/index.js";
import Events from "./events/index.js";
import Keys from "./keys.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

registerEvents(client, Events);

client.login(Keys.discordToken).catch((err) => {
  console.error("[Login Error]", err);
  process.exit(1);
});
