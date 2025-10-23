import { ActivityIndicator, View, Text } from "react-native";
import { styles } from "./Loading.style";

const Loading = () => {
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.loaderShadow}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
                <Text style={styles.loadingText}>Fetching nearby devices...</Text>
            </View>
        </View>
    );
};

export default Loading;