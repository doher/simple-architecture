import { useEffect } from "react";
import { replaceSearchUrl } from "./replaceSearchUrl";
import type { SearchUrlState } from "./types";

export const useSyncSearchUrl = ({ query, genre, page }: SearchUrlState) => {
  useEffect(() => {
    replaceSearchUrl({ query, genre, page });
  }, [query, genre, page]);
};
