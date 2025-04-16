import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({

  // baseURL: "http://192.168.1.10:3000/api/app", 
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
    

export default API;
