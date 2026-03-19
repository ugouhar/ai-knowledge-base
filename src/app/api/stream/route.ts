import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = streamText({
      model: openai("gpt-4.1-nano"),

      // System prompt: defines behavior/role
      system:
        'You are a helpful assistant. Only answer from the provided notes. If the answer is not in the notes, say "I don\'t know".',

      // User message: contains the actual notes + question
      prompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    return new Response("Failed to stream text", { status: 500 });
  }
}
