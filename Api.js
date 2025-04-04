import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({

  // baseURL: "http://192.168.1.10:3000/api/app", 
     baseURL: "http://192.168.64.222:3000/api/app",

    });

API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
