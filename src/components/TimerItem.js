import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';
import { formatTime } from '../utils/helpers';

const TimerItem = ({ timer, onStart, onPause, onReset, onComplete }) => {
  const [remaining, setRemaining] = useState(timer.duration);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHalfwayAlert, setShowHalfwayAlert] = useState(false);

  useEffect(() => {
    let interval;
    
    if (isActive && remaining > 0) {
      interval = setInterval(() => {
        setRemaining(prev => {
          const newRemaining = prev - 1;
          
          // Check for halfway alert
          if (timer.alertAtHalf && newRemaining <= timer.duration / 2 && !showHalfwayAlert) {
            setShowHalfwayAlert(true);
            alert(`Halfway there! ${timer.name}`);
          }
          
          return newRemaining;
        });
      }, 1000);
    } else if (remaining === 0 && isActive) {
      setIsActive(false);
      setIsCompleted(true);
      onComplete(timer);
    }

    return () => clearInterval(interval);
  }, [isActive, remaining, timer]);

  const handleStart = () => {
    setIsActive(true);
    setIsCompleted(false);
    onStart(timer.id);
  };

  const handlePause = () => {
    setIsActive(false);
    onPause(timer.id, remaining);
  };

  const handleReset = () => {
    setIsActive(false);
    setRemaining(timer.duration);
    setIsCompleted(false);
    setShowHalfwayAlert(false);
    onReset(timer.id);
  };

  const progress = ((timer.duration - remaining) / timer.duration) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text style={styles.time}>{formatTime(remaining)}</Text>
      <ProgressBar progress={progress} />
      
      <View style={styles.controls}>
        {!isActive && !isCompleted && (
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        
        {isActive && (
          <TouchableOpacity style={styles.button} onPress={handlePause}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.status}>
        Status: {isCompleted ? 'Completed' : isActive ? 'Running' : 'Paused'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  status: {
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default TimerItem;