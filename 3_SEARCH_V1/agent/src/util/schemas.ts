import z from "zod";

export const WebSearchResultSchema = z.object({
  title: z.string().min(1),
  url: z.url(),
  snippet: z.string().optional().default("")
});

export const OpenUrlOutputSchema = z.object({
  url: z.url(),
  content: z.string().min(1)
});

export const summarizeInputSchema = z.object({
  text:z.string().min(50,"need a more text to summarize ask with some additional detailed")
})
export const summarizeOutputSchema = z.object({
  summery:z.string().min(1)
})


export const webSearchResultsSchema = z.array(WebSearchResultSchema).max(100);
export type WebSearchResultSchema = z.infer<typeof WebSearchResultSchema>