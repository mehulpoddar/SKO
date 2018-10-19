import React, {Component} from 'react';
import {StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Dimensions} from 'react-native';

export default class Login extends Component{
    state={email:'', password:''}
  render() {
    return (
        <KeyboardAvoidingView behavior='padding' style={{flex: 1,backgroundColor: '#4857cb',flexDirection: 'column',}}>
        <TouchableWithoutFeedback style={{flex: 1,backgroundColor: '#4857cb',flexDirection: 'column',}} 
                onPress={Keyboard.dismiss}>
            <View style={{justifyContent: 'center',flex: 1}}>
                    <Image style={{width:300, height:300, alignSelf:'center'}}
                        source={require('../../Resources/Images/applogo.png')}>
                    </Image>
                <View style={{flex:1}}> 
                <View style={{alignItems:'center'}}>
                    <TextInput style={{ width:'80%',
                                        height: 40,
                                       backgroundColor: '#8f96cf',
                                       color: '#000',
                                       marginBottom: 20,
                                       paddingHorizontal: 10}}
                        placeholder="Enter username/email"
                        keyboardType='email-address'
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={()=> this.refs.txtPassword.focus()}
                    />
                    <TextInput style={{width:'80%',
                                        height: 40,
                                       backgroundColor: '#8f96cf',
                                       color: '#000',
                                       marginBottom: 20,
                                       paddingHorizontal: 10}}
                        placeholder="Enter password"
                        returnKeyType='go'
                        secureTextEntry
                        autoCorrect={false}
                        ref={"txtPassword"}
                    />
                    
                </View>
                <TouchableOpacity style={{backgroundColor: '#f7c744',paddingVertical: 15, width:'80%', alignSelf:'center'}}>
                        <Text style={{textAlign: 'center',color :'#000',fontWeight: 'bold',fontSize: 18}}>SIGN IN</Text>
                </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
  }
}

