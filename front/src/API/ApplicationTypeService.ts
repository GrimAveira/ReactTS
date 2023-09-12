import axios from "axios";
import { IData, IPostFormToken, ISiganlToken } from "../interface";

export default class ApplicationTypeService {
  static async add(payload: IPostFormToken<{ appType: string }>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/applicationType",
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
      "http://localhost:8800/api/get/type",
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
