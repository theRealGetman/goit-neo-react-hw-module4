import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

function SearchBar({ onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();

    const value = e.target.elements.query.value;

    if (!value) {
      return toast.error("Please enter a search term");
    }

    onSubmit(value);
  }

  return (
    <header className={css.header}>
      <div>
        <Toaster />
      </div>

      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          name="query"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default SearchBar;
