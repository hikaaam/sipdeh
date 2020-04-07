import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';


var s = require('../../../../assets/styles/perda');

class PdfList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      dataSource:[],
      per:''
    };
  }

componentDidMount(){
    let value =  this.props.route.params.item;
   let data1 = this.props.route.params.data;
   let peraturan = this.props.route.params.per;
  let data  = data1[value]
    this.setState({
      isLoading:false,
      dataSource:data
      
    });
    if(peraturan=='perda'){
      this.setState(
        {
          per:'Daerah'
        }
      )
    }
    else{
      this.setState({
      per:'Bupati'
      })
    }
}
isiperbup(data){  



  return data.map((value,i)=>{
 
   return(
    <TouchableOpacity style={s.BodyItems} onPress={()=>{this.props.navigation.navigate('pdfview',{data:value.PdfPath})}}>
        <View style={s.IconContainer} backgroundColor="red" >
        <Icon2 name='file-pdf' size={30} color='white' />
        </View>
       
        <View style={s.TextContainer}>
      <Text style={s.TextTitle}>Peraturan {this.state.per+' Tahun '+this.props.route.params.item.substr(5,8)+' \nNomor  '+value.Nomor} </Text>
      <View style={{
          width:"90%",
      }}>
            <Text style={{
                fontSize:17,
                fontFamily:"serif",
                fontWeight:"normal",
                fontStyle:"italic"
            }}>{value.Tentang.toLowerCase()} </Text>
            </View>
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

export default PdfList;
