import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import './Searchbar.css';

function Searchbar({ onSubmited }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast('You do not enter a query !');
      return;
    }
    onSubmited(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <section className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name=" query"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={query}
          onChange={handleChange}
        />
      </form>
    </section>
  );
}

Searchbar.propTypes = {
  onSubmited: PropTypes.func.isRequired,
};

export default Searchbar;
