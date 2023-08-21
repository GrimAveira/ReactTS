import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFeatureList, IInputChanges } from "../../interface";

const initialState: IFeatureList = {
  elevator: "",
  feature: "",
  value: "",
};

export const listFeaturesFormSlice = createSlice({
  name: "featureList",
  initialState,
  reducers: {
    changeFeatureList(state, action: PayloadAction<IInputChanges>) {
      state[action.payload.name as keyof IFeatureList] = action.payload.value;
    },
  },
});

export const { changeFeatureList } = listFeaturesFormSlice.actions;
export default listFeaturesFormSlice.reducer;
