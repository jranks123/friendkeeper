import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import FriendList from "./components/FriendList/FriendList";
import AddFriend from "./components/AddFriend/AddFriend";

const MainNavigator = createStackNavigator({
    TaskList: {screen: FriendList},
    AddTask: {screen: AddFriend},
});

const App = createAppContainer(MainNavigator);

export default App;