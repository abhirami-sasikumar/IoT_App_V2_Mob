import { createContext } from "react";

export const UserContext = createContext({
  user: {
    jwtToken: "",
    email: "",
    name: "",
    userId: "",
  },
  setUser: () => {},
});
