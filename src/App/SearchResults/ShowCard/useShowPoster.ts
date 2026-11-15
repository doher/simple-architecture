import { useState } from "react";

export const useShowPoster = (posterUrl: string | undefined) => {
  const [failedPosterUrl, setFailedPosterUrl] = useState<string>();

  const handlePosterError = () => {
    setFailedPosterUrl(posterUrl);
  };

  return {
    poster: posterUrl === failedPosterUrl ? undefined : posterUrl,
    handlePosterError,
  };
};
