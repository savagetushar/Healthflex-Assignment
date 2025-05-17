import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const TimerModal = ({ visible, timer, onClose }) => {
  if (!timer) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Timer Completed!</Text>
          <Text style={styles.modalText}>Congratulations on completing:</Text>
          <Text style={styles.timerName}>{timer.name}</Text>
          <Text style={styles.modalText}>Duration: {timer.duration} seconds</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#4CAF50',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  timerName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2196F3',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    marginTop: 20,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TimerModal;