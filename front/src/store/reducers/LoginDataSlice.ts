import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IInputChanges } from "../../interface";

interface LoginData {
  login: string;
  password: string;
}

const initialState: LoginData = {
  login: "",
  password: "",
};

export const loginDataSlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {
    changeLoginData(state, action: PayloadAction<IInputChanges>) {
      state[action.payload.name as keyof LoginData] = action.payload.value;
    },
  },
});

export const { changeLoginData } = loginDataSlice.actions;
export default loginDataSlice.reducer;
