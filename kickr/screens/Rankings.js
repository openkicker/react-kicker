import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { Button } from 'react-native-common';
import { KickerConsumer } from '../services/KickerContext';
import { RankingTable } from '../components';

class RankingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            sortKey: 'won',
            loaded: false,
            period: 'week'
        };
        this.tableHead = [
            ['won', 'Wins', false],
            ['lost', 'Losses', true],
            ['matches', 'Matches', false]
        ];
        this.update = this.update.bind(this);
        this.setPeriod = this.setPeriod.bind(this);
        this.setSortKey = this.setSortKey.bind(this);
    }

    async componentDidMount() {
        await this.update();
        this.props.navigation.addListener(
            'didFocus',
            async () => await this.update()
        );
    }

    async update(update_period) {
        const period = update_period || this.state.period;
        this.setState({ loaded: false });
        const rankings_response = await this.context.odoo.rpc_call(
            '/app/json/rankings',
            { period: period }
        );
        this.setState({
            period: period,
            tableData: rankings_response.data,
            loaded: true
        });
    }

    async setPeriod(period) {
        this.setState({ period: period });
        await this.update(period);
    }

    setSortKey(key) {
        this.setState({ sortKey: key });
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            style={
                                this.state.period === 'week'
                                    ? [
                                          styles.commonButton,
                                          styles.leftButton,
                                          styles.activeButton
                                      ]
                                    : [styles.commonButton, styles.leftButton]
                            }
                            onPress={() => this.setPeriod('week')}
                        >
                            <Text
                                style={
                                    this.state.period === 'week'
                                        ? styles.activeButtonText
                                        : styles.buttonText
                                }
                            >
                                Weekly
                            </Text>
                        </Button>
                        <Button
                            style={
                                this.state.period === 'month'
                                    ? [
                                          styles.commonButton,
                                          styles.middleButton,
                                          styles.activeButton
                                      ]
                                    : [styles.commonButton, styles.middleButton]
                            }
                            onPress={() => this.setPeriod('month')}
                        >
                            <Text
                                style={
                                    this.state.period === 'month'
                                        ? styles.activeButtonText
                                        : styles.buttonText
                                }
                            >
                                Monthly
                            </Text>
                        </Button>
                        <Button
                            style={
                                this.state.period === 'year'
                                    ? [
                                          styles.commonButton,
                                          styles.rightButton,
                                          styles.activeButton
                                      ]
                                    : [styles.commonButton, styles.rightButton]
                            }
                            onPress={() => this.setPeriod('year')}
                        >
                            <Text
                                style={
                                    this.state.period === 'year'
                                        ? styles.activeButtonText
                                        : styles.buttonText
                                }
                            >
                                Yearly
                            </Text>
                        </Button>
                    </View>
                    <ActivityIndicator
                        size="large"
                        color={Colors.brandSecondary}
                        style={{ flexGrow: 1 }}
                    />
                </View>
            );
        }

        return (
            <View
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                    <Button
                        style={
                            this.state.period === 'week'
                                ? [
                                      styles.commonButton,
                                      styles.leftButton,
                                      styles.activeButton
                                  ]
                                : [styles.commonButton, styles.leftButton]
                        }
                        onPress={() => this.setPeriod('week')}
                    >
                        <Text
                            style={
                                this.state.period === 'week'
                                    ? styles.activeButtonText
                                    : styles.buttonText
                            }
                        >
                            Weekly
                        </Text>
                    </Button>
                    <Button
                        style={
                            this.state.period === 'month'
                                ? [
                                      styles.commonButton,
                                      styles.middleButton,
                                      styles.activeButton
                                  ]
                                : [styles.commonButton, styles.middleButton]
                        }
                        onPress={() => this.setPeriod('month')}
                    >
                        <Text
                            style={
                                this.state.period === 'month'
                                    ? styles.activeButtonText
                                    : styles.buttonText
                            }
                        >
                            Monthly
                        </Text>
                    </Button>
                    <Button
                        style={
                            this.state.period === 'year'
                                ? [
                                      styles.commonButton,
                                      styles.rightButton,
                                      styles.activeButton
                                  ]
                                : [styles.commonButton, styles.rightButton]
                        }
                        onPress={() => this.setPeriod('year')}
                    >
                        <Text
                            style={
                                this.state.period === 'year'
                                    ? styles.activeButtonText
                                    : styles.buttonText
                            }
                        >
                            Yearly
                        </Text>
                    </Button>
                </View>
                <View style={{ flex: 1, width: '100%' }}>
                    <RankingTable
                        data={this.state.tableData}
                        headers={this.tableHead}
                        onSortKeyChange={this.setSortKey}
                        sortKey={this.state.sortKey}
                    />
                </View>
            </View>
        );
    }
}
RankingScreen.navigationOptions = {
    title: 'Rankings'
};

RankingScreen.contextType = KickerConsumer;

export default RankingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff'
    },
    contentContainer: {
        alignItems: 'center'
    },
    roundedAvatar: {
        width: 200,
        height: 200,
        borderRadius: 200
    },
    commonButton: {
        backgroundColor: 'white',
        borderColor: Colors.brandSecondary,
        borderWidth: 1,
        borderStyle: 'solid',
        width: '30%',
        height: 35,
        marginBottom: 10
    },
    activeButton: {
        backgroundColor: Colors.brandSecondary
    },
    leftButton: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 4
    },
    middleButton: {
        borderRadius: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0
    },
    rightButton: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 0
    },
    buttonText: {
        color: Colors.brandSecondary
    },
    activeButtonText: {
        color: 'white'
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' }
});
