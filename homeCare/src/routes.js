import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

import Home from './screens/Home';
import RouterDrawer from './routerDrawer';
import Login from './screens/Login';
import MonitoringStack from './screens/MonitoringStack';
import Teste from './screens/Teste';
import Chats from './screens/Chats';
import HistoryNotification from './screens/HistoryNotification';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown: false}}>
          <AppStack.Screen name="Home" component={Home} />
          <AppStack.Screen name="Entrar" component={RouterDrawer} />
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="MonitoringStack" component={MonitoringStack} />
          <AppStack.Screen name="Teste" component={Teste} />
          <AppStack.Screen name="Chats" component={Chats} />
          <AppStack.Screen
            name="HistoryNotification"
            component={HistoryNotification}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
