import { tavily } from "@tavily/core";
import { WebSearchResultSchema, webSearchResultsSchema } from "./schemas";
import { env } from "./env";

const tvly = tavily({
  apiKey: env.TAVILY_API_KEY,
});

export async function webSearch(q: string) {
  const query = (q ?? "").trim();

  if (!query) return [];

  return searchTavily(query);
}

async function searchTavily(query: string) {
  if (!env.TAVILY_API_KEY) {
    throw new Error("TAVILY_API_KEY is missing");
  }

  try {
    const response = await tvly.search(query, {
      searchDepth: "basic",
      maxResults: 5,
      includeAnswer: false,
      includeImages: false,
    });

    const results = Array.isArray(response.results) ? response.results : [];

    const normalized = results.slice(0, 5).map((r) =>
      WebSearchResultSchema.parse({
        title: String(r.title ?? "").trim() || "Untitled",
        url: String(r.url ?? "").trim(),
        snippet: String(r.content ?? "")
          .trim()
          .slice(0, 220),
      }),
    );

    return webSearchResultsSchema.parse(normalized);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to search Tavily");
  }
}

