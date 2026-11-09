import styles from "./App.module.css";
import { SearchHeader } from "./SearchHeader/SearchHeader";
import { SearchResults } from "./SearchResults/SearchResults";
import { usePresenter } from "./usePresenter";

export function App() {
  const search = usePresenter();

  return (
    <main className={styles.root}>
      <div className={styles.shell}>
        <SearchHeader query={search.query} onQueryChange={search.setQuery} />
        {search.status !== "idle" && (
          <SearchResults
            status={search.status}
            errorMessage={search.errorMessage}
            onRetry={search.retry}
            genres={search.genres}
            selectedGenre={search.selectedGenre}
            onGenreChange={search.selectGenre}
            pagination={{
              page: search.page,
              pageCount: search.pageCount,
              onPageChange: search.goToPage,
            }}
            resultRange={search.resultRange}
            shows={search.shows}
          />
        )}
      </div>
    </main>
  );
}
