import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


var s = require('../../../../assets/styles/perda');

class perbup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      dataSource:[],

      
    };
  }

componentDidMount(){
  let link = 'http://jdih.brebeskab.go.id/android/listProduk.php';
  // let link2 = 'http://192.168.43.47/jdih_brebes-master/listProduk.php';
  fetch(link).then((response) => 
  response.json()).then((responseJson) => {
   
      this.setState({
          isLoading:false,
          dataSource:responseJson[0]['perbup'][0]['tahun']
      })
  })
}
isiperbup(data){  
let array = []
Object.keys(data).forEach(function(key) {
  array.push(key);
  // ...
});
let tahun = []
let panjang = []
for(var i=0;i<array.length;i++){
  let data2 = data[i];
  tahun.push(Object.keys(data2));
  
  panjang.push(data[i][Object.keys(data2)].length);
}

  // console.log(panjang)
  return tahun.map((value,i)=>{
   let a = 0;
   return(
   
    <TouchableOpacity style={s.BodyItems} onPress={()=>{this.props.navigation.navigate('pdflist',{
      data:this.state.dataSource[i],
      item:value[0]
    })}}>
        <View style={s.IconContainer}>
        <Icon name='list' size={30} color='white' />
        </View>
        <View style={s.NumberContainer}>
        <Text style={s.Number}>{panjang[i]}</Text>
          </View>
        <View style={s.TextContainer}>
      <Text style={s.TextTitle}>Perpub {value[0].charAt(0).toUpperCase()+value[0].substr(0,5).slice(1)+' '+value[0].substr(5,9)} </Text>
            <Text style={s.Text}>Bagian Hukum Setda Brebes</Text>
        </View>
    </TouchableOpacity>
 );
  }
  
  )

}

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' animating />
        </View>
      )
    }
    else{
    return (
      
     <ScrollView style={s.Body}>

        {this.isiperbup(this.state.dataSource)}
    </ScrollView>
   
    );
    }
  }
}

export default perbup;
