import React from 'react';
import { Text, Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import { DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { KickerContext, KickerConsumer } from '../services/KickerContext';
import ROOT from '../constants/Routes';
import { Button } from 'react-native-common';


class CustomDrawerContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    async onLogout() {
        await SecureStore.deleteItemAsync('password');
        this.props.navigation.navigate('AuthLoading');
    }

    async onAbout() {
        this.props.navigation.navigate('About');
    }


    render() {
        return (<ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, flexDirection: 'column'}}>
            {/* 
            <Image source={{uri: ROOT + '/app/avatar/42?ts=' + Date.now().toString()}} style={styles.roundedAvatar}/>
                */}
            <View style={{flexGrow: 0}}>
                <Text style={styles.textGreeting}>Hello!</Text>
                <Text style={styles.textNamecalling}>Please note that you suck at this.</Text>
                <View style={styles.gradientRule}/>
                <DrawerItems {...this.props} />
            </View>
            <View style={{flexGrow: 1, alignItems: 'flex-end',flexDirection: 'row'}}>
                <Button onPress={this.onLogout} style={{height: 60, flexGrow: 1, borderRadius: 0, backgroundColor: 'transparent', alignItems: 'center'}}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-log-out': 'md-log-out'}
                        size={30}
                        color={Colors.lightGray}
                        style={{marginRight: 10}}
                        />
                    <Text style={{color: Colors.lightGray}}>Logout</Text>
                </Button>
            </View>
        </ScrollView>);
    }
}
CustomDrawerContentComponent.contextType = KickerContext;
    
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 40,
        flexGrow: 1,
    },
    roundedAvatar: {
        borderRadius: 200,
        width: 120,
        height: 120,
        marginLeft: 18,
        marginTop: 10,
    },
    textGreeting: {
        marginLeft: 18,
        fontSize: 24,
        fontWeight: "800",
        color: Colors.brandSecondary,
    },
    textNamecalling: {
        marginLeft: 18,
        fontSize: 12,
    },
    gradientRule: {
        borderBottomColor: Colors.brandPrimary,
        borderBottomWidth: 4,
        width: "80%",
        marginTop: 18,
        marginBottom: 10,
    }
});
    
    export default CustomDrawerContentComponent;