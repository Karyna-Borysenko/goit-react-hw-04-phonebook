import PropTypes from 'prop-types';
import { Item, Text, Button } from './ContactItem.styled';

export const ContactItem = ({ name, number, id, onDeleteContact }) => {
  return (
    <Item>
      <Text>
        {name}: {number}
      </Text>
      <Button onClick={() => onDeleteContact(id)}>Delete</Button>
    </Item>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
