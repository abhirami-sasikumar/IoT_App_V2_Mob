import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  screen: {
     // Ensures full screen usage
    backgroundColor: "#fff",
    paddingTop: verticalScale(20),
  },
  header: {
    fontSize: moderateScale(30),
    fontWeight: "400",
    textAlign: "center",
    marginVertical: verticalScale(15),
    color:"#133E87"
  },
  scrollContent: {
    flexGrow: 1, // Makes sure ScrollView expands
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: verticalScale(10), // Ensures no overlap with footer
  },
  container: {
    width: "100%",
    paddingHorizontal: moderateScale(20),
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
    gap: verticalScale(2),
  },
  footerContainer: {
    bottom: 0,
    width: "100%",
    backgroundColor: "#black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(10),
  },
});

export default styles;
