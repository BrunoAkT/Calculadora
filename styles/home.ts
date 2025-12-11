import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#28295aff',
        flex: 1,
        padding: 5,
    },
    header: {
        width: '100%',
        height: '30%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 10,
    },
    headerMarkText: {
        color: '#ffffff',
        fontSize: 50,
        lineHeight: 50,
        fontFamily: 'Poppins_400Regular',
    },
    headerSubText: {
        color: '#ffffff6e',
        fontSize: 30,
        fontFamily: 'Poppins_400Regular',
    },
    headerText: {
        color: '#ffffff',
        fontSize: 80,
        lineHeight: 80,
        fontFamily: 'Poppins_400Regular',
        paddingLeft: 20,
    },
    headerValue: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
    },
    body: {
        width: '100%',
        height: '80%',
        padding: 5,
    },
    buttonsContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
    }
});
