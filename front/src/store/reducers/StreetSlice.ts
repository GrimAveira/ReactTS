import { IData } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchStreet } from "./ActionCreators";

interface StreetState {
  isLoading: boolean;
  error: string | undefined;
  street: IData[];
}

const initialState: StreetState = {
  isLoading: false,
  error: "",
  street: [],
};

export const streetSlice = createSlice({
  name: "streetFetching",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStreet.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchStreet.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.isLoading = false;
          state.error = "";
          state.street = action.payload;
        }
      )
      .addCase(
        fetchStreet.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default streetSlice.reducer;
