// Cluster.style.js
import { StyleSheet } from "react-native";
import {
  scale,
  verticalScale,
  moderateVerticalScale,
} from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header1: {
    backgroundColor: "#810541",
    borderBottomRightRadius:scale(120),
    height:verticalScale(55),
    justifyContent:"center",
    


    


  },

  header: {
    fontSize: scale(22),
    textAlign: "center",
    color: "#133E87",
    marginTop: verticalScale(8),
    fontFamily: "Roboto",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: verticalScale(5),
  },


});

export default styles;
