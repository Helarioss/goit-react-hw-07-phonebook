import { useDispatch, useSelector } from 'react-redux';
import { getFilter, updateFilter } from 'redux/filterSlice';
import { Input } from './Filter.styled';

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const onFilterChange = event => {
    dispatch(updateFilter(event.target.value));
  };

  return (
    <label>
      Find contacts by name
      <Input
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={value}
        onChange={onFilterChange}
      />
    </label>
  );
};

export default Filter;
