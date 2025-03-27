import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create an Axios instance
const API = axios.create({
  baseURL: "http://192.168.1.10:3000/api/app", 
});

// http://192.168.1.10:3000/api/app
// http://192.168.64.167:3000/api/app

// Add an interceptor to include the token in every request
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
