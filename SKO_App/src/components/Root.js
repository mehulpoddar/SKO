import React from 'react';
import { Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Login from './Authentication/Login.js';
import Subscription from './Subscription.js';
import Profile from './Profile.js';
import StockChart from './StockChart.js';

const subImg = require('./../Resources/Images/test.png');
const profImg = require('./../Resources/Images/test.png');
const chartImg = require('./../Resources/Images/test.png');

const HomeNavi = TabNavigator({
    sub: {
        screen: Subscription,
        navigationOptions: {
            tabBarLabel: 'Subscription',
            tabBarIcon: () => <Image source={subImg} />
        },
    },
    chart: {
        screen: StockChart,
        navigationOptions: {
            tabBarLabel: 'Chart',
            tabBarIcon: () => <Image source={chartImg} />
        },
    },
    profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: () => <Image source={profImg} />
        },
    },
  }, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    style: {
      backgroundColor: '#005b96'
    },
    iconStyle: {
      height: 64,
      width: 64
    },
    activeTintColor: '#eae965'
  },
});

const Root = StackNavigator({
    login: {
      screen: Login
    },
    homeNavi: {
      screen: HomeNavi
    }
  },
  {
    headerMode: 'none'
  }
);

export default Root;
