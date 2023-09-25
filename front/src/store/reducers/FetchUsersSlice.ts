import { IData, IUserView } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./ActionCreators";

interface ElevatorsState {
  isLoading: boolean;
  error: string | undefined;
  users: IUserView[];
}

const initialState: ElevatorsState = {
  isLoading: false,
  error: "",
  users: [],
};

export const fetchUsersSlice = createSlice({
  name: "fetchUsersSlice",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchPosts.fulfilled.type,
        (state, action: PayloadAction<IUserView[]>) => {
          state.users = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchPosts.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.error = action.payload;
        }
      );
  },
});

export default fetchUsersSlice.reducer;
