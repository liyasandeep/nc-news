const SortAndOrderSection = ({
  selectSortValue,
  setSelectSortValue,
  selectOrderValue,
  setSelectOrderValue,
}) => {
  const handleChange = (event) => {
    if (event.target.name === "sort") {
      setSelectSortValue(event.target.value);
    } else if (event.target.name === "order") {
      setSelectOrderValue(event.target.value);
    }
  };

  return (
    <div className="sort-order">
      <label htmlFor="sortBy" className="sort-label">
        Sort{" "}
      </label>
      <select
        name="sort"
        id="sortBy"
        value={selectSortValue}
        onChange={handleChange}
      >
        <option value="created_at">Date</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment Count</option>
      </select>
      <label htmlFor="order" className="order-label">
        Order
      </label>
      <select
        name="order"
        id="order"
        value={selectOrderValue}
        onChange={handleChange}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
};
export default SortAndOrderSection;
