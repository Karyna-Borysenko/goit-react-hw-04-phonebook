import PropTypes from 'prop-types';

import { Item, Text, Button } from './ContactItem.styled';

export const ContactItem = ({ contact, onDeleteContact }) => {
  return (
    <Item>
      <Text>
        {contact.name}: {contact.number}
      </Text>
      <Button onClick={() => onDeleteContact(contact.id)}>Delete</Button>
    </Item>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.exact({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
