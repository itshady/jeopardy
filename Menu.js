import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './StartScreen'
import TeamsScreen from './TeamsScreen';
import PlayerSelectScreen from './PlayerSelectScreen';

const Stack = createNativeStackNavigator();

function Menu() {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} 
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Text>How many people per team</Text>,
          title: 'Welcome to Jeopardy',
          // Add a placeholder button without the `onPress` to avoid flicker
          headerRight: () => (
            <Button title="Start" 
              onPress={() => 
                navigation.push('Teams', {
                itemId: 86,
                otherParam: 'anything you want here',
              })}
            />
          ),
        })}
      />
      <Stack.Screen 
        name="Teams" 
        component={TeamsScreen} 
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Text>How many people per team</Text>,
          title: 'How many people per team',
          // Add a placeholder button without the `onPress` to avoid flicker
          headerRight: () => (
            <Button title="Next" />
          ),
        })}
      />
      <Stack.Screen 
        name="PlayerSelect" 
        component={PlayerSelectScreen} 
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Text>How many people per team</Text>,
          title: 'How many people per team',
          // Add a placeholder button without the `onPress` to avoid flicker
          headerRight: () => (
            <Button title="Next" 
              onPress={() => 
                navigation.push('Start', {
                itemId: 86,
                otherParam: 'anything you want here',
              })}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default Menu;