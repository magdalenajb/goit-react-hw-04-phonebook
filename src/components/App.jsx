import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson:', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline:', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements:', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland:', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  changeFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    const isItUniqueName = this.state.contacts
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
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      // console.log(this.state.contacts);
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onFilter={this.changeFilter} />
        <ContactList state={this.state} onRemoveContact={this.removeContact} />
      </div>
    );
  }
}
