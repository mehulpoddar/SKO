import React, { Component } from 'react';
import { 
    StyleSheet,
    Text,
    Image,
    View,
    processColor,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Modal
} from 'react-native';
import firebase from 'firebase';
import { CandleStickChart } from 'react-native-charts-wrapper';

var handleDo = true;
var tempData = {};
var sheetNamehandle = '';
var pressedCandle = -1;
var scrolling = false;

export default class StockChart extends Component {
    static navigationOptions = {
        headerMode: 'none'
      }

    state = {
      subscribed:'none',
      status: {
        default: [],
        BankNiftyH: [],
        CrudeOilH: [],
        NaturalGasH: []
      },
      chartdata:{
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
    CandleModal:false,statusModal:false,
    sheetLimitLines:{BankNiftyH:[], CrudeOilH:[], NaturalGasH:[]},
    selectedCandleValues:{x:'',open:'',close:'',high:'',low:'', date:'', status:''},
    sheetData:{BankNiftyH:{}, CrudeOilH:{}, NaturalGasH:{}},
    currentsheetStatus: 'default'
  }


    componentWillMount(){

      firebase.database().ref(`users/${firebase.auth().currentUser.uid}/subscribed`).on('value', (snap)=>{
        console.log(snap.val());
        this.setState({subscribed:snap.val()});
      })
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
      var checkStat = []
      var xdiff = 1
      var lastx = 0
      var countr = 0
      var prevdate = ''
      var tempDate = ''
      valuesarray.forEach(
        val=>{
          countr = countr+1

          if(val[0]!='')
          {

            sheetLimitLine.push({ limit: countr, label: val[0], lineColor: processColor('black'), lineWidth: 1, lineDashPhase: 2,
            lineDashLengths: [10,30] })
            countr = countr+1
            prevdate = val[0]

          }
         // console.log("Valuess", val)
          lastx = countr

          if(val.length > 5)
          {
            if (val[1] !== "" && val[2] !== "" && val[3] !== "" && val[4] !== "" ) {
              if (val[0] !== "") {
                tempDate = val[0]
              }
              sheetValues[countr] = ({ shadowH:parseFloat(val[4]), shadowL:parseFloat(val[3]), open:parseFloat(val[2]), close:parseFloat(val[5]), date:prevdate, time:val[1], status:val[6]})
          // console.log("Sheet values",sheetValues);

              values.push({ x:countr, shadowH:parseFloat(val[4])-parseFloat(val[2]), shadowL:parseFloat(val[3])-parseFloat(val[2]), open:0, close:parseFloat(val[5])-parseFloat(val[2]) })

              if (val[6] !== undefined) {
                sheetLimitLine.push({ limit: countr, label: val[6][0], valueTextColor: (val[6]=='Buy')?processColor('green'):processColor('red'), lineColor: processColor('darkgrey'), lineWidth: 0.4, labelPosition:'RIGHT_BOTTOM'  })
                checkStat.push(tempDate+' '+val[1]+' : '+val[6])
              }
            }
          }
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
        var stattemp = {...this.state.status}

        charttemp[sheetName] = values;
        sheettemp[sheetName] = sheetValues;
        limitlinetemp[sheetName] = sheetLimitLine;
        stattemp[sheetName] = checkStat.reverse();

        this.setState({ chartdata: charttemp, sheetData: sheettemp, sheetLimitLines: limitlinetemp, status: stattemp });

    }

    spreadsheetData(){
      this.getData('BankNiftyH');
      this.getData('CrudeOilH');
      this.getData('NaturalGasH');
    }

    handleSelect(event) {


      console.log(event.nativeEvent.x, "asdad", pressedCandle);
      if(!scrolling)
      {

      let temp = this.state.sheetData[sheetNamehandle][event.nativeEvent.x]
      if(temp != undefined && temp != {})
      {
      this.setState({selectedCandleValues:{x:temp.time, open: temp.open, close: temp.close, high:temp.shadowH, low:temp.shadowL, date:temp.date, status: temp.status}, CandleModal:true})
    }

  }
  }

    showCandleModal(){
      this.setState({CandleModal:true})
    }
    closeCandleModal(visible){
      this.setState({CandleModal:visible,selectedCandleValues:{x:'',open:'',close:'',high:'',low:'', date:'', status:''}})
    }

    showTime(statevalues) {
      console.log(statevalues)
        if(statevalues.x!='')
        {
          return (<Text style={{fontSize:18, color:'#fff'}}>  Time: {statevalues.x}</Text>)
        }
    }

    showCandleProps(statevalues){

      if(statevalues.status === undefined)
      return(
      <View style={{backgroundColor:'#ffeded', width:'100%', height:'64%', alignItems:'center', justifyContent:'center'}}>
        <Text style={{color:'#000', marginBottom:5, fontSize:18}}>Open   : {statevalues.open}</Text>
        <Text style={{color:'#000', marginBottom:5, fontSize:18}}>Close  : {statevalues.close}</Text>
        <Text style={{color:'#000', marginBottom:5, fontSize:18}}>High   : {statevalues.high}</Text>
        <Text style={{color:'#000', marginBottom:5, fontSize:18}}>Low    : {statevalues.low}</Text>
        <Text style={{color:'#000', marginBottom:5, fontSize:18, alignSelf:'center'}}>Status :   Hold </Text>

        </View>)
        else
        {
          return(
            <View style={{backgroundColor:'#ffeded', width:'100%', height:'64%', alignItems:'center', justifyContent:'center'}}>
              <Text style={{color:'#000', marginBottom:5, fontSize:18,}}>Open   : {statevalues.open}</Text>
              <Text style={{color:'#000', marginBottom:5, fontSize:18,}}>  Close  : {statevalues.close}</Text>
              <Text style={{color:'#000', marginBottom:5, fontSize:18}}>  High   : {statevalues.high}</Text>
              <Text style={{color:'#000', marginBottom:5, fontSize:18,}}>Low    : {statevalues.low}</Text>
              <Text style={{color:'#000', marginBottom:5, fontSize:18,alignSelf:'center'}}> Status :   {statevalues.status} </Text>
              </View>)
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

        {this.showCandleProps(statevalues)}

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
      this.setState({statusModal:true, currentsheetStatus:'BankNiftyH'})
    }
    closeStatusModal(visible){
      this.setState({statusModal:visible})
      }

    ShowStatusValues(){
      var sheetstatus = {}
      //console.log(this.state.sheet2status

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

        <ScrollView style={{width:'100%', height:'100%',backgroundColor:'#ffeded'}} contentContainerStyle={{alignItems:'center'}}>
          {
            this.state.status[this.state.currentsheetStatus].map(str => {
              //console.log(chaps, this.state.subjects[this.state.modal.noti][this.state.modal.mod][chaps].url)
              return (<Text style={{color:'#000', padding:10, fontSize:18}}>{str}</Text> )
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

    chartGenerator(chartName) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{width:'100%', height:30, backgroundColor:'#b71c1c'}}>
            <Text style={{alignSelf:'center', color:'#fff', fontSize:18, backgroundColor:'#b71c1c'}}>{chartName}</Text>
            </View>
          <View style={{width:'100%',height:300, marginTop:4}}>
          <CandleStickChart style={{width:'100%', height:'80%'}}
              chartBackgroundColor={0}
              chartDescription={{text:""}}
              xAxis={{
                drawLabels: true,
                drawGridLines: false,
                drawAxisLine: false,
                gridLineWidth: false,
                valueFormatter: ['date'],
                limitLines: this.state.sheetLimitLines[chartName+'H']
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
                scaleX: 4,
                scaleY: 0,
                xValue: 100,
                yValue: 0,
                axisDependency: 'LEFT'
                }}

              data= {{
              dataSets: [
                  {
                    values: this.state.chartdata[chartName+'H'],
                    label: chartName, // required
                    config: {
                      drawValues: false,
                      highlightColor: processColor('black'),
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
            sheetNamehandle=chartName+'H';
            this.handleSelect(event)}
          }
            />

            <TouchableOpacity onPress={() => this.setState({statusModal:true, currentsheetStatus:chartName+'H'})} style={{marginBottom:20, height:'20%', alignItems:'center'}}>
            <Text style={{padding:10, backgroundColor:'#b71c1c',borderRadius:10, color:'#fff'}}>Check Status</Text>
            </TouchableOpacity>
            </View>
          </View>
        );
    }

    chartChooser(chartName) {
      if (chartName === 'BankNiftyH' && this.state.subscribed.hourly_nse === 'yes')
        return (this.chartGenerator('BankNifty'));
      else if (chartName === 'CrudeOilH' && this.state.subscribed.hourly_mcx === 'yes')
        {console.log("Crude");
        return (this.chartGenerator('CrudeOil'));}
      else if (chartName === 'NaturalGasH' && this.state.subscribed.hourly_mcx === 'yes')
        {console.log("NAT");
        return (this.chartGenerator('NaturalGas'));}
      else if (chartName === 'BankNiftyD' && this.state.subscribed.daily_nse === 'yes')
        return (this.chartGenerator('BankNifty'));
      else if (chartName === 'CrudeOilD' && this.state.subscribed.daily_mcx === 'yes')
        return (this.chartGenerator('CrudeOil'));
      else if (chartName === 'NaturalGasD' && this.state.subscribed.daily_mcx === 'yes')
        return (this.chartGenerator('NaturalGas'));
      
    }

    checkSubscribtion(){

      if (this.state.subscribed.hourly_nse === 'no' &&
         this.state.subscribed.hourly_mcx === 'no' &&
         this.state.subscribed.daily_nse === 'no' &&
         this.state.subscribed.daily_mcx === 'no')
         {
           return (
             <View style={{alignItems:'center', justifyContent:'center', width:'100%', height:'100%'}}>
               <Text>Please subscribe to view the charts and recieve notification</Text>
             </View>
           )
         }
        else if(this.state.subscribed.hourly_nse === 'yes' ||
           this.state.subscribed.hourly_mcx === 'yes' ||
           this.state.subscribed.daily_nse === 'yes' ||
           this.state.subscribed.daily_mcx === 'yes')
           {
             return(
               <ScrollView style={{ width:'100%', height:'100%',backgroundColor:'#FCF5FF'}} onScrollBeginDrag={()=>{scrolling=true}} onScrollEndDrag={()=>{scrolling=false}}>
               <View style={{alignItems:'center', height:30, justifyContent:'center'}}>
               <Text>Tap on a Candle to View</Text>
               </View>
                {this.chartChooser('BankNiftyH')}
                {this.chartChooser('CrudeOilH')}
                {this.chartChooser('NaturalGasH')}
               </ScrollView>
             )
           }
      else
      {
        return(
          <View style={{alignItems:'center', justifyContent:'center', width:'100%', height:'100%'}}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )
      }
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

            {this.checkSubscribtion()}

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
