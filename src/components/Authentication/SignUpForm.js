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
      state={email:'', password:'', username:'', returns:'', experience:'',signUpstatus:false}

      firebaseSignUp() {
        const email = this.state.email
        const password = this.state.password
        const { navigate } = this.props.navigation;

        firebase.auth().createUserWithEmailAndPassword(email,password).then(
            ()=>{
                firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).set({
                    email: this.state.email,
                    username: this.state.username,
                    experience: this.state.experience,
                    returns: this.state.returns
                   },()=>{
                    this.props.navigation.navigate('HomeNavi', {screen:'StockChart'})
                   })
            }
        )
        .catch(() => {
            ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
          })
    }

        renderSpinnerButton(){
            if(!this.state.signUpstatus)
            {
                return (<TouchableOpacity style={{backgroundColor:'#f7c744',height:50, justifyContent:'center', borderRadius:20, width:'60%'}} onPress={()=>{
                    this.setState({signUpstatus:true},
                        this.firebaseSignUp.bind(this)
                    )
                }}>
                    <Text style={{textAlign: 'center',color :'#000',fontSize: 16, fontStyle:'bold'}}>SIGN UP</Text>
                </TouchableOpacity>);
            }
            else
            {
                return <ActivityIndicator size={'large'} color="#f7c744"/>
            }
        }

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
                            onChangeText={username=>{this.setState({username:username})}}
                            value={this.state.username}
                        />
                        <TextInput style={{ width:'80%',
                                            height: 40,
                                        backgroundColor: '#8f96cf',
                                        color: '#000',
                                        marginBottom: 20,
                                        paddingHorizontal: 10}}
                            placeholder="Enter email"
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
                            placeholder="Enter Password"
                            secureTextEntry
                            onChangeText={password=>{this.setState({password:password})}}
                            value={this.state.password}
                            autoCorrect={false}
                        />

                        <Picker
                            style={{width: '80%',
                                height: 40,
                                color:'#000',
                                paddingRight: 5,
                                paddingLeft: 5,
                                backgroundColor: '#8f96cf',
                                marginBottom: 20}}
                            mode="dropdown"
                            selectedValue = {this.state.returns}
                            onValueChange= {(itemValue, itemIndex) => this.setState({returns: itemValue})}
                            >
                            <Picker.Item label="10,000 - 50,000" value="0" />
                            <Picker.Item label="50,000 - 1,00,000" value="1" />
                            <Picker.Item label="1 lakh to 3 lakhs" value="2" />
                            <Picker.Item label="More than 3 lakhs" value="3" />
                      </Picker>

                        <Picker
                            style={{width: '80%',
                                height: 40,
                                color:'#000',
                                paddingRight: 5,
                                paddingLeft: 5,
                                backgroundColor: '#8f96cf',
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
                      
                        <View style={{width:'80%', height:50, justifyContent:'center',alignItems:'center'}}>
                            {this.renderSpinnerButton()}
                        </View>
                        
                        </View>
                        </KeyboardAwareScrollView>
        );
    }
}
