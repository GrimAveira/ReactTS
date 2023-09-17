import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchEmployeesApplications } from "./ActionCreators";
import { IEmployeeWithApp } from "../../interface/index";

interface FetchEmployeeAppState {
  isLoading: boolean;
  error: string | undefined;
  employeeApp: IEmployeeWithApp[];
}

const initialState: FetchEmployeeAppState = {
  isLoading: false,
  error: "",
  employeeApp: [],
};

export const fetchEmployeeAppSlice = createSlice({
  name: "fetchEmployeeAppSlice",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEmployeesApplications.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchEmployeesApplications.fulfilled.type,
        (state, action: PayloadAction<IEmployeeWithApp[]>) => {
          state.isLoading = false;
          state.employeeApp = action.payload;
        }
      )
      .addCase(
        fetchEmployeesApplications.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchEmployeeAppSlice.reducer;
