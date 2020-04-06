import React, { Component } from 'react';
import { View, Text, TextInput, ImageBackground,Alert, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const s = require('../../assets/styles/login');

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id:'',
        password:''
    };
  }
  loginbro(id,password){
    if(id === 'jdihbrebes' && password === 'admin'){
      let profile = {
        name: id,
        pass:password
      };
      AsyncStorage.setItem('profile',JSON.stringify(profile),(err,result) =>{
        if(err){
            return err;
        }
        else{  
            this.props.navigation.goBack();
        }
     }
     )
    }
    else if(id.length < 1 || password.length<1){
      Alert.alert('Login Error','Silahkan Isi ID dan Password');
    }
    else if(password !== 'admin' && id === 'jdihbrebes'){
      Alert.alert('Login Error','Password Yang Anda Masukan Salah');
    }
    else if(password === 'admin' && id !== 'jdihbrebes'){
      Alert.alert('Login Error', 'ID Yang Anda Masukan Tidak Terdaftar');
    }
    else{
      Alert.alert('Login Error','Data Yang Anda Masukan Salah');
    }
  
  }
  render() {

    return (
      <ImageBackground source={require('../../assets/images/bg.png')} style={{flex:1}}>
        <View style={s.Body}>
          <TextInput style={s.LoginBox} onChangeText={(id)=>this.setState({id}) } placeholder="id"  />
          <TextInput style={s.LoginBox} secureTextEntry onChangeText={(password)=>this.setState({password})} placeholder="password"  />
           <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center', width:'100%'}}   onPress={() => this.loginbro(this.state.id,this.state.password) }>
          <View style={s.Button}> 
          <Text  style={s.Text}>Login</Text></View>
          
           </TouchableOpacity>
           </View>
     </ImageBackground>
    );
  }
}

export default login;

