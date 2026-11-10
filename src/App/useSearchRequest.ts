import { useEffect, useState } from "react";
import { searchShows } from "./searchShows";
import type { SearchState } from "./types";

const DEBOUNCE_MS = 350;

export function useSearchRequest(
  draftQuery: string,
  onQueryCommit: () => void,
) {
  const [search, setSearch] = useState<SearchState>(() =>
    draftQuery ? { status: "loading", query: draftQuery } : { status: "idle" },
  );
  const committedQuery = search.status === "idle" ? "" : search.query;
  const request =
    search.status === "loading" && committedQuery === draftQuery
      ? search
      : null;

  useEffect(() => {
    if (!draftQuery || draftQuery === committedQuery) return;

    const timer = window.setTimeout(() => {
      onQueryCommit();
      setSearch({ status: "loading", query: draftQuery });
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [draftQuery, committedQuery, onQueryCommit]);

  useEffect(() => {
    if (!request) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      const outcome = await searchShows(request.query, controller.signal);
      if (controller.signal.aborted) return;

      setSearch((current) =>
        current === request ? { ...outcome, query: request.query } : current,
      );
    }, 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [request]);

  const clearSearch = () => {
    setSearch({ status: "idle" });
  };

  const retry = () => {
    if (search.status === "error") {
      setSearch({ status: "loading", query: search.query });
    }
  };

  return { search, committedQuery, clearSearch, retry };
}
