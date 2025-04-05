import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "lightblue",
    padding: moderateScale(15), // Adjust padding based on screen size
    margin: moderateScale(7),
    borderRadius: moderateScale(15),
    elevation: 3, // Shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    width: "95%",
    alignSelf: "center",
    height: verticalScale(55), // Adjusted height dynamically
  },
  cardText: {
    fontSize: scale(16), // Adjusted font size
    fontWeight: "bold",
    color: "#133E87",
  },
  arrow: {
    width: scale(20),
    height: scale(20),
    resizeMode: "contain",
    tintColor: "#133E87",
  },
});



  
