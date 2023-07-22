import { useEffect, useState } from "react";

function Sort({ onSort }) {
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    onSort(sortBy);
  }, [sortBy, onSort]);

  return (
    <form>
      <select
        className="sort select-type"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="category">Sort By Category</option>
        <option value="description">Sort By Description</option>
      </select>
    </form>
  );
}

export default Sort;
