import React from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    Text,
    View
} from 'react-native';
import Colors from '../constants/Colors';
import { Button } from 'react-native-common';
import Odoo from 'react-native-odoo-promise-based';
import * as SecureStore from 'expo-secure-store';
import { KickerConsumer } from '../services/KickerContext';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: undefined,
            password: undefined,
            connecting: false,
            error: false,
            error_msg: false
        };
        this.onLogin = this.onLogin.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }

    async componentDidMount() {
        const login = await SecureStore.getItemAsync('login');
        this.setState({ login: login });
    }

    async onLogin() {
        this.setState({ connecting: true });
        const odoo = new Odoo({
            host: 'kicker.dbvy.be',
            port: 443 /* Defaults to 80 if not specified */,
            database: 'kicker',
            username: this.state
                .login /* Optional if using a stored session_id */,
            password: this.state
                .password /* Optional if using a stored session_id */,
            protocol: 'https' /* Defaults to http if not specified */
        });
        let response;
        try {
            response = await odoo.connect();
        } catch (e) {
            console.log(e);
            this.setState({
                connecting: false,
                error: true,
                error_msg:
                    'Technical issue with log in.\nCheck with your local helpdesk (@dbo).'
            });
        }
        let error_msg, error;
        if (!response.success) {
            error = true;
            error_msg =
                (response.error &&
                    response.error.data &&
                    response.error.data.message) ||
                'Technical issue with log in.\nCheck with your local helpdesk (@dbo).';
        } else {
            error = false;
        }
        if (error) {
            this.setState({
                connecting: false,
                error: error,
                error_msg: error_msg
            });
        }
        if (!error) {
            await SecureStore.setItemAsync('login', odoo.username);
            await SecureStore.setItemAsync('password', odoo.password);
            this.context.setOdoo(odoo);
            this.props.navigation.navigate('Main');
        }
    }

    onSignup() {
        this.props.navigation.navigate('Signup');
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
                <Text style={{ color: 'white', fontSize: 48, margin: 40 }}>
                    Hi there!
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
                    placeholder={'Password'}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={v => this.setState({ password: v })}
                />
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        onPress={this.onLogin}
                        backgroundColor={Colors.brandSecondary}
                        disabled={this.state.connecting}
                        style={{ margin: 10, width: 120, borderRadius: 4, height: 40 }}
                    >
                        {this.state.connecting ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : null}
                        <Text style={{ color: 'white' }}>Log In</Text>
                    </Button>
                    <Button
                        onPress={this.onSignup}
                        backgroundColor={Colors.darkGray}
                        disabled={this.state.connecting}
                        style={{ margin: 10, width: 120, borderRadius: 4, height: 40 }}
                    >
                        <Text style={{ color: 'white' }}>Sign Up</Text>
                    </Button>
                </View>
                {this.state.error && this.state.error_msg ? (
                    <Text style={styles.alert}>{this.state.error_msg}</Text>
                ) : null}
            </KeyboardAvoidingView>
        );
    }
}
Login.contextType = KickerConsumer;
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 45,
        backgroundColor: Colors.brandPrimary,
        alignItems: 'center'
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
