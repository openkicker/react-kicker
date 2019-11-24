import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoading from '../screens/AuthLoading';
import DrawerNavigator from './DrawerNavigator';
import LoginNavigator from './LoginNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // TODO: add navigation for authentication
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoading,
    Main: DrawerNavigator,
    Login: LoginNavigator,
  })
);
