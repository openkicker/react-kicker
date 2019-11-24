import React from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native';
import Colors from '../constants/Colors';
import { Button } from 'react-native-common';
import axios from 'axios';
import { ROOT } from '../constants/Routes';
import * as SecureStore from 'expo-secure-store';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: undefined,
            password: undefined,
            email: undefined,
            saving: false,
            saved: false,
            error_msg: false,
        };
        this.onSignup = this.onSignup.bind(this);
    }

    async onSignup() {
        this.setState({ saving: true });
        let response;
        try {
            response = await axios.post(ROOT + '/kicker/signup', {
                params: {
                    login: this.state.login,
                    password: this.state.password,
                    email: this.state.email
                }
            });
        } catch (e) {
            console.log(e);
            this.setState({ saving: false });
        }
        if (response.data.error) {
            this.setState({
                error_msg: response.data.error.data.arguments[0],
                saving: false
            });
        } else {
            this.setState({
                error_msg:
                    'Your account must be validated before accessing the app.\nYou will receive an email shortly.',
                saving: false,
                saved: true
            });
            await SecureStore.setItemAsync('login', this.state.login);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                behavior="padding"
                keyboardVerticalOffset={50}
            >
                <Image source={require('../assets/images/logo.png')} />
                <Text style={{ color: 'white', fontSize: 48, margin: 20 }}>
                    Ask to join
                </Text>
                <TextInput
                    style={{
                        color: Colors.brandSecondary,
                        backgroundColor: 'white',
                        width: 260,
                        fontSize: 18,
                        margin: 9,
                        padding: 5,
                        borderRadius: 4
                    }}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    placeholder={'Login'}
                    keyboardType={'email-address'}
                    value={this.state.login}
                    onChangeText={v => this.setState({ login: v })}
                />
                <TextInput
                    style={{
                        color: Colors.brandSecondary,
                        backgroundColor: 'white',
                        width: 260,
                        fontSize: 18,
                        margin: 9,
                        padding: 5,
                        borderRadius: 4
                    }}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    placeholder={'Odoo e-mail'}
                    keyboardType={'email-address'}
                    value={this.state.email}
                    onChangeText={v => this.setState({ email: v })}
                />
                <TextInput
                    style={{
                        color: Colors.brandSecondary,
                        backgroundColor: 'white',
                        width: 260,
                        fontSize: 18,
                        margin: 9,
                        padding: 5,
                        borderRadius: 4
                    }}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={v => this.setState({ password: v })}
                />
                {!this.state.saved ? (
                    <Button
                        backgroundColor={Colors.brandSecondary}
                        style={{ width: 260, margin: 10, borderRadius: 4 }}
                        onPress={this.onSignup}
                        disabled={this.state.saving}
                    >
                        {this.state.saving ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : null}
                        <Text style={{ color: 'white' }}>Request Access</Text>
                    </Button>
                ) : (
                    <Button
                        backgroundColor={Colors.lightGray}
                        style={{ width: 260, margin: 10, borderRadius: 4 }}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text>Got it</Text>
                    </Button>
                )}
                {this.state.error_msg ? (
                    <Text style={styles.alert}>{this.state.error_msg}</Text>
                ) : null}
            </KeyboardAvoidingView>
        );
    }
}
Signup.navigationOptions = {
    headerShown: true, // doesn't work for some reason 🤔
    headerTitle: 'Sign Up'
};
export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 45,
        backgroundColor: Colors.brandPrimary,
        alignItems: 'center',
    },
    contentContainer: {
        alignItems: 'center'
    },
    alert: {
        color: 'white',
        margin: 15,
        fontSize: 18,
        textAlign: 'center'
    }
});
