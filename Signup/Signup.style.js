import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";



export const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: "#fff",
        // Solid background to avoid override

        
    },
   field :{
    paddingBottom:verticalScale(),
    marginTop:verticalScale()
   },
   login :{
    marginTop:verticalScale(10)
   },

   footer :{
    marginTop:verticalScale(35)
   },
   
   
  
});