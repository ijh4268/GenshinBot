import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits } from 'discord.js'

const client = new Client({
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ]
});

client.on("ready", (c) => {
    console.log(`✅ ${c.user?.username} is ready! 🚀`);
});

client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", async (message) => {
    if(message.author.bot) return;

    message.reply(message.content);
});

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return;

    if(interaction.commandName === "ping") {
        await interaction.reply("Pong!");
    }

    if(interaction.commandName === "echo") {
        const message = interaction.options.getString("message");
        
        await interaction.reply(message);
    }

    if(interaction.commandName === "get-characters") {
        const characters = await fetchGenshinCharacters();

        await interaction.reply(characters);
    }
});

async function fetchGenshinCharacters() {
    try {
        const response = await fetch("https://genshin.jmp.blue/characters");

        if(!response.ok) {
            throw new Error("Failed to fetch characters");
        }

        const characters = await response.json();
        console.log(`Characters: ${characters}`);

        return characters;

    } catch(error) {
        console.error(`Error fetching charactees: ${error}`);
    }
}