import { type MouseEvent, useLayoutEffect, useRef } from "react";
import type { PaginationProps } from "./types";

export function usePresenter({
  page,
  pageCount,
  onPageChange,
}: PaginationProps) {
  const currentPageButton = useRef<HTMLButtonElement>(null);
  const focusAfterPageChange = useRef<number | null>(null);

  useLayoutEffect(() => {
    const requestedPage = focusAfterPageChange.current;
    focusAfterPageChange.current = null;

    if (requestedPage === page) {
      currentPageButton.current?.focus();
    }
  }, [page]);

  const selectAdjacentPage = (nextPage: number) => {
    return (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      if (
        button === button.ownerDocument.activeElement &&
        (nextPage === 1 || nextPage === pageCount)
      ) {
        focusAfterPageChange.current = nextPage;
      }
      onPageChange(nextPage);
    };
  };

  const pages = Array.from({ length: pageCount }, (_, index) => {
    const number = index + 1;

    return {
      number,
      current: number === page,
      label: `Страница ${number}`,
      select: () => onPageChange(number),
    };
  });

  return {
    pages,
    currentPageButton,
    hasPagination: pageCount > 1,
    canGoBack: page > 1,
    canGoForward: page < pageCount,
    goBack: selectAdjacentPage(page - 1),
    goForward: selectAdjacentPage(page + 1),
  };
}
