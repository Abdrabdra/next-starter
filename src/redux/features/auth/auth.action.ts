import { AuthService } from '@/redux/services/auth/auth.service';
import { createAsyncThunk } from "@reduxjs/toolkit";

interface ILogin {
  name: string;
}

interface IRegistration {
  name: string;
}

interface ILoginResponse {
  name: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async function (creds: ILogin, { rejectWithValue }) {
    try {
      const response = await AuthService.login(creds);
      localStorage.setItem("access_token", response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async function (creds: IRegistration, { rejectWithValue }) {
    try {
      const response = await AuthService.registration(creds);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk<any>(
  "auth/logout",
  async function (_, { rejectWithValue }) {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("access_token");

      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const refresh = createAsyncThunk<any>(
  "auth/refresh",
  async function (_, { rejectWithValue }) {
    try {
      const response = await AuthService.refresh();
      localStorage.setItem("access_token", response.data);
      return response.data;
    } catch (e: any) {
      console.log(e);
      throw rejectWithValue("Не авторизован");
    }
  }
);

// @ts-ignore
// export const checkAuth = createAsyncThunk<any>(
//   "auth/refresh",
//   async function (_, { rejectWithValue }) {
//     try {
//       const response = await AuthService.refresh();
//       localStorage.setItem("access_token", response.data.access_token);
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e);
//     }
//   }
// );
