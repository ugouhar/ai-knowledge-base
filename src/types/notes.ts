export type Note = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  embedding?: number[];
  tags: string[] | null;
};

export type SearchType = "semantic" | "askAI";
