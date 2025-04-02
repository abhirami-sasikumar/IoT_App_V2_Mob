import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "lightblue",
      padding: 15,
      margin: 7,
      borderRadius: 15,
      elevation: 3, // Shadow for Android
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      width: "95%",
      alignSelf: "center",
      height: 55, // ⬆ Increased height
    },
    cardText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#133E87",
      

    },
    arrow: {
      width: 20,
      height: 20,
      resizeMode: "contain",
      tintColor: "#133E87",
    },
  });
  
  export default styles;
  
