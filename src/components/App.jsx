import React from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

import { Container, Header } from './App.styled';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  //----Добавляем контакты----
  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.map(contact => contact.name).includes(name)) {
      Notiflix.Notify.failure(`${name} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
  };

  //----Удаляем контакты----
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  //----Обновляем фильтр----
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  //----Получаем подходящие контакты----
  visibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  //----Рендер----
  render() {
    const { filter } = this.state;

    return (
      <Container>
        <Header>Phonebook</Header>
        <ContactForm onSubmit={this.addContact} />

        <Header>Contacts</Header>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactsList
          contacts={this.visibleContacts()}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
