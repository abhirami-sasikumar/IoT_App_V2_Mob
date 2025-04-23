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
 header1:{
  

 backgroundColor:"#810541",
 borderBottomRightRadius:scale(120),
 height:verticalScale(70),
 justifyContent:"center"

 
  },

  header: {
    fontSize: scale(24),
    paddingLeft:scale(18),
    color: "white",
    marginTop: verticalScale(8),
    fontFamily: "Roboto",

    justifyContent:"center"

    

  },
  emptyCard: {
    backgroundColor: '#f9f9f9',
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
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: verticalScale(5),
  },


});

export default styles;
