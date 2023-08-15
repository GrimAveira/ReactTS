import axios from "axios";
import { IPostFormToken } from "../interface";

export default class AppStatusService {
  static async add(payload: IPostFormToken<{ status: string }>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/applicationStatus",
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
