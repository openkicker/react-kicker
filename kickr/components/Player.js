import React from 'react';
import {Image, View, Text, StyleSheet }from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { ROOT } from '../constants/Routes';
import Colors from '../constants/Colors';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.avatarUrl = ROOT + '/app/avatar/' + props.player.id + '?ts=' + Date.now().toString(),
    this.size = props.size || 60;
    this.inline = props.inline;
    this.style = props.style;
  }
  render() {
    if (this.props.selected) {
        return (
          <View style={[styles.base, this.inline?styles.inline:{}, this.style]} key={`player_view_${this.props.player.id}`}>
              <Image
                  source={{uri: this.avatarUrl}}
                  style={[{borderRadius: this.size, width: this.size, height: this.size}, styles.avatar, styles.selected]}
                  key={`player_avatar_${this.props.player.id}`}
              />
              <FontAwesome
                name={'circle'}
                color={'white'}
                key={`player_select_check_${this.props.player.id}_background`}
                size={20}
                style={{position: 'absolute', top: 5, right: 5}}
              />
              <FontAwesome
                name={'check-circle'}
                color={Colors.brandSecondary}
                key={`player_select_check_${this.props.player.id}`}
                size={20}
                style={{position: 'absolute', top: 5, right: 5}}
              />
              <Text key={`player_name_${this.props.player.id}`}>{this.props.player.name}</Text>
          </View>
      );
    } else {
      return (
          <View style={[styles.base, this.inline?styles.inline:{}, this.style]} key={`player_view_${this.props.player.id}`}>
              <Image
                  source={{uri: this.avatarUrl}}
                  style={[{borderRadius: this.size, width: this.size, height: this.size}, styles.avatar, this.props.disabled?styles.avatarDisabled:{}]}
                  key={`player_avatar_${this.props.player.id}`}
              />
              <Text style={this.props.disabled?styles.textDisabled:{}} key={`player_name_${this.props.player.id}`}>{this.props.player.name}</Text>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDisabled: {
    color: Colors.darkGray,
  },
  selected: {
    borderWidth: 4,
    borderColor: Colors.brandSecondary,
  },
  avatar: {
    margin: 5,
    flexGrow: 0
  },
  avatarDisabled: {
    opacity: 0.6,
  }
});
export default withNavigation(Player);