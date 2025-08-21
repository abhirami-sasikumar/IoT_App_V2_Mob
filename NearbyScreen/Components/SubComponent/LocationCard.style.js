import { StyleSheet } from "react-native";
import {
  scale,
} from "react-native-size-matters";

const Styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", // was currentTheme.container
      width: scale(175),
      height: 200,
      flexDirection: "column",
      alignSelf: "center",
      borderColor: "#E0E0E0", // was currentTheme.containerBorder
      borderWidth: scale(0.5),
      paddingTop: scale(10),
      paddingBottom: scale(2),
      paddingLeft: scale(20),
      paddingRight: scale(10),
    },

    parameterName: {
      alignSelf: "flex-start",
      fontSize: scale(16),
      marginBottom: scale(20),
      color: "#333333", // was currentTheme.containerText
    },

    timeText: {
      fontSize: scale(12),
      color: "#666666", // was currentTheme.containerText
      fontFamily: "Roboto",
    },

    timeIcon: {
      marginRight: scale(2),
      flexDirection: "column",
    },

    valueContainer: {
      alignSelf: "center",
      flexDirection: "row",
    },

    value: {
      color: "#000000", // was currentTheme.containerText
      fontSize: scale(22),
      fontWeight: "bold",
    },
  });

export default Styles;
