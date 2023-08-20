import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFeatureList, IData, IElevator, IInputChanges } from "../../interface";
import { fetchElevators, fetchFeatures } from "./ActionCreators";

interface FeaturesListForm {
  features: IData[];
  elevators: number[];
  featuresList: IFeatureList;
  featuresIsLoading: boolean;
  elevatorIsLoading: boolean;
  error: string;
}

const initialState: FeaturesListForm = {
  features: [],
  elevators: [],
  featuresList: {
    elevator: "",
    feature: "",
    value: "",
  },
  featuresIsLoading: false,
  elevatorIsLoading: false,
  error: "",
};

export const listFeaturesFormSlice = createSlice({
  name: "featureList",
  initialState,
  reducers: {
    changeFeatureList(state, action: PayloadAction<IInputChanges>) {
      state.featuresList[action.payload.name as keyof IFeatureList] =
        action.payload.value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeatures.pending.type, (state) => {
        state.featuresIsLoading = true;
      })
      .addCase(
        fetchFeatures.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.features = action.payload;
          state.featuresIsLoading = false;
        }
      )
      .addCase(
        fetchFeatures.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.featuresIsLoading = false;
          state.elevatorIsLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchElevators.pending.type, (state) => {
        state.elevatorIsLoading = true;
      })
      .addCase(
        fetchElevators.fulfilled.type,
        (state, action: PayloadAction<IElevator[]>) => {
          state.elevators = action.payload.map(
            (elevator: IElevator) => elevator.serial_number
          );
          state.elevatorIsLoading = false;
        }
      )
      .addCase(
        fetchElevators.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.elevatorIsLoading = false;
          state.elevatorIsLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { changeFeatureList } = listFeaturesFormSlice.actions;
export default listFeaturesFormSlice.reducer;
