import { SlashCommandBuilder } from "discord.js";
import {
  AutocompleteCallback,
  CommandCallback,
  command,
} from "../../utils/commands.js";

let cachedCharacterList: string[] | undefined;

const meta = new SlashCommandBuilder()
  .setName("character-info")
  .setDescription("Get information about a Genshin Impact character")
  .addStringOption((option) =>
    option
      .setName("character")
      .setDescription("The Genshin Impact character to get information about")
      .setAutocomplete(true)
      .setRequired(true)
  );

const autocomplete: AutocompleteCallback = async ({ interaction }) => {
  const focusedValue = interaction.options.getFocused();
  if (!cachedCharacterList) cachedCharacterList = await getCharacterList();
  const characterList = cachedCharacterList;
  const choices = characterList.map((character) => ({
    name: formatCharacterName(character),
    value: character,
  }));
  const filteredChoices = choices.filter((choice) =>
    choice.name.toLowerCase().startsWith(focusedValue.toLowerCase())
  );
  filteredChoices.length > 25
    ? await interaction.respond(filteredChoices.slice(0, 25))
    : await interaction.respond(filteredChoices);
};

const callback: CommandCallback = async ({ interaction }) => {
  interaction.reply("Not implemented yet!");
};

export default command(meta, callback, autocomplete);

async function getCharacterList(): Promise<string[]> {
  try {
    const characterListReponse = await fetch(
      "https://genshin.jmp.blue/characters"
    );
    const characterList = await characterListReponse.json();
    return characterList;
  } catch (error) {
    throw new Error("Failed to fetch character list");
  }
}

function formatCharacterName(name: string): string {
  return name
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
