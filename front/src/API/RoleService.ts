import axios from "axios";
import { IPostFormToken } from "../interface";

export default class RoleService {
  static async add(payload: IPostFormToken<{ role: string }>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/role",
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
