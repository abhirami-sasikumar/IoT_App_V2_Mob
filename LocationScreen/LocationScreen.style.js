import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  screen: {
     // Ensures full screen usage
    
    paddingTop: verticalScale(5),
  },
  header: {
    fontSize: moderateScale(30),
    fontWeight: "400",
    textAlign: "center",
    marginVertical: verticalScale(10),
    color:"#133E87"
  },
  scrollContent: {
    flexGrow: 1, // Makes sure ScrollView expands
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: verticalScale(10),
    marginTop:verticalScale(10) // Ensures no overlap with footer
  },
  container: {
    width: "100%",
    paddingHorizontal: moderateScale(10),
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
    gap: verticalScale(2),
  },
  
});


