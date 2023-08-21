import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IElevatorPassport, IInputChanges } from "../../interface";

const initialState: IElevatorPassport = {
  serialNumber: "",
  productionYear: "",
  manufacturer: "",
  address: "",
  elevatorType: "",
};

export const passportElevatorFormSlice = createSlice({
  name: "passportElevatorReducer",
  initialState,
  reducers: {
    changeElevatorPassport(state, action: PayloadAction<IInputChanges>) {
      state[action.payload.name as keyof IElevatorPassport] =
        action.payload.value;
    },
  },
});

export default passportElevatorFormSlice.reducer;
export const { changeElevatorPassport } = passportElevatorFormSlice.actions;
