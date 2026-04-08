import SearchBox from "@/components/SearchBox";

export default function SearchPage() {
  return (
    <main className="searchPage">
      <div className="searchPageInner">
        <h1>Search</h1>
        <p>Find sections across the living text.</p>
        <SearchBox />
      </div>
    </main>
  );
}