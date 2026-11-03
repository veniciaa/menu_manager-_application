import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Button 
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
       {/* header is use to allow images to be in a column */}
      <View style={styles.imageHeader}>
      <Image 
        source={require('./assets/logo.png')} 
        style={styles.localImage} 
      />
      

      <Image 
        source={require('./assets/profile.png')} 
        style={styles.localImage} 
      />
      
        </View>

      <Text style={styles.heading}>Home</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button 
            title="View Menu" 
            color="black" 
            onPress={() => navigation.navigate('Menu')} 
          />
        </View>

        <View style={styles.button}>
          <Button 
            title="Add Item" 
            color="black" 
            onPress={() => navigation.navigate('AddToMenu')} 
          />
        </View>

        <View style={styles.button}>
          <Button 
            title="Back" 
            color="black" 
            onPress={() => navigation.replace('Login')}
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E9D69E',
    padding: 20
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333'
  },
  
  imageHeader: {
  flexDirection: 'column',
  justifyContent: 'center',
    gap: 15,
    marginBottom: 10
  },

  localImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    
  },

  buttonContainer: {
    marginTop: 10,
  },

  button: {
    marginTop: 10,
  },

});