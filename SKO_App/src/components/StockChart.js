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

    state = {chartdata:[
      {
        x: 20,
        shadowH: 120, // required
        shadowL: 2, // required
        open: 50, // required
        close: 100, // required
      },
      {
          x: 30,
          shadowH: 800, // required
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
    ]}

      

    componentDidMount(){
      console.log("Hello")
      this.getData();
    }

    async getData(){
      let response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1lbK_NC7BTYkNwh--jiUZ8-ETzZMNzqiAuKfv3OMUOwU/values/Sheet1?key=AIzaSyCoxSCbr5KNjS5xmezt09O0PLP3k8aaxGg', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
      , );
      let responseJson = await response.json();
      this.setState({chartdata: this.formatjson(responseJson)})
      

    }

    formatjson(responseJson){
      let valuesarray = responseJson.values
      valuesarray = valuesarray.slice(1)
      var values = []
      valuesarray.forEach(
        val=>{
          console.log(val)
          values.push({ x:parseInt(val[0]), shadowH:parseFloat(val[1]), shadowL:parseFloat(val[2]), open:parseFloat(val[3]), close:parseFloat(val[4]) })
      })
      console.log(values)
      return values;

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
                  values: this.state.chartdata,
                  label: 'Stocksss', // required
                  config: {
                    highlightColor: processColor('darkgray'),
                    shadowColor: processColor('black'),
                    shadowWidth: 1,
                    shadowColorSameAsCandle: true,
                    neutralColor: processColor('pink'),
                    increasingColor: processColor('#71BD6A'),
                    increasingPaintStyle: 'FILL',
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
  
