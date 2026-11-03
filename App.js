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
  //Adding in the 3 dishes pre-set in the menuList state variable to be used in the MenuScreen and AddToMenuScreen components
  const [menuList, setMenuList] = useState([
    //Dish 1
    { 
      id: 'd1', //id is used to identify each dish 
      dish: 'Salad', // Name of the dish
      description: 'Fresh garden salad with a light vinaigrette dressing.', // Description of the dish
      course: 'Starter Course', // Course the dish is in (Starter, Main, Dessert)
      price: '60', // Price of the dish
      image: require('./assets/salad.jpg') // Image of the dish if one is taken
    },

    //Dish 2
    { 
      id: 'd2',
      dish: 'Steak and Mash', 
      description: 'Juicy steak served with creamy mashed potatoes.',
      course: 'Main Course', 
      price: '200', 
      image: require('./assets/steak.jpg') 
    },

    //Dish 3
    { 
      id: 'd3',
      dish: 'Tiramisu', 
      description: 'Classic dessert made with layers of coffee-soaked ladyfingers and cream.',
      course: 'Dessert Course', 
      price: '80', 
      image: require('./assets/dessert.png') 
    }
  ]);

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