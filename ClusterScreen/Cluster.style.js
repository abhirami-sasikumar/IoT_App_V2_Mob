// Cluster.style.js
import { StyleSheet } from "react-native";
import {
  scale,
  verticalScale,
  moderateVerticalScale,
} from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    fontSize: scale(22),
    textAlign: "center",
    color: "#133E87",
    marginTop: verticalScale(8),
    fontFamily: "Roboto",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: verticalScale(5),
  },

  content: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },

});

export default styles;
