import React from 'react';
import PropTypes from 'prop-types';

import { ContactItem } from '../ContactItem/ContactItem';

import { List } from './ContactsList.styled';

export const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <List>
      {contacts.map((contact, id) => (
        <ContactItem
          key={id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </List>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
