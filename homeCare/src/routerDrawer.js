import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

import Monitoring from './screens/Monitoring';
import Profile from './screens/Profile';
import Patients from './screens/Patients';
import ChatsPatients from './screens/ChatsPatients';
import ChatModulePatient from './screens/ChatModulePatient';

/// configuração do estyle drawer
import HeaderGaveta from './components/HeaderGaveta';
import Logout from './components/Logout';
import styles from './components/HeaderGaveta/styles';

import {colors} from './constants';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{marginTop: -4, marginBottom: 30}}>
        <HeaderGaveta title="Home Care" />
      </View>

      <DrawerItemList {...props} />

      <View style={{marginTop: 100}}>
        <Logout />
      </View>
    </DrawerContentScrollView>
  );
}

export default function HomeDrawer() {
  const user = useSelector((state) => state.userData);
  return (
    <Drawer.Navigator
      initialRouteName={user.type === 'medico' ? 'Patients' : 'Monitoring'}
      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: colors.textColorActive,

        labelStyle: {
          fontWeight: 'bold',
          fontSize: 19,
        },
        inactiveTintColor: colors.textColorGray,
      }}
      drawerStyle={{}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      {user.type === 'paciente' ? (
        <>
          <Drawer.Screen
            name="Monitoring"
            component={Monitoring}
            options={{
              drawerIcon: (props) => (
                <FontAwesome
                  name="heartbeat"
                  size={20}
                  color={
                    props.focused
                      ? colors.textColorActive
                      : colors.textColorGray
                  }
                  style={{marginRight: -20}}
                />
              ),
              drawerLabel: 'Monitoramento',
            }}
          />
          <Drawer.Screen
            name="ChatModulePatient"
            component={ChatModulePatient}
            options={{
              drawerLabel: 'chat Médico',
              drawerIcon: (props) => (
                <Entypo
                  name="chat"
                  size={20}
                  color={
                    props.focused
                      ? colors.textColorActive
                      : colors.textColorGray
                  }
                  style={{marginRight: -20}}
                />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Patients"
            component={Patients}
            options={{
              drawerLabel: 'Meus pacientes',
              drawerIcon: (props) => (
                <FontAwesome
                  name="heartbeat"
                  size={25}
                  color={
                    props.focused
                      ? colors.textColorActive
                      : colors.textColorGray
                  }
                  style={{marginRight: -20}}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="ChatsPatients"
            component={ChatsPatients}
            options={{
              drawerLabel: 'chats pacientes',
              drawerIcon: (props) => (
                <Entypo
                  name="chat"
                  size={20}
                  color={
                    props.focused
                      ? colors.textColorActive
                      : colors.textColorGray
                  }
                  style={{marginRight: -20}}
                />
              ),
            }}
          />
        </>
      )}

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: 'Perfil',
          drawerIcon: (props) => (
            <Icon
              name="user-circle-o"
              size={20}
              color={
                props.focused ? colors.textColorActive : colors.textColorGray
              }
              style={{marginRight: -20}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
