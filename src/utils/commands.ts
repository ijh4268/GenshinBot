import {
  Awaitable,
  Client,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  SlashCommandBuilder,
} from "discord.js";

type LogMethod = (...args: unknown[]) => void;

export type CommandCallback = (props: CommandProps) => Awaitable<unknown>;
export type AutocompleteCallback = (props: AutocompleteProps) => Awaitable<unknown>;

export type CommandMeta =
  | SlashCommandBuilder
  | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

export interface CommandProps {
  interaction: ChatInputCommandInteraction;
  client: Client;
  log: LogMethod;
}

export interface AutocompleteProps {
  interaction: AutocompleteInteraction;
  client: Client;
  log: LogMethod;
}

export interface Command {
  meta: CommandMeta;
  callback: CommandCallback;
  autocomplete?: AutocompleteCallback;
}

export interface CommandCategory {
  name: string;
  commands: Command[];
}

export function command(meta: CommandMeta, callback: CommandCallback, autocomplete?: AutocompleteCallback) {
  return { meta, callback, autocomplete };
}

export function category(name: string, commands: Command[]): CommandCategory {
  return { name, commands };
}
