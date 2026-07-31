import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { env } from "./env";

export const selectiveModel = (): BaseChatModel => {
  switch (env.MODEL_PROVIDER) {
    case "gemini":
      return new ChatGoogleGenerativeAI({
        model: env.GEMINI_MODEL,
        temperature: 0,
        maxRetries: 2,
      });

    case "groq":
      return new ChatGroq({
        model: env.GROQ_MODEL,
        temperature: 0,
        maxRetries: 2,
        maxTokens: 100,
      });

    default:
      return new ChatGoogleGenerativeAI({
        model: env.GEMINI_MODEL,
        temperature: 0,
        maxRetries: 2,
      });
  }
};