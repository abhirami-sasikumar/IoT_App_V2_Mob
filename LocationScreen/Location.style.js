import { StyleSheet } from "react-native";
import { moderateScale, verticalScale,scale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header1: {    
    backgroundColor: "#810541",
    borderBottomRightRadius:scale(120),
    height:verticalScale(55),
    justifyContent:"center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    width: "100%",
    paddingHorizontal: moderateScale(10),
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(5),
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: verticalScale(10),
  },
});
