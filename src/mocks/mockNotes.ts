export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export const mockNotes: Note[] = [
  {
    id: "1",
    title: "How React Server Components Work",
    body: "Server Components run only on the server. They never ship JavaScript to the browser. Use them for data fetching and static UI.",
    createdAt: "2024-03-01",
  },
  {
    id: "2",
    title: "Vercel AI SDK Basics",
    body: "The AI SDK simplifies streaming responses from LLMs. useChat handles the client state. The api route handles the server stream.",
    createdAt: "2024-03-02",
  },
  {
    id: "3",
    title: "pgvector for Semantic Search",
    body: "pgvector is a Postgres extension for storing vector embeddings. It enables similarity search using cosine distance. Supabase supports it natively.",
    createdAt: "2024-03-03",
  },
];
