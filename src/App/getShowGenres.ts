import type { Show } from "./types";

export const getShowGenres = (shows: readonly Show[]) => {
  const uniqueGenres = new Set<string>();

  for (const show of shows) {
    for (const genre of show.genres) {
      uniqueGenres.add(genre);
    }
  }

  return [...uniqueGenres].sort();
};
