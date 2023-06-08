import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contacts-slice';
import { getContacts } from 'redux/contacts/contacts-selectors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastifyOptions } from 'utils/toastifyOptions';

import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import React from 'react';
import { store } from 'redux/store';

// const initialValues = { name: '', number: '' };

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  console.log(
    'contacts getContacts',
    contacts,
    'store.contacts',
    store.contacts
  );
  //   const onSubmitHandler = (values,  reset ) => {
  //         onAddContact({ ...values });
  //         // resetForm();
  //     reset();
  //   };
  // onSubmit={(values, { resetForm }) => {
  //         onAddContact({ ...values });
  //         resetForm();

  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase().trim();
    const normalizedNumber = number.trim();
    console.log('contacts', contacts);
    const dublicate = contacts.find(
      contact =>
        contact.name.toLowerCase().trim() === normalizedName ||
        contact.number.trim() === normalizedNumber
    );
    return Boolean(dublicate);
  };

  const onAddContact = ({ name, number }) => {
    console.log('onAddContact name, number', name, number);
    if (isDublicate({ name, number })) {
      return toast.error(
        `This contact is already in contacts`,
        toastifyOptions
      );
    }
    console.log('dispatch <><><>< name, number', name, number);
    dispatch(addContact({ name, number }));
    // const action = addContact({ name, number });
    // dispatch(action);
  };

  const onSubmitHandler = (values, reset) => {
    onAddContact({ ...values });
    // resetForm();
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          placeholder="Evgen Vlasov"
          name="name"
          {...register('name', {
            required: `This field is required`,
            pattern: {
              value:
                /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
              message: 'Enter a valid name',
            },
          })}
        />
        {errors.name && <p className={s.error}>{errors.name.message}</p>}
      </label>
      <label className={s.label}>
        Number
        <input
          className={s.input}
          type="text"
          name="number"
          {...register('number', {
            required: `This field is required`,
            minLength: {
              value: 7,
              message: `Min 7 numbers. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`,
            },
            pattern:
              /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
          })}
          placeholder="111-11-11"
        />
        {errors.number && <p className={s.error}>{errors.number.message}</p>}
      </label>
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}
ContactForm.propType = {
  onSubmit: PropTypes.func.isRequired,
};
export default ContactForm;
