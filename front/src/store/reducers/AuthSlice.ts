import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "./ActionCreators";

const initialState = {
  isLoading: false,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuth.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled.type, (state) => {
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(
        checkAuth.rejected.type,
        (state, action: PayloadAction<string>) => {
          if (action.payload === "jwt expired") {
            state.isAuth = false;
            state.isLoading = false;
            localStorage.clear();
            alert("Сессия истекла");
          }
        }
      );
  },
});

export default authSlice.reducer;
export const { changeIsAuth } = authSlice.actions;
