import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class Splash extends Component {
    static navigationOptions = {
        headerMode: 'none'
      }
    render() {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Image source={require('../../Resources/Images/applogo.png')} style={{width:500, height:500}} />
            </View>
        );
    }
}
