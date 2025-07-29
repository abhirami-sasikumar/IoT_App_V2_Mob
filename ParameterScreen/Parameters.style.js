// Parameters.style.js (or Cluster.style.js if that's the one imported)
import { StyleSheet } from "react-native";
import {
  scale,
  verticalScale,
  moderateVerticalScale,
} from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the main container takes full screen height
  },
  header1: {
    backgroundColor: "#810541",
    borderBottomRightRadius: scale(120),
    height: verticalScale(55),
    justifyContent: "center",
  },
  header: {
    fontSize: scale(22),
    textAlign: "center",
    color: "#133E87",
    marginTop: verticalScale(8),
    fontFamily: "Roboto",
  },
  // Add an explicit style for the ScrollView itself to ensure it takes flexible height
  scrollViewStyle: {
    flex: 1, // Make ScrollView take all available vertical space
    // Optional: Add a background color here to debug its boundaries in APK
    // backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red to see scrollable area
  },
  // This padding is applied to the *content* inside the ScrollView
  scrollContainer: {
    paddingBottom: verticalScale(5), // Increased padding for a clear gap (adjust as needed)
    // Optional: Add a background color here to debug the content container boundary
    // backgroundColor: 'rgba(0, 255, 0, 0.1)', // Light green for content
  },
  content: {
    // Ensure this inner View doesn't have flex: 1 or fixed height that would stretch over padding
    // If you have styles here, ensure they don't override the space
  },
  errorText: {
    fontSize: scale(16),
    color: 'red',
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
  noDataText: {
    fontSize: scale(16),
    color: '#555',
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
});

export default styles;