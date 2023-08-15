import { createAsyncThunk } from "@reduxjs/toolkit";
import AreaService from "../../API/AreaService";
import StreetService from "../../API/StreetService";
import { IAddress, IPostFormToken, ISignal } from "../../interface";
import UserService from "../../API/UserService";
import AddressService from "../../API/AddressService";
import AppStatusService from "../../API/AppStatusService";
import AppTypeService from "../../API/AppTypeService";

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
export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (token: string | null, thunkAPI) => {
    try {
      let response;
      if (token !== null) response = await UserService.authCheck(token);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const addAddress = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<IAddress>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null) response = await AddressService.add(payload);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const addAppStatus = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ status: string }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await AppStatusService.add(payload);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const addAppType = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ appType: string }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null) response = await AppTypeService.add(payload);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
