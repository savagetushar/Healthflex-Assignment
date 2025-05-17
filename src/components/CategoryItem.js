import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryItem = ({ category, timers, onStartAll, onPauseAll, onResetAll, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.categoryName}>{category}</Text>
        <Text style={styles.count}>({timers.length})</Text>
        <Text style={styles.arrow}>{isExpanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>
      
      {isExpanded && (
        <>
          <View style={styles.bulkActions}>
            <TouchableOpacity 
              style={styles.bulkButton} 
              onPress={() => onStartAll(timers)}
            >
              <Text style={styles.bulkButtonText}>Start All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.bulkButton} 
              onPress={() => onPauseAll(timers)}
            >
              <Text style={styles.bulkButtonText}>Pause All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.bulkButton} 
              onPress={() => onResetAll(timers)}
            >
              <Text style={styles.bulkButtonText}>Reset All</Text>
            </TouchableOpacity>
          </View>
          
          {children}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e0e0e0',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  count: {
    marginHorizontal: 10,
    color: '#666',
  },
  arrow: {
    marginLeft: 'auto',
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
  },
  bulkButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  bulkButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CategoryItem;