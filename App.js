import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screen files
import SplashScreen from './Splash';
import LoginScreen from './Login';
import SignUpScreen from './SignUp';
import HomeScreen from './Home';
import MenuScreen from './Menu';
import AddToMenuScreen from './AddToMenu';

export const MenuContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  // Global state variables pass directly down into our application context tree
  const [menuList, setMenuList] = useState([]);

  return (
    <MenuContext.Provider value={{ menuList, setMenuList }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="AddToMenu" component={AddToMenuScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuContext.Provider>
  );
}