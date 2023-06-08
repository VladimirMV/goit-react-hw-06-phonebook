import { createSlice } from '@reduxjs/toolkit';
import shortid from 'shortid';
import initialContacts from 'data/contacts.json';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addContact: {
      prepare(name, number) {
        return {
          payload: {
            id: shortid(),
            name,
            number,
          },
        };
      },
      reducer(state, { payload }) {
        return [...state, payload];
      },
    },
    deleteContact(state, { payload }) {
      return [...state].filter(contact => contact.id !== payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
