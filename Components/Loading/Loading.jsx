import { ActivityIndicator, View, Text } from "react-native";
import { styles } from "./Loading.style";

const Loading = () => {
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <ActivityIndicator size="large" color="#810541" style={styles.loader} />
                <Text style={styles.loadingText}>Fetching nearby devices...</Text>
            </View>
        </View>
    );
};

export default Loading;