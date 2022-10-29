import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

import { Container, Header, Notice } from './App.styled';

const initialContact = { id: 'id-1', name: '⭐ GoIT', number: '067 326 95 92' };

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? initialContact
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  //----Добавляем контакты----
  function addContact({ name, number }) {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.map(contact => contact.name).includes(name)) {
      Notiflix.Notify.failure(`${name} is already in contacts.`);
    } else {
      setContacts([newContact, ...contacts]);
    }
  }

  //----Удаляем контакты----
  function deleteContact(contactId) {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  }

  //----Обновляем фильтр----
  function changeFilter(event) {
    setFilter(event.currentTarget.value);
  }

  //----Получаем подходящие контакты----
  function visibleContacts() {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  //----Рендер----
  return (
    <Container>
      <Header>Phonebook</Header>
      <ContactForm onSubmit={addContact} />

      <Header>Contacts</Header>
      <Filter value={filter} onChange={changeFilter} />

      {visibleContacts().length > 0 ? (
        <ContactsList
          contacts={visibleContacts()}
          onDeleteContact={deleteContact}
        />
      ) : (
        <Notice>There is nothing to show... ☹️</Notice>
      )}
    </Container>
  );
}
