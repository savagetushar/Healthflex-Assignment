import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 2.5,
    overflow: 'hidden',
    marginVertical: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});

export default ProgressBar;