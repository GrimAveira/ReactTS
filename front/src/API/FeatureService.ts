import axios from "axios";
import { IPostFormToken } from "../interface";

export default class FeatureService {
  static async add(payload: IPostFormToken<{ feature: string }>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/feature",
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
