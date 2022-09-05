import React from 'react';
// eslint-disable-next-line import/namespace
import { View, Text, StyleSheet } from 'react-native';
import { Caption, Button } from 'react-native-paper';
import { AuthContext } from '@rnTodo/providers/AuthProvider';
import { LOGIN, SET_BIOMETRICS_STATUS, AUTH_STATUS } from '@rnTodo/constatnts';
import { utils } from '@rnTodo/utils';

import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const { auth, dispatchAuth: dispatch } = React.useContext(AuthContext);
  const navigation = useNavigation();
  // const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
  // const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const onAuthenticate = () => {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with touch ID',
      fallbackLabel: 'Enter Password',
    });
    auth.then(async (result) => {
      // setIsAuthenticated(result.success);
      dispatch({
        type: LOGIN,
        data: result.success,
      });
      await utils.saveToStorage(AUTH_STATUS, new Date().getTime());
      navigation.replace('Home');
      console.log(result);
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.caption}>
        <Caption style={styles.captionText}>My TODO</Caption>
      </View>
      <View style={styles.bottom}>
        <Button mode="contained" onPress={onAuthenticate}>
          Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  caption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  captionText: {
    fontSize: 32,
    lineHeight: 50,
  },
});

export default Login;
