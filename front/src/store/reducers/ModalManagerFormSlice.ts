import { IEmployee, IInputChanges, IUserView } from "../../interface";
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
  employeesApplication: number[];
  currentUser: IUserView | undefined;
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
  currentUser: {
    id: "",
    login: "",
    name: "",
    surname: "",
    patronymic: "",
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
    changeAppsEmployees(state, action: PayloadAction<number[]>) {
      state.employeesApplication = action.payload;
    },
    changeCurrentUser(state, action: PayloadAction<IUserView>) {
      state.currentUser = action.payload;
    },
  },
});

export default modalManagerFormSlice.reducer;
export const changeApplicationData =
  modalManagerFormSlice.actions.changeApplicationData;
export const changeAppsEmployees =
  modalManagerFormSlice.actions.changeAppsEmployees;
export const changeCurrentUser =
  modalManagerFormSlice.actions.changeCurrentUser;
