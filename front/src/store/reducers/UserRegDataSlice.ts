import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IInputChanges } from "../../interface";

interface UserInfo {
  login: string;
  password: string;
  confirmPassword: string;
  surname: string;
  name: string;
  patronymic: string;
  phoneNumber: string;
  area: string;
  street: string;
  house: string;
  entrance: string;
  apartment: string;
}

const initialState: UserInfo = {
  login: "",
  password: "",
  confirmPassword: "",
  surname: "",
  name: "",
  patronymic: "",
  phoneNumber: "",
  area: "",
  street: "",
  house: "",
  entrance: "",
  apartment: "",
};

export const userRegDataSlice = createSlice({
  name: "userRegData",
  initialState,
  reducers: {
    changeUserRegData(state, action: PayloadAction<IInputChanges>) {
      state[action.payload.name as keyof UserInfo] = action.payload.value;
    },
  },
});

export default userRegDataSlice.reducer;
export const { changeUserRegData } = userRegDataSlice.actions;
