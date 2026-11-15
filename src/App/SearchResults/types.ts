import type { ResultRange, SearchStatus, Show } from "../types";
import type { GenreFiltersProps } from "./GenreFilters/types";
import type { PaginationProps } from "./Pagination/types";

export interface SearchResultsProps {
  status: Exclude<SearchStatus, "idle">;
  errorMessage: string;
  onRetry: () => void;
  genreFilters: GenreFiltersProps;
  pagination: PaginationProps;
  resultRange: ResultRange;
  shows: Show[];
}
