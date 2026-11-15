import { useMemo } from "react";
import { getShowGenres, paginateShows } from "./prepareSearchResults";
import type { SearchState, Show } from "./types";

const EMPTY_SHOWS: readonly Show[] = [];

export const useSearchResults = (
  search: SearchState,
  requestedGenre: string | null,
  requestedPage: number,
) => {
  const matchedShows = search.status === "success" ? search.shows : EMPTY_SHOWS;
  const genres = useMemo(() => getShowGenres(matchedShows), [matchedShows]);

  const { selectedGenre, filteredShows } = useMemo(() => {
    const isRequestedGenreAvailable =
      requestedGenre !== null && genres.includes(requestedGenre);

    if (!isRequestedGenreAvailable) {
      return { selectedGenre: null, filteredShows: matchedShows };
    }

    return {
      selectedGenre: requestedGenre,
      filteredShows: matchedShows.filter((show) =>
        show.genres.includes(requestedGenre),
      ),
    };
  }, [matchedShows, genres, requestedGenre]);

  const pagination = useMemo(
    () => paginateShows(filteredShows, requestedPage),
    [filteredShows, requestedPage],
  );

  return { ...pagination, genres, selectedGenre };
};
