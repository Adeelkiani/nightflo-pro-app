import { tallyStore } from "../../redux/Store";
import axios from "axios";
import { Platform } from "react-native";
import * as Application from "expo-application";

export const BASE_URL = "https://nightfloapi.babytuesday.link/api/";
// export const BASE_URL = "https://e308-2407-d000-a-a515-15bf-d3a6-a6b8-55ee.ngrok-free.app/api";

export function getAxiosClient() {
  let token = tallyStore.getState().mUser.token;
  let appVersion = Application.nativeApplicationVersion ?? "1.0.0";
  // Used for testing prod on local
  // let appVersion = "6.5.0";

  token = token ? "Bearer " + token : null;

  const customAxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
  });

  customAxiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = token;
    config.headers.appVersion = appVersion;
    config.headers.platform = Platform.OS;
    return config;
  });

  return customAxiosInstance;
}
