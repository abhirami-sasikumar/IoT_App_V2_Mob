import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from "react-native-size-matters";

 export const styles = StyleSheet.create({
  card: {
    backgroundColor: "lightblue",
    borderRadius: moderateScale(10),
    elevation: moderateScale(5),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowRadius: moderateScale(4),
    width: "100%", // Responsive width
    height: verticalScale(110), // Adjust height dynamically
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(2),
    marginTop:verticalScale(10)
  },
  footerContainer: {
    bottom: 0,
    width: "100%",
    backgroundColor: "#black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(10),
  },
  headText: {
    fontSize: scale(18),
    fontWeight: "400",
    textAlign: "center",
    color: "#133E87",
  },
  line: {
    width: scale(328),
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
    paddingHorizontal: scale(15),
    flex: 1,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingInlineStart:moderateVerticalScale(30),
    flex: 1,
  },
  value: {
    fontSize: scale(30),
    fontWeight: "bold",
    textAlign: "center",
    color: "#133E87",
  },
  measurementText: {
    fontSize: scale(25),
    color: "#133E87",
    marginLeft: scale(5),
  },
 
  chartIconContainer: {
     
     
    right: scale(5), 
    width: scale(37),
    height: verticalScale(37),
    borderRadius: scale(20),
    backgroundColor: "#133E87",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginTop:verticalScale(7)
    
  },
  chartIcon: {
    width: scale(30),
    height: scale(20),
    resizeMode: "contain",
    marginLeft: "5",
    
  },

});

export default styles;