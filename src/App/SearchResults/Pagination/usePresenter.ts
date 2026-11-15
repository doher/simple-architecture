import type { PaginationProps } from "./types";
import { useAdjacentPageNavigation } from "./useAdjacentPageNavigation";

export const usePresenter = (props: PaginationProps) => {
  const { pageCount, onPageChange } = props;
  const adjacentPageNavigation = useAdjacentPageNavigation(props);

  return {
    ...adjacentPageNavigation,
    hasPagination: pageCount > 1,
    selectPage: (number: number) => () => onPageChange(number),
  };
};
