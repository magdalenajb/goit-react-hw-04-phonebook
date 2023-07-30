import React from 'react';
import PropTypes from 'prop-types';
import c from './ContactList.module.css';

export const ContactList = ({ contacts, filter, onRemoveContact }) => {
  return (
    <ul className={c.contactList}>
      {contacts
        .filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
        .map(({ id, name, number }) => (
          <li className={c.contactListItem} key={id}>
            <p>{name}</p>
            <p>{number}</p>
            <button
              className={c.contactListBtn}
              key={id}
              name={name}
              type="submit"
              onClick={() => onRemoveContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
