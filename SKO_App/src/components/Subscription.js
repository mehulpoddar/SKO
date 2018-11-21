import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

export default class Subscription extends Component {

    static navigationOptions = {
        headerMode: 'none'
      }

    render() {
        return (
            <View style={{flex:1}}>

                <View style={{top:0,left:0,right:0, height:50, backgroundColor:'#B71C1C', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'#fff', fontSize:18}}>Subscription</Text>
                </View>

                <ScrollView style={{ width:'100%', height:'100%',backgroundColor:'#fff'}}>
                    <View style={{width:'80%', height:200, backgroundColor:'#fff', alignSelf:'center', marginTop:20}}>
                        <View style={{backgroundColor:'#b71c1c',alignItems:'center',justifyContent:'center', height:'20%'}}>
                            <Text style={{fontSize:16, color:'#fff'}}>Hourly Plan - NSE</Text>
                        </View>
                        <View style={{backgroundColor:'#f5f5f5',height:'60%'}}>
                            <Text style={{marginTop:5}}>Its for traders who would be able to spend a
                            maximum of six minutes every trading hour.
                            
                            </Text >
                            <Text style={{marginTop:5}}>In case of NSE the trader will need to follow-up for around maximum
                            six min in intervals starting from 10am untill 3pm only on all trading
                            days.</Text>
                        </View>
                        <View  style={{width:'100%', height:'20%', backgroundColor:'#272727', alignSelf:'center', justifyContent:'center',bottom:0, position:'absolute', alignItems:'center'}}>
                            <Text style={{fontSize:16, color:'#fff'}}>Amount - Rs.10,000</Text>
                        </View>
                    </View>

                    <View style={{width:'80%', height:200, backgroundColor:'#fff', alignSelf:'center', marginTop:20}}>
                        <View style={{backgroundColor:'#b71c1c',alignItems:'center',justifyContent:'center', height:'20%'}}>
                            <Text style={{fontSize:16, color:'#fff'}}>Hourly Plan - MCX Crude Oil</Text>
                        </View>
                        <View style={{backgroundColor:'#f5f5f5',height:'60%'}}>
                            <Text style={{marginTop:5}}>In case of MCX the trader will need to follow-up for around a
                            maximum of 6 min in intervals starting from 11 am until 11pm on all
                            trading days.
                            </Text>
                        </View>
                        <View  style={{width:'100%', height:'20%', backgroundColor:'#272727', alignSelf:'center', justifyContent:'center',bottom:0, position:'absolute', alignItems:'center'}}>
                            <Text style={{fontSize:16, color:'#fff'}}>Amount - Rs.10,000</Text>
                        </View>
                    </View>

                    <View style={{width:'80%', height:200, backgroundColor:'#fff', alignSelf:'center', marginTop:20, marginBottom:20}}>
                        <View style={{backgroundColor:'#b71c1c',alignItems:'center',justifyContent:'center', height:'20%'}}>
                            <Text style={{fontSize:16, color:'#fff'}}>Daily Plan</Text>
                        </View>
                        <View style={{backgroundColor:'#f5f5f5',height:'60%'}}>
                            <Text style={{marginTop:5}}>Its for traders who would be able to spend a
                            maximum of 10 min on all trading days at the last hour of trading
                            session on all trading day.
                            </Text>

                            <Text style={{marginTop:5}}>This is a monthly contract which includes MCX Crude Oil and Natural Gas</Text>
                        </View>
                        <View style={{width:'100%', height:'20%', backgroundColor:'#272727', alignSelf:'center', justifyContent:'center',bottom:0, position:'absolute', alignItems:'center'}}>
                            <Text style={{fontSize:16, color:'#fff'}}>Amount - Rs.10,000</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
