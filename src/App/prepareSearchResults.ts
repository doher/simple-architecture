import type { ResultRange, Show } from "./types";

const PAGE_SIZE = 3;

export const getShowGenres = (shows: readonly Show[]) => {
  const uniqueGenres = new Set<string>();

  for (const show of shows) {
    for (const genre of show.genres) {
      uniqueGenres.add(genre);
    }
  }

  return [...uniqueGenres].sort();
};

export const paginateShows = (
  shows: readonly Show[],
  requestedPage: number,
) => {
  const total = shows.length;
  const pageCount = Math.ceil(total / PAGE_SIZE);
  const page = Math.min(requestedPage, pageCount || 1);
  const offset = (page - 1) * PAGE_SIZE;
  const resultRange: ResultRange = {
    first: total ? offset + 1 : 0,
    last: Math.min(offset + PAGE_SIZE, total),
    total,
  };

  return {
    page,
    pageCount,
    resultRange,
    shows: shows.slice(offset, offset + PAGE_SIZE),
  };
};
