import type { SearchUrlState } from "./types";

export const replaceSearchUrl = ({ query, genre, page }: SearchUrlState) => {
  const currentHref = location.href;
  const url = new URL(currentHref);
  const shouldIncludePage = query !== "" && page > 1;
  const params = {
    q: query || null,
    genre: query ? genre : null,
    page: shouldIncludePage ? String(page) : null,
  };

  for (const [name, value] of Object.entries(params)) {
    if (url.searchParams.get(name) === value) {
      continue;
    }

    if (value === null) {
      url.searchParams.delete(name);
      continue;
    }

    url.searchParams.set(name, value);
  }

  if (url.href !== currentHref) {
    history.replaceState(history.state, "", url);
  }
};
