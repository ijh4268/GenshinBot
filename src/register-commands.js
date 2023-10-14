import dotenv from 'dotenv';
dotenv.config();

import {REST, Routes, ApplicationCommandOptionType} from 'discord.js';

const commands = [
    {
        name: 'ping',
        description: 'Replies with pong!',
    },
    {
        name: 'echo',
        description: 'Replies with your message!',
        options: [
            {
                name: 'message',
                description: 'The message to echo',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'get-characters',
        description: 'Get all Genshin Impact characters',
    }
];

(async () => {
    const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.DISCORD_CLIENT_ID,
                process.env.DISCORD_GUILD_ID,
            ),
            {body: commands},
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();