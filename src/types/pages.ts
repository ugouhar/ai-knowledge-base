import { SearchType } from "./notes";

export type SearchParam = {
  searchParams: Promise<{ search?: string; searchType?: SearchType }>;
};
