import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchApplicationsStatuses } from "./ActionCreators";
import { IData } from "../../interface/index";

interface FetchApplicationsStatusesState {
  isLoading: boolean;
  error: string | undefined;
  statuses: IData[];
}

const initialState: FetchApplicationsStatusesState = {
  isLoading: false,
  error: "",
  statuses: [],
};

export const fetchApplicationsStatusesState = createSlice({
  name: "fetchApplicationsStatusesState",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchApplicationsStatuses.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchApplicationsStatuses.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.isLoading = false;
          state.statuses = action.payload;
        }
      )
      .addCase(
        fetchApplicationsStatuses.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchApplicationsStatusesState.reducer;
