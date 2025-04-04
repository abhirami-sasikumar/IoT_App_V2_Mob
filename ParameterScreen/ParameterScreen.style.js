import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:verticalScale(25),

    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1, // Allows scrolling when content overflows
    paddingBottom: verticalScale(80), // Prevents content from overlapping with footer
  },
  header: {
    textAlign: "center",
    marginTop: verticalScale(25),
    fontSize: scale(30),
    fontWeight: "bold",
    color: "#133E87",
    
  },
  content: {
    padding: moderateScale(10),
    marginTop: verticalScale(15),
  },
  footerContainer: {
    flex:1,

    
    width: "100%",
    backgroundColor: "#fff", // Ensure it has a background to stand out
    height: verticalScale(60),
     // Adjust height based on Footer component
  },
});

export default styles;
