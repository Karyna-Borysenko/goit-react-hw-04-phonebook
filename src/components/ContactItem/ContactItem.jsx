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
