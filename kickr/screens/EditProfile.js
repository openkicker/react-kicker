import React from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Picker,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-common';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            avatarUrl: props.avatarUrl,
            avatarData: props.avatarData,
            location_id: props.location_id,
            tagline: props.tagline,
            saving: false
        };
        this.updatePicture = this.updatePicture.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onTaglineChange = this.onTaglineChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    async updatePicture(mode) {
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            base64: true
        };
        let response;
        if (mode == 'camera') {
            response = await ImagePicker.launchCameraAsync(options);
        } else {
            response = await ImagePicker.launchImageLibraryAsync(options);
        }
        if (!response.cancelled) {
            this.setState({ avatarData: response.base64 });
        }
    }

    onNameChange(name) {
        this.setState({ name });
    }

    onTaglineChange(tagline) {
        this.setState({ tagline });
    }

    onLocationChange(value) {
        this.setState({ location_id: value });
    }
    async onSave() {
        this.setState({ saving: true });
        try {
            await this.props.onSave(this.state);
        } catch (e) {
            console.log(e);
            this.setState({ saving: false });
        }
    }

    onCancel() {
        this.props.onCancel();
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                behavior="padding"
                keyboardVerticalOffset={50}
            >
                <View>
                    <Image
                        source={
                            this.state.avatarData
                                ? {
                                      uri:
                                          'data:image/png;base64,' +
                                          this.state.avatarData
                                  }
                                : { uri: this.state.avatarUrl }
                        }
                        style={styles.roundedAvatar}
                    />
                    <TouchableHighlight
                        onPress={() => this.updatePicture('camera')}
                        style={{
                            borderRadius: 500,
                            position: 'absolute',
                            bottom: 5,
                            left: 10,
                            width: 40,
                            height: 40
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: Colors.lightGray,
                                width: 48,
                                height: 48,
                                borderRadius: 48,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Ionicons
                                name={
                                    Platform.OS === 'ios'
                                        ? 'ios-camera'
                                        : 'md-camera'
                                }
                                color="white"
                                size={30}
                            />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.updatePicture}
                        style={{
                            borderRadius: 500,
                            position: 'absolute',
                            bottom: 5,
                            right: 10,
                            width: 40,
                            height: 40
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: Colors.lightGray,
                                width: 48,
                                height: 48,
                                borderRadius: 48,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Ionicons
                                name={
                                    Platform.OS === 'ios'
                                        ? 'ios-image'
                                        : 'md-image'
                                }
                                color="white"
                                size={30}
                            />
                        </View>
                    </TouchableHighlight>
                </View>
                <TextInput
                    style={{
                        color: Colors.brandSecondary,
                        backgroundColor: Colors.lightestGray,
                        width: 200,
                        textAlign: 'center',
                        fontSize: 36,
                        fontWeight: '700',
                        margin: 9
                    }}
                    value={this.state.name}
                    onChangeText={this.onNameChange}
                />
                <TextInput
                    style={{
                        color: Colors.brandSecondary,
                        backgroundColor: Colors.lightestGray,
                        width: 300,
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: '300',
                        margin: 9
                    }}
                    placeholder="Some witty tagline..."
                    onChangeText={this.onTaglineChange}
                >
                    {this.state.tagline}
                </TextInput>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 24 }}>You mainly play at </Text>
                    <Picker
                        selectedValue={this.state.location_id}
                        style={{ height: 36, width: 160, fontSize: 24 }}
                        onValueChange={this.onLocationChange}
                    >
                        {this.props.kickers.map(k => {
                            return (
                                <Picker.Item
                                    key={k[0]}
                                    label={k[1]}
                                    value={k[0]}
                                />
                            );
                        })}
                    </Picker>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 20
                    }}
                >
                    <Button
                        backgroundColor={Colors.brandSecondary}
                        borderRadius={4}
                        style={{ width: 120, marginRight: 10 }}
                        onPress={this.onSave}
                        disabled={this.state.saving}
                    >
                        {this.state.saving ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : null}
                        <Text style={{ color: 'white' }}>Save</Text>
                    </Button>
                    <Button
                        backgroundColor={Colors.darkGray}
                        borderRadius={4}
                        style={{ width: 120 }}
                        onPress={this.onCancel}
                    >
                        <Text style={{ color: 'white' }}>Cancel</Text>
                    </Button>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        alignItems: 'center'
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
