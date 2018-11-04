import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';

export default class Profile extends Component {
    static navigationOptions = {
        headerMode: 'none'
      }

    state={email:'', name:'', experience:'', returns:'',
    conv_experience: { 0: '10,000 - 50,000', 1: '50,000 - 1,00,000', 2: '1 lakh to 3 lakhs', 3: 'More than 3 lakhs' },
    conv_returns: { 0: 'No Experience', 1: '1 - 6 months', 2: '7 - 11 months', 3: '1 - 3 years', 4: '4 - 8 years', 5: 'More than 8' } }

    componentDidMount()
    {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/`).on('value',(user)=>{
            this.setState({email: user.val().email, name: user.val().username, experience: this.state.conv_experience[user.val().experience], returns: this.state.conv_returns[user.val().returns] });
        }) 
    }

    firebaseSignOut() {
        firebase.auth().signOut();
    }

    render() {
        return (
            <View style={{flex:1}}>

                <View style={{top:0,left:0,right:0, height:50, backgroundColor:'#B71C1C', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'#fff', fontSize:18}}>Profile</Text>
                </View>
                
                <View>
                    <View style={{justifyContent:'center',backgroundColor:'#E0E0E0', height:40}}>
                        <Text style={{marginLeft:14,color:'#000', fontSize:18}}>Account Information</Text>
                    </View>

                    <View style={{ height:40, flexDirection:'row', marginTop:9, borderBottomColor:'#dedede', borderBottomWidth:1}}>
                        <Text style={{width:100, marginLeft:14, fontSize:16}}>Name</Text>
                        <Text style={{marginLeft:20, fontSize:16}}>{this.state.name}</Text>
                    </View>
                    <View style={{ height:40, flexDirection:'row', borderBottomColor:'#dedede', borderBottomWidth:1, alignItems:'center'}}>
                        <Text style={{width:100, marginLeft:14, fontSize:16}}>Email</Text>
                        <Text style={{marginLeft:20, fontSize:16}}>{this.state.email}</Text>
                    </View>
                    <View style={{height:40, flexDirection:'row', borderBottomColor:'#dedede', borderBottomWidth:1, alignItems:'center'}}>
                        <Text style={{width:100, marginLeft:14, fontSize:16}}>Experience</Text>
                        <Text style={{marginLeft:20, fontSize:16}}>{this.state.experience}</Text>
                    </View>
                    <View style={{ height:40, flexDirection:'row', alignItems:'center', marginBottom:9, paddingTop:4}}>
                        <Text style={{width:100, marginLeft:14, fontSize:16}}>Expected Returns</Text>
                        <Text style={{marginLeft:20, fontSize:16}}>{this.state.returns}</Text>
                    </View>

                    <View style={{justifyContent:'center',backgroundColor:'#E0E0E0', height:40}}>
                        <Text style={{marginLeft:14,color:'#000', fontSize:18}}>Settings</Text>
                    </View>
                    <TouchableOpacity style={{height:40, flexDirection:'row', marginTop:9, borderBottomColor:'#dedede', borderBottomWidth:1, alignItems:'center'}}>
                        <Image style={{width:35, height:35, marginLeft:14}} source={require('../Resources/Images/edit.png')} />
                        <Text style={{ marginLeft:12, color:'#000', fontSize:16, textAlign:'center'}}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:40, flexDirection:'row', marginTop:5,alignItems:'center'}}>
                        <Image style={{width:35, height:35, marginLeft:14}} source={require('../Resources/Images/password.png')} />
                        <Text style={{marginLeft:12,textAlign:'center', fontSize:16, color:'#000'}}>Forgot Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.firebaseSignOut.bind(this)} style={{marginTop:9,width:'80%', height:60, backgroundColor:'#B71C1C', alignSelf:'center', justifyContent:'center', }}>
                        <Text style={{textAlign:'center', fontSize:18, color:'#fff'}}>SignOut</Text>
                    </TouchableOpacity>
                    
                    </View>
            </View>
        );
    }
}
