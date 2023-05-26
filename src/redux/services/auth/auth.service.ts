import { AxiosResponse } from "axios";

import $api from "@/api";

interface ILogin {
  name: string;
}

interface IRegistration {
  name: string;
}

interface ILoginResponse {
  name: string;
}

export class AuthService {
  static async login(creds: ILogin): Promise<AxiosResponse<string>> {
    return $api.post<string>(`auth/login`, creds);
  }

  static async registration(
    creds: IRegistration
  ): Promise<AxiosResponse<string>> {
    return $api.post<string>(`auth/registration`, creds);
  }

  static async refresh(): Promise<AxiosResponse<string>> {
    return $api.get<string>(`auth/refresh`);
  }

  static async logout(): Promise<AxiosResponse<ILoginResponse>> {
    return $api.get(`auth/logout`);
  }

  // static async logout(): Promise<AxiosResponse<ILoginResponse>> {
  //   return axios.get(`${DEV_API}auth/logout`, { withCredentials: true });
  // }
}
