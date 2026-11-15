import { useState } from "react";
import { readSearchUrl } from "./readSearchUrl";
import type { SearchStatus } from "./types";
import { useSearchRequest } from "./useSearchRequest";
import { useSearchResults } from "./useSearchResults";
import { useSearchSelection } from "./useSearchSelection";
import { useSyncSearchUrl } from "./useSyncSearchUrl";

export const usePresenter = () => {
  const [initialSearch] = useState(readSearchUrl);
  const { search, query, setQuery, committedQuery, isLoadingVisible, retry } =
    useSearchRequest(initialSearch.query);
  const displayedSearch =
    search.status === "pending" && !isLoadingVisible
      ? (search.previous ?? search)
      : search;
  const status: SearchStatus = isLoadingVisible
    ? "loading"
    : displayedSearch.status;

  const request = search.status === "idle" ? null : search.request;
  const displayedRequest =
    displayedSearch.status === "idle" ? null : displayedSearch.request;
  const { committedSelection, displayedSelection, selectGenre, selectPage } =
    useSearchSelection(initialSearch, request, displayedRequest);
  const results = useSearchResults(
    displayedSearch,
    displayedSelection.genre,
    displayedSelection.page,
  );

  const isSearchSuccessful = search.status === "success";
  useSyncSearchUrl({
    query: committedQuery,
    genre: isSearchSuccessful
      ? results.selectedGenre
      : committedSelection.genre,
    page: isSearchSuccessful ? results.page : committedSelection.page,
  });

  return {
    ...results,
    query,
    setQuery,
    status,
    errorMessage: search.status === "error" ? search.errorMessage : "",
    retry,
    selectGenre,
    goToPage: (page: number) => selectPage(page, results.pageCount),
  };
};
