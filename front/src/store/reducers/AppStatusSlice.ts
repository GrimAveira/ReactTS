import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addAppStatus } from "./ActionCreators";
import { alertError, alertSuccess } from "../../functions/toast";

const initialState = {
  error: "",
  isLoading: false,
};
export const appStatuSlice = createSlice({
  name: "appStatus",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        addAppStatus.fulfilled.type,
        (_, action: PayloadAction<string>) => {
          alertSuccess(action.payload);
        }
      )
      .addCase(
        addAppStatus.rejected.type,
        (_, action: PayloadAction<string>) => {
          alertError(action.payload);
        }
      );
  },
});

export default appStatuSlice.reducer;
