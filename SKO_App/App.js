/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Alert, NetInfo, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import OneSignal from 'react-native-onesignal';

import Login from './src/components/Authentication/Login';
import {StackNavi, TabNavi} from './src/components/Root';
import Splash from './src/components/Authentication/Splash';
import Sub from './src/components/Subscription';

const version = '2.0.1';


export default class App extends Component {

  state={loggedIn:null, allow: false, connectionInfo:'' }

  handleFirstConnectivityChange(connectionInfo) {
    console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    this.setState({
      connectionInfo: connectionInfo.type
    }, this.forceUpdate());
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange.bind(this)
    );
  }

  componentWillMount(){

    OneSignal.init("391cef7d-0a95-4665-8c33-92aafef044a5");
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

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



  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.setState({
          connectionInfo: connectionInfo.type
      });
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });

    NetInfo.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange.bind(this)
    );



    firebase.database().ref('ver_control/cur_ver').on('value',(val)=>{
      if(version==val.val())
    {
        this.setState({ allow: true },()=>{
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
              this.setState({ loggedIn: false });
            }
          });
        });
        firebase.database().ref(
          `users/${firebase.auth().currentUser.uid}/subscribed`)
          .on('value',(subTags)=>{
          OneSignal.sendTags(subTags.val());
        });
    } else {
        firebase.auth().signOut();
        Alert.alert('App Update!', 'Update your app from the Play Store to continue using SKO services.', [], {cancellable: false});
    }
    })



  }


  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);

  }


  renderScreens(){
    if(this.state.allow) {
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
  return <Splash />
  }
  render() {
    if(this.state.connectionInfo!='none')
    {
    return (
      <View style={{flex:1}}>
        {this.renderScreens()}
      </View>
    );
  }
  else {
    Alert.alert('Not connected to Internet', 'Please check your Internet connection!.', [], {cancellable: true});
    return (
      <View style={{flex:1}}>
        <Splash />
      </View>
    )
  }
}
}
