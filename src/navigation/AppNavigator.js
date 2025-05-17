import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddTimerScreen from '../screens/AddTimerScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'My Timers' }}
      />
      <Stack.Screen 
        name="AddTimer" 
        component={AddTimerScreen} 
        options={{ title: 'Add New Timer' }}
      />
      <Stack.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ title: 'Timer History' }}
      />
    </Stack.Navigator>
  );
}