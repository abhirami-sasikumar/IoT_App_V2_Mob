import { StyleSheet } from "react-native";
import {
  scale,
  verticalScale,
  moderateVerticalScale,
} from "react-native-size-matters";

const Styles =(currentTheme)=>StyleSheet.create({
      container: {
      flex: 1,
      marginHorizontal:scale(10)
    },
    header1: {
      height: verticalScale(100),
      justifyContent: "center",
    },

    header: {
      fontSize: scale(20),
      paddingLeft: scale(18),
      // color: "white",
      marginTop: verticalScale(20),
      fontFamily: "Roboto",
      justifyContent: "center",
    },
    //   emptyCard: {
    //   backgroundColor: currentTheme.background,
    //   paddingVertical: 24,
    //   paddingHorizontal: 20,
    //   flex: 1,
    //   alignItems: "center",
    //   justifyContent: "center",
    //   marginVertical: 20,
    //   marginHorizontal: 16,
    // },

    centerContent: {
      marginVertical: verticalScale(50),
      alignSelf: "center",
      alignItems: "center",
    },


    scrollView: {
      flex: 1,
    },

    scrollContent: {
      paddingBottom: verticalScale(5),
    },

  //   toggleButtonContainer: {
  //  //   width:"50%",
  //     alignSelf: "flex-end",
  //     flexDirection: "row",
  //     marginVertical: scale(10),
  //     marginHorizontal: scale(6),
  //   },

    // toggleButton: {
    //   elevation: scale(4),
    //   backgroundColor: currentTheme.card,
    //   padding: scale(7),
    //   marginRight: scale(5),
    //   borderRadius: scale(5),
    // },

    // toggleButtonText: {
    //   fontSize: scale(16),

    //   color: currentTheme.buttonText,
    // },
    locationContainer:{
      // alignItems:"center",
      padding: 12,
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 1, height: 2 },
      shadowRadius: 4,
      marginBottom: 10,
    },

    fetchingText:{
      fontSize:scale(14),
      color:'#000',
      alignSelf:"center"
      
    },

    yourLocationText:{ fontWeight: 'bold', fontSize: 18, color: '#000' },

    // coordinateText:{ color:'#000' ,marginLeft:scale(5),fontSize:scale(14)},
    loadingCircle:{
      marginTop:verticalScale(15)
    }
});

export default Styles;