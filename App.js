import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

// IMPORT YOUR ACTUAL COMPONENT FILES
import HomeScreen from './Home';
import MenuScreen from './Menu';
import AddToMenuScreen from './AddToMenu';

// SHARE MENU DATA BETWEEN SCREENS
export const MenuContext = createContext();

const Stack = createNativeStackNavigator();

// SPLASH SCREEN
function SplashScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9D69E',
      }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Menu Manager</Text>
      <Text
        style={{ marginTop: 20, fontSize: 18, color: 'blue' }}
        onPress={() => navigation.navigate('Login')}>
        Continue
      </Text>
    </View>
  );
}

// LOGIN SCREEN
function LoginScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9D69E',
      }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Login</Text>
      <Text
        style={{ marginTop: 20, fontSize: 18, color: 'blue' }}
        onPress={() => navigation.navigate('Home')}>
        Login
      </Text>
      <Text
        style={{ marginTop: 20, fontSize: 18, color: 'blue' }}
        onPress={() => navigation.navigate('SignUp')}>
        Sign Up
      </Text>
    </View>
  );
}

// SIGN UP SCREEN
function SignUpScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9D69E',
      }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Sign Up</Text>
      <Text
        style={{ marginTop: 20, fontSize: 18, color: 'blue' }}
        onPress={() => navigation.navigate('Home')}>
        Continue
      </Text>
    </View>
  );
}

export default function App() {
  // MENU ITEMS
  const [menuList, setMenuList] = useState([
    {
      id: 'd1',
      dish: 'Salad',
      description: 'Fresh garden salad with a light vinaigrette dressing.',
      course: 'Starter Course',
      price: '60',
      image: require('./assets/salad.jpg'),
    },
    {
      id: 'd2',
      dish: 'Steak and Mash',
      description: 'Juicy steak served with creamy mashed potatoes.',
      course: 'Main Course',
      price: '200',
      image: require('./assets/steak.jpg'),
    },
    {
      id: 'd3',
      dish: 'Tiramisu',
      description: 'Classic dessert made with layers of coffee-soaked ladyfingers and cream.',
      course: 'Dessert Course',
      price: '80',
      image: require('./assets/dessert.png'),
    },
  ]);

  return (
    <MenuContext.Provider value={{ menuList, setMenuList }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
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
