import React from 'react';
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FrequentPlayers, GlobalStats, WeeklyStats } from '../components';
import { KickerConsumer } from '../services/KickerContext';


class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: undefined,
            wins: 0,
            weeklyWins: 0,
            losses: 0,
            weeklyLosses: 0,
            weeklyRatio: 0,
            teammates: [],
            nightmares: [],
            loaded: false
        };
        this.update = this.update.bind(this);
    }

    async componentDidMount() {
        await this.update();
        this.props.navigation.addListener(
            'didFocus',
            async () => await this.update()
        );
    }

    async willFocus() {
        await this.update();
    }

    async update() {
        let response;
        try {
            response = await this.context.odoo.rpc_call('/app/json/dashboard');
        } catch (e) {
            console.log(e);
            this.props.navigation.navigate('Login');
        }
        const dashboard_info = response.data;
        this.setState({
            name: dashboard_info.name,
            wins: dashboard_info.wins,
            weeklyWins: dashboard_info.weekly_wins,
            losses: dashboard_info.losses,
            weeklyLosses: dashboard_info.weekly_losses,
            weeklyRatio: dashboard_info.weekly_win_ratio,
            teammates: dashboard_info.teammates,
            nightmares: dashboard_info.nightmares,
            loaded: true
        });
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator
                        size="large"
                        color={Colors.brandSecondary}
                    />
                </View>
            );
        } else {
            return (
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={{ paddingLeft: 10 }}>
                        <Text
                            style={{
                                fontSize: 25,
                                color: Colors.brandSecondary,
                                fontWeight: '900'
                            }}
                        >
                            Hello, {this.state.name}!
                        </Text>
                        <Text style={{ fontSize: 12, color: Colors.darkGray }}>
                            Please note that you suck at this.
                        </Text>
                    </View>
                    <GlobalStats
                        won={this.state.wins}
                        lost={this.state.losses}
                    />
                    <WeeklyStats
                        won={this.state.weeklyWins}
                        lost={this.state.weeklyLosses}
                        ratio={this.state.weeklyRatio}
                    />
                    <FrequentPlayers players={this.state.teammates} />
                    <TouchableHighlight
                        style={styles.fab}
                        onPress={() =>
                            this.props.navigation.navigate('NewGame')
                        }
                    >
                        <Ionicons
                            name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                            size={20}
                            color={'white'}
                        />
                    </TouchableHighlight>
                </ScrollView>
            );
        }
    }
}
Dashboard.contextType = KickerConsumer;
Dashboard.navigationOptions = {
    title: 'Dashboard'
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexGrow: 1
    },
    contentContainer: {
        paddingTop: 30,
        flexGrow: 1
    },
    fab: {
        height: 50,
        width: 50,
        borderRadius: 200,
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.brandSecondary,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});
