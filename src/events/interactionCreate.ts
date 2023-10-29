import commands from "../commands/index.js";
import { Command } from "../utils/index.js";
import { EditReply, event, Events, Reply } from "../utils/index.js";

const allCommands = commands.map(({ commands }) => commands).flat();
const allCommandsMap = new Map<string, Command>(
  allCommands.map((command) => [command.meta.name, command])
);

export default event(
  Events.InteractionCreate,
  async ({ log, client }, interaction) => {
    if (interaction.isChatInputCommand()) {
      try {
        const command = allCommandsMap.get(interaction.commandName);
        if (!command) throw new Error("Command not found...");

        await command.callback({
          interaction,
          client,
          log(...args) {
            log(`[Command: ${command.meta.name}]`, ...args);
          },
        });
      } catch (error) {
        log("[Commmand Error]", error);

        if (interaction.deferred)
          return await interaction.editReply(
            EditReply.error("Something went wrong 🙁")
          );

        return await interaction.reply(Reply.error("Something went wrong 🙁"));
      }
    }
    else if (interaction.isAutocomplete()) {
      const command = allCommandsMap.get(interaction.commandName);
      if (!command) throw new Error("Command not found...");

      try {
        await command.autocomplete?.({
          interaction,
          client,
          log(...args) {
            log(`[Autocomplete: ${command.meta.name}]`, ...args);
          },
        });
      } catch (error) {
        log("[Autocomplete Error]", error);
      }
    }
  }
);
