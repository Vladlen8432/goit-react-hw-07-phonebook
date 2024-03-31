import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(
      'https://66093b4c0f324a9a2882f3ea.mockapi.io/vlashark/contacts'
    );
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async newContact => {
    const response = await axios.post(
      'https://66093b4c0f324a9a2882f3ea.mockapi.io/vlashark/contacts',
      newContact
    );
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await axios.delete(
      `https://66093b4c0f324a9a2882f3ea.mockapi.io/vlashark/contacts/${contactId}`
    );
    return contactId;
  }
);
