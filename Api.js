import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "./LocationScreen/NavigationHelper/NavigationHelper";

const API = axios.create({
  baseURL: "http://192.168.66.80:3000/api/app",
});

API.interceptors.request.use(
  async (config) => {
    const userData = await AsyncStorage.getItem("@user");
    if (userData) {
      const parsed = JSON.parse(userData);
      config.headers.Authorization = `Bearer ${parsed.jwtToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Removed navigation to "UnderMaintenance"
    return Promise.reject(error);
  }
);

export default API;
