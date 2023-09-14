import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchEmployeeAll, fetchEmployeesApplications } from "./ActionCreators";
import { IApplication, IEmployee } from "../../interface/index";

interface FetchEmployeeState {
  isLoading: boolean;
  error: string | undefined;
  employeeApp: IEmployee[];
}

const initialState: FetchEmployeeState = {
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
      .addCase(fetchEmployeeAll.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchEmployeeAll.fulfilled.type,
        (state, action: PayloadAction<IEmployee[]>) => {
          state.isLoading = false;
          state.employeeApp = action.payload;
        }
      )
      .addCase(
        fetchEmployeeAll.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchEmployeeAppSlice.reducer;
