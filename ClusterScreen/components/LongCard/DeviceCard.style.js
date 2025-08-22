import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  card: {
    flexDirection: 'row', // Arrange children (left and right content) in a row
    justifyContent: 'space-between', // Distribute space between left and right content
    alignItems: 'center', // Vertically align items in the center
    backgroundColor: '#FFFFFF', // White background for the card
    borderRadius: scale(10), // Rounded corners
    padding: moderateScale(15), // Inner padding
    marginVertical: verticalScale(8), // Vertical margin between cards
    marginHorizontal: moderateScale(20), // Added horizontal margin for spacing
    width: '100%', // Changed to 100% to occupy the full row
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  leftContent: {
    flex: 1.5, // Take up more space on the left
    alignItems: 'flex-start', // Align text to the left
    marginRight: moderateScale(10), // Space between left and right sections
  },
  rightContent: {
    flex: 1, // Take up remaining space on the right
    alignItems: 'flex-end', // Align text to the right
    marginLeft: moderateScale(10), // Space between left and right sections
  },
  parameterName: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#810541', // Dark red color
    fontFamily: 'Roboto',
    marginBottom: verticalScale(2),
  },
  valueText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#333333', // Dark grey for value
    fontFamily: 'Roboto',
    marginBottom: verticalScale(2),
  },
  timeText: {
    fontSize: scale(10),
    color: '#666666', // Lighter grey for time
    fontFamily: 'Roboto',
  },
  clusterName: {
    fontSize: scale(12),
    fontWeight: 'bold',
    color: '#4A4A4A', // Medium grey for cluster name
    fontFamily: 'Roboto',
    textAlign: 'right',
    marginBottom: verticalScale(2),
  },
  deviceLocation: {
    fontSize: scale(11),
    color: '#666666', // Lighter grey for device location
    fontFamily: 'Roboto',
    textAlign: 'right',
  },
});
