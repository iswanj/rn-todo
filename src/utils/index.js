import * as SecureStore from 'expo-secure-store';

export const utils = {
  async saveToStorage(key, valueToSave) {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(valueToSave))
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async loadFromStorage(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return JSON.parse(item);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async removeFromStorage(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
}