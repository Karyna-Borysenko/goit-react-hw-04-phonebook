import React from 'react';
import { nanoid } from 'nanoid';

import { Form, Header, Input, Submit } from './ContactForm.styled';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  //----Генератор id----
  nameInputId = nanoid();
  numberInputId = nanoid();

  //----Обновляем input----
  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  //----Отправляем форму----
  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  //----Очищаем input`ы----
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  //----Рендер----
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Header>Name</Header>
        <Input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={this.nameInputId}
        />
        <Header>Number</Header>
        <Input
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={this.numberInputId}
        />
        <Submit type="submit">Add contact</Submit>
      </Form>
    );
  }
}

export default ContactForm;
