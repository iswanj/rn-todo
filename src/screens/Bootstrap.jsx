import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import { LOGIN, SET_BIOMETRICS_STATUS, AUTH_STATUS } from '@rnTodo/constatnts';

import { utils } from '@rnTodo/utils';

import { AuthContext } from '@rnTodo/providers/AuthProvider';

const Bootstrap = () => {
  const { auth, dispatchAuth: dispatch } = React.useContext(AuthContext);
  const navigation = useNavigation();

  React.useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      dispatch({
        type: SET_BIOMETRICS_STATUS,
        data: compatible,
      });
    })();
  }, []);
  
  React.useEffect(async () => {
    const authStat = await utils.loadFromStorage(AUTH_STATUS);
    if (authStat) {
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  }, [auth.isAuthenticated]);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating={true} color="#333" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
  },
});

export default Bootstrap;
