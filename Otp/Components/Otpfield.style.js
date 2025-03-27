import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  view: {
    marginTop: verticalScale(300),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(30),
  },
  input: {
    marginTop: verticalScale(30),
    borderWidth: 1,
    borderColor: "grey",
    paddingHorizontal: scale(10),
    borderRadius: 35,
    width: scale(310),
    height: verticalScale(50),
    fontFamily:"Roboto"
  },
  placeholder: {
    color: "grey",
  },
});

export default styles;