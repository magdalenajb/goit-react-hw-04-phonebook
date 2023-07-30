import React, { useState } from 'react';
import PropTypes from 'prop-types';
import c from './ContactForm.module.css';

export const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    // console.log('Name inputed by user:', name);
    // console.log('Number inputed by user:', number);
    onAddContact(name, number);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={c.contactAddForm} onSubmit={handleOnSubmit}>
      <label className={c.contactAddLabel}>
        Name
        <input
          className={c.contactAddInput}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleNameChange}
        />
      </label>
      <label className={c.contactAddLabel}>
        Number
        <input
          className={c.contactAddInput}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleNumberChange}
        />
      </label>
      <button className={c.contactAddBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onAddContact: PropTypes.func.isRequired,
};
