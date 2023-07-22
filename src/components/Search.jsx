function Search({ query, setQuery, OnFilter }) {
  function handleSubmit(e) {
    e.preventDefault();
    console.log(query);
    OnFilter(query);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
