import React from "react";
import { ScrollView, View, Text, TouchableHighlight } from "react-native";
import Player from "./Player";
import Colors from "../constants/Colors";

class RankingTable extends React.Component {
  constructor(props) {
    super(props);
    this.sortKey = props.sortKey || 'won';
    const activeHeader = props.headers.find((h) => h[0]===this.sortKey);
    this.sortedData = this.sortData(props.data, this.sortKey, activeHeader[2]);

    this.onSort = this.onSort.bind(this);
  }

  onSort (key, reverse) {
    const sortedData = this.sortData(this.sortedData, key, reverse);
    this.setState({
      data: sortedData,
      activeColumn: key,
    });
    this.props.onSortKeyChange(key);
  }

  sortData(data, key, reverse) {
    const sortFunction = reverse?(a,b)=>{return b[key] <= a[key]}:(a,b)=>{return a[key] <= b[key]};
    const sortedData = data.sort(sortFunction);
    return sortedData;
  }

  render() {
    return (
      <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
        <View>
          <View style={styles.header}>
            {this.props.headers.map((h) =>{
              return (
                <TouchableHighlight key={h[0]} onPress={() => this.onSort(h[0], h[2])} style={styles.headerButton} underlayColor={Colors.lightestGray}>
                  <Text style={[styles.headerCell, this.sortKey==h[0]?styles.activeHeaderCell:{}]}>{h[1]}</Text>
                </TouchableHighlight>
              )
            })}
          </View>
        </View>
        <View>
          {this.sortedData.map((d, idx) => {
            return (<View key={d.id} style={styles.row}>
              <View style={styles.playerContainer}>
                <Text style={{fontSize: 20, fontWeight: "400", width: "20%"}}>{idx+1}</Text>
                <Player player={{id: d.id, name: d.name}} inline={true} size={40} />
              </View>
              <Text style={styles.cell}>{d.won}</Text>
              <Text style={styles.cell}>{d.lost}</Text>
              <Text style={styles.cell}>{d.matches}</Text>
            </View>)
          })}
        </View>
      </ScrollView>
    );
  }
}
  
const styles = {
  container: {
    flexDirection: 'column',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGray,
    backgroundColor: 'white',
    opacity: 0.9,
  },
  headerButton: {
    width: '22%',
    flexGrow: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
    paddingRight: 10,
  },
  activeHeaderCell: {
    fontSize: 16,
    fontWeight: "700",
  },
  headerCell: {
    fontSize: 16,
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '34%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  cell: {
    textAlign: 'right',
    flexGrow: 1,
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    alignItems: 'center',
  }
};
export default RankingTable;
  