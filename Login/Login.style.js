import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: "#fff",
  },
  keyboardContainer: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  footer: {
    position: "absolute",
    bottom: 20,  // Keeps it at the bottom
    alignSelf: "center",
  },
});

export default styles;
