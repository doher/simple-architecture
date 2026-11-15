import { useMemo } from "react";
import { filterShowsByGenre } from "./filterShowsByGenre";
import { getShowGenres } from "./getShowGenres";
import { paginateShows } from "./paginateShows";
import type { SearchState, Show } from "./types";

const EMPTY_SHOWS: readonly Show[] = [];

export const useSearchResults = (
  search: SearchState,
  requestedGenre: string | null,
  requestedPage: number,
) => {
  const matchedShows = search.status === "success" ? search.shows : EMPTY_SHOWS;
  const genres = useMemo(() => getShowGenres(matchedShows), [matchedShows]);

  const { selectedGenre, filteredShows } = useMemo(
    () => filterShowsByGenre(matchedShows, genres, requestedGenre),
    [matchedShows, genres, requestedGenre],
  );

  const pagination = useMemo(
    () => paginateShows(filteredShows, requestedPage),
    [filteredShows, requestedPage],
  );

  return { ...pagination, genres, selectedGenre };
};
