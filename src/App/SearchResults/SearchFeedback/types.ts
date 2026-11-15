export type SearchFeedbackProps =
  | { kind: "status"; message: string }
  | { kind: "error"; message: string; onRetry: () => void };
