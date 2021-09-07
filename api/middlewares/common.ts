import axios from "axios";
import logger from "../utils/logger";

export class MiddleWare {
  apiKey: string;
  baseUrl: string;
  port!: number;

  constructor(apiKey: string | undefined, baseUrl: string) {
    if (apiKey === undefined) {
      throw new Error("API key cannot be undefined");
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async getResult(_: string): Promise<string> {
    return "{}";
  }

  async makeRequest(params: string): Promise<string> {
    const _params = JSON.parse(params);
    const _headers = _params.headers
    delete _params.headers
  
    const res = await axios.get(this.baseUrl, {
      params: _params,
      headers: _headers,
    });

    const stringRes = JSON.stringify(res.data);

    logger.verbose(`Axios call with parameters:\n${params}`);

    return stringRes;
  }
}
