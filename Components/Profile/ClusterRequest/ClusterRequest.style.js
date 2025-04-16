import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  header: {
    fontSize: scale(24),
    fontWeight: "Roboto",
    marginBottom: verticalScale(20),
    color: "#1e1e1e",
  },
  input: {
    width: scale(310),
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: moderateScale(15),
    marginVertical: verticalScale(10),
    backgroundColor: "#fff",
    height:verticalScale(45),
  },
  button: {
    backgroundColor: "#810541",
    width: scale(310),
    borderRadius: scale(30),
    alignItems: "center",
    marginTop: verticalScale(10),
    justifyContent: "center",
    height: verticalScale(35),
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(17),
    fontWeight: "Roboto",
    lineHeight: verticalScale(22),
  },
});