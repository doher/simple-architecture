import { type ChangeEvent, useId, useRef } from "react";
import type { SearchFieldProps } from "./types";

export const usePresenter = (
  onQueryChange: SearchFieldProps["onQueryChange"],
) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const changeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.currentTarget.value);
  };

  const clearQuery = () => {
    inputRef.current?.focus();
    onQueryChange("");
  };

  return { inputId, inputRef, changeQuery, clearQuery };
};
