import type { SearchUrlState } from "./types";

const parsePage = (param: string) => {
  const page = Number(param);
  const hasOnlyDigits = /^\d+$/.test(param);
  const isPositiveSafeInteger = Number.isSafeInteger(page) && page > 0;

  return hasOnlyDigits && isPositiveSafeInteger ? page : 1;
};

export const readSearchUrl = (): SearchUrlState => {
  const params = new URLSearchParams(location.search);
  const query = params.get("q")?.trim() ?? "";

  if (!query) {
    return { query, genre: null, page: 1 };
  }

  return {
    query,
    genre: params.get("genre")?.trim() || null,
    page: parsePage(params.get("page") ?? ""),
  };
};

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
