import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",

  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  header: {
    fontSize: scale(20),
    fontFamily: "Roboto",
    textAlign: "center",
    marginBottom: verticalScale(20),
    color: "#1e1e1e",
    
  },
  buttonDelete: {
    backgroundColor: "#810541",
    justifyContent:"center",
    width: scale(310),
    borderRadius: moderateScale(30),
    alignItems: "center",
    marginVertical: verticalScale(10),
    height:verticalScale(40)

  },
  buttonCancel: {    justifyContent:"center",

    backgroundColor: "#810541",
    width: scale(310),
    borderRadius: moderateScale(30),
    alignItems: "center",
    height:verticalScale(40)
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(20),
    
    fontfamily:"Roboto"
  },
  buttonText1: {
    color: "#fff",
    fontSize: scale(20),
    fontfamily: "Roboto",
  },
});

export default styles;