import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import DrawerIcon from '../components/DrawerIcon';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import About from '../screens/About';
import Rankings from '../screens/Rankings';
import Colors from '../constants/Colors';
import CustomDrawerContentComponent from '../components/CustomDrawer';
import BurgerToggle from '../components/BurgerToggle';
import NewGame from '../screens/NewGame';
import { KickerConsumer } from '../services/KickerContext';

const defaultNavigationOptions = { title: 'Kicker', headerLeft: BurgerToggle, headerStyle: {backgroundColor: Colors.brandPrimary}, headerTitleStyle: {color:'#FFF', fontWeight: "300"}, headerTintColor: 'white'};
const config = { defaultNavigationOptions};

const DashboardStack = createStackNavigator(
  {
    Dashboard: Dashboard,
    NewGame: NewGame,
  },
  config
);

DashboardStack.navigationOptions = {
  title: 'Dashboard',
  drawerIcon: ({ focused }) => (
    <DrawerIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-stats': 'md-stats'} />
    ),
  };

DashboardStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: Profile,
  },
  config
);

ProfileStack.navigationOptions = {
  title: 'Profile',
  drawerIcon: ({ focused }) => (
    <DrawerIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
};

const RankingStack = createStackNavigator(
  {
    Rankings: Rankings,
  },
  config
);

RankingStack.navigationOptions = {
  title: 'Rankings',
  drawerIcon: ({ focused }) => (
    <DrawerIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'} />
  ),
};

ProfileStack.path = '';

const AboutStack = createStackNavigator(
  {
    About: About,
  },
  config
);

AboutStack.navigationOptions = {
  title: 'About',
  drawerIcon: ({ focused }) => (
    <DrawerIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-help' : 'md-help'} />
  ),
};

AboutStack.path = '';

function KickerCustomDrawer(props) {
  return (<KickerConsumer>
    {Odoo => <CustomDrawerContentComponent {...props} Odoo={Odoo} />}
  </KickerConsumer>)
}

const drawerNavigator = createDrawerNavigator({
  Dashboard: {screen: DashboardStack},
  Profile: {screen: ProfileStack},
  Rankings: {screen: RankingStack},
  About: {screen: AboutStack},
}, {
  contentOptions: {
    labelStyle: {fontWeight: "300"},
    activeLabelStyle: {color: Colors.brandSecondary},
  },
  contentComponent: KickerCustomDrawer,
});

drawerNavigator.path = '';

export default drawerNavigator;