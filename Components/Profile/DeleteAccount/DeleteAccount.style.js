import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  header: {
    fontSize: scale(20),
    fontWeight: "roboto",
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
    height:verticalScale(35)

  },
  buttonCancel: {    justifyContent:"center",

    backgroundColor: "#810541",
    width: scale(310),
    borderRadius: moderateScale(30),
    alignItems: "center",
    height:verticalScale(35)
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(17),
    fontWeight: "roboto",
  },
  buttonText1: {
    color: "#fff",
    fontSize: scale(17),
    fontWeight: "roboto",
  },
});

export default styles;