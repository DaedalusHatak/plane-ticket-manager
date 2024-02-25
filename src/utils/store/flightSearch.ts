import { createSlice } from "@reduxjs/toolkit";
export type FlightSearch = {
  passengers: Passenger[];
};
export type Passenger = {
  firstName: string;
  lastName: string;
};
const initialState: FlightSearch = { passengers: [] };
export const flightSearch = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.passengers = action.payload;
    },
  },
});

export const { updateSearch } = flightSearch.actions;
export default flightSearch.reducer;
