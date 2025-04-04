import { ActivityIndicator } from "react-native";
import { styles } from "./Loading.style";

const Loading = () =>{
    return(
        <ActivityIndicator size="large" color="#133E87" style={styles.loader}/>
    )
}

export default Loading;