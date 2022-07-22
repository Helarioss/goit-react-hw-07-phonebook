import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilter: (_, { payload }) => {
      return payload;
    },
  },
});

export const { updateFilter } = filterSlice.actions;

// export const getContacts = state => state.contacts.items;
export const getFilter = state => state.filter;

// export const getFilteredContacts = state => {
//   const items = getContacts(state);
//   const filter = getFilter(state);

//   return items.filter(({ name }) =>
//     name.toLowerCase().includes(filter.toLowerCase())
//   );
// };
