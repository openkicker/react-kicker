import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const WeeklyStats = props => {
    return (
        <View
            style={{
                marginTop: 15,
                backgroundColor: Colors.lightestGray,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 15,
                paddingBottom: 15
            }}
        >
            <Text
                style={{
                    color: Colors.brandSecondary,
                    fontSize: 24,
                    fontWeight: '700',
                    marginBottom: 10
                }}
            >
                Weekly Stats
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Ionicons
                        name={
                            Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'
                        }
                        size={48}
                        color={Colors.darkGray}
                    />
                    <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '300' }}>
                            {props.won}
                        </Text>
                        <Text>Won</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Ionicons
                        name={
                            Platform.OS === 'ios'
                                ? 'ios-thumbs-down'
                                : 'md-thumbs-down'
                        }
                        size={48}
                        color={Colors.darkGray}
                    />
                    <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '300' }}>
                            {props.lost}
                        </Text>
                        <Text>Lost</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Ionicons
                        name={
                            Platform.OS === 'ios'
                                ? 'ios-analytics'
                                : 'md-analytics'
                        }
                        size={40}
                        color={Colors.darkGray}
                    />
                    <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '300' }}>
                            {props.ratio}
                        </Text>
                        <Text>Ratio</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default WeeklyStats;