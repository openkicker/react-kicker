import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Colors from '../constants/Colors';

const defaultNavigationOptions = {headerStyle: {backgroundColor: Colors.brandPrimary}, headerTitleStyle: {color:'#FFF', fontWeight: "300"}, headerTintColor: 'white'};
const config = { headerMode: 'none', defaultNavigationOptions};

const LoginNavigator = createStackNavigator(
    {
        Login: Login,
        Signup: Signup,
    },
    config
);

export default LoginNavigator;