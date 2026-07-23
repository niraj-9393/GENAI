import { loadEnv } from "./env";

loadEnv();

type Provider = "openai" | "gemini" | "groq";

type HelloOutput = {
  ok: true;
  provider: Provider;
  model: string;
  message: string;
};

type GeminiGenerateContent = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

 async function helloGemini(): Promise<HelloOutput> {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error("Google Gemini API key is not present");
  }

  const model = "gemini-3.5-flash";


  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: "Say hello in one word ",
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as GeminiGenerateContent;

  const text =
    json.candidates?.[0]?.content?.parts?.[0]?.text ??
    "Hello from Niraj";

  return {
    ok: true,
    provider: "gemini",
    model,
    message: text.trim(),
  };
}
export default helloGemini;
