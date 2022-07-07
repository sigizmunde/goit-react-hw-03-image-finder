import css from './Searchbar.module.css';

function Searchbar({ onSearch }) {
  const submitQuery = e => {
    e.preventDefault();
    onSearch(e.target.elements.query.value.trim());
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={submitQuery}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          className={css['SearchForm-input']}
        />
      </form>
    </header>
  );
}

export default Searchbar;
