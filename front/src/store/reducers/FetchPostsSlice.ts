import { IData } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./ActionCreators";

interface ElevatorsState {
  isLoading: boolean;
  error: string | undefined;
  posts: IData[];
}

const initialState: ElevatorsState = {
  isLoading: false,
  error: "",
  posts: [],
};

export const fetchPostsSlice = createSlice({
  name: "postsFetching",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchPosts.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.posts = action.payload;
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

export default fetchPostsSlice.reducer;
