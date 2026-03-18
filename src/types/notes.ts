export type Note = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  embedding?: number[];
};

export type SearchType = "semantic" | "askAI";

export type SearchParam = {
  searchParams: Promise<{ search?: string; searchType?: SearchType }>;
};
