import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, "..", "..", ".env") });

import { REST, Routes, APIUser } from "discord.js";
import commands from "../commands/index.js";
import Keys from "../keys.js";

const body = commands
  .map(({ commands }) => commands.map(({ meta }) => meta))
  .flat();

const rest = new REST({ version: "10" }).setToken(Keys.discordToken);

async function main() {
  const currentUser = (await rest.get(Routes.user())) as APIUser;

  const endpoint =
    process.env.NODE_ENV === "production"
      ? Routes.applicationCommands(currentUser.id)
      : Routes.applicationGuildCommands(currentUser.id, Keys.discordGuildToken);

  await rest.put(endpoint, { body });

  return currentUser;
}

main()
  .then((user) => {
    const tag = `${user?.username}#${user?.discriminator}`;
    const response =
      process.env.NODE_ENV === "production"
        ? `Successfully registered commands in production as ${tag}`
        : `Successfully registered commands for development as ${tag}`;

    console.log(response);
  })
  .catch(console.error);
