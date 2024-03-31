import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../Redux/ContactSlice';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state =>
    state.contacts ? state.contacts.items : []
  );

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  console.log(contacts);

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={css.inputItem}
        type="text"
        name="name"
        required
        value={name}
        onChange={handleNameChange}
      />
      <br />
      <input
        className={css.inputItem}
        type="text"
        name="number"
        required
        value={number}
        onChange={handleNumberChange}
      />
      <br />
      <button className={css.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
