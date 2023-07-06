import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text } from 'react-native';

function PlayerSelectScreen({ route, navigation }) {
  const { numOfTeams } = route.params;
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>PlayerSelectScreen {numOfTeams}</Text>
    </View>
  );
}

export default PlayerSelectScreen;
