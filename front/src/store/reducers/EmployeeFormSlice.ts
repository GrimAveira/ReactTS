import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./ActionCreators";
import { IData, IEmployeePost, IInputChanges } from "../../interface";

interface EmployeeForm {
  posts: IData[];
  employee: IEmployeePost;
  postsIsLoading: boolean;
  error: string;
}

const initialState: EmployeeForm = {
  posts: [],
  employee: {
    name: "",
    surname: "",
    patronymic: "",
    post: "",
  },
  postsIsLoading: false,
  error: "",
};

export const employeeFormSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeEmployeeForm(state, action: PayloadAction<IInputChanges>) {
      state.employee[action.payload.name as keyof IEmployeePost] =
        action.payload.value;
    },
    clearEmployee(state) {
      state.employee = {
        name: "",
        surname: "",
        patronymic: "",
        post: "",
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending.type, (state) => {
        state.postsIsLoading = true;
      })
      .addCase(
        fetchPosts.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.posts = action.payload;
          state.postsIsLoading = false;
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

export default employeeFormSlice.reducer;
export const { changeEmployeeForm, clearEmployee } = employeeFormSlice.actions;
