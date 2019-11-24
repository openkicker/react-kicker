import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import Colors from '../constants/Colors';
import { Button } from 'react-native-common';
import { Ionicons } from '@expo/vector-icons';
import EditProfile from './EditProfile';
import { KickerConsumer } from '../services/KickerContext';
import { ROOT } from '../constants/Routes';

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            name: undefined,
            id: undefined,
            avatarUrl: undefined,
            tagline: 'Death to all platypuses!',
            location: [],
            avatarData: undefined,
            loaded: false,
            kicker: []
        };
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onCancel() {
        this.setState({ edit: false });
    }

    async componentDidMount() {
        const [player_info, kickers_info] = await Promise.all([
            this.context.odoo.rpc_call('/app/json/player'),
            this.context.odoo.rpc_call('/app/json/kickers')
        ]);
        const player_data = player_info.data;
        const kickers = kickers_info.data.kickers;
        this.setState({
            name: player_data.name,
            id: player_data.id,
            avatarUrl:
                ROOT +
                '/app/avatar/' +
                player_data.id +
                '?ts=' +
                Date.now().toString(),
            tagline: player_data.tagline,
            location: player_data.main_kicker_id,
            loaded: true
        });
        this.setState({ kickers: kickers.map(kick => [kick.id, kick.name]) });
    }

    async onSave(state) {
        const params = {
            name: state.name,
            tagline: state.tagline,
            main_kicker: state.location_id,
            avatar: state.avatarData
        };
        const player_info = await this.context.odoo.rpc_call(
            '/app/json/update_profile',
            params
        );
        this.setState({
            name: player_info.data.player.name,
            id: player_info.data.player.id,
            avatarUrl:
                ROOT +
                '/app/avatar/' +
                this.state.id +
                '?ts=' +
                Date.now().toString(),
            tagline: player_info.data.player.tagline,
            location: player_info.data.player.main_kicker_id,
            loaded: true,
            edit: false
        });
    }

    onEdit() {
        this.setState({ edit: true });
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
        if (!this.state.edit) {
            return (
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <Image
                        source={{ uri: this.state.avatarUrl }}
                        style={styles.roundedAvatar}
                    />
                    <Text
                        style={{
                            color: Colors.brandSecondary,
                            fontSize: 36,
                            fontWeight: '700',
                            margin: 10
                        }}
                    >
                        {this.state.name}
                    </Text>
                    <Text
                        style={{ fontSize: 16, fontWeight: '300', margin: 10 }}
                    >
                        {this.state.tagline}
                    </Text>
                    <Text style={{ fontSize: 24 }}>
                        You mainly play at{' '}
                        <Text style={{ fontWeight: '800' }}>
                            {this.state.location[1]}
                        </Text>
                    </Text>
                    <Button
                        onPress={this.onEdit}
                        backgroundColor={'transparent'}
                        style={{
                            color: Colors.brandSecondary,
                            position: 'absolute',
                            right: 4
                        }}
                    >
                        <Ionicons
                            name={
                                Platform.OS === 'ios'
                                    ? 'ios-create'
                                    : 'md-create'
                            }
                            size={20}
                            color={Colors.darkGray}
                            style={{ marginRight: 5 }}
                        />
                        <Text>Edit</Text>
                    </Button>
                </ScrollView>
            );
        } else {
            return (
                <EditProfile
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                    name={this.state.name}
                    avatarUrl={this.state.avatarUrl}
                    avatarData={this.state.avatarData}
                    tagline={this.state.tagline}
                    location_id={this.state.location[0]}
                    kickers={this.state.kickers}
                />
            );
        }
    }
}
ProfileScreen.contextType = KickerConsumer;
ProfileScreen.navigationOptions = {
    title: 'Profile'
};
export default ProfileScreen;

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
    }
});
