/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';

import Login from './src/components/Authentication/Login';
import {StackNavi, TabNavi} from './src/components/Root';
import Splash from './src/components/Authentication/Splash';

export default class App extends Component{

  state={loggedIn:null}

  componentWillMount(){
    // Initialize Firebase
    if (!firebase.apps.length) {
      const config = {
        apiKey: "AIzaSyC4iwIIKwYKgcIzbrEecDANTq1jtT3Hfzs",
        authDomain: "sko-wealth-advisory.firebaseapp.com",
        databaseURL: "https://sko-wealth-advisory.firebaseio.com",
        projectId: "sko-wealth-advisory",
        storageBucket: "sko-wealth-advisory.appspot.com",
        messagingSenderId: "879698807946"
      };
      firebase.initializeApp(config);
    }


  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  renderScreens(){
    switch(this.state.loggedIn)
    {
      case null:
        return <Splash />;
      case true:
        return <TabNavi />;
      case false: 
        return <StackNavi />;
    }
  }
  render() {
    return (
      <View style={{flex:1}}>
        {this.renderScreens()}
      </View>
    );
  }
}
