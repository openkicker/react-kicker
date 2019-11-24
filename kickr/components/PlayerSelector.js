import React from 'react';
import {  Platform, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../constants/Colors';
import Player from './Player';
import { Ionicons } from '@expo/vector-icons';


class PlayerSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || [],
      query: ''
    };
    this.togglePlayer = this.togglePlayer.bind(this);
    this.filterPlayer = this.filterPlayer.bind(this);
  }

  togglePlayer(p) {
    const selected = this.state.selected;
    let new_selection;
    if (this.props.blacklisted.includes(p)) {
      return;
    } else if (selected.includes(p)) {
      new_selection = selected.filter(s => s !== p);
    } else if (selected.length >= 2) {
      return;
    } else {
      new_selection = selected.concat([p]);
    }
    this.setState({selected: new_selection});
    this.props.onSelect(this.props.teamIndex, new_selection);
  }

  filterPlayer(p) {
    if (!this.state.query) {
      return true;
    }
    const lower_query = this.state.query.toLowerCase();
    const lower_player = p.name.toLowerCase();
    return lower_player.includes(lower_query) || this.state.selected.includes(p.id);
  }

  render() {
    return (
      <View>
        <TextInput style={styles.query}
          onChangeText={(query) => this.setState({query: query})}
          value={this.state.query}
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
          maxLength={5}
          placeholder={'Search Player'}>
        </TextInput>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-search': 'md-search'}
          size={20}
          color={Colors.darkGray}
          style={{position: 'absolute', right: 30, top: 20}}
        />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.props.players.filter(this.filterPlayer).map((p) => {
              return <TouchableWithoutFeedback onPress={() => this.togglePlayer(p.id)} key={`selector_player_touch_${p.id}`}>
                <View key={`selector_player_container_${p.id}`}>
                  <Player player={p} key={`selector_player_${p.id}`} selected={this.state.selected.includes(p.id)} disabled={this.props.blacklisted.includes(p.id)}/>
                </View>
              </TouchableWithoutFeedback>
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  query: {
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    textAlign: 'left',
    paddingLeft: 14,
    fontSize: 16,
    margin: 10,
  }
});

export default PlayerSelector;