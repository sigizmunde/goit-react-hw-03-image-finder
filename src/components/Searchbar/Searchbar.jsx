import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import React from 'react';

class Searchbar extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  state = {
    query: '',
    disabled: false,
  };

  componentDidUpdate(_, prevState) {
    const { query } = this.state;
    if (query !== prevState.query) {
      this.setState({ disabled: false });
    }
  }

  submitQuery = e => {
    e.preventDefault();
    const { onSearch } = this.props;
    onSearch(this.state.query);
    this.setState({ disabled: true });
  };

  onChange = e => {
    this.setState({ query: e.target.value.trim() });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.submitQuery}>
          <button
            type="submit"
            className={css['SearchForm-button']}
            disabled={this.state.disabled}
          >
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            className={css['SearchForm-input']}
            value={this.state.query}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
