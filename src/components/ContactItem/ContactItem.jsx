import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDeleteContactMutation } from 'redux/contactsApi';

import { Info, Item } from './ContactItem.styled';

const ContactItem = ({ id, name, phone }) => {
  const [deleteContact, { isLoading, isSuccess }] = useDeleteContactMutation();

  useEffect(() => {
    if (isSuccess) Notify.success('The contact was successfully deleted');
  }, [isSuccess]);

  return (
    <Item>
      <Info>
        {name}: {phone}
      </Info>
      <button
        type="button"
        disabled={isLoading}
        onClick={() => deleteContact(id)}
      >
        Delete
      </button>
    </Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default ContactItem;
