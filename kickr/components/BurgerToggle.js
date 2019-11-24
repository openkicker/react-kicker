import React from 'react';
import Platform from 'react-native';
import { withNavigation } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';

class BurgerToggle extends React.Component {
  render() {return (
    <Ionicons
    name={Platform.OS === 'ios' ? 'ios-menu': 'md-menu'}
    size={26}
    color='white'
    style={{marginLeft: 18}}
    onPress={() => this.props.navigation.openDrawer()}
    />
    );
  }
}
export default withNavigation(BurgerToggle);