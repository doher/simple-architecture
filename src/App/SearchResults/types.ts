import type { ResultRange, SearchStatus, Show } from "../types";
import type { PaginationProps } from "./Pagination/types";

export interface SearchResultsProps {
  status: Exclude<SearchStatus, "idle">;
  errorMessage: string;
  onRetry: () => void;
  genres: string[];
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
  pagination: PaginationProps;
  resultRange: ResultRange;
  shows: Show[];
}
