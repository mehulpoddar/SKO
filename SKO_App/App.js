/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import Login from './src/components/Authentication/Login';

export default class App extends Component{
  render() {
    return (
      <View style={{flex:1}}>
        <Login />
      </View>
    );
  }
}
