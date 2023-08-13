import { createAsyncThunk } from "@reduxjs/toolkit";
import AreaService from "../../API/AreaService";
import StreetService from "../../API/StreetService";
import { ISignal } from "../../interface";

export const fetchArea = createAsyncThunk(
  "area/getAll",
  async (params: ISignal | undefined, thunkAPI) => {
    try {
      const response = await AreaService.getAll(params);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchStreet = createAsyncThunk(
  "street/getAll",
  async (params: ISignal | undefined, thunkAPI) => {
    try {
      const response = await StreetService.getAll(params);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
