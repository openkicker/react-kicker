import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function DrawerIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      //style={{ marginBottom: -3 }}
      color={props.focused ? Colors.brandSecondary : Colors.tabIconDefault}
    />
  );
}
