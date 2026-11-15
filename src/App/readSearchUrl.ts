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
