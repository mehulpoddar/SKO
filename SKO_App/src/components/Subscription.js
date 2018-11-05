import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Subscription extends Component {

    static navigationOptions = {
        headerMode: 'none'
      }

    render() {
        return (
            <View>
                <Text>'Subscrption'</Text>
            </View>
        );
    }
}
