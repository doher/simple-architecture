import { useCallback, useEffect, useState } from "react";
import { prepareSearchResults } from "./prepareSearchResults";
import { readSearchUrl, replaceSearchUrl } from "./searchUrl";
import { useSearchRequest } from "./useSearchRequest";

export function usePresenter() {
  const [searchParams, setSearchParams] = useState(readSearchUrl);
  const { query, genre: requestedGenre, page: requestedPage } = searchParams;
  const term = query.trim();

  const resetSelection = useCallback(() => {
    setSearchParams((current) => ({ ...current, genre: null, page: 1 }));
  }, []);
  const { search, committedQuery, clearSearch, retry } = useSearchRequest(
    term,
    resetSelection,
  );

  const setQuery = (value: string) => {
    if (value.trim()) {
      setSearchParams((current) => ({ ...current, query: value }));
      return;
    }

    setSearchParams({ query: value, genre: null, page: 1 });
    clearSearch();
  };

  const selectGenre = (genre: string | null) => {
    setSearchParams((current) => ({ ...current, genre, page: 1 }));
  };

  const results = prepareSearchResults(
    search.status === "success" ? search.shows : [],
    requestedGenre,
    requestedPage,
  );
  const { page, pageCount, selectedGenre } = results;
  const urlGenre = search.status === "success" ? selectedGenre : requestedGenre;
  const urlPage = search.status === "success" ? page : requestedPage;

  useEffect(() => {
    replaceSearchUrl({ query: committedQuery, genre: urlGenre, page: urlPage });
  }, [committedQuery, urlGenre, urlPage]);

  const goToPage = (nextPage: number) => {
    if (Number.isInteger(nextPage) && nextPage >= 1 && nextPage <= pageCount) {
      setSearchParams((current) => ({ ...current, page: nextPage }));
    }
  };

  return {
    ...results,
    query,
    setQuery,
    status: search.status,
    errorMessage: search.status === "error" ? search.errorMessage : "",
    retry,
    selectGenre,
    goToPage,
  };
}
