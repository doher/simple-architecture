import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { searchShows } from "./searchShows";
import type { SearchState } from "./types";

const LOADING_DELAY_MS = 200;

export const usePendingSearch = (
  draftQuery: string,
  search: SearchState,
  setSearch: Dispatch<SetStateAction<SearchState>>,
) => {
  const [visibleSearch, setVisibleSearch] = useState<SearchState | null>(null);
  const shouldLoadCommittedQuery =
    search.status === "pending" && search.request.query === draftQuery;

  useEffect(() => {
    if (!shouldLoadCommittedQuery) {
      return;
    }

    const { request } = search;
    const controller = new AbortController();
    const { signal } = controller;
    const loadingTimer = setTimeout(
      () => setVisibleSearch(search),
      LOADING_DELAY_MS,
    );

    void searchShows(request.query, signal).then((result) => {
      clearTimeout(loadingTimer);
      if (signal.aborted) {
        return;
      }

      setSearch((current) =>
        current === search ? { ...result, request } : current,
      );
    });

    return () => {
      clearTimeout(loadingTimer);
      controller.abort();
      setVisibleSearch(null);
    };
  }, [search, setSearch, shouldLoadCommittedQuery]);

  return shouldLoadCommittedQuery && visibleSearch === search;
};
