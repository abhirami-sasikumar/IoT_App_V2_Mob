import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export default StyleSheet.create({
  container: {
    flex: 1, // Ensure the main container takes up all available space
    backgroundColor: "#F4F7FC",
  },
  headerContainer: {
    backgroundColor: "#810541",
    borderBottomRightRadius: scale(120),
    height: verticalScale(55),
    justifyContent: "center",
  },
  header: {
    fontSize: scale(22),
    marginLeft: scale(22),
    color: "white",
    marginTop: verticalScale(8),
    fontFamily: "Roboto",
    justifyContent: "center"
  },
  subHeader: {
    fontSize: scale(14),
    color: "#E0E0E0",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  scrollView: {
    flex: 1, // Crucial: Allow ScrollView to expand and take available vertical space
    paddingTop: verticalScale(10),
  },
  scrollContent: {
    flexGrow: 1, // Important: Allows content inside ScrollView to grow if needed
    alignItems: "center",
    paddingBottom: verticalScale(20),
  },
  allNearbyDevicesHeading: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: "#810541",
    fontFamily: "Roboto",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    textAlign: 'center',
    width: '90%',
  },
  deviceCardsGrid: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    width: "100%",
    marginLeft: moderateScale(10), // Added left margin here
  },
  emptyCard: {
    backgroundColor: "white",
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 16,
  },
  emptyMessage: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    fontFamily:"Roboto"
  },
  userLocationSection: {
    backgroundColor: "#F4F7FC",
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(20),
    alignItems: "flex-start",
    justifyContent: "center",
    width: '100%',
    marginTop: verticalScale(15),
    marginBottom: verticalScale(15),
  },
  locationLineWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(5),
    width: '100%',
  },
  locationIcon: {
    fontSize: scale(20),
    marginRight: moderateScale(8),
  },
  locationLineCombined: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    flexWrap: 'wrap',
  },
  locationLineLeft: {
    marginBottom: verticalScale(2),
    width: '100%',
    alignItems: 'flex-start',
  },
  userLocationHeading: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#810541",
    fontFamily: "Roboto",
    marginRight: moderateScale(5),
  },
  userLocationText: {
    fontSize: scale(14),
    color: "#4A4A4A",
    fontFamily: "Roboto",
    flexShrink: 1,
    textAlign: 'left',
    numberOfLines: 2,
    ellipsizeMode: 'tail',
  },
  userLocationSubText: {
    fontSize: scale(12),
    color: "#666666",
    fontFamily: "Roboto",
    flexShrink: 1,
    textAlign: 'left',
    numberOfLines: 2,
    ellipsizeMode: 'tail',
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: moderateScale(10),
    marginBottom: verticalScale(5),
  },
});
