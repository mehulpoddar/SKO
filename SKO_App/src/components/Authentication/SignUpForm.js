import React, { Component } from 'react';
import { Text, View, Image,
    TouchableWithoutFeedback,
    TextInput, Keyboard, TouchableOpacity,
     } from 'react-native';
    import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class SignUpForm extends Component {
    static navigationOptions = {
        headerMode: 'none'
      }
      state={email:'', password:''}

    render() {
        return (
            <KeyboardAwareScrollView style={{flex:1,backgroundColor: '#4857cb',flexDirection: 'column'}}>
            <View style={{flex:1, alignItems:'center'}}>
                        <Image style={{width:300, height:300, alignSelf:'center'}}
                            source={require('../../Resources/Images/applogo.png')}>
                        </Image>
                        <TextInput style={{ width:'80%',
                                            height: 40,
                                        backgroundColor: '#8f96cf',
                                        color: '#000',
                                        marginBottom: 20,
                                        paddingHorizontal: 10}}
                            placeholder="Enter username"
                            autoCorrect={false}
                            onChangeText={email=>{this.setState({email:email})}}
                            value={this.state.email}
                        />
                        <TextInput style={{width:'80%',
                                            height: 40,
                                        backgroundColor: '#8f96cf',
                                        color: '#000',
                                        marginBottom: 20,
                                        paddingHorizontal: 10}}
                            placeholder="Enter "
                            secureTextEntry
                            onChangeText={password=>{this.setState({password:password})}}
                            value={this.state.password}
                            autoCorrect={false}
                        />
                        <TextInput style={{width:'80%',
                                            height: 40,
                                        backgroundColor: '#8f96cf',
                                        color: '#000',
                                        marginBottom: 20,
                                        paddingHorizontal: 10}}
                            placeholder="Enter password"
                            secureTextEntry
                            onChangeText={password=>{this.setState({password:password})}}
                            value={this.state.password}
                            autoCorrect={false}
                        />
                        <TextInput style={{width:'80%',
                                            height: 40,
                                        backgroundColor: '#8f96cf',
                                        color: '#000',
                                        marginBottom: 20,
                                        paddingHorizontal: 10}}
                            placeholder="Enter password"
                            secureTextEntry
                            onChangeText={password=>{this.setState({password:password})}}
                            value={this.state.password}
                            autoCorrect={false}
                        />
                        
                        </View>
                        </KeyboardAwareScrollView>
        );
    }
}
