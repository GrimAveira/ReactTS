import axios from "axios";
import { IPartForm, IPostFormToken } from "../interface";

export default class PartService {
  static async add(payload: IPostFormToken<IPartForm>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/part",
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
