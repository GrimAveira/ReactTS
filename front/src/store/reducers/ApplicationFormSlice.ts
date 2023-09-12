import { IApplication, IEmployee } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import arrayPagination from "../../functions/arrayPagination";
import destructurizationArray from "../../functions/destructurizationArray";

interface FormState {
  applications: IApplication[][];
  employeesApp: Map<Number, IEmployee[]>;
}

const initialState: FormState = {
  applications: [],
  employeesApp: new Map<Number, IEmployee[]>(),
};

export const applicationFormSlice = createSlice({
  name: "areaFetching",
  initialState: initialState,
  reducers: {
    paginationApplication(
      state: FormState,
      action: PayloadAction<IApplication[]>
    ) {
      state.applications = arrayPagination<IApplication>(action.payload, 3);
    },
    desctructrizationArray(
      state: FormState,
      action: PayloadAction<IEmployee[]>
    ) {
      state.employeesApp = destructurizationArray(action.payload);
    },
  },
});

export default applicationFormSlice.reducer;
