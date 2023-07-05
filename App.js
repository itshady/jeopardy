import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyDrawer from './MyDrawer';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="Home">
  //       <Stack.Screen name="Home" component={HomeScreen} />
  //       <Stack.Screen 
  //         name="Details" 
  //         component={DetailsScreen} 
  //         options={{ title: 'Details Edited' }}
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

export default App;


// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';

// // Import your screen components
// import FirstTabScreen from './FirstTabScreen';
// import SecondTabScreen from './SecondTabScreen';
// import ThirdTabScreen from './ThirdTabScreen';
// import FourthTabScreen from './FourthTabScreen';

// // Create the Tab navigators
// const FirstTab = createBottomTabNavigator();

// function FirstTabNavigator() {
//   return (
//     <FirstTab.Navigator>
//       <FirstTab.Screen name="FirstTabScreen" component={FirstTabScreen} />
//       <FirstTab.Screen name="SecondTabScreen" component={SecondTabScreen} />
//     </FirstTab.Navigator>
//   );
// }

// const SecondTab = createBottomTabNavigator();

// function SecondTabNavigator() {
//   return (
//     <SecondTab.Navigator>
//       <SecondTab.Screen name="ThirdTabScreen" component={ThirdTabScreen} />
//       <SecondTab.Screen name="FourthTabScreen" component={FourthTabScreen} />
//     </SecondTab.Navigator>
//   );
// }

// // Create the Drawer navigator
// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="FirstTabNavigator">
//         <Drawer.Screen name="FirstTabNavigator" component={FirstTabNavigator} />
//         <Drawer.Screen name="SecondTabNavigator" component={SecondTabNavigator} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }