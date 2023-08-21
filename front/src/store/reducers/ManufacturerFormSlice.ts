import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IInputChanges, IManufacturerForm } from "../../interface";

const initialState: IManufacturerForm = {
  name: "",
  type: "",
};

export const manufacturerFormSlice = createSlice({
  name: "manufacturerForm",
  initialState,
  reducers: {
    changeManufacturerFormData(state, action: PayloadAction<IInputChanges>) {
      state[action.payload.name as keyof IManufacturerForm] =
        action.payload.value;
    },
  },
});

export const { changeManufacturerFormData } = manufacturerFormSlice.actions;
export default manufacturerFormSlice.reducer;
