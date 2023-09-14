import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchApplicationsTypes } from "./ActionCreators";
import { IData } from "../../interface/index";

interface FetchApplicationsTypesState {
  isLoading: boolean;
  error: string | undefined;
  types: IData[];
}

const initialState: FetchApplicationsTypesState = {
  isLoading: false,
  error: "",
  types: [],
};

export const fetchApplicationsTypesState = createSlice({
  name: "fetchApplicationsTypesState",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchApplicationsTypes.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchApplicationsTypes.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.isLoading = false;
          state.types = action.payload;
        }
      )
      .addCase(
        fetchApplicationsTypes.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchApplicationsTypesState.reducer;
