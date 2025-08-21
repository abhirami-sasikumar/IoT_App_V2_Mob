import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    elevation: moderateScale(5),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowRadius: moderateScale(4),
    width: "90%", 
    height: verticalScale(140),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(5),
    marginHorizontal: moderateScale(4), // Adjusted for spacing between two cards
  },
  headText: {
    fontSize: scale(16),
    fontWeight: "700",
    textAlign: "center",
    color: "#810541",
    fontFamily: "Roboto",
    height: verticalScale(28),
    paddingHorizontal: scale(6),
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
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: scale(10),
    flex: 1,
  },
  valueContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  maintenanceText: {
    fontSize: scale(15),
    textAlign: "center"
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  updatedText: {
    fontFamily: "Roboto",
    fontSize: scale(11),
    color: "#810541",
    marginRight: moderateScale(3),
  },
  timeText: {
    fontSize: scale(10),
    color: "#810541",
    fontFamily: "Roboto",
  },
});