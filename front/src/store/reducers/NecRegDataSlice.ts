import { IData } from "../../interface";
import { createSlice } from "@reduxjs/toolkit";
import { fetchNecRegData } from "./ActionCreators";

interface NecRegDataState {
  isLoading: boolean;
  error: string | undefined;
  area: IData[];
  street: IData[];
}

const initialState: NecRegDataState = {
  isLoading: false,
  error: "",
  area: [],
  street: [],
};

export const necRegDataSlice = createSlice({
  name: "necRegData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNecRegData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNecRegData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.area = action.payload.area;
      state.street = action.payload.street;
    });
    builder.addCase(fetchNecRegData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default necRegDataSlice.reducer;
