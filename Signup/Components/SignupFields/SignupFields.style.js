import { StyleSheet } from "react-native";

export default StyleSheet.create({
  view: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    top:260
  },

  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },

  input: {
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 29,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },

  buttonContainer: {
    width: "100%",
    marginTop: 15,
    alignItems: "center",
  },

  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#133E87",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 29,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
