import { IData } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchManufacturerType } from "./ActionCreators";

interface ManufacturerTypesState {
  isLoading: boolean;
  error: string | undefined;
  manufacturerTypes: IData[];
}

const initialState: ManufacturerTypesState = {
  isLoading: false,
  error: "",
  manufacturerTypes: [],
};

export const fetchManufacturerTypesSlice = createSlice({
  name: "manufacturerTypesFetching",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchManufacturerType.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchManufacturerType.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.manufacturerTypes = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchManufacturerType.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchManufacturerTypesSlice.reducer;
