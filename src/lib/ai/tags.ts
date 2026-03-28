import { generateText, Output } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function generateTags(note: string): Promise<string[]> {
  const prompt = `Here is the note: ${note}. Generate 2-3 lowercase tags, with no explanation`;

  const { output } = await generateText({
    model: openai("gpt-4.1-nano"),
    output: Output.object({
      schema: z.object({
        tags: z.array(z.string()),
      }),
    }),
    prompt,
  });

  return output.tags;
}
