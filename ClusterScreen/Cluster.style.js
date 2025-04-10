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
 header1:{
  

 backgroundColor:"#810541",
 borderBottomRightRadius:scale(120),
 height:verticalScale(70),
 justifyContent:"center"

 
  },

  header: {
    fontSize: scale(24),
    paddingLeft:scale(18),
    color: "white",
    marginTop: verticalScale(8),
    fontFamily: "Roboto",

    justifyContent:"center"

    

  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: verticalScale(5),
  },


});

export default styles;
