import { createDrawerNavigator } from '@react-navigation/drawer';
import SecondDrawer from './SecondDrawer'
import { View, Text } from 'react-native';

const Drawer = createDrawerNavigator();

function Article() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
      </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator 
      drawerStyle={{
        height: '50%', // Set this to whatever percentage or fixed height you want
      }}
    >
      <Drawer.Screen name="SecondDrawer" component={SecondDrawer} />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
}

export default MyDrawer;