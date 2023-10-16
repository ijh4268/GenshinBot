import { config } from "dotenv";
import { resolve } from "path";

const EnvFile = process.env.NODE_ENV === "development" ? ".env.dev" : ".env";
const EnvFilePath = resolve(process.cwd(), EnvFile);

config({ path: EnvFilePath });

console.log(process.env.TEST);

export function getEnvVar(name: string, fallback?: string): string {
    const value = process.env[name] ?? fallback;
    if(!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }

    return value;
}