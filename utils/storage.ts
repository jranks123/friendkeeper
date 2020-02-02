import {AsyncStorage} from "react-native";
import {getTodaysDateString} from "./date";

export const retrieveItem = async (key: string): Promise<string | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            return value;
        }
        return null
    } catch (error) {
        alert("There was an error retrieving data: " + error);
        // Error retrieving data
    }
};

export const updateItemLastDone = async (name: string): Promise<void> => {
    try {
        let friendsJson =  await retrieveItem("names");
        if (friendsJson != null) {
            const friends: Friend[] = JSON.parse(friendsJson);
            friends.forEach(friend => {
                if (friend.name === name) {
                    friend.dateOfLastRendezvous = new Date(Date.parse(getTodaysDateString())).toString()
                }
            });
            await AsyncStorage.setItem("names", JSON.stringify(friends));
        } else {
            alert("No friends")
        }
    } catch (e) {
        alert("error storing data: " + e);
    }
};




export const setItem = async (key: string, value):  Promise<boolean> => {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    } catch {

    }
};

export const getNewIdNumber = async (): Promise<string> => {
    try {
        let friendsJson =  await retrieveItem("names");
        if (friendsJson != null) {
            const friends: Friend[] = JSON.parse(friendsJson);
            if (friends.length > 0) {
                return (friends.map(x => parseInt(x.id)).reduce((x, y) => Math.max(x, y)) + 1).toString()
            }
            return "0"
        }
    } catch (e) {
        alert("error storing data: " + e);
    }
};

export const addFriendToData = async (friend: Friend): Promise<void> => {
    try {
        let friendsJson =  await retrieveItem("names");
        if (friendsJson != null) {
            const friends: Friend[] = JSON.parse(friendsJson);


            friends.push(friend);
            await AsyncStorage.setItem("names", JSON.stringify(friends));
        } else {
            await AsyncStorage.setItem("names", JSON.stringify([friend]));
        }
    } catch (e) {
        alert("error storing data: " + e);
    }
};


