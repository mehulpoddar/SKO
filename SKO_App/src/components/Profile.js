import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

export default class Profile extends Component {
    static navigationOptions = {
        headerMode: 'none'
      }

    firebaseSignOut() {
        firebase.auth().signOut();
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Text>Profile</Text>
                <TouchableOpacity onPress={this.firebaseSignOut.bind(this)} style={{width:'80%', height:60, backgroundColor:'#B71C1C', alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{color:'#fff', fontSize:20, textAlign:'center'}}>SignOut</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
