import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class StockChart extends Component {
    static navigationOptions = {
        headerMode: 'none'
      }
    render() {
        return (
            <View>
                <Text>StockChart</Text>
            </View>
        );
    }
}
