import { useEffect, useState } from "react";
import { searchShows } from "./searchShows";
import type { SearchState } from "./types";

const DEBOUNCE_MS = 350;

export function useSearchRequest(
  query: string,
  onRequestStart: (query: string) => void,
) {
  const [search, setSearch] = useState<SearchState>(() =>
    query ? { status: "loading", query, delay: 0 } : { status: "idle" },
  );
  const request = search.status === "loading" ? search : null;

  useEffect(() => {
    if (!request) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      onRequestStart(request.query);
      const outcome = await searchShows(request.query, controller.signal);
      if (controller.signal.aborted) return;

      setSearch((current) => (current === request ? outcome : current));
    }, request.delay);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [request, onRequestStart]);

  const scheduleSearch = (nextQuery: string) => {
    setSearch(
      nextQuery
        ? { status: "loading", query: nextQuery, delay: DEBOUNCE_MS }
        : { status: "idle" },
    );
  };

  const retry = () => {
    if (search.status === "error") {
      setSearch({ status: "loading", query, delay: 0 });
    }
  };

  return { search, scheduleSearch, retry };
}
