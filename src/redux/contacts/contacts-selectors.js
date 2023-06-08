import { toast } from 'react-toastify';
import { toastifyOptions } from 'utils/toastifyOptions';

export const getContacts = store => store.contacts.items;

export const getFilteredContacts = store => {
  const { contacts, filter } = store;
  console.log('getFilteredContacts, contacts, filter', contacts, filter);
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
    toast.warn(`No contacts matching your request`, toastifyOptions);
  }
  return filteredContacts;
};
