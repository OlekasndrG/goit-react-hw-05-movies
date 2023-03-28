import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as AddIcon } from '../icons/search.svg';
import {
   SearchForm,
   SearchbarContainer,
   SearchButton,
} from './Searchbar.styled';
import { useSearchParams } from 'react-router-dom';

export const SearchBar = ({ onSubmit }) => {
   // const [querySearch, setQuerySearch] = useState('');
   const [searchParams, setSearchParams] = useSearchParams();
   const nameFromInput = searchParams.get('query') ?? '';
   const handleQueryChange = e => {
      // setQuerySearch(e.currentTarget.value.toLowerCase());
      setSearchParams({ query: e.target.value.toLowerCase() });
      // onInputValueChange(querySearch);
   };
   const handleSubmit = e => {
      e.preventDefault();

      // if (querySearch.trim() === '') {
      //    alert('Введіть пошук');
      //    return;
      // }
      onSubmit(nameFromInput);
   };
   return (
      <SearchbarContainer>
         <SearchForm onSubmit={handleSubmit}>
            <SearchButton type="submit" aria-label="пошук">
               <AddIcon width="28" height="28" />
            </SearchButton>
            <input
               type="text"
               autoComplete="off"
               autoFocus
               placeholder="Search movies"
               onChange={handleQueryChange}
               value={nameFromInput}
               name="forminput"
            />
         </SearchForm>
      </SearchbarContainer>
   );
};

SearchBar.propTypes = {
   onSubmit: PropTypes.func.isRequired,
};
