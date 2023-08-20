import axios from "axios";
import { ISiganlToken } from "../interface";

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
}
