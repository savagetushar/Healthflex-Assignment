import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTimers } from '../context/TimerContext';
import TimerForm from '../components/TimerForm';

const AddTimerScreen = ({ navigation }) => {
  const { timers, addTimer } = useTimers();

  const categories = ['Workout', 'Study', 'Break', 'Cooking', 'Other'];
  const existingCategories = [...new Set(timers.map(timer => timer.category))];
  const allCategories = [...new Set([...categories, ...existingCategories])];

  const handleSubmit = (newTimer) => {
    addTimer(newTimer);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TimerForm onSubmit={handleSubmit} categories={allCategories} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default AddTimerScreen;