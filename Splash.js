import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // goes to login screen after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');//goes to login screen
    }, 2500);

//for timer
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>

      <Image 
      source={require('./assets/splash.jpg')}
       style={styles.localImage}
        />

      <Text style={styles.heading}>

      CHRISTOFFEL'S Menu Manager

      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9D69E',
  },

  localImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
    
  },
  
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
  },
});
/*REFERENCES
Ansari, R. 2022. React Native Animated Splash Screens [Blog]. Available: https://medium.com/@rafiulansari/react-native-animated-splash-screens-e3719671dab6 [Accessed 8 September 2026]

ReactNativeCode. 2018. React-Native tutorial # 17 create a splash screen | Loading screen [Video]. YouTube. Available: https://youtu.be/-nXaeXIRS6E?si=cifWEQaKZhjr5AY0 [Accessed 7 September 2026].


 */