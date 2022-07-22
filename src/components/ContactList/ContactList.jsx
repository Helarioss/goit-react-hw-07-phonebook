import { createSelector } from '@reduxjs/toolkit';
import ContactItem from 'components/ContactItem';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/contactsApi';
import { getFilter } from 'redux/filterSlice';

const useContacts = () => {
  const filter = useSelector(getFilter);

  const selectFilteredContacts = useMemo(() => {
    return createSelector(
      [res => res.data, (_, filter) => filter],
      (data, filter) =>
        data?.filter(({ name }) =>
          name.toLowerCase().includes(filter.toLowerCase())
        ) ?? []
    );
  }, []);

  return useGetContactsQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      filteredContacts: selectFilteredContacts(result, filter),
    }),
  });
};

const ContactList = () => {
  // const { data, isLoading, error } = useGetContactsQuery();
  const { data, filteredContacts, error, isLoading } = useContacts();

  // console.log(contacts);
  // console.log(data);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Failed to load contacts</p>;

  if (data?.length === 0) return <p>No contacts</p>;

  return (
    <ul>
      {filteredContacts?.map(contact => (
        <ContactItem key={contact.id} {...contact} />
      ))}
    </ul>
  );
};

export default ContactList;