import { type MouseEvent, useLayoutEffect, useRef } from "react";
import type { PaginationProps } from "./types";

export const useAdjacentPageNavigation = ({
  page,
  pageCount,
  onPageChange,
}: PaginationProps) => {
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
      const isArrowFocused = button === button.ownerDocument.activeElement;
      const willDisableArrow = nextPage === 1 || nextPage === pageCount;

      if (isArrowFocused && willDisableArrow) {
        focusAfterPageChange.current = nextPage;
      }

      onPageChange(nextPage);
    };
  };

  return {
    currentPageButton,
    canGoBack: page > 1,
    canGoForward: page < pageCount,
    goBack: selectAdjacentPage(page - 1),
    goForward: selectAdjacentPage(page + 1),
  };
};
