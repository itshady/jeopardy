import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import Menu from './Menu';


function App() {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;