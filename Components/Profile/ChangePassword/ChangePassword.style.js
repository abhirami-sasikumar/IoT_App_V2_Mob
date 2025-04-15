import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  header: {
    fontSize: scale(24),
    fontWeight: "R0boto",
    marginBottom: verticalScale(20),
    color: "#1e1e1e",
  },
  input: {
    width: "310",
    padding: scale(10),
    borderWidth: 1,
    borderColor: "#c0c0c0",
    borderRadius: scale(15),
    marginVertical: verticalScale(5),
    backgroundColor: "#fff",
    height:verticalScale(45)
  },
  button: {
    backgroundColor: "#810541",
    paddingHorizontal: scale(3),
    width: "310",
    borderRadius: scale(30),
    alignItems: "center",
    marginTop: verticalScale(10),
    height: verticalScale(35),
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(17),
    fontWeight: "Roboto",
  },
});

export default styles;
