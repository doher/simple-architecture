import type { SearchUrlState } from "./types";

export function readSearchUrl(): SearchUrlState {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q")?.trim() ?? "";

  if (!query) return { query, genre: null, page: 1 };

  return {
    query,
    genre: params.get("genre")?.trim() || null,
    page: parsePage(params.get("page") ?? ""),
  };
}

function parsePage(param: string) {
  const page = Number(param);
  return /^\d+$/.test(param) && Number.isSafeInteger(page) && page > 0
    ? page
    : 1;
}

export function replaceSearchUrl({ query, genre, page }: SearchUrlState) {
  const url = new URL(window.location.href);
  const params = {
    q: query || null,
    genre: query ? genre : null,
    page: query && page > 1 ? String(page) : null,
  };

  for (const [name, value] of Object.entries(params)) {
    if (url.searchParams.get(name) === value) continue;
    if (value === null) {
      url.searchParams.delete(name);
    } else {
      url.searchParams.set(name, value);
    }
  }

  if (url.href !== window.location.href) {
    window.history.replaceState(window.history.state, "", url);
  }
}
