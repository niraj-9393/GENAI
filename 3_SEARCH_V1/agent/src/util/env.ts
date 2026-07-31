import { z } from "zod";
import {config} from "dotenv"
config()
const EnvSchema = z.object({
  MODEL_PROVIDER: z.string().default("gemini"),
  GOOGLE_API_KEY: z.string(),
  GROQ_API_KEY: z.string(),
  TAVILY_API_KEY: z.string().optional(),
  PORT: z.string().default("5000"),
  ALLOWED_ORIGIN: z.string().default("http://localhost:3000"),
  GEMINI_MODEL: z.string().default("gemini-2.0-flash-lite"),
  GROQ_MODEL: z.string().default("llama-3.1-8b-instant"),
  SEARCH_PROVIDERt: z.string().default("tavily"),
});

export const env = EnvSchema.parse(process.env);