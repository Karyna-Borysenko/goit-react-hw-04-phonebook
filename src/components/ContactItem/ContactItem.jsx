export const ContactItem = ({ contact, onDeleteContact }) => {
  return (
    <li>
      <p>
        {contact.name}: {contact.number}
      </p>
      <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
    </li>
  );
};
