import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:verticalScale(10),

    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1, // Allows scrolling when content overflows
    paddingBottom: verticalScale(60), // Prevents content from overlapping with footer
  },
  header: {
    textAlign: "center",
    marginTop: verticalScale(25),
    fontSize: scale(30),
    fontWeight: "bold",
    color: "#133E87",
    
  },
  content: {
    padding: moderateScale(1),
    marginTop: verticalScale(5),
  },
  
});

export default styles;
