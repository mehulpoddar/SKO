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
    CandleModal:false,statusModal:false,sheet1status:{},sheet2status:{},sheet3status:{},currentsheetStatus:'',
    sheetLimitLines:{BankNiftyH:[], CrudeOilH:[], NaturalGasH:[]},
    selectedCandleValues:{x:'',open:'',close:'',high:'',low:'', date:''},
    sheetData:{BankNiftyH:{}, CrudeOilH:{}, NaturalGasH:{}}
  }



    componentDidMount(){
      //console.log("Hello");
      this.spreadsheetData();
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
      //console.log(valuesarray)
      valuesarray = valuesarray.slice(1)
      var values = []
      var sheetValues = {}
      var sheetLimitLine = []
      var xdiff = 1
      var lastx = 0
      var countr = 0
      var prevdate = ''
      valuesarray.forEach(
        val=>{
          countr = countr+1
          
          if(val[0]!='')
          {
            sheetLimitLine.push({ limit: countr, label: val[0], lineColor: processColor('black'), lineWidth: 2, lineDashPhase: 2,
            lineDashLengths: [10,30] })
            countr = countr+1
            prevdate = val[0]
          }
         // console.log("Valuess", val)
          lastx = countr
          sheetValues[countr] = ({ shadowH:parseFloat(val[4]), shadowL:parseFloat(val[3]), open:parseFloat(val[2]), close:parseFloat(val[5]), date:prevdate, time:val[1]})
         // console.log("Sheet values",sheetValues);
          values.push({ x:countr, shadowH:parseFloat(val[4])-parseFloat(val[2]), shadowL:parseFloat(val[3])-parseFloat(val[2]), open:0, close:parseFloat(val[5])-parseFloat(val[2]), marker:'Hey mr dj \n Hiii' })

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
        var limitlinetemp = {...this.state.sheetLimitLines}

        charttemp[sheetName] = values;
        sheettemp[sheetName] = sheetValues;
        limitlinetemp[sheetName] = sheetLimitLine;

        this.setState({ chartdata: charttemp, sheetData: sheettemp, sheetLimitLines: limitlinetemp });

    }

    spreadsheetData(){
      this.getData('BankNiftyH');
      this.getData('CrudeOilH');
      this.getData('NaturalGasH');
    }

    handleSelect(event) {
      let temp = this.state.sheetData[sheetNamehandle][event.nativeEvent.x]
      if(temp != undefined && temp != {})
      {
      this.setState({selectedCandleValues:{x:temp.time, open: temp.open, close: temp.close, high:temp.shadowH, low:temp.shadowL, date:temp.date}, CandleModal:true})
    }
  }

    showCandleModal(){
      this.setState({CandleModal:true})
    }
    closeCandleModal(visible){
      this.setState({CandleModal:visible,selectedCandleValues:{x:'',open:'',close:'',high:'',low:'', date:''}})
    }

    showTime(statevalues) {
      console.log(statevalues)
        if(statevalues.x!='')
        {
          return (<Text style={{fontSize:18, color:'#fff'}}>  Time: {statevalues.x}</Text>)
        }
    }

    ShowCandleValues(){
      var statevalues = this.state.selectedCandleValues
      console.log(this.state.selectedCandleValues)
      return(
        <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
      <Modal
            visible={this.state.CandleModal}
            transparent={true}
            animationType={"fade"}
            onRequestClose={ () => { this.closeCandleModal(!this.state.CandleModal)} } >
      <View style={{justifyContent: 'center' ,alignItems: 'center',width:'100%',height:'100%', alignSelf:'center',}}>
        <View style={{justifyContent: 'center' ,alignItems: 'center', width:'80%', height:'35%'}}>
        <View style={{backgroundColor:'#b71c1c', width:'100%',flexDirection:'row', height:'17%',borderTopLeftRadius:25, borderTopRightRadius:25, alignItems:'center', justifyContent:'center' }}>
          <Text style={{fontSize:18, color:'#fff'}}>Date: {statevalues.date}</Text>
          { this.showTime(statevalues) }
          
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

    showStatusModal(sheetname){
      firebase.database().ref('status/'+sheetname+'/').on('value',(val)=>{
        //console.log(val.val())
        if(sheetname=='BankNiftyH')
        {
        this.setState({statusModal:true, sheet1status:val.val(), currentsheetStatus:'BankNiftyH'})
        }
        else if(sheetname=='CrudeOilH')
        {
          this.setState({statusModal:true, sheet2status:val.val(), currentsheetStatus:'CrudeOilH'})
        }
        else
        {
          this.setState({statusModal:true, sheet3status:val.val(), currentsheetStatus:'NaturalGasH'})
        }
      })
      
    }
    closeStatusModal(visible){
      this.setState({statusModal:visible})
      }

    ShowStatusValues(){
      var sheetstatus = {}
      //console.log(this.state.sheet2status)
      if(this.state.currentsheetStatus=='BankNiftyH')
      {
        sheetstatus = this.state.sheet1status
      }
      else if(this.state.currentsheetStatus=='CrudeOilH')
      {
        sheetstatus = this.state.sheet2status
      }
      else
      {
        sheetstatus = this.state.sheet3status
      }
      
      return(
        <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
      <Modal
            visible={this.state.statusModal}
            transparent={true}
            swipeToClose = {false}
            swipeArea={0}
            animationType={"fade"}
            onRequestClose={ () => { this.closeStatusModal(!this.state.statusModal)} } >
      <View style={{justifyContent: 'center' ,alignItems: 'center',width:'100%',height:'100%', alignSelf:'center',}}>
        
      <View style={{justifyContent: 'center' ,alignItems: 'center', width:'80%', height:'35%'}}>
        <View style={{backgroundColor:'#b71c1c', width:'100%', height:'17%',borderTopLeftRadius:25, borderTopRightRadius:25, alignItems:'center', justifyContent:'center' }}>
          <Text style={{fontSize:18, color:'#fff'}}>{this.state.currentsheetStatus}</Text>
        </View>

        <ScrollView style={{width:'100%', height:'100%',backgroundColor:'#fff'}} contentContainerStyle={{alignItems:'center'}}>
          {
            Object.keys(sheetstatus).map(time => {
              //console.log(chaps, this.state.subjects[this.state.modal.noti][this.state.modal.mod][chaps].url)
              return (<Text style={{color:'#000', padding:10, fontSize:18}}>{time}  :  {sheetstatus[time]}</Text> )     
          })
        } 
        </ScrollView>
        

        <TouchableOpacity onPress={this.closeStatusModal.bind(this,false)} style={{backgroundColor:'#b71c1c', width:'100%', height:'17%',justifyContent:'center',borderBottomLeftRadius:25, borderBottomRightRadius:25, alignItems:'center' }}>
          <Text style={{fontSize:18, color:'#fff'}}>Close</Text>
        </TouchableOpacity>
        </View>
        </View>
     </Modal>
     </View>
      )
    }



    render() {
        console.log("LimitLines", this.state.sheet1LimitLines)
        return (
            <View style={{flex: 1}}>
            {this.ShowCandleValues()}
            {this.ShowStatusValues()}
            <View style={{top:0,left:0,right:0, height:50, backgroundColor:'#B71C1C', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'#fff', fontSize:18}}>Charts</Text>
                    <TouchableOpacity onPress={this.spreadsheetData.bind(this)} style={{width:40, height:40,right:0, position:'absolute', justifyContent:'center' }}>
                        <Image source={require('../Resources/Images/refresh.png')} style={{width:30,height:30, color:'#fff'}} />
                    </TouchableOpacity>
                </View>
        <ScrollView style={{ width:'100%', height:'100%',backgroundColor:'#FCF5FF'}}>
        <View style={{width:'100%', height:3, backgroundColor:'#fff'}}>
          <Text style={{alignSelf:'center', color:'#fff', fontSize:18, backgroundColor:'#fff'}}>NaturalGas</Text>
          </View>
        <View style={{width:'100%', height:30, backgroundColor:'#b71c1c'}}>
          <Text style={{alignSelf:'center', color:'#fff', fontSize:18, backgroundColor:'#b71c1c'}}>BankNifty</Text>
          </View>
        <View style={{width:'100%',height:300, marginTop:4}}>
        <CandleStickChart style={{width:'100%', height:'80%'}}
            chartBackgroundColor={0}
            chartDescription={{text:"Tap a candle to view"}}
            xAxis={{ 
              drawLabels: true,
              drawGridLines: false,
              drawAxisLine: false,
              gridLineWidth: false,
              valueFormatter: ['date'],
              limitLines: this.state.sheetLimitLines['BankNiftyH']
                  }}
              
              yAxis={{
                  left: {
                    enabled: false
                  },
                  right: {
                    enabled: false
                  },
    
                }
              }

              marker={{
                enabled: false,
                markerColor: processColor('#2c3e50'),
                textColor: processColor('white'),
              }}

            zoom={{
              scaleX: 1,
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

          <TouchableOpacity onPress={this.showStatusModal.bind(this, 'BankNiftyH')} style={{marginBottom:20, height:'20%', alignItems:'center'}}>
          <Text style={{padding:10, backgroundColor:'#b71c1c',borderRadius:10, color:'#fff'}}>Check Status</Text>
          </TouchableOpacity>
          </View>
        
          <View style={{width:'100%', height:30, backgroundColor:'#b71c1c'}}>
          <Text style={{alignSelf:'center', color:'#fff', fontSize:18, backgroundColor:'#b71c1c'}}>CrudeOil</Text>
          </View>
        <View style={{width:'100%',height:300}}>
        <CandleStickChart style={{width:'100%', height:'80%'}}
            chartBackgroundColor={2}
            xAxis={{ 
              drawLabels: true,
              drawGridLines: false,
              drawAxisLine: false,
              gridLineWidth: false,
              valueFormatter: ['date'],
              limitLines: this.state.sheetLimitLines['CrudeOilH']
                  }}
              
              yAxis={{
                  left: {
                    enabled: false
                  },
                  right: {
                    enabled: false
                  },
    
                }
              }

              marker={{
                enabled: false,
                markerColor: processColor('#2c3e50'),
                textColor: processColor('white'),
              }}
            chartDescription={{text:"Tap a candle to view"}}
            zoom={{
              scaleX: 1,
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
          <TouchableOpacity onPress={this.showStatusModal.bind(this, 'CrudeOilH')} style={{marginBottom:20, height:'20%', alignItems:'center'}}>
          <Text style={{padding:10, backgroundColor:'#b71c1c',borderRadius:10, color:'#fff'}}>Check Status</Text>
          </TouchableOpacity>
          </View>

          <View style={{width:'100%', height:30, backgroundColor:'#b71c1c'}}>
          <Text style={{alignSelf:'center', color:'#fff', fontSize:18, backgroundColor:'#b71c1c'}}>NaturalGas</Text>
          </View>
          <View style={{width:'100%',height:300}}>
        <CandleStickChart style={{width:'100%', height:'80%'}}
            chartBackgroundColor={2}
            xAxis={{ 
              drawLabels: true,
              drawGridLines: false,
              drawAxisLine: false,
              gridLineWidth: false,
              valueFormatter: ['date'],
              limitLines: this.state.sheetLimitLines['NaturalGasH']
                  }}
              
              yAxis={{
                  left: {
                    enabled: false
                  },
                  right: {
                    enabled: false
                  },
    
                }
              }

              marker={{
                enabled: false,
                markerColor: processColor('#2c3e50'),
                textColor: processColor('white'),
              }}

            chartDescription={{text:"Tap a candle to view"}}
            zoom={{
              scaleX: 1,
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
          <TouchableOpacity onPress={this.showStatusModal.bind(this, 'NaturalGasH')} style={{marginBottom:20, height:'20%', alignItems:'center'}}>
          <Text style={{padding:10, backgroundColor:'#b71c1c',borderRadius:10, color:'#fff'}}>Check Status</Text>
          </TouchableOpacity>
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
