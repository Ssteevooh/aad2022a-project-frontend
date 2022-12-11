import 'react-native-gesture-handler';
import { View, Text, TextInput, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        </View>
    );
}

function UserScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.navigate('Home')} title='Modify'/>
        </View>
    );
}

function FamilyScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        </View>
    );
}

function SignOut() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        </View>
    );
}
const Home = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="User" component={UserScreen} />
            <Drawer.Screen name="Family" component={FamilyScreen} />
            <Drawer.Screen name="Sign Out" component={SignOut} />
        </Drawer.Navigator>
    )
}

export default Home;
