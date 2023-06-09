import { useSelector } from 'react-redux';
import Container from './components/Container/Container';
import { ContactForm } from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import { getContacts } from 'redux/contacts/contacts-selectors';

function App() {
  const contacts = useSelector(getContacts);
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      {contacts.length > 0 && (
        <>
          <h2>Contacts</h2>
          <Filter />
          <ContactList />
        </>
      )}
    </Container>
  );
}

export default App;