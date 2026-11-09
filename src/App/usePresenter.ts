import { useCallback, useEffect, useState } from "react";
import { prepareSearchResults } from "./prepareSearchResults";
import { readSearchUrl, replaceSearchUrl } from "./searchUrl";
import { useSearchRequest } from "./useSearchRequest";

export function usePresenter() {
  const [searchParams, setSearchParams] = useState(readSearchUrl);
  const { query, genre: requestedGenre, page: requestedPage } = searchParams;
  const term = query.trim();

  const syncRequestedSearchUrl = useCallback(
    (requestedQuery: string) => {
      replaceSearchUrl({
        query: requestedQuery,
        genre: requestedGenre,
        page: requestedPage,
      });
    },
    [requestedGenre, requestedPage],
  );
  const { search, scheduleSearch, retry } = useSearchRequest(
    term,
    syncRequestedSearchUrl,
  );

  const setQuery = (value: string) => {
    const nextTerm = value.trim();
    if (nextTerm === term) {
      setSearchParams((current) => ({ ...current, query: value }));
      return;
    }

    setSearchParams({ query: value, genre: null, page: 1 });
    scheduleSearch(nextTerm);
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

  useEffect(() => {
    if (search.status === "success" || search.status === "idle") {
      replaceSearchUrl({ query: term, genre: selectedGenre, page });
    }
  }, [search.status, term, page, selectedGenre]);

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
