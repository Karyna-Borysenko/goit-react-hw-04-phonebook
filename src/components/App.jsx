import React from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

import { Container, Header, Notice } from './App.styled';

class App extends React.Component {
  state = {
    contacts: [{ id: 'id-1', name: '⭐ GoIT', number: '067 326 95 92' }],
    filter: '',
  };

  //----Монтирование----
  componentDidMount() {
    const parsedLSContacts = JSON.parse(localStorage.getItem('contacts'));

    if (parsedLSContacts) {
      this.setState({ contacts: parsedLSContacts });
    }
  }

  //----Обновление----
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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

        {this.visibleContacts().length > 0 ? (
          <ContactsList
            contacts={this.visibleContacts()}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <Notice>There is nothing to show... ☹️</Notice>
        )}
      </Container>
    );
  }
}

export default App;
