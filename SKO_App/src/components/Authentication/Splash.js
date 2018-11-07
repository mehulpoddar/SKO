import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class Splash extends Component {
    static navigationOptions = {
        headerMode: 'none'
      }
    render() {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor: '#fff'}}>
                <Image source={require('../../Resources/Images/sko_logo.jpg')} style={{width:'90%', height:'70%', resizeMode:'contain'}} />
            </View>
        );
    }
}
