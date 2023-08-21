import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEmployeePost, IInputChanges } from "../../interface";

const initialState: IEmployeePost = {
  name: "",
  surname: "",
  patronymic: "",
  post: "",
};

export const employeeFormSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeEmployeeForm(state, action: PayloadAction<IInputChanges>) {
      state[action.payload.name as keyof IEmployeePost] = action.payload.value;
    },
    clearEmployee(state) {
      state = {
        name: "",
        surname: "",
        patronymic: "",
        post: "",
      };
    },
  },
});

export default employeeFormSlice.reducer;
export const { changeEmployeeForm, clearEmployee } = employeeFormSlice.actions;
