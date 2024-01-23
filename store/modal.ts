import { createSlice } from "@reduxjs/toolkit";
export type Modal = {
  value:boolean,
  message:string,
  title:string,
  link:string,
}
const initialState:Modal = {
  value:false,
  message:"",
  title:"",
  link:"",
}
export const modalState = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.link = action.payload.link;
    },
    closeModal: (state) => {
      state.value = false;
    },
  },
});

export const { openModal, closeModal } = modalState.actions;
export default modalState.reducer