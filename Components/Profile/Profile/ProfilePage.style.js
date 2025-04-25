import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },

  scrollView: {
    alignItems: "center",
    paddingBottom: verticalScale(20),
  },

  headerContainer: {
    backgroundColor: "#810541",
    width: "100%",
    height: verticalScale(55),

    borderBottomRightRadius:moderateScale(170),

    
    justifyContent:"center",

    
    
  },

  Profile: {
    marginTop: verticalScale(8),

    fontSize: scale(20),
    color: "#fff",
    fontFamily: "Roboto",
    paddingBottom:verticalScale(),
    paddingLeft:scale(18),
    justifyContent:"center"

    
  },

  avatarWrapper: {
    position: "absolute",
    top: verticalScale(80),
    backgroundColor: "#f9f9f9",
    borderRadius: scale(50),
    padding: scale(4),
    borderColor:"#c0c0c0",
    borderWidth:scale(1)
    
  },

  avatar: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(40),
    resizeMode: "contain",
    tintColor:"#810541"

  },
  UserName:{
    top:verticalScale(160),
    position:"absolute",

  },
  Username:{
    fontWeight:"bold",
    fontSize:scale(15),
    color:"#1e1e1e"

  },
  Card:{
    flexDirection: "row",
    
    alignItems: "center",
    backgroundColor: "white",
    padding:moderateScale( 10),
    margin: moderateScale(5),
    borderRadius: 15,
    elevation: 3, // Shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "95%",
    alignSelf: "center",
    height: verticalScale(35),
    top:verticalScale(140)


  },
  CardText:{
    flexDirection:"row",
    fontSize:scale(13),
    fontWeight:"roboto",
    marginHorizontal:moderateScale(20)
    

  },
 

  menuWrapper: {
    
    
    
    backgroundColor: "white",
    paddingTop: moderateScale(5),
    margin: moderateScale(5),
    borderRadius: 15,
    elevation: 3, // Shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "95%",
    alignSelf: "center",
    height: verticalScale(160),
    
    marginTop: verticalScale(160),
    width: "95%",
  },

  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(11),
    borderBottomWidth: verticalScale(0.25),
    borderBottomColor: "#c0c0c0",
    
    marginLeft:scale(15)
  },
  Deletebutton:{
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(10),
    marginLeft:scale(15)

  },

  menuText: {
    marginLeft: scale(15),
    fontSize: scale(12),
    color: "#",
    fontWeight: "roboto",
  },
  Delete:{
    marginLeft: scale(15),
    fontSize: scale(12),
    color: "red",
    fontWeight: "roboto",

  }
});