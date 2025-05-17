import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMERS_KEY = '@timers';
const HISTORY_KEY = '@history';

export const loadTimers = async () => {
  try {
    const savedTimers = await AsyncStorage.getItem(TIMERS_KEY);
    return savedTimers ? JSON.parse(savedTimers) : [];
  } catch (error) {
    console.error('Failed to load timers:', error);
    return [];
  }
};

export const saveTimers = async (timers) => {
  try {
    await AsyncStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
  } catch (error) {
    console.error('Failed to save timers:', error);
  }
};

export const loadHistory = async () => {
  try {
    const savedHistory = await AsyncStorage.getItem(HISTORY_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
};

export const saveHistory = async (history) => {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
};