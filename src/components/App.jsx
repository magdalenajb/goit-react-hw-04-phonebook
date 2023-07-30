import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson:', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline:', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements:', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland:', number: '227-91-26' },
  ]);
  
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []
  );

 /* componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }*/

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
    
  };

  const addContact = ( name, number ) => {
    const isItUniqueName = contacts
      .map(e => e.name.toLowerCase())
      .includes(name.toLowerCase());
    if (isItUniqueName) {
      return alert(`${name} is already in contacts.`);
    } else {
      const contact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      setContacts(prevState => {
        return [...prevState, contact];
      });
    }
  };

  const removeContact = contactId => {
    setContacts(prevState => {
      return [...prevState].filter(({ id }) => id !== contactId);
      });
  };

  /*componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      // console.log(this.state.contacts);
    }
  }*/

  useEffect(() => {
    if (prevState => prevState !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onAddContact={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onFilter={changeFilter} />
        <ContactList contacts={contacts} filter={filter} onRemoveContact={removeContact} />
      </div>
    );
  }

