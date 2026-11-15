import { useState } from "react";
import type { SearchState } from "./types";
import { useDebouncedQueryCommit } from "./useDebouncedQueryCommit";
import { usePendingSearch } from "./usePendingSearch";

export const useSearchRequest = (initialQuery: string) => {
  const [draftQuery, setDraftQuery] = useState(initialQuery);
  const normalizedDraftQuery = draftQuery.trim();
  const [search, setSearch] = useState<SearchState>(() =>
    normalizedDraftQuery
      ? {
          status: "pending",
          request: { query: normalizedDraftQuery },
          previous: null,
        }
      : { status: "idle" },
  );
  const committedQuery = search.status === "idle" ? "" : search.request.query;

  useDebouncedQueryCommit(normalizedDraftQuery, committedQuery, setSearch);
  const isLoadingVisible = usePendingSearch(
    normalizedDraftQuery,
    search,
    setSearch,
  );

  const setQuery = (value: string) => {
    setDraftQuery(value);

    if (!value.trim()) {
      setSearch({ status: "idle" });
    }
  };

  const retry = () => {
    if (search.status === "error") {
      setSearch({ status: "pending", request: search.request, previous: null });
    }
  };

  return {
    search,
    query: draftQuery,
    setQuery,
    committedQuery,
    isLoadingVisible,
    retry,
  };
};
