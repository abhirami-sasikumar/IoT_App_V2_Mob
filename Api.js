import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "./LocationScreen/NavigationHelper/NavigationHelper";

const API = axios.create({

     baseURL: "https://devapp.v2.openiot.in/api/app",

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
    const status = error.response?.status;

    // If network error, timeout, 404, 500, etc.
    if (!error.response || [404, 500, 502, 503].includes(status)) {
      navigate("UnderMaintenance"); // 👈 navigate globally
    }

    return Promise.reject(error);
  }
);
    

export default API;
