import axios from "axios";
import { IPostFormToken } from "../interface";

export default class AppTypeService {
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
}
