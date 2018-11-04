import React from 'react';
import { Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Login from './Authentication/Login.js';
import SignUpForm from './Authentication/SignUpForm';
import Subscription from './Subscription.js';
import Profile from './Profile.js';
import StockChart from './StockChart.js';

const subImg = require('./../Resources/Images/services.png');
const profImg = require('./../Resources/Images/user.png');
const chartImg = require('./../Resources/Images/chart.png');

const HomeNavi = TabNavigator({
    sub: {
        screen: Subscription,
        navigationOptions: {
        tabBarIcon: ({ focused }) => (
            focused ?
            <Image source={subImg} style={{ width: 35, height: 35, tintColor: '#fff' }} />
            :
            <Image source={subImg} style={{ width: 25, height: 25 }} />)
        },
    },
    chart: {
        screen: StockChart,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                focused ?
                <Image source={chartImg} style={{ width: 35, height: 35, tintColor: '#fff' }} />
                :
                <Image source={chartImg} style={{ width: 25, height: 25 }} />)
        },
    },
    profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                focused ?
                <Image source={profImg} style={{ width: 35, height: 35, tintColor: '#fff' }} />
                :
                <Image source={profImg} style={{ width: 25, height: 25 }} />)
        },
    },
  }, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      header: null,
      showIcon: true,
      showLabel: false,
      style: {
        height: 50,
        backgroundColor: '#B71C1C'
    },
      activeTintColor: '#eae965'
  },
});

export const StackNavi = StackNavigator({
    Login: {
        screen: Login
    },
    SignUpForm: {
        screen: SignUpForm,
        navigationOptions: ({ navigation }) => ({
            header: null,
          }),
    },
    HomeNavi: {
        screen: TabNavigator({
            sub: {
                screen: Subscription,
                navigationOptions: {
                tabBarIcon: ({ focused }) => (
                    focused ?
                    <Image source={subImg} style={{ width: 35, height: 35, tintColor: '#fff' }} />
                    :
                    <Image source={subImg} style={{ width: 25, height: 25 }} />)
                },
            },
            chart: {
                screen: StockChart,
                navigationOptions: {
                    tabBarIcon: ({ focused }) => (
                        focused ?
                        <Image source={chartImg} style={{ width: 35, height: 35, tintColor: '#fff' }} />
                        :
                        <Image source={chartImg} style={{ width: 25, height: 25 }} />)
                },
            },
            profile: {
                screen: Profile,
                navigationOptions: {
                    tabBarIcon: ({ focused }) => (
                        focused ?
                        <Image source={profImg} style={{ width: 35, height: 35, tintColor: '#fff' }} />
                        :
                        <Image source={profImg} style={{ width: 25, height: 25 }} />)
                },
            },
      }, {
      initialRouteName: 'chart',
      tabBarPosition: 'bottom',
      tabBarOptions: {
        header: null,
        showIcon: true,
        showLabel: false,
        style: {
          height: 50,
          backgroundColor: '#B71C1C'
        },
        activeTintColor: '#eae965'
      },

    })
  }
});

export const TabNavi = TabNavigator({
    sub: {
        screen: Subscription,
        navigationOptions: {
        tabBarIcon: ({ focused }) => (
            focused ?
            <Image source={subImg} style={{width:35, height:35, tintColor:'#fff'}} />
            :
            <Image source={subImg} style={{width:25, height:25}} />)
        },
    },
    chart: {
        screen: StockChart,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                focused ? 
                <Image source={chartImg} style={{width:35, height:35, tintColor:'#fff'}} />
                :
                <Image source={chartImg} style={{width:25, height:25}} />)
        },
    },
    profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                focused ?
                <Image source={profImg} style={{width:35, height:35, tintColor:'#fff'}} />
                :
                <Image source={profImg} style={{width:25, height:25}} />)
        },
    },
  }, {
  initialRouteName: 'chart',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    header: null,
    showIcon: true,
    showLabel: false,
    style: {
        height:50,
      backgroundColor: '#B71C1C'
    },
  },

});
