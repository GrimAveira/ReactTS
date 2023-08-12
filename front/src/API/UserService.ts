import axios from "axios";
import { IUserData, IUserInfo } from "../interface";

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
}
