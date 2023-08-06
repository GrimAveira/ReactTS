import axios from "axios";

export default class AreaService {
  static async getAll(params: {}) {
    const response = await axios.get(
      "http://localhost:8800/api/get/area",
      params
    );
    return response;
  }
}
