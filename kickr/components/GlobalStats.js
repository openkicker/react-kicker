import React from 'react';
import { Text, View } from 'react-native';
import Colors from '../constants/Colors';

const GlobalStats = props => {
    return (
        <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 15 }}>
            <View style={{ flexGrow: 1 }}>
                <Text
                    style={{
                        color: Colors.brandSecondary,
                        fontSize: 36,
                        fontWeight: '600'
                    }}
                >
                    {props.won}
                </Text>
                <Text style={{ color: Colors.darkGray }}>won matches</Text>
            </View>
            <View style={{ flexGrow: 1 }}>
                <Text
                    style={{
                        color: Colors.brandSecondary,
                        fontSize: 36,
                        fontWeight: '600'
                    }}
                >
                    {props.lost}
                </Text>
                <Text style={{ color: Colors.darkGray }}>lost matches</Text>
            </View>
        </View>
    );
};

export default GlobalStats;
