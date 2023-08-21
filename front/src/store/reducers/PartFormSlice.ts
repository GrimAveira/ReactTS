import { IInputChanges, IPartForm } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IPartForm = {
  name: "",
  manufacturer: "",
};

export const partFormSlice = createSlice({
  name: "partReducer",
  initialState: initialState,
  reducers: {
    changePartForm(state, action: PayloadAction<IInputChanges>) {
      state[action.payload.name as keyof IPartForm] = action.payload.value;
    },
  },
});

export default partFormSlice.reducer;
export const { changePartForm } = partFormSlice.actions;
