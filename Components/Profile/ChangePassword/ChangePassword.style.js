import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const ChangePasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: verticalScale(180),
    
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: verticalScale(20),
  },
  header: {
    fontSize: scale(24),
    fontWeight: "bold",
    color: "#1e1e1e",
    marginBottom: verticalScale(20),
  },
  inputContainer: {
    width: scale(310),
    position: "relative",
    marginBottom: verticalScale(10),
  },
  input: {
    width: "100%",
    padding: scale(10),
    
    borderWidth: 1,
    borderColor: "#c0c0c0",
    borderRadius: scale(15),
    backgroundColor: "#fff",
    height: verticalScale(45),
  },
  eyeIcon: {
    position: "absolute",
    right: scale(10),
    top: verticalScale(12),
  },
  button: {
    backgroundColor: "#810541",
    borderRadius: scale(30),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(10),
    height: verticalScale(35),
    width: scale(310),
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(17),
    fontWeight: "bold",
  },
});

export default ChangePasswordStyles;
