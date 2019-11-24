import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import Odoo from 'react-native-odoo-promise-based';
import { KickerConsumer } from '../services/KickerContext';
import * as SecureStore from 'expo-secure-store';
import Colors from '../constants/Colors';


class AuthLoading extends React.Component {
    
    async componentDidMount() {
        await this._bootstrapAsync();
    }
    
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const login = await SecureStore.getItemAsync('login');
        const pw = await SecureStore.getItemAsync('password');
        if (login && pw) {
            const odoo = new Odoo({
                host: 'kicker.dbvy.be',
                port: 443, /* Defaults to 80 if not specified */
                database: 'kicker',
                username: login,
                password: pw,
                protocol: 'https' /* Defaults to http if not specified */
            })
            try {
                const userInfo = await odoo.connect();
                if (!userInfo.success) {
                    throw Error('incorrect credentials');
                }
            } catch(error) {
                console.log(error);
                await SecureStore.deleteItemAsync('password');
                this.props.navigation.navigate('Login');
            }
            this.context.setOdoo(odoo);
            this.props.navigation.navigate('Main');
        } else {
            this.props.navigation.navigate('Login');
        }
    };
    
    // Render any loading content that you like here
    render() {
        return (<View style={{backgroundColor: Colors.brandPrimary, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color='white'/>
            <StatusBar barStyle="default" />
        </View>);
    }
}
AuthLoading.contextType = KickerConsumer;

export default AuthLoading;