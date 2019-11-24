import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Player from './Player';
import Colors from '../constants/Colors';

const FrequentPlayers = props => {
    const players = props.players;
    return (
        <View style={{ marginTop: 15, paddingTop: 10, paddingBottom: 10 }}>
            <Text
                style={{
                    color: Colors.brandSecondary,
                    fontSize: 24,
                    fontWeight: '700',
                    marginBottom: 10,
                    paddingLeft: 10
                }}
            >
                Your Best Teammates
            </Text>
            <ScrollView horizontal={true} style={{ marginLeft: 5 }}>
                {players.map(p => {
                    return <Player player={p} key={p.id} />;
                })}
            </ScrollView>
            {!players.length ? (
                <View>
                    <Text style={{ color: Colors.darkGray, paddingLeft: 10 }}>
                        It's lonely in here.
                    </Text>
                    <Text style={{ color: Colors.darkGray, paddingLeft: 10 }}>
                        Play a few games to start listing your usual gang.
                    </Text>
                </View>
            ) : null}
        </View>
    );
};

export default FrequentPlayers;