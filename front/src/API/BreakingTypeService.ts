import axios from "axios";
import { IPostFormToken } from "../interface";

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
}
