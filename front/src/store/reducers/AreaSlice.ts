import { IData } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchArea } from "./ActionCreators";

interface AreaState {
  isLoading: boolean;
  error: string | undefined;
  area: IData[];
}

const initialState: AreaState = {
  isLoading: false,
  error: "",
  area: [],
};

export const areaSlice = createSlice({
  name: "areaFetching",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArea.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchArea.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.isLoading = false;
          state.error = "";
          state.area = action.payload;
        }
      )
      .addCase(
        fetchArea.rejected.type,
        (state, action: PayloadAction<string>) => {
          console.log(action);
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default areaSlice.reducer;
