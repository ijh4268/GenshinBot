import { SlashCommandBuilder } from "discord.js";
import { command } from "../../utils/index.js";

const meta = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with pong!")
  .addStringOption((option) =>
    option
      .setName("message")
      .setDescription("The message to reply with")
      .setMinLength(1)
      .setMaxLength(2000)
      .setRequired(false)
  );

export default command(meta, ({ interaction }) => {
  const message = interaction.options.getString("message");
  return interaction.reply({
    ephemeral: true,
    content: message ?? "Pong! 🎾",
  });
});
