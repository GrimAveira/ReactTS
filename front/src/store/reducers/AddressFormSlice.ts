import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAddress, IInputChanges } from "../../interface";
import { addAddress } from "./ActionCreators";
import { alertError, alertSuccess } from "../../functions/toast";

const initialState: IAddress = {
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
      state[action.payload.name as keyof IAddress] = action.payload.value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        addAddress.fulfilled.type,
        (_, action: PayloadAction<string>) => {
          alertSuccess(action.payload);
        }
      )
      .addCase(addAddress.rejected.type, (_, action: PayloadAction<string>) => {
        alertError(action.payload);
      });
  },
});

export default addressFormSlice.reducer;
export const { changeAddressState } = addressFormSlice.actions;
