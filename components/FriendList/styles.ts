import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    friendContainer: {
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'row',
    },
    redBackground: {
        backgroundColor: 'red'
    },
    amberBackground: {
        backgroundColor: 'orange'
    },
    greenBackground: {
        backgroundColor: 'green'
    },
    statusBar: {
        flex: 1,
        width: 10,
    },
    friendInfo: {
        flex: 24,
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    buttonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
});

