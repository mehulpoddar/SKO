import React, {Component} from 'react';
import {StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
     Dimensions, ToastAndroid} from 'react-native';
import firebase from 'firebase';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Login extends Component{
    state={email:'', password:''}

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

        firebase.auth().signInWithEmailAndPassword(email,password).then(
            ()=>{
                this.props.navigation.navigate('HomeNavi', {screen:'StockChart'})
            }
        )
        .catch(() => {
            ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
          });
    }

    signUp() { 
            this.props.navigation.navigate('SignUpForm', {screen:'SignUpForm'})
    }

    render() {
        return (
            <KeyboardAwareScrollView style={{flex: 1,backgroundColor: '#4857cb',flexDirection: 'column'}} >
                <TouchableWithoutFeedback style={{flex: 1,backgroundColor: '#4857cb',flexDirection: 'column',}} 
                                                  onPress={Keyboard.dismiss}>
                <View style={{justifyContent: 'center',flex: 1, alignItems:'center'}}>
                        <Image style={{width:300, height:300, alignSelf:'center'}}
                            source={ require('../../Resources/Images/applogo.png')}>
                        </Image>

                        <View style={{alignItems:'center'}}>
                            <View style={{flexDirection:'row', width:'80%'}}>
                                <View style={{width:'20%', backgroundColor:'#8f96cf', height:40, alignItems:'center', justifyContent:'center', borderTopLeftRadius:20, borderBottomLeftRadius:20}}>
                                <Image source={require('../../Resources/Images/email.png')} style={{width:33, height:33}} />
                                </View>
                                <TextInput style={{ width:'80%',
                                                    height: 40,
                                                backgroundColor: '#8f96cf',
                                                color: '#000',
                                                marginBottom: 7,
                                                borderTopRightRadius:20,
                                                borderBottomRightRadius:20}}
                                    placeholder="Enter username/email"
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    onChangeText={email=>{this.setState({email:email})}}
                                    value={this.state.email}
                                    onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                />
                            </View>
                            <View style={{flexDirection:'row', width:'80%'}}>
                                <View style={{width:'20%', backgroundColor:'#8f96cf', height:40, alignItems:'center', justifyContent:'center', borderTopLeftRadius:20, borderBottomLeftRadius:20}}>
                                <Image source={require('../../Resources/Images/passoword.png')} style={{width:33, height:33}} />
                                </View>
                                <TextInput style={{width:'80%',
                                            height: 40,
                                    backgroundColor: '#8f96cf',
                                    color: '#000',
                                    marginBottom: 15,
                                    borderTopRightRadius:20,
                                    borderBottomRightRadius:20}}
                                    placeholder="Enter password"
                                    returnKeyType='go'
                                    secureTextEntry
                                    onChangeText={password=>{this.setState({password:password})}}
                                    value={this.state.password}
                                    autoCorrect={false}
                                    ref={"txtPassword"}
                                />
                            </View>

                        
                        </View>

                        <View style={{width:'80%', height:50, justifyContent:'space-between', flexDirection:'row'}}>
                            <TouchableOpacity style={{ backgroundColor: '#f7c744', width:'100%', height:50, justifyContent:'center', borderRadius:20}} onPress={this.firebaseSignIn.bind(this)}>
                                    <Text style={{textAlign: 'center',color :'#000',fontSize: 16, fontStyle:'bold'}}>SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{width:'80%', height:50, justifyContent:'space-between', flexDirection:'row'}}>
                            <TouchableOpacity style={{ width:'45%', height:50, justifyContent:'center', borderRadius:20}} onPress={()=>{}}>
                                    <Text style={{textAlign: 'center',color :'#fff',fontSize: 16, fontStyle:'bold'}}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width:'45%', height:50, justifyContent:'center', borderRadius:20}} onPress={this.signUp.bind(this)}>
                                    <Text style={{textAlign: 'center',color :'#fff',fontSize: 16, fontStyle:'bold'}}>Create Account</Text>
                            </TouchableOpacity>
                        </View>


                        <Text style={{fontSize:16, color:'#fff', marginTop:25}}>OR SIGN IN USING</Text>

                        <View style={{alignItems:'center'}}>
                        <View style={{width:'80%', height:50, marginTop:15 , alignItems:'center', flexDirection:'row'}}>
                            <TouchableOpacity style={{justifyContent:'center',paddingRight:20}} onPress={()=>{}}>
                                    <Image source={require('../../Resources/Images/google.png')} style={{width:40, height:40}} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{justifyContent:'center',paddingLeft:20}} onPress={()=>{}}>
                            <Image source={require('../../Resources/Images/facebook.png')} style={{width:50, height:50}} />
                            </TouchableOpacity>
                        </View>
                        </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
        );
    }
}

