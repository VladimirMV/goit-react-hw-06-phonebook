import s from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/contacts-slice';
import { getFilteredContacts } from 'redux/contacts/contacts-selectors';

function ContactList() {
  const filteredContacts = useSelector(state => state.contacts.items);
  console.log('filteredContacts', filteredContacts);
  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={s.list}>
      {filteredContacts.map(({ name, number, id }) => {
        return (
          <li className={s.item} key={id}>
            <p className={s.info}>
              {name}: {number}
            </p>
            <button
              className={s.btn}
              type="button"
              onClick={() => onDeleteContact(id)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ContactList;
