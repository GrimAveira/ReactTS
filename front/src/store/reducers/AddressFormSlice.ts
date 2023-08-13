import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IInputChanges } from "../../interface";

interface AddressState {
  area: string;
  street: string;
  house: string;
  entrance: string;
}

const initialState: AddressState = {
  area: "",
  street: "",
  house: "",
  entrance: "",
};

export const addressFormSlice = createSlice({
  name: "addressForm",
  initialState,
  reducers: {
    changeAddressState(state, action: PayloadAction<IInputChanges>) {
      state[action.payload.name as keyof AddressState] = action.payload.value;
    },
  },
});

export default addressFormSlice.reducer;
export const { changeAddressState } = addressFormSlice.actions;
