import type { SearchFeedbackProps } from "./SearchFeedback/types";
import type { SearchResultsProps } from "./types";

export const usePresenter = ({
  status,
  errorMessage,
  onRetry,
  resultRange: { total },
}: SearchResultsProps): SearchFeedbackProps | null => {
  if (status === "error") {
    return { kind: "error", message: errorMessage, onRetry };
  }

  if (status === "loading") {
    return { kind: "status", message: "Ищем сериалы…" };
  }

  if (status === "success" && total === 0) {
    return {
      kind: "status",
      message: "Ничего не найдено. Попробуйте другое название.",
    };
  }

  return null;
};
