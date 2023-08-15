import axios from "axios";
import { IData, IPostFormToken, ISignal } from "../interface";

export default class AreaService {
  static async getAll(params: ISignal | undefined) {
    const response = await axios.get<IData[]>(
      "http://localhost:8800/api/get/area",
      params
    );
    return response.data;
  }
  static async add(payload: IPostFormToken<{ area: string }>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/area",
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
}
