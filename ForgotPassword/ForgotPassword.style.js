import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: verticalScale(100), // Prevents keyboard from hiding content
  },
  container: {
    flex: 1,
    padding: scale(15),
    marginTop: verticalScale(100),
    backgroundColor: "#fff",
    
  },
  heading: {
    fontSize: scale(22),
    marginBottom: verticalScale(20),
    textAlign: "center",
    color: "#810451",
    fontFamily: "Roboto",
  },
  label: {
    fontSize: scale(18),
    marginBottom: verticalScale(10),
    color: "#810451",
    fontFamily: "Roboto",

  },
  input: {
    marginTop: verticalScale(5),
    borderWidth: verticalScale(1),
    borderColor: "#810451",
    borderRadius: 15,
    height: verticalScale(50),
    paddingHorizontal: scale(10),
    fontSize: scale(16),
    fontFamily: "Roboto",
    width: scale(310),
  },
  button: {
    marginTop: scale(10),
    backgroundColor: "#810451",
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    height: verticalScale(40),
    width: scale(310),
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(20),
    fontFamily: "Roboto",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "#fff",
    
    
    
  },
});
