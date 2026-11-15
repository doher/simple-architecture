import { useState } from "react";
import type { SearchRequest, SearchUrlState } from "./types";

const DEFAULT_SELECTION = { genre: null, page: 1 };

export const useSearchSelection = (
  {
    genre: initialGenre,
    page: initialPage,
  }: Pick<SearchUrlState, "genre" | "page">,
  request: SearchRequest | null,
  displayedRequest: SearchRequest | null,
) => {
  const [selection, setSelection] = useState(() => ({
    request,
    genre: initialGenre,
    page: initialPage,
  }));
  const committedSelection =
    selection.request === request ? selection : DEFAULT_SELECTION;
  const displayedSelection =
    selection.request === displayedRequest ? selection : DEFAULT_SELECTION;

  const selectGenre = (genre: string | null) => {
    setSelection({ request: displayedRequest, genre, page: 1 });
  };

  const selectPage = (nextPage: number, pageCount: number) => {
    const isValidPage =
      Number.isInteger(nextPage) && nextPage >= 1 && nextPage <= pageCount;
    if (!isValidPage) {
      return;
    }

    setSelection((current) => ({
      request: displayedRequest,
      genre: current.request === displayedRequest ? current.genre : null,
      page: nextPage,
    }));
  };

  return { committedSelection, displayedSelection, selectGenre, selectPage };
};
