import React, { Component } from 'react';
import { AppRegistry,
    StyleSheet,
    Text,
    View, processColor} from 'react-native';
import { CandleStickChart } from 'react-native-charts-wrapper';


export default class StockChart extends Component {
    static navigationOptions = {
        headerMode: 'none'
      }

    render() {
        
        return (
            <View style={{flex: 1}}>
        <View style={styles.container}>
          <CandleStickChart style={styles.chart} 
            chartBackgroundColor={2}
            data= {{
            dataSets: [
                {
                  values: [
                    {
                      x: 20,
                      shadowH: 120, // required
                      shadowL: 2, // required
                      open: 50, // required
                      close: 100, // required
                    },
                    {
                        x: 30,
                        shadowH: 200, // required
                        shadowL: 40, // required
                        open: 150, // required
                        close: 100, // required
                      },
                      {
                        x: 40,
                        shadowH: 300, // required
                        shadowL: 0, // required
                        open: 50, // required
                        close: 200, // required
                      }
                  ],
                  label: 'Stocks', // required
                  config: {
                    highlightColor: processColor('darkgray'),
                    shadowColor: processColor('black'),
                    shadowWidth: 1,
                    shadowColorSameAsCandle: true,
                    neutralColor: processColor('pink'),
                    increasingColor: processColor('#71BD6A'),
                    increasingPaintStyle: 'fill',
                    decreasingColor: processColor('#D14B5A')
                  }
                }]

           }
        }
          />
        </View>
      </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF'
    },
    chart: {
      flex: 1
    }
  });
  
