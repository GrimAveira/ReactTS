import axios from "axios";
import { IPostFormToken, ISiganlToken } from "../interface";

export default class PostService {
  static async getAll(payload: ISiganlToken) {
    const response = await axios.get("http://localhost:8800/api/get/post", {
      signal: payload.signal,
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    });
    return response.data;
  }
  static async add(payload: IPostFormToken<{ post: string }>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/post",
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
