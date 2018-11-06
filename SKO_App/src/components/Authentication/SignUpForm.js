import React, { Component } from 'react';
import { Text, View, Image,
    TouchableWithoutFeedback,
    TextInput, Keyboard, TouchableOpacity, ToastAndroid, ActivityIndicator,
    Picker
     } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';

export default class SignUpForm extends Component {
    static navigationOptions = {
        headerMode: 'none'
      }
      state={email:'', password:'', username:'',  experience:'',signUpstatus:false}

      firebaseSignUp() {
        const email = this.state.email
        const password = this.state.password
        const { navigate } = this.props.navigation;

        if(this.state.email==''&&this.state.password==''&&this.state.experience==''&&this.state.username=='')
        {
            ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
            ()=>{
                firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).set({
                    email: this.state.email,
                    username: this.state.username,
                    experience: this.state.experience,
                   },()=>{
                    this.props.navigation.navigate('HomeNavi', {screen:'StockChart'})
                   })
            }
        )
        .catch(() => {
            ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
          })
        }

        
    }

        renderSpinnerButton(){
            if(!this.state.signUpstatus)
            {
                return (<TouchableOpacity style={{backgroundColor:'#b71c1c',height:50, justifyContent:'center', borderRadius:20, width:'60%'}} onPress={()=>{
                    this.setState({signUpstatus:true},
                        this.firebaseSignUp.bind(this)
                    )
                }}>
                    <Text style={{textAlign: 'center',color :'#fff',fontSize: 16, fontStyle:'bold'}}>SIGN UP</Text>
                </TouchableOpacity>);
            }
            else
            {
                return <ActivityIndicator size={'large'} color="#b71c1c"/>
            }
        }

    render() {
        return (
            <KeyboardAwareScrollView style={{flex:1,backgroundColor: '#fff',flexDirection: 'column'}}>
            <View style={{flex:1, alignItems:'center'}}>
                        <Image style={{width:300, height:300, alignSelf:'center', resizeMode:'contain'}}
                            source={require('../../Resources/Images/sko_logo.jpg')}>
                        </Image>
                        <TextInput style={{ width:'80%',
                                            height: 40,
                                        backgroundColor: '#fff',
                                        color: '#000',
                                        marginBottom: 20,
                                        borderWidth:2,
                                        borderColor:'#b71c1c',
                                        paddingHorizontal: 10}}
                            placeholder="Enter username"
                            autoCorrect={false}
                            onChangeText={username=>{this.setState({username:username})}}
                            value={this.state.username}
                        />
                        <TextInput style={{ width:'80%',
                                            height: 40,
                                        backgroundColor: '#fff',
                                        color: '#000',
                                        borderWidth:2,
                                        borderColor:'#b71c1c',
                                        marginBottom: 20,
                                        paddingHorizontal: 10}}
                            placeholder="Enter email"
                            autoCorrect={false}
                            onChangeText={email=>{this.setState({email:email})}}
                            value={this.state.email}
                        />
                        <TextInput style={{width:'80%',
                                            height: 40,
                                        backgroundColor: '#fff',
                                        color: '#000',
                                        borderWidth:2,
                                        borderColor:'#b71c1c',
                                        marginBottom: 20,
                                        paddingHorizontal: 10}}
                            placeholder="Enter Password"
                            secureTextEntry
                            onChangeText={password=>{this.setState({password:password})}}
                            value={this.state.password}
                            autoCorrect={false}
                        />


                        <View style={{height:43, width:'80%',
                                marginBottom:10,
                                borderWidth:2,
                                borderColor:'#b71c1c',}}>
                        <Picker
                            style={{width: '100%',
                                height: 38,
                                color:'#000',
                                paddingRight: 5,
                                paddingLeft: 5,
                                borderRadius:20,
                                backgroundColor: '#fff',
                                marginBottom: 20}}
                            mode="dropdown"
                            selectedValue = {this.state.experience}
                            onValueChange= {(itemValue, itemIndex) => this.setState({ experience: itemValue })}
                            >
                            <Picker.Item label="No Experience" value="0" />
                            <Picker.Item label="1 - 6 months" value="1" />
                            <Picker.Item label="7 - 11 months" value="2" />
                            <Picker.Item label="1 - 3 years" value="3" />
                            <Picker.Item label="4 - 8 years" value="4" />
                            <Picker.Item label="More than 8" value="5" />
                      </Picker>
                      </View>
                      
                        <View style={{width:'80%', height:50, justifyContent:'center',alignItems:'center'}}>
                            {this.renderSpinnerButton()}
                        </View>
                        
                        </View>
                        </KeyboardAwareScrollView>
        );
    }
}
