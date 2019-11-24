import React from 'react';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../constants/Colors';

const AVAILABLE_SCORES = [0,1,2,3,4,5,6,7,8,9,10,11]

class ScoreSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || 0,
      freeScore: undefined,
    };
    this.selectScore = this.selectScore.bind(this);
    this.onSetFreeScore = this.onSetFreeScore.bind(this);
  }
  
  selectScore(s) {
    this.setState({selected: s, freeScore: undefined});
    this.props.onSelect(this.props.teamIndex, s);
  }

  onSetFreeScore(s) {
    this.setState({selected: undefined, freeScore: s})
    this.props.onSelect(this.props.teamIndex, s);
  }

  render() {
    return (
      <View style={styles.scoreContainer}>
      {AVAILABLE_SCORES.map((s) => {
        return <TouchableWithoutFeedback onPress={() => this.selectScore(s)} key={`selector_score_touch_${s}`}>
        <View key={`selector_score_container_${s}`} style={{width: '20%'}}>
          <Text key={`selector_score_text_${s}`} style={[styles.scoreItem, this.state.selected === s?styles.scoreItemHighlight:{}]}>{s}</Text>
        </View>
        </TouchableWithoutFeedback>
      })}
      <View style={{width: '20%'}}>
        <TextInput
          style={[styles.scoreItem, this.state.freeScore?styles.scoreItemHighlight:{}]}
          placeholder={'...'}
          min={0}
          keyboardType={'number-pad'}
          value={this.state.freeScore}
          onChangeText={s => this.onSetFreeScore(s)}
          >
      </TextInput>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 10, 
  },
  scoreItem: {
    borderColor: Colors.lightGray,
    borderWidth: 1,
    color: Colors.brandSecondary,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 5,
    height: 40,
    fontWeight: "700",
  },
  scoreItemHighlight: {
    borderWidth: 4,
    borderColor: Colors.brandSecondary,
  }
})

export default ScoreSelector;