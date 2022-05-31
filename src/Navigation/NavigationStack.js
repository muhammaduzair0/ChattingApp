import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import ChatScreen from '../Screens/ChatScreen';
import ConversationScreen from '../Screens/CovnversationScreen';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

function Navigation() {
  const user = useSelector(state => {
    return state.accountReducer.user;
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'ChatScreen' : 'LoginScreen'}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen
          name="ConversationScreen"
          component={ConversationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
