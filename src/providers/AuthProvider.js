import React, { useReducer } from 'react';
import { LOGIN, LOGOUT, SET_BIOMETRICS_STATUS } from '@rnTodo/constatnts';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  isBiometricSupported: false
};

function reducer(state, action) {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN:
      return { ...state, isAuthenticated: action?.data };
    case SET_BIOMETRICS_STATUS:
      return { ...state, isBiometricSupported: action?.data };
    default:
      throw new Error('Invalid action type');
  }
}

const AuthProvider = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        auth,
        dispatchAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
