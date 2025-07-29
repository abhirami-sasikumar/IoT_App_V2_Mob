import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    elevation: moderateScale(5),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowRadius: moderateScale(4),
    width: "48%", // for 2 cards per row
    height: verticalScale(140),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(5),
  },
  headText: {
    fontSize: scale(11.5),
    fontWeight: "700",
    textAlign: "center",
    color: "#810541",
    whiteSpace: "nowrap",      // Only works on web
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily:"Roboto",
    height: verticalScale(28),
      paddingHorizontal: scale(6),      // ✅ prevent clipping on sides
 // <--- THIS IS THE CRUCIAL LINE FOR FIXED LINE POSITION

  },
  line: {
    width: scale(155),
    borderBottomWidth: scale(1),
    borderBottomColor: "#A6A6A6",
    marginTop: verticalScale(5),
    alignSelf: "center",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: scale(10),
    flex: 1,
  },

  valueContainer: {
    flex: 3, // ensures it takes most of the space
    alignItems: "center",
    justifyContent: "center",
    paddingRight: scale(5),
  },

  value: {
    fontSize: scale(22),
    fontWeight: "bold",
    color: "#810541",
    fontFamily: "Roboto",
    textAlign: "center",
    flexShrink: 1,
    width: "100%",
  },
  

  measurementText: {
    fontSize: scale(18),
    color: "#810541",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Roboto",
    flexShrink: 1,
    width: "100%",
  },

  chart: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  chartIconContainer: {
    width: scale(20),
    height: verticalScale(20),
    borderRadius: scale(20),
    backgroundColor: "#810541",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginTop: verticalScale(2),
  },
  chartIcon: {
    width: scale(12),
    height: scale(10),
    resizeMode: "contain",
  },
  timeContainer:{
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"space-between"


  },
  timeText: {
    fontSize: scale(10), // You can adjust this value as needed
    color: "#810541", // Same as other text color or change it
    marginTop: verticalScale(1), // Space between value and time
    fontFamily:"Roboto",
    justifyContent:"space-between"

  },
  updatedText:{
    fontFamily:"Roboto",
    fontSize:scale(11),
    color: "#810541",
    marginRight:moderateScale(3) // Same as other text color or change it


  },
  maintenanceText:{
    fontSize:scale(15),
    textAlign:"center"

  },
  

  
});
