import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import FriendListPage from "./pages/FriendListPage/FriendListPage";
import AddFriend from "./pages/AddFriend/AddFriend";

const MainNavigator = createStackNavigator({
    FriendKeeper: {screen: FriendListPage},
    AddFriend: {screen: AddFriend},
});

const App = createAppContainer(MainNavigator);

export default App;