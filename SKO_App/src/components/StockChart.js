import React, { Component } from 'react';
import { AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    processColor,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    Modal
} from 'react-native';
import { CandleStickChart } from 'react-native-charts-wrapper';
import firebase from 'firebase';
var handleDo = true;
var tempData = {};
var sheetNamehandle = '';

export default class StockChart extends Component {
    static navigationOptions = {
        headerMode: 'none'
      }

    state = {chartdata:{
      BankNiftyH: [
        {
        x: 20,
        shadowH: 0, // required
        shadowL: 0, // required
        open: 0, // required
        close: 0, // required
      },
      {
          x: 30,
          shadowH: 0, // required
          shadowL: 0, // required
          open: 0, // required
          close: 0, // required
        },
        {
          x: 40,
          shadowH: 0, // required
          shadowL: 0, // required
          open: 0, // required
          close: 0, // required
        }
    ],
    CrudeOilH: [
      {
      x: 20,
      shadowH: 0, // required
      shadowL: 0, // required
      open: 0, // required
      close: 0, // required
    },
    {
        x: 30,
        shadowH: 0, // required
        shadowL: 0, // required
        open: 0, // required
        close: 0, // required
      },
      {
        x: 40,
        shadowH: 0, // required
        shadowL: 0, // required
        open: 0, // required
        close: 0, // required
      }
  ],
      NaturalGasH: [
        {
        x: 20,
        shadowH: 0, // required
        shadowL: 0, // required
        open: 0, // required
        close: 0, // required
      },
      {
          x: 30,
          shadowH: 0, // required
          shadowL: 0, // required
          open: 0, // required
          close: 0, // required
        },
        {
          x: 40,
          shadowH: 0, // required
          shadowL: 0, // required
          open: 0, // required
          close: 0, // required
        }
    ]},
    CandleModal:false,
    selectedCandleValues:{x:'',open:'',close:'',high:'',low:''},
    sheetData:{BankNiftyH:{}, CrudeOilH:{}, NaturalGasH:{}}
  }



    componentDidMount(){
      console.log("Hello");
      this.getData('BankNiftyH');
      this.getData('CrudeOilH');
      this.getData('NaturalGasH');
    }

