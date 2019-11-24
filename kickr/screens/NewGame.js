import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    Picker,
    Platform,
    View
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { KickerConsumer } from '../services/KickerContext';
import { PlayerSelector, ScoreSelector } from '../components';

class NewGame extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.state = {
            team1: [],
            team2: [],
            score1: 11,
            score2: 0,
            location_id: undefined,
            players: undefined,
            kickers: [],
            loaded: false,
            saving: false,
            error_msg: false
        };
        this.onSelectPlayer = this.onSelectPlayer.bind(this);
        this.onSelectScore = this.onSelectScore.bind(this);
        this.onSave = this.onSave.bind(this);
        this.currentUser = undefined;
    }

    async onSave() {
        this.setState({ saving: true });
        let error = false;
        const params = {
            team1: this.state.team1,
            team2: this.state.team2,
            score1: this.state.score1,
            score2: this.state.score2,
            kicker_id: this.state.location_id
        };
        console.log(params);
        try {
            const score_response = await this.context.odoo.rpc_call(
                '/kicker/score/submit',
                params
            );
            if (!score_response.success) {
                const error_msg =
                    (score_response.error &&
                        score_response.error.data &&
                        score_response.error.data.message) ||
                    'Technical issue with score submission.\nCheck with your local helpdesk (@dbo).';
                this.setState({ error_msg: error_msg, saving: false });
                throw error_msg;
            }
        } catch (e) {
            error = true;
            console.log(e);
        }
        if (!error) {
            this.setState({ error_msg: false });
            this.props.navigation.goBack();
        }
    }

    async componentDidMount() {
        let players_response, kickers_response;
        try {
            [players_response, kickers_response] = await Promise.all([
                this.context.odoo.rpc_call('/app/json/players'),
                this.context.odoo.rpc_call('/app/json/kickers')
            ]);
        } catch (e) {
            console.log(e);
        }
        const players = players_response.data;
        const kickers = kickers_response.data;
        const public_player = [{ id: 7, name: 'Guest' }];
        const this_player = [
            players.players.find(p => p.id === players.player_id)
        ];
        const other_players = players.players.filter(
            p => p.id !== players.player_id
        );
        const all_players = this_player
            .concat(other_players)
            .concat(public_player);
        this.setState({
            team1: [players.player_id],
            players: all_players,
            available_players: players.players.concat(public_player),
            kickers: kickers.kickers,
            location_id: kickers.default,
            loaded: true,
            saving: false
        });
    }

    onSelectPlayer(teamIndex, selectedPlayers) {
        const new_state = {};
        new_state[`team${teamIndex}`] = selectedPlayers;
        this.setState(new_state);
    }

    onSelectScore(teamIndex, score) {
        const new_state = {};
        new_state[`score${teamIndex}`] = score;
        this.setState(new_state);
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator
                        size="large"
                        color={Colors.brandSecondary}
                    />
                </View>
            );
        }
        return (
            <KeyboardAvoidingView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                behavior="padding"
                keyboardVerticalOffset={50}
            >
                <ScrollView>
                    <Text
                        style={{
                            fontSize: 25,
                            color: Colors.brandSecondary,
                            fontWeight: '900',
                            marginLeft: 10,
                            marginTop: 15
                        }}
                    >
                        Your team
                    </Text>
                    <View>
                        <PlayerSelector
                            players={this.state.players}
                            selected={this.state.team1}
                            blacklisted={this.state.team2}
                            onSelect={this.onSelectPlayer}
                            teamIndex={1}
                        />
                        <View
                            style={{
                                marginTop: 5,
                                marginBottom: 5,
                                marginLeft: 10,
                                marginRight: 10
                            }}
                        >
                            <ScoreSelector
                                selected={this.state.score1}
                                teamIndex={1}
                                onSelect={this.onSelectScore}
                            />
                        </View>
                    </View>
                    <Text
                        style={{
                            fontSize: 25,
                            color: Colors.brandSecondary,
                            fontWeight: '900',
                            marginLeft: 5,
                            marginTop: 25
                        }}
                    >
                        Other team
                    </Text>
                    <View style={{ width: '100%' }}>
                        <PlayerSelector
                            players={this.state.players}
                            selected={this.state.team2}
                            blacklisted={this.state.team1}
                            onSelect={this.onSelectPlayer}
                            teamIndex={2}
                        />
                        <ScoreSelector
                            selected={this.state.score2}
                            teamIndex={2}
                            onSelect={this.onSelectScore}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 25,
                            color: Colors.brandSecondary,
                            fontWeight: '900',
                            marginLeft: 5,
                            marginTop: 25
                        }}
                    >
                        Location
                    </Text>
                    <Picker
                        selectedValue={this.state.location_id}
                        style={{
                            height: 36,
                            width: '100%',
                            fontSize: 24,
                            marginBottom: 15
                        }}
                        onValueChange={value =>
                            this.setState({ location_id: value })
                        }
                    >
                        {this.state.kickers.map(k => {
                            return (
                                <Picker.Item
                                    key={k.id}
                                    label={k.name}
                                    value={k.id}
                                />
                            );
                        })}
                    </Picker>
                    {this.state.error_msg ? (
                        <Text style={styles.alert}>{this.state.error_msg}</Text>
                    ) : null}
                </ScrollView>
                <View style={{ height: 50, width: '100%' }}>
                    <TouchableHighlight
                        onPress={this.onSave}
                        style={styles.saveButton}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                height: 50,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {this.state.saving ? (
                                <ActivityIndicator color="white" size="small" />
                            ) : (
                                <Ionicons
                                    name={
                                        Platform.OS === 'ios'
                                            ? 'ios-checkmark'
                                            : 'md-checkmark'
                                    }
                                    size={20}
                                    color={'white'}
                                    style={{ marginRight: 5 }}
                                />
                            )}
                            <Text style={{ color: 'white' }}>Save</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
NewGame.contextType = KickerConsumer;

NewGame.navigationOptions = {
    title: 'New Game',
    headerLeft: undefined
};

export default NewGame;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexGrow: 1,
        flex: 1
    },
    contentContainer: {
        alignItems: 'flex-start',
        flexGrow: 1,
        flex: 1
    },
    alert: {
        color: Colors.darkGray,
        margin: 15,
        fontSize: 18
    },
    saveButton: {
        backgroundColor: Colors.brandSecondary,
        height: 50,
        width: '100%',
        flexDirection: 'row'
    }
});
