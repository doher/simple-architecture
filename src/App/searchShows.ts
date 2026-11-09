import type { SearchHit, SearchOutcome } from "./types";

const SEARCH_URL = "https://api.tvmaze.com/search/shows";
const SEARCH_ERROR = "Не удалось загрузить сериалы. Попробуйте ещё раз.";

export async function searchShows(
  query: string,
  signal: AbortSignal,
): Promise<SearchOutcome> {
  try {
    const url = new URL(SEARCH_URL);
    url.searchParams.set("q", query);

    const response = await fetch(url, { signal });
    if (!response.ok) {
      return {
        status: "error",
        errorMessage:
          response.status === 429
            ? "Слишком много запросов. Попробуйте через несколько секунд."
            : SEARCH_ERROR,
      };
    }

    const hits: SearchHit[] = await response.json();
    return { status: "success", shows: hits.map(({ show }) => show) };
  } catch {
    return { status: "error", errorMessage: SEARCH_ERROR };
  }
}
