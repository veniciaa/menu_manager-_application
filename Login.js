import React, { useState } from 'react'; 
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Image, 
  Button 
  } from 'react-native'; 

export default function LoginScreen({ navigation }) { 
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  
  // for the validation to work 
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => { 
    let hasError = false;

    // Checks if username is entered or not
    if (username.trim() === '') {
      setUsernameError('Username is required');
      hasError = true;
    } else {
      setUsernameError('');
    }

    // Checks if password is typed in or not
    if (password.trim() === '') {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }

    // This will go to the next screen if there is no errors
    if (!hasError) {
      navigation.replace('Home'); 
    }
  }; 

  return ( 
    <View style={styles.container}> 
    {/*changes images' style*/}
      <View style={styles.imageHeader}> 

        <Image 
        source={require('./assets/logo.png')} style={styles.localImage}
         />

        <Text style={styles.heading}> 
        Login 
        </Text>

        <Image 
        source={require('./assets/profile.png')} style={styles.localImage}
         /> 

      </View> 

      {/* Username section */} 
      <Text style={styles.label}> 
      USERNAME 
      </Text> 

      <TextInput 
        style={styles.input} 
        placeholder='Enter Username' 
        value={username} 
        onChangeText={(text) => {
          setUsername(text);

          if (text.trim() !== '') setUsernameError(''); // Clear error while typing
        }} 
        autoCapitalize="none" 
      /> 

      {/* username validation text */}
      {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

      {/* Password section */} 
      <Text style={styles.label}>
       PASSWORD
        </Text> 

      <TextInput 

        style={styles.input} 
        placeholder='Enter password' 
        value={password} 
        onChangeText={(text) => {
          setPassword(text);

          if (text.trim() !== '') setPasswordError(''); // Clear error while typing
        }} 

        secureTextEntry={true} 
        autoCapitalize="none" 
      /> 

      {/* password validation text */}
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}



      {/* Buttons */} 
      <View style={styles.buttonContainer}>

        <Button 
        title="Login"
         color="black" 
         onPress={handleLogin} 
        /> 

      </View> 
      
      <View style={styles.buttonContainer}>

        <Button 
        title="Sign up" 
        color="black" 
        onPress={() => navigation.navigate('SignUp')} 
        /> 

      </View> 

    </View> 
  ); 
} 

const styles = StyleSheet.create({ 

  container: { 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#E9D69E', 
    padding: 24, 
  }, 

  heading: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20 
  }, 

  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 6, 
    color: 'black' 
  }, 

  input: { 
    borderWidth: 1, 
    borderColor: 'gray', 
    padding: 10, 
    marginBottom: 5, // Reduced slightly to account for error message placement
    borderRadius: 5, 
    backgroundColor: 'white' 
  },

  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '500'
  },

  imageHeader: { 
    flex: 1,
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
  } 

});

/*REFERENCES

DevGenius. 2021. The Different Comment Syntaxes of React [Blog]. Available: https://blog.devgenius.io/the-different-comment-syntaxes-of-react-1ee67f909762 [Accessed 03 September 2026].

Meta Platforms, Inc. 2026. Alert [Online]. Available: https://reactnative.dev/docs/alert [Accessed 7 September 2026]. */