import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView , Modal, Text, View, ActivityIndicator, Dimensions, TouchableOpacity, Alert} from 'react-native';
import PieChart from 'react-native-pie-chart';
 

// var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
export default class test extends Component {
   constructor(props){
       super(props);
       this.state ={
         
           isLoading:true,
           dataSource:[],
           modalVisible:false,
           currenData:[]
       }
   
   }

 
   setModalVisible(visible,data) {
      //  console.log(data)
    this.setState({
        modalVisible:visible,
        currenData:data
    })

  }

    Warna(warna,tahun,panjang,total,hits){
        let id = 0;
        let tahun2 = []
    tahun.map((data,i)=>{
        tahun2.push(data[0])
      })
    //   console.log(tahun2)
        return warna.map((userData) => {
            let tahun1 = tahun2[id];
            let text = tahun1.charAt(0).toUpperCase()+tahun1.substr(0,5).slice(1)+' '+tahun1.substr(5,9);
            // let text=tahun1;
            let panjang1 = panjang[id];
            let hits1 = hits[id];
            let percentage =(panjang1/total*100).toFixed(2) + '%';
            id = id+1;
            return (
                <TouchableOpacity style={{
                    width:Dimensions.get('window').width/1.2,
                    height:85,
                    borderBottomColor:'#555',
                    borderBottomWidth:1,
                    marginBottom:5,
                    justifyContent:'center',
                    flexDirection:"column",
                    marginLeft:30
                    // alignItems:'center'
                }} onPress={()=>{
                 
                        let  data = [panjang1,percentage,
                         text,
                         userData,
                        total,
                       hits1
                        ];
                    this.setModalVisible(true,data)
                    // Alert.alert("myTitle", "my message");
                       
                }}>
                 
                <View style={
                    {
                        width:60,
                        height:60,
                        position:'absolute',
                        backgroundColor:userData ,
                        borderRadius:100,
                        borderColor:'black',
                        borderWidth:1.8,
                        bottom:10,
                        justifyContent:'center',
                        alignItems:'center'
                    }
                }><Text style={{color:'white',backgroundColor:'#000000aa',fontSize:14}}>{percentage}</Text></View>
                <Text
                style={{marginLeft:90,fontSize:22,marginTop:20}}
                >Perbup {text} </Text>
                </TouchableOpacity>
              )
        });
    }
 
isiperbup(data){  
    let array = []
    Object.keys(data).forEach(function(key) {
      array.push(key);
      // ...
    });
    let tahun = []
    let panjang = []
    let colors = []
    let hits=[]
    let total = 0;
    for(var i=0;i<array.length;i++){
      let data2 = data[i];
      tahun.push(Object.keys(data2));
    //   console.log(tahun[i][0])
     colors.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')');
      i+1;
      panjang.push(data[i][tahun[i][0]].length);
      hits.push(data[i][tahun[i][1]][0][tahun[i][1]]);
      total = total+panjang[i];
    }
    return(
        <View>
        <View style={styles.container}>
                {/* <StatusBar
                    hidden={true}
                /> */}
                <Text style={styles.title}>Analysis Peraturan Bupati</Text>
                <PieChart 
                    chart_wh={360}
                    series={panjang}
                    sliceColor={colors}
                    doughnut={true}
                />
        </View> 
        <View >
        {this.Warna(colors,tahun,panjang,total,hits)}
    </View>
        </View>
     
    );
  
}
    componentDidMount(){
        let link2 = 'http://192.168.43.47/jdih_brebes-master/hits.php';
        let link = 'http://jdih.brebeskab.go.id/android/hits.php';
        fetch(link).then((response) => 
        response.json()).then((responseJson) => {
       
            this.setState({
                isLoading:false,
                dataSource:responseJson[0]['perbup'][0]['tahun']
            })
        })
    }

  render() {

   


 
    if(this.state.isLoading){
        return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' animating />
        </View>
        );
    }
        else{
            return (
            <ScrollView style={{flex: 1}}>
                  <View style={{ flex: 1 }}>
                            <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            >
                                <TouchableOpacity onPress={()=>{this.setState({modalVisible:false})}}  style={styles.ModalBody}>
                                    <View style={styles.ModalBox}> 
                                    <View style={styles.TitleContainer} backgroundColor={this.state.currenData[3]}>
                                    <Text style={styles.ModalTitle} >Perbup {this.state.currenData[2]}</Text>
                                    </View>
                                    <View style={styles.ItemBody}>
                                       
                                        <View style={styles.ItemContainer}>
                                            <Text style={styles.TextItemContainer}> Jumlah Peraturan : {this.state.currenData[0]} </Text>
                                        </View>
                                        <View style={styles.ItemContainer}>
                                            <Text style={styles.TextItemContainer}> percentage : {this.state.currenData[1]} </Text>
                                        </View>
                                        <View style={styles.ItemContainer}>
                                            <Text style={styles.TextItemContainer}> Total Download : {this.state.currenData[5]} </Text>
                                        </View>
                                        <View style={styles.ItemContainer}>
                                            <Text style={styles.TextItemContainer}> Total Peraturan : {this.state.currenData[4]} </Text>
                                        </View>
                                    </View>
                                    </View>
                                </TouchableOpacity>
                        </Modal>
                </View>
                {this.isiperbup(this.state.dataSource)}
            </ScrollView>
            );
        }
  }
  
}
 
AppRegistry.registerComponent('test', () => test);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#eee'
      },
      title: {
        fontSize: 24,
        margin: 10,
        paddingBottom:20
      },
    ModalBody:{
        flex:1,
        backgroundColor:'#000000aa',
        justifyContent:'center',
        alignItems:'center'
    },
    ModalBox:{
        backgroundColor:'white',
        margin:50,
        height:Dimensions.get('window').height/1.8,
        width:Dimensions.get('window').width/1.3,
        borderRadius:25,
        borderWidth:1,
     

    },
    ModalTitle:{
        fontSize:25,
        alignItems:'center',
        fontWeight:'bold',
        color:'white'
    },
    IconContainer:{
        width:70,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        position:'absolute',
        bottom:10,
        right:10
  
    },
    TitleContainer:{
       
        padding:20,
        borderBottomColor:'#555',
        borderBottomWidth:1,
        alignItems:'center',
        backgroundColor:'#2c91e1',
        borderTopRightRadius:25,
        borderTopLeftRadius:25
    },
    ItemContainer:{
        marginTop:5,
        borderBottomColor:'#999',
        borderBottomWidth:1,
        padding:20,
        paddingVertical:25
    },
    TextItemContainer:{
        fontSize:20,
     
        position:'relative',
        top:8,
        fontWeight:'bold'
    },
    ItemBody:{
        margin:20,
        flexDirection:'column',
        justifyContent:'flex-start',
        flex:1,
        // marginBottom:60
    },
    DateContainer:{
        marginLeft:50,
        position:'relative',
        top:6
    },
    TextDate:{
        fontWeight:'700',
        fontSize:16
    }
});