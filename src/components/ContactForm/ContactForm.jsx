import { useState } from 'react';
import { Notify } from 'notiflix';

import { Form, Label, Input } from './ContactForm.styled';
import { useAddContactMutation, useGetContactsQuery } from 'redux/contactsApi';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const onSubmit = async event => {
    event.preventDefault();

    try {
      if (
        contacts.find(
          contact =>
            contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
        )
      )
        throw new Error(`${name} is already in contacts`);

      const result = await addContact({ name, phone });

      if (result.error) throw new Error('Failed to add contact to database');

      Notify.success('Contact added successfully');
      setName('');
      setPhone('');
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={onChange}
        />
      </Label>

      <button type="submit" disabled={isLoading}>
        Add contact
      </button>
    </Form>
  );
};

export default ContactForm;
