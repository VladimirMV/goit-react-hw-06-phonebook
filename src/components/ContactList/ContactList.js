import s from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/contacts-slice';
// import { getFilteredContacts } from 'redux/contacts/contacts-selectors';

function ContactList() {
  const getFilteredContacts = store => {
    const { filter, contacts } = store;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().trim().includes(normalizedFilter) ||
        number.trim().includes(normalizedFilter)
    );

    if (normalizedFilter && !filteredContacts.length) {
      alert(`No contacts matching your request`);
    }
    return filteredContacts;
  };

  const filteredContacts = useSelector(getFilteredContacts);
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
