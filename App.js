import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

// Screens
import HomeScreen from '@rnTodo/screens/Home';
import LoginScreen from '@rnTodo/screens/Login';
import BootstrapScreen from '@rnTodo/screens/Bootstrap';

import AuthProvider from '@rnTodo/providers/AuthProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AuthProvider>
          <Stack.Navigator
            initialRouteName="Bootstrap"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Bootstrap" component={BootstrapScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </AuthProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