    async getData(sheetName){
      let response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1lbK_NC7BTYkNwh--jiUZ8-ETzZMNzqiAuKfv3OMUOwU/values/'+sheetName+'?key=AIzaSyCoxSCbr5KNjS5xmezt09O0PLP3k8aaxGg', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
      , );
      let responseJson = await response.json();
      this.formatjson(responseJson, sheetName)
    }

    formatjson(responseJson, sheetName){
      let valuesarray = responseJson.values
      console.log(valuesarray)
      valuesarray = valuesarray.slice(1)
      var values = []
      var sheetValues = {}
      var xdiff = parseInt(valuesarray[1][0]) - parseInt(valuesarray[0][0])
      var lastx = 0
      valuesarray.forEach(
        val=>{
          console.log(val)
          lastx = parseInt(val[0])
          sheetValues[parseInt(val[0])] = ({ shadowH:parseFloat(val[3]), shadowL:parseFloat(val[2]), open:parseFloat(val[1]), close:parseFloat(val[4])})
          values.push({ x:parseInt(val[0]), shadowH:parseFloat(val[3])-parseFloat(val[1]), shadowL:parseFloat(val[2])-parseFloat(val[1]), open:0, close:parseFloat(val[4])-parseFloat(val[1]) })

      })
      values.push({
        x: lastx + xdiff,
        shadowH: 0, // required
        shadowL: 0, // required
        open: 0, // required
        close: 0, // required

      },
      {
          x: lastx + 2*xdiff,
          shadowH: 0, // required
          shadowL: 0, // required
          open: 0, // required
          close: 0, // required
        },
        {
          x: lastx + 3*xdiff,
          shadowH: 0, // required
          shadowL: 0, // required
          open: 0, // required
          close: 0, // required
        },
        {
          x: lastx + 4*xdiff,
          shadowH: 0, // required
          shadowL: 0, // required
          open: 0, // required
          close: 0, // required
        },
        {
          x: lastx + 5*xdiff,
          shadowH: 0, // required
          shadowL: 0, // required
          open: 0, // required
          close: 0, // required
        })

        var charttemp = {...this.state.chartdata}
        var sheettemp = {...this.state.sheetData}

        charttemp[sheetName] = values;
        sheettemp[sheetName] = sheetValues;

        this.setState({chartdata: charttemp, sheetData: sheettemp})

    }

    handleSelect(event) {
      let temp = this.state.sheetData[sheetNamehandle][event.nativeEvent.x]
      if(temp != undefined && temp != {})
      {
      this.setState({selectedCandleValues:{x:event.nativeEvent.x, open: temp.open, close: temp.close, high:temp.shadowH, low:temp.shadowL}, CandleModal:true})
    }
  }

    showCandleModal(){
      this.setState({CandleModal:true})
    }
    closeCandleModal(visible){
      this.setState({CandleModal:visible,selectedCandleValues:{x:'',open:'',close:'',high:'',low:''}})
    }

    ShowCandleValues(){
      var statevalues = this.state.selectedCandleValues

      return(
        <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
      <Modal
            visible={this.state.CandleModal}
            transparent={true}
            animationType={"fade"}
            onRequestClose={ () => { this.closeCandleModal(!this.state.CandleModal)} } >
      <View style={{justifyContent: 'center' ,alignItems: 'center',width:'100%',height:'100%', alignSelf:'center',}}>
        <View style={{justifyContent: 'center' ,alignItems: 'center', width:'80%', height:'35%'}}>
        <View style={{backgroundColor:'#b71c1c', width:'100%', height:'17%',borderTopLeftRadius:25, borderTopRightRadius:25, alignItems:'center', justifyContent:'center' }}>
          <Text style={{fontSize:18, color:'#fff'}}>{statevalues.x}</Text>
        </View>

        <View style={{backgroundColor:'#b71c1c7f', width:'100%', height:'64%', alignItems:'center', justifyContent:'center'}}>
        <Text style={{color:'#fff', marginBottom:5, fontSize:18}}>Open  : {statevalues.open}</Text>
        <Text style={{color:'#fff', marginBottom:5, fontSize:18}}>Close : {statevalues.close}</Text>
        <Text style={{color:'#fff', marginBottom:5, fontSize:18}}>High  : {statevalues.high}</Text>
        <Text style={{color:'#fff', marginBottom:5, fontSize:18}}>Low   : {statevalues.low}</Text>
        </View>

        <TouchableOpacity onPress={this.closeCandleModal.bind(this,false)} style={{backgroundColor:'#b71c1c', width:'100%', height:'17%',justifyContent:'center',borderBottomLeftRadius:25, borderBottomRightRadius:25, alignItems:'center' }}>
          <Text style={{fontSize:18, color:'#fff'}}>Close</Text>
        </TouchableOpacity>
        </View>
        </View>
     </Modal>
     </View>
      )
    }


    render() {

        return (
            <View style={{flex: 1}}>
            {this.ShowCandleValues()}
            <View style={{top:0,left:0,right:0, height:50, backgroundColor:'#B71C1C', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'#fff', fontSize:18}}>Charts</Text>
                    <TouchableOpacity onPress={this.getData.bind(this)} style={{width:40, height:40,right:0, position:'absolute', justifyContent:'center' }}>
                        <Image source={require('../Resources/Images/refresh.png')} style={{width:30,height:30, color:'#fff'}} />
                    </TouchableOpacity>
                </View>
        <ScrollView style={{ width:'100%', height:'100%',backgroundColor:'#FCF5FF'}}>

        <View style={{width:'100%',height:200, marginTop:4}}>
        <CandleStickChart style={{width:'100%', height:'100%'}}
            chartBackgroundColor={2}
            chartDescription={{text:"Tap a candle to view"}}
            zoom={{
              scaleX: 5,
              scaleY: 0,
              xValue: 100,
              yValue: 0,
              axisDependency: 'LEFT'
              }}
            data= {{
            dataSets: [
                {
                  values: this.state.chartdata.BankNiftyH,
                  label: 'BankNifty', // required
                  config: {
                    drawValues: false,
                    highlightColor: processColor('darkgray'),
                    drawHighlightIndicators: true,
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

        onSelect={(event)=>{
          sheetNamehandle='BankNiftyH';
          this.handleSelect(event)}
        }
          />
          </View>

          <View style={{width:'100%',height:200}}>
        <CandleStickChart style={{width:'100%', height:'100%'}}
            chartBackgroundColor={2}

            chartDescription={{text:"Tap a candle to view"}}
            zoom={{
              scaleX: 5,
              scaleY: 0,
              xValue: 100,
              yValue: 0,
              axisDependency: 'LEFT'
              }}
            data= {{
            dataSets: [
                {
                  values: this.state.chartdata.CrudeOilH,
                  label: 'CrudeOil', // required
                  config: {
                    drawValues: false,
                    highlightColor: processColor('darkgrey'),
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

        onSelect={(event)=>{
          sheetNamehandle='CrudeOilH';
          this.handleSelect(event)}
        }
          />
          </View>

          <View style={{width:'100%',height:200}}>
        <CandleStickChart style={{width:'100%', height:'100%'}}
            chartBackgroundColor={2}
            chartDescription={{text:"Tap a candle to view"}}
            zoom={{
              scaleX: 5,
              scaleY: 0,
              xValue: 100,
              yValue: 0,
              axisDependency: 'LEFT'
              }}
            data= {{
            dataSets: [
                {
                  values: this.state.chartdata.NaturalGasH,
                  label: 'NaturalGas', // required
                  config: {
                    drawValues: false,
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
        onSelect={(event)=>{
          sheetNamehandle='NaturalGasH';
          this.handleSelect(event)}
        }
          />
          </View>

        </ScrollView>
      </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    chart: {
      flex: 1
    }
  });
