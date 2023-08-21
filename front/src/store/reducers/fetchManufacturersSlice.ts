import { IData } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchManufacturers } from "./ActionCreators";

interface ElevatorsState {
  isLoading: boolean;
  error: string | undefined;
  manufacturers: IData[];
}

const initialState: ElevatorsState = {
  isLoading: false,
  error: "",
  manufacturers: [],
};

export const fetchManufacturersSlice = createSlice({
  name: "manufacturersFetching",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchManufacturers.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchManufacturers.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.isLoading = false;
          state.manufacturers = action.payload;
        }
      )
      .addCase(
        fetchManufacturers.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchManufacturersSlice.reducer;
