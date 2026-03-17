import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { Note } from "@/types/notes";

function formatNotes(notes: Note[]) {
  return notes
    .map((note, index) => `Note ${index + 1}: ${note.title}\n${note.body}`)
    .join("\n\n");
}

export async function askQuestionWithContext(
  question: string,
  context: Note[],
): Promise<string> {
  const formattedNotes = formatNotes(context);

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),

    // System prompt: defines behavior/role
    system:
      'You are a helpful assistant. Only answer from the provided notes. If the answer is not in the notes, say "I don\'t know".',

    // User message: contains the actual notes + question
    prompt: `
    Notes:
    ${formattedNotes}

    Question: ${question}
  `,
  });

  return text;
}
