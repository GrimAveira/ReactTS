import axios from "axios";
import { ISiganlToken, IUserData, IUserInfo, IUserView } from "../interface";

export default class User {
  static async registration(userInfo: IUserInfo) {
    const response = await axios.post<string>(
      "http://localhost:8800/api/auth/registration",
      userInfo
    );
    return response.data;
  }
  static async login(userInfo: { login: string; password: string }) {
    const response = await axios.post<IUserData>(
      "http://localhost:8800/api/auth/login",
      userInfo
    );
    return response.data;
  }
  static async authCheck(token: string) {
    await axios.get("http://localhost:8800/api/auth/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async getAll(payload: ISiganlToken): Promise<IUserView[]> {
    const response = await axios.get<IUserView[]>(
      "http://localhost:8800/api/get/users",
      {
        signal: payload.signal,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
}
