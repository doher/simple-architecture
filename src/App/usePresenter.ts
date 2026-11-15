import { useState } from "react";
import { readSearchUrl } from "./readSearchUrl";
import type { SearchStatus } from "./types";
import { useSearchRequest } from "./useSearchRequest";
import { useSearchResults } from "./useSearchResults";
import { useSyncSearchUrl } from "./useSyncSearchUrl";

const DEFAULT_SELECTION = { genre: null, page: 1 };

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
  const [selection, setSelection] = useState(() => ({
    request,
    genre: initialSearch.genre,
    page: initialSearch.page,
  }));
  const displayedSelection =
    selection.request === displayedRequest ? selection : DEFAULT_SELECTION;
  const results = useSearchResults(
    displayedSearch,
    displayedSelection.genre,
    displayedSelection.page,
  );

  const urlSelection =
    selection.request === request ? selection : DEFAULT_SELECTION;
  const isSearchSuccessful = search.status === "success";
  const urlGenre = isSearchSuccessful
    ? results.selectedGenre
    : urlSelection.genre;
  const urlPage = isSearchSuccessful ? results.page : urlSelection.page;

  useSyncSearchUrl({ query: committedQuery, genre: urlGenre, page: urlPage });

  const selectGenre = (genre: string | null) => {
    setSelection({ request: displayedRequest, genre, page: 1 });
  };

  const goToPage = (nextPage: number) => {
    const isValidPage =
      Number.isInteger(nextPage) &&
      nextPage >= 1 &&
      nextPage <= results.pageCount;

    if (isValidPage) {
      setSelection((current) => ({
        request: displayedRequest,
        genre: current.request === displayedRequest ? current.genre : null,
        page: nextPage,
      }));
    }
  };

  return {
    ...results,
    query,
    setQuery,
    status,
    errorMessage: search.status === "error" ? search.errorMessage : "",
    retry,
    selectGenre,
    goToPage,
  };
};
