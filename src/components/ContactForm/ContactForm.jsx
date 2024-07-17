import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../Redux/ContactSlice';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts?.items ?? []);

  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { name, number } = formData;
    if (name.trim() === '' || number.trim() === '') return;

    dispatch(addContact({ name, number }));
    setFormData({ name: '', number: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={css.inputItem}
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          className={css.inputItem}
          type="text"
          name="number"
          required
          value={formData.number}
          onChange={handleChange}
        />
        <br />
        <button className={css.formButton} type="submit">
          Add contact
        </button>
      </form>

      {contacts.length > 0 && (
        <ul className={css.contactList}>
          {contacts.map(contact => (
            <li key={contact.id} className={css.contactItem}>
              {contact.name}: {contact.number}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactForm;

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addContact } from '../Redux/ContactSlice';
// import css from './ContactForm.module.css';

// const ContactForm = () => {
//   const dispatch = useDispatch();
//   const contacts = useSelector(state =>
//     state.contacts ? state.contacts.items : []
//   );

//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   const handleNameChange = event => {
//     setName(event.target.value);
//   };

//   const handleNumberChange = event => {
//     setNumber(event.target.value);
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     if (name.trim() === '' || number.trim() === '') {
//       return;
//     }

//     dispatch(addContact({ name, number }));
//     setName('');
//     setNumber('');
//   };

//   console.log(contacts);

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         className={css.inputItem}
//         type="text"
//         name="name"
//         required
//         value={name}
//         onChange={handleNameChange}
//       />
//       <br />
//       <input
//         className={css.inputItem}
//         type="text"
//         name="number"
//         required
//         value={number}
//         onChange={handleNumberChange}
//       />
//       <br />
//       <button className={css.formButton} type="submit">
//         Add contact
//       </button>
//     </form>
//   );
// };

// export default ContactForm;
