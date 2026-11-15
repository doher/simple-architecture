import type { Show } from "./types";

export const filterShowsByGenre = (
  shows: readonly Show[],
  genres: readonly string[],
  requestedGenre: string | null,
) => {
  const isRequestedGenreAvailable =
    requestedGenre !== null && genres.includes(requestedGenre);

  if (!isRequestedGenreAvailable) {
    return { selectedGenre: null, filteredShows: shows };
  }

  return {
    selectedGenre: requestedGenre,
    filteredShows: shows.filter((show) => show.genres.includes(requestedGenre)),
  };
};
