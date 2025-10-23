import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loaderShadow: {
        shadowColor: '#000',          // black shadow
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 90,                 // for Android
        alignItems: 'center',
        justifyContent: 'center',
    },

    loadingText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "#ffff",
        fontFamily: "Roboto",
        textShadowColor: "#000",        // Black shadow
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,



    }
});