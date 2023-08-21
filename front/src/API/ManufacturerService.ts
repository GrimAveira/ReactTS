import axios from "axios";
import {
  IData,
  IManufacturerForm,
  IPostFormToken,
  ISiganlToken,
} from "../interface";

export default class ManufacturerService {
  static async getAll(payload: {
    type: string;
    signal: AbortSignal;
    token: string | null;
  }) {
    const response = await axios.get<IData>(
      "http://localhost:8800/api/get/manufacturer",
      {
        params: { type: payload.type },
        signal: payload.signal,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async getAllType(payload: ISiganlToken) {
    const response = await axios.get<IData>(
      "http://localhost:8800/api/get/manufacturerType",
      {
        signal: payload.signal,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async add(payload: IPostFormToken<IManufacturerForm>) {
    const response = await axios.post<IManufacturerForm>(
      "http://localhost:8800/api/post/manufacturer",
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async addType(payload: IPostFormToken<{ manufacturerType: string }>) {
    const response = await axios.post<{ manufacturerType: string }>(
      "http://localhost:8800/api/post/manufacturerType",
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  }
}
