import { type Dispatch, type SetStateAction, useEffect } from "react";
import type { SearchState } from "./types";

const DEBOUNCE_MS = 350;

export const useDebouncedQueryCommit = (
  draftQuery: string,
  committedQuery: string,
  setSearch: Dispatch<SetStateAction<SearchState>>,
) => {
  useEffect(() => {
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
  }, [draftQuery, committedQuery, setSearch]);
};
