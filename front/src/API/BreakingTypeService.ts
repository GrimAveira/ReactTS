import axios from "axios";
import { IData, IPostFormToken, ISiganlToken } from "../interface";

export default class BreakingTypeService {
  static async add(payload: IPostFormToken<{ breaking: string }>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/breaking",
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async getAll(payload: ISiganlToken) {
    const response = await axios.get<IData[]>(
      "http://localhost:8800/api/get/breaking",
      {
        signal: payload.signal,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
}
