import React, { Component } from 'react';
import { Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, ToastAndroid } from 'react-native';
import firebase from 'firebase';

export default class Login extends Component {
    state = { email: '', password: '' }

    firebaseSignUp() {
        const email = this.state.email
        const password = this.state.password
        const { navigate } = this.props.navigation;

        firebase.auth().createUserWithEmailAndPassword(email,password).then(
            ()=>{
                this.props.navigation.navigate('HomeNavi', {screen:'StockChart'})
            }
        )
        .catch(() => {
            ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
          })
    }

    firebaseSignIn() {
        const email = this.state.email
        const password = this.state.password
        const { navigate } = this.props.navigation;

        firebase.auth().signInWithEmailAndPassword(email,password).then(
            ()=>{
                this.props.navigation.navigate('HomeNavi', {screen:'StockChart'})
            }
        )
        .catch(() => {
            ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
          })
    }

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
                            onChangeText={email=>{this.setState({email:email})}}
                            value={this.state.email}
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
                            onChangeText={password=>{this.setState({password:password})}}
                            value={this.state.password}
                            autoCorrect={false}
                            ref={"txtPassword"}
                        />


                    <TouchableOpacity style={{backgroundColor: '#f7c744', width:'80%', height:50, justifyContent:'center'}} onPress={this.firebaseSignIn.bind(this)}>
                            <Text style={{textAlign: 'center',color :'#000',fontWeight: 'bold',fontSize: 18}}>SIGN IN</Text>
                    </TouchableOpacity>

                    </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        );
    }
}
