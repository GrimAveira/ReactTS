import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchBreakingTypes } from "./ActionCreators";
import { IData } from "../../interface/index";

interface FetchBreakingTypesState {
  isLoading: boolean;
  error: string | undefined;
  breakingTypes: IData[];
}

const initialState: FetchBreakingTypesState = {
  isLoading: false,
  error: "",
  breakingTypes: [],
};

export const fetchBreakingTypesSlice = createSlice({
  name: "fetchBreakingTypesSlice",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBreakingTypes.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchBreakingTypes.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.isLoading = false;
          state.breakingTypes = action.payload;
        }
      )
      .addCase(
        fetchBreakingTypes.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchBreakingTypesSlice.reducer;
