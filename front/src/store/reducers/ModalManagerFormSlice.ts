import { IEmployee, IInputChanges } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ApplicationData {
  type: string;
  breaking: string;
  status: string;
  description: string;
  applicant: string;
}

interface IModalManagerState {
  applicationData: ApplicationData;
  employeesApplication: Number[];
  userAddress: {
    area: string;
    street: string;
    house: string;
    entrance: string;
  };
}

const initialState: IModalManagerState = {
  applicationData: {
    type: "",
    breaking: "",
    status: "",
    description: "",
    applicant: "",
  },
  employeesApplication: [],
  userAddress: {
    area: "",
    street: "",
    house: "",
    entrance: "",
  },
};
export const modalManagerFormSlice = createSlice({
  name: "modalManagerFormSlice",
  initialState: initialState,
  reducers: {
    changeApplicationData(state, action: PayloadAction<IInputChanges>) {
      state.applicationData[action.payload.name as keyof ApplicationData] =
        action.payload.value;
    },
  },
});

export default modalManagerFormSlice.reducer;
