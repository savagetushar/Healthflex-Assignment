import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTimers } from '../context/TimerContext';
import TimerItem from '../components/TimerItem';
import CategoryItem from '../components/CategoryItem';
import TimerModal from '../components/TimerModal';
import { groupByCategory } from '../utils/helpers';

const HomeScreen = ({ navigation }) => {
  const { timers, updateTimer, addToHistory, isLoading } = useTimers();
  const [completedTimer, setCompletedTimer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const groupedTimers = groupByCategory(timers);
  const categories = Object.keys(groupedTimers).sort();

  const handleStart = (id) => {
    updateTimer(id, { isActive: true, isCompleted: false });
  };

  const handlePause = (id, remaining) => {
    updateTimer(id, { isActive: false, remaining });
  };

  const handleReset = (id) => {
    const timer = timers.find(t => t.id === id);
    if (timer) {
      updateTimer(id, { 
        remaining: timer.duration, 
        isActive: false, 
        isCompleted: false 
      });
    }
  };

  const handleComplete = (timer) => {
    setCompletedTimer(timer);
    setShowModal(true);
    addToHistory(timer);
    updateTimer(timer.id, { isActive: false, isCompleted: true });
  };

  const handleStartAll = (categoryTimers) => {
    categoryTimers.forEach(timer => {
      if (!timer.isActive && !timer.isCompleted) {
        updateTimer(timer.id, { isActive: true, isCompleted: false });
      }
    });
  };

  const handlePauseAll = (categoryTimers) => {
    categoryTimers.forEach(timer => {
      if (timer.isActive) {
        updateTimer(timer.id, { isActive: false });
      }
    });
  };

  const handleResetAll = (categoryTimers) => {
    categoryTimers.forEach(timer => {
      updateTimer(timer.id, { 
        remaining: timer.duration, 
        isActive: false, 
        isCompleted: false 
      });
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {categories.length > 0 ? (
          categories.map(category => (
            <CategoryItem
              key={category}
              category={category}
              timers={groupedTimers[category]}
              onStartAll={handleStartAll}
              onPauseAll={handlePauseAll}
              onResetAll={handleResetAll}
            >
              {groupedTimers[category].map(timer => (
                <TimerItem
                  key={timer.id}
                  timer={timer}
                  onStart={handleStart}
                  onPause={handlePause}
                  onReset={handleReset}
                  onComplete={handleComplete}
                />
              ))}
            </CategoryItem>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No timers yet!</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddTimer')}
            >
              <Text style={styles.addButtonText}>Add Your First Timer</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {timers.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddTimer')}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      )}

      <TimerModal
        visible={showModal}
        timer={completedTimer}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabIcon: {
    fontSize: 30,
    color: 'white',
  },
});

export default HomeScreen;