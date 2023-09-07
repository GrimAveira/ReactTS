import { IApplication, IData, IEmployee } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchArea } from "./ActionCreators";
import Applications from "../../components/pages/Applications";

interface FormState {
  applications: [IApplication[]];
  employeesApp: Map<Number, IEmployee[]>;
}

// const initialState: FormState = {
// };

// export const applicationFormSlice = createSlice({
//   name: "areaFetching",
//   initialState: initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchArea.pending.type, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(
//         fetchArea.fulfilled.type,
//         (state, action: PayloadAction<IData[]>) => {
//           state.isLoading = false;
//           state.error = "";
//           state.area = action.payload;
//         }
//       )
//       .addCase(
//         fetchArea.rejected.type,
//         (state, action: PayloadAction<string>) => {
//           console.log(action);
//           state.isLoading = false;
//           state.error = action.payload;
//         }
//       );
//   },
// });

// export default areaSlice.reducer;
