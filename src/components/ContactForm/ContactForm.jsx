import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { Form, Header, Input, Submit } from './ContactForm.styled';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  //----Генератор id----
  let nameInputId = nanoid();
  let numberInputId = nanoid();

  //----Обновляем input----
  function handleInputChange(event) {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  }

  // ----Отправляем форму----
  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({ name, number });
    reset();
  }

  //----Очищаем input`ы----
  function reset() {
    setName('');
    setNumber('');
  }

  //----Рендер----
  return (
    <Form onSubmit={handleSubmit}>
      <Header>Name</Header>
      <Input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        id={nameInputId}
      />
      <Header>Number</Header>
      <Input
        type="tel"
        name="number"
        value={number}
        onChange={handleInputChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        id={numberInputId}
      />
      <Submit type="submit">Add contact</Submit>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
