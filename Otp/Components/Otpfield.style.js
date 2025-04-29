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
    marginTop: verticalScale(3),
    borderWidth: 1,
    borderColor: "#810541",
    paddingHorizontal: scale(10),
    borderRadius: 15,
    width: scale(310),
    height: verticalScale(50),
    fontFamily:"Roboto",
    fontSize:scale(16),
  },
  placeholder: {
    color: "#810451",    
    fontSize:scale(15),
    
  },
});

export default styles;