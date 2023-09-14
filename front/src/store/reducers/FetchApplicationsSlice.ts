import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchApplications } from "./ActionCreators";
import { IApplication } from "../../interface/index";

interface FetchApplicationsState {
  isLoading: boolean;
  error: string | undefined;
  applications: IApplication[];
}

const initialState: FetchApplicationsState = {
  isLoading: false,
  error: "",
  applications: [],
};

export const fetchApplicationsSlice = createSlice({
  name: "fetchApplicationsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchApplications.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchApplications.fulfilled.type,
        (state, action: PayloadAction<IApplication[]>) => {
          state.isLoading = false;
          state.applications = action.payload;
        }
      )
      .addCase(
        fetchApplications.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchApplicationsSlice.reducer;
