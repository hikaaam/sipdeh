import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Button, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
 
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/images/bg.png')} style={{width:'100%',height:'100%'}}>
      <View style={s.Body}> 
      <View style={{marginBottom:'8%'}}>
        <View style={s.IconContainer}>
          <Icon name='user' size={Dimensions.get('window').width/3}  style={s.Icon}/>
        </View>
      </View>
        <Text style={s.Text}> Admin </Text>
        <TouchableOpacity style={s.BtnContainer} onPress={()=>{
          AsyncStorage.removeItem('profile');
          this.props.navigation.popToTop();
        }}>
        <Text
        style={{color:'white',fontSize:22,fontWeight:'bold'}}
        >Logout</Text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  }
}

export default profile;


const s = StyleSheet.create(
  {
    Body:{
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
      height:Dimensions.get('window').height
    },
    Icon:{
      // color:'#4dabf5',
      color:'white',
      // marginBottom:'25%',
      borderColor:"white",
      position:'relative'
    },
    IconContainer:{
      backgroundColor:"#4dabf5",
      width:Dimensions.get('window').width/3+10,
      height:Dimensions.get('window').width/3+10,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:100,
      borderColor:'#999',
      borderWidth:4,
    },
    Text:{
      fontSize:40
    },
    BtnContainer:{
      width:Dimensions.get('window').width/2,
      backgroundColor:'#4dabf5',
      height:40,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:4,
      marginTop:20,
      borderWidth:1.4,
      // borderColor:'#4dabf5'
    }
  }
)