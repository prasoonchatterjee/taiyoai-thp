import { createSlice } from '@reduxjs/toolkit';

export type RootStateType = {
  allContacts: Contact[];
  page: number;
  editContactId: string;
};
const initialState: RootStateType = {
  allContacts: [],
  page: 1,
  editContactId: null!,
};

export type Contact = {
  firstName: string;
  lastName: string;
  status: string;
  id: string;
};

type SetNewContactActionType = {
  payload: Contact;
  type: string;
};
type EditContactType = SetNewContactActionType;

type DeleteContactActionType = {
  payload: string;
  type: string;
};
type HandlePageNoActionType = {
  payload: number;
  type: string;
};


export const rootSlice = createSlice({
  name: 'rootState',
  initialState,
  reducers: {
    setNewContact: (state, action: SetNewContactActionType) => {
      return {
        ...state,
        allContacts: [...state.allContacts, action.payload],
      };
    },
    editContact: (state, action: EditContactType) => {
      const filteredList = state.allContacts.filter(
        (contact) => contact.id !== action.payload.id
      );
      const editedContactList = { ...action.payload };
      return {
        ...state,
        allContacts: [...filteredList, editedContactList],
      };
    },
    deleteContact: (state, action: DeleteContactActionType) => {
      return {
        ...state,
        allContacts: state.allContacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    },
    handleEditContactId: (state, action: DeleteContactActionType) => {
      return {
        ...state,
        editContactId: action.payload,
      };
    },
    handlePageNo: (state, action: HandlePageNoActionType) => {
      return {
        ...state,
        page: action.payload,
      };
    },
  },
});

export const {
  setNewContact,
  deleteContact,
  handleEditContactId,
  handlePageNo,
  editContact,
} = rootSlice.actions;
export default rootSlice.reducer;
