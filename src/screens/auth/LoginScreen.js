import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {authentication} from '../../../firebase/firebase-config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay/lib/index';

export const LoginScreen = ({navigation}) => {
  const [loggedIn, setLoggedIn] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(
      authentication,
      'shubham.chandel@gmail.com',
      '1234567',
    )
      .then(response => {
        console.log(response);
        setLoggedIn(response.email);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <Spinner visible={loading} textContent={'Loading...'} />
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={email => setEmail(email)}
          style={[styles.input, styles.shadowProp]}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={password => setPassword(password)}
          style={[styles.input, styles.shadowProp]}
        />
        <TouchableOpacity onPress={login} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Register')}>
          Don't have an account? Register!
        </Text>

        <Text>{loggedIn}</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 20,
    padding: 5,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    // width: '90%',
    // marginHorizontal: 'auto',
    marginTop: '30%',
    margin: 20,
  },
  title: {
    color: '#000',
    fontSize: 34,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -1, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  loginText: {
    color: 'coral',
    textAlign: 'center',
    marginTop: 10,
  },
});
