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
    height: verticalScale(130),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(5),
  },
  headText: {
    fontSize: scale(18),
    fontWeight: "70",
    textAlign: "center",
    color: "#810541",
    whiteSpace: "nowrap",      // Only works on web
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily:"Roboto"
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

    flexDirection: "row", // changed to column
    justifyContent: "center",

    alignItems: "flex-start",
    flex: 3,
    


  },
  value: {

    fontSize: scale(25),
    fontWeight: "bold",
    color: "#810541",
    fontFamily: "Roboto",
    justifyContent: "center",

     // or "monospace"
    


    

  },
  measurementText: {
    fontSize: scale(21),
    color: "#810541",
    fontWeight: "bold",
    justifyContent: "center",
    fontFamily:"Roboto"


  },
  chart: {
    flex: 1,
    alignItems: "flex-end",
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
    width: scale(14),
    height: scale(12),
    resizeMode: "contain",
  },
  timeText: {
    fontSize: scale(13), // You can adjust this value as needed
    color: "#810541", // Same as other text color or change it
    marginTop: verticalScale(1), // Space between value and time
    fontFamily:"Roboto"
  },
});
