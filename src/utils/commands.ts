import {
  Awaitable,
  Client,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

type LogMethod = (...args: unknown[]) => void;

export type CommandCallback = (props: CommandProps) => Awaitable<unknown>;

export type CommandMeta =
  | SlashCommandBuilder
  | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

export interface CommandProps {
  interaction: ChatInputCommandInteraction;
  client: Client;
  log: LogMethod;
}

export interface Command {
  meta: CommandMeta;
  callback: CommandCallback;
}

export interface CommandCategory {
  name: string;
  commands: Command[];
}

export function command(meta: CommandMeta, callback: CommandCallback) {
  return { meta, callback };
}

export function category(name: string, commands: Command[]): CommandCategory {
  return { name, commands };
}
