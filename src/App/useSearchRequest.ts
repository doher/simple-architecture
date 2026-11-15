import { useEffect, useState } from "react";
import type { SearchState } from "./types";
import { usePendingSearch } from "./usePendingSearch";

const DEBOUNCE_MS = 350;

export const useSearchRequest = (draftQuery: string) => {
  const [search, setSearch] = useState<SearchState>(() =>
    draftQuery
      ? { status: "pending", request: { query: draftQuery }, previous: null }
      : { status: "idle" },
  );
  const committedQuery = search.status === "idle" ? "" : search.request.query;

  useEffect(() => {
    // Committing a query changes committedQuery and reruns this effect.
    if (draftQuery === committedQuery) {
      return;
    }

    const timer = setTimeout(() => {
      setSearch((current) => {
        const previous =
          current.status === "pending" ? current.previous : current;
        const hasPreviousResults =
          previous?.status === "success" && previous.shows.length > 0;

        return {
          status: "pending",
          request: { query: draftQuery },
          previous: hasPreviousResults ? previous : null,
        };
      });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [draftQuery, committedQuery]);

  const isLoadingVisible = usePendingSearch(draftQuery, search, setSearch);

  const clearSearch = () => {
    setSearch({ status: "idle" });
  };

  const retry = () => {
    if (search.status === "error") {
      setSearch({ status: "pending", request: search.request, previous: null });
    }
  };

  return { search, committedQuery, isLoadingVisible, clearSearch, retry };
};
