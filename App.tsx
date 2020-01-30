import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import FriendListPage from "./pages/FriendListPage/FriendListPage";
import AddFriend from "./pages/AddFriend/AddFriend";
import FriendInfo from "./pages/FriendInfo/FriendInfo";

const MainNavigator = createStackNavigator({
    FriendKeeper: {screen: FriendListPage},
    AddFriend: {screen: AddFriend},
    FriendInfo: {screen: FriendInfo}
});

const App = createAppContainer(MainNavigator);

export default App;