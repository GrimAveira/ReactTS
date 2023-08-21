import axios from "axios";
import { IPartForm, IPostFormToken } from "../interface";

export default class PartService {
  static async add(payload: IPostFormToken<IPartForm>) {
    const response = await axios.post<IPartForm>(
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
}
