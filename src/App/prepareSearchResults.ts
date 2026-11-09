import type { ResultRange, Show } from "./types";

const PAGE_SIZE = 3;

export function prepareSearchResults(
  results: Show[],
  requestedGenre: string | null,
  requestedPage: number,
) {
  const genres = [...new Set(results.flatMap((show) => show.genres))].sort();
  const selectedGenre =
    requestedGenre !== null && genres.includes(requestedGenre)
      ? requestedGenre
      : null;
  const filtered =
    selectedGenre === null
      ? results
      : results.filter((show) => show.genres.includes(selectedGenre));
  const total = filtered.length;
  const pageCount = Math.ceil(total / PAGE_SIZE);
  const page = Math.min(requestedPage, pageCount || 1);
  const offset = (page - 1) * PAGE_SIZE;
  const resultRange: ResultRange = {
    first: total ? offset + 1 : 0,
    last: Math.min(offset + PAGE_SIZE, total),
    total,
  };

  return {
    genres,
    selectedGenre,
    page,
    pageCount,
    resultRange,
    shows: filtered.slice(offset, offset + PAGE_SIZE),
  };
}
