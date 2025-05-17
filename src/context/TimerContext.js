import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadTimers, saveTimers, loadHistory, saveHistory } from '../utils/storage';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const loadedTimers = await loadTimers();
      const loadedHistory = await loadHistory();
      setTimers(loadedTimers);
      setHistory(loadedHistory);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTimers(timers);
    }
  }, [timers, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveHistory(history);
    }
  }, [history, isLoading]);

  const addTimer = (newTimer) => {
    setTimers([...timers, { ...newTimer, id: Date.now().toString() }]);
  };

  const updateTimer = (id, updates) => {
    setTimers(timers.map(timer => 
      timer.id === id ? { ...timer, ...updates } : timer
    ));
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  const addToHistory = (timer) => {
    setHistory([{ ...timer, completedAt: new Date().toISOString() }, ...history]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <TimerContext.Provider
      value={{
        timers,
        history,
        addTimer,
        updateTimer,
        deleteTimer,
        addToHistory,
        clearHistory,
        isLoading
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimers = () => useContext(TimerContext);

