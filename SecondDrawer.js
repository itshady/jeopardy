import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';

function Feed() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      </View>
  );
}

function Article() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Article Screen</Text>
      </View>
  );
}

const Drawer = createDrawerNavigator();

function SecondDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

export default SecondDrawer;