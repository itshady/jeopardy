import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './Screens/StartScreen';
import TeamsScreen from './Screens/TeamsScreen';
import PlayerSelectScreen from './Screens/PlayerSelectScreen';
import FinalizeTeamsScreen from './Screens/FinalizeTeamsScreen';
import GameScreen from './Screens/GameScreen'

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
          title: 'Team 1',
          // Add a placeholder button without the `onPress` to avoid flicker
          headerRight: () => (
            <Button title="Next Team" />
          ),
        })}
      />
      <Stack.Screen 
        name="FinalTeams" 
        component={FinalizeTeamsScreen} 
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Text>How many people per team</Text>,
          title: 'Final Teams',
          // Add a placeholder button without the `onPress` to avoid flicker
          headerRight: () => (
            <Button title="Start Game" 
              onPress={() => navigation.push('RunningGame')}
            />
          ),
        })}
      />
      <Stack.Screen 
        name="RunningGame" 
        component={GameScreen} 
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Text>How many people per team</Text>,
          title: 'Game on!',
        })}
      />
    </Stack.Navigator>
  );
}

export default Menu;