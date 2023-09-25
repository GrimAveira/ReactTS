import { IApplication, IEmployee, IEmployeeWithApp } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import arrayPagination from "../../functions/arrayPagination";
import destructurizationArray from "../../functions/destructurizationArray";

interface FormState {
  applications: IApplication[][];
  employeesApp: {
    [key: string]: IEmployee[];
  };
}
const initialState: FormState = {
  applications: [],
  employeesApp: {},
};

export const applicationFormSlice = createSlice({
  name: "applicationFormSlice",
  initialState: initialState,
  reducers: {
    paginationApplication(
      state: FormState,
      action: PayloadAction<IApplication[]>
    ) {
      let sortedArray = [...action.payload];
      state.applications = arrayPagination<IApplication>(
        sortedArray.sort((a, b) => a.id - b.id),
        3
      );
    },
    desctructrizationArray(
      state: FormState,
      action: PayloadAction<IEmployeeWithApp[]>
    ) {
      state.employeesApp = destructurizationArray(action.payload);
    },
  },
});

export default applicationFormSlice.reducer;
export const paginationApplication =
  applicationFormSlice.actions.paginationApplication;
export const desctructrizationArray =
  applicationFormSlice.actions.desctructrizationArray;
