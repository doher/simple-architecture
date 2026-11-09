export type Show = {
  id: number;
  name: string;
  url: string;
  genres: string[];
  premiered: string | null;
  image: { medium: string } | null;
  rating: { average: number | null };
};

export type SearchHit = { show: Show };

export type SearchOutcome =
  | { status: "success"; shows: Show[] }
  | { status: "error"; errorMessage: string };

export type SearchState =
  | { status: "idle" }
  | { status: "loading"; query: string; delay: number }
  | SearchOutcome;

export type SearchStatus = SearchState["status"];

export type SearchUrlState = {
  query: string;
  genre: string | null;
  page: number;
};

export type ResultRange = {
  first: number;
  last: number;
  total: number;
};
