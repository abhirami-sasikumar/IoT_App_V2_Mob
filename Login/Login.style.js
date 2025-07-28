import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  logo: {
    backgroundColor: '#fff'
  },

  loginfield: {
    // You can add margin or padding here if needed
  },

  forgotandreset: {
    // Optional styling
  },

  register: {
    flexGrow: 1
  },

  icfosslogo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // Slight off-white for contrast
    
  
    paddingVertical: verticalScale(),
    
  },
});
