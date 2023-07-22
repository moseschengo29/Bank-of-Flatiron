function Search({ query, setQuery }) {
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search for a transaction using description...."
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Search;
