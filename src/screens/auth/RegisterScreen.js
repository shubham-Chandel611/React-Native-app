import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {authentication} from '../../../firebase/firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth';

function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [noMatch, setNoMatch] = useState(false);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      return false;
    } else return true;
  };

  async function registerUser() {
    if (!name || !email || !password || !confirmPassword) {
      console.log('empty fields');
    } else {
      if (validatePassword()) {
        try {
          const userCredentials = await createUserWithEmailAndPassword(
            authentication,
            email,
            password,
          );
          if (userCredentials) {
            console.log(userCredentials);
            // setCurrentUser(userCredentials.email);
            navigation.navigate('Login');
          }
        } catch (error) {
          console.error(error);
        }
      } else setNoMatch(true);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.title}>Register</Text>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={name => setName(name)}
          style={[styles.input, styles.shadowProp]}
        />
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
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          style={[styles.input, styles.shadowProp]}
        />
        {noMatch && <Text style={styles.error}>Passwords do not Match!</Text>}
        <TouchableOpacity onPress={registerUser} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}>
          Already have an account? Login!
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  error: {
    color: 'red',
  },
  loginText: {
    color: 'coral',
    textAlign: 'center',
    marginTop: 10,
  },
});
export default RegisterScreen;
