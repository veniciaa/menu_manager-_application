import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // FORCE ROUTING: Bypasses all checks and alerts to guarantee redirection
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

          <View style={styles.imageHeader}>
            <Image 
              source={require('./assets/logo.png')} 
              style={styles.localImage} 
            />
            <Text style={styles.heading}>Sign Up</Text>
            <Image 
              source={require('./assets/profile.png')} 
              style={styles.localImage} 
            />
          </View>

          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="grey"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="example@email.com"
            placeholderTextColor="grey"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>USERNAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="grey"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.button}>
            <Button 
              title="Sign Up"
              color="black"
              onPress={handleSignUp}
            />
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, 
    backgroundColor: '#E9D69E'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 24,
    paddingVertical: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: 'black',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: 'black'
  },
  imageHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10
  },
  localImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  button: {
    marginTop: 24,
  },
});

{/*REFERENCE Robinson, S. 2026. How to Align Images in React Native [Blog]. Available: https://stackabuse.com/how-to-align-images-in-react-native/ [Accessed 2 September 2026].*/}