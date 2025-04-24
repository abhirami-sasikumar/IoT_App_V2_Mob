import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: scale(320),
    height: verticalScale(52),
    borderRadius: 10,
    marginTop: verticalScale(15),
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: verticalScale(2),
    paddingHorizontal: scale(10),
    borderColor:"#7D0552",
    borderWidth:scale(0.5)
  },

  cardText: {
    fontSize: scale(20),
    color: "#810541",
    textAlign: "left",
    flex: 1,
    fontFamily: "Roboto",
  },
  textContainer: {
    flexDirection: "row", // Arrange the name and icon in a row
    alignItems: "center", // Align both items vertically at the center
    flex: 1, // Allow the text to take available space, pushing the icon to the right
  },

  infoButtonContainer: {
    paddingLeft: scale(10),
    marginRight:scale(20) // Add padding to ensure space between text and icon
  },

  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  modalContent: {
    position: "absolute",
    top: "35%",
    alignSelf: "center",
    backgroundColor: "white",
    padding: scale(20),
    borderRadius: 10,
    width: scale(280),
    elevation: 10,
    alignItems: "center",
  },

  closeButton: {
    backgroundColor: "#810541",
    paddingHorizontal: scale(20),
    paddingVertical: scale(8),
    borderRadius: 5,
    marginTop: 10,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // This simulates a blur effect
  },

  arrow: {
    width: scale(18),
    height: verticalScale(20),
    tintColor: "#810541",
  },
});

 export default styles;