import {AsyncStorage} from "react-native";

export const retrieveData = async (key: string): Promise<string | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            return value;
        }
        return null
    } catch (error) {
        alert("There was an error retrieving data: " + error);
        return null;
        // Error retrieving data
    }
};


export const addFriendToData = async (friend: Friend): Promise<void> => {
    try {
        let friendsJson =  await retrieveData("names");
        if (friendsJson != null) {
            const friends: [Friend] = JSON.parse(friendsJson);
            alert(friendsJson);
            friends.push(friend);
            alert(friendsJson);
            await AsyncStorage.setItem("names", JSON.stringify(friends));
        } else {
            await AsyncStorage.setItem("names", JSON.stringify(friend));
        }
    } catch (e) {
        alert("error storing data: " + e);
    }
};