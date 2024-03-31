import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { updateFilter } = contactSlice.actions;
export default contactSlice.reducer;
