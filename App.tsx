import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import FriendList from "./FriendList";
import AddFriend from "./AddFriend";

const MainNavigator = createStackNavigator({
    Home: {screen: FriendList},
    AddFriend: {screen: AddFriend},
});

const App = createAppContainer(MainNavigator);

export default App;