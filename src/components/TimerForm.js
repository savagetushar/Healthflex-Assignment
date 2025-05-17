import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const TimerForm = ({ onSubmit, categories }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState(categories[0] || '');
  const [alertAtHalf, setAlertAtHalf] = useState(false);

  const handleSubmit = () => {
    if (!name || !duration) return;
    
    const newTimer = {
      name,
      duration: parseInt(duration, 10),
      category,
      alertAtHalf,
      remaining: parseInt(duration, 10),
      isActive: false,
      isCompleted: false,
    };
    
    onSubmit(newTimer);
    setName('');
    setDuration('');
    setCategory(categories[0] || '');
    setAlertAtHalf(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timer Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g., Workout Timer"
      />
      
      <Text style={styles.label}>Duration (seconds)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="e.g., 300"
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAlertAtHalf(!alertAtHalf)}
        >
          <View style={[styles.checkboxIcon, alertAtHalf && styles.checkboxChecked]}>
            {alertAtHalf && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>Alert at halfway point</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#2196F3',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2196F3',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TimerForm;