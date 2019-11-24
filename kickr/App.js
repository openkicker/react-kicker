import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';
import { KickerProvider } from './services/KickerContext';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.setOdoo = this.setOdoo.bind(this);
        this.state = {
            isLoaded: false,
            odoo: undefined,
            setOdoo: this.setOdoo,
        }
        this.handleFinishLoading = this.handleFinishLoading.bind(this);
    }

    setOdoo(Odoo) {
        this.setState({odoo: Odoo});
    }

    async loadResourcesAsync() {
        await Promise.all([
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Ionicons.font,
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            }),
        ]);
    }
    handleLoadingError(error) {
        // In this case, you might want to report the error to your error reporting
        // service, for example Sentry
        console.warn(error);
    }
    
    handleFinishLoading(setLoadingComplete) {
        this.setState({isLoaded: true});
    }
    

    render() {
        if (!this.state.isLoaded && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                startAsync={this.loadResourcesAsync}
                onError={this.handleLoadingError}
                onFinish={this.handleFinishLoading}
                />
            );
        } else {
            return (
                <KickerProvider value={this.state}>
                    <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                        <AppNavigator />
                    </View>
                </KickerProvider>
            );
        }

    }
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
