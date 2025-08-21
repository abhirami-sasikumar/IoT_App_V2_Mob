import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

const Styles = (currentTheme) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 12,
    },
    cardWrapper: {
      borderWidth: 0.5,
      borderColor: '#000',
      padding: scale(10),
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: '#810541',
      shadowOpacity: 0.1,
      shadowOffset: { width: 1, height: 2 },
      shadowRadius: 5,
    },
    metaInfo: {
      marginLeft: scale(12),
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: 6,
      color: '#fff',
    },
    label: {
      fontSize: 14,
      marginBottom: 4,
      color: '#fff',
    },
  });

export default Styles;
