import type { SearchStatus } from "~/App/types";

export interface SearchFeedbackProps {
  status: Exclude<SearchStatus, "idle">;
  isEmpty: boolean;
  errorMessage: string;
  onRetry: () => void;
}
