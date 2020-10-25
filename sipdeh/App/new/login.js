import React, { Component } from 'react';
import { View, Text, TextInput, ImageBackground, Alert, AsyncStorage } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import db from '../db';

const s = require('../../assets/styles/login');

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      background: db.state.darkmode?db.state.lightbg:db.state.darkbg,
      box: db.state.darkmode?db.state.lightbox:db.state.darkbox,
      border: !db.state.darkmode?db.state.lightbox:db.state.darkbox,
      rgba:db.state.darkmode?"rgb(73, 80, 87)":db.state.lightbox

    };
  }
  loginbro(id, password) {
    if (id === 'jdihbrebes' && password === 'admin') {
      let profile = {
        name: id,
        pass: password
      };
      AsyncStorage.setItem('profile', JSON.stringify(profile), (err, result) => {
        if (err) {
          return err;
        }
        else {
          this.props.navigation.replace('profile');
        }
      }
      )
    }
    else if (id.length < 1 || password.length < 1) {
      Alert.alert('Login Error', 'Silahkan Isi ID dan Password');
    }
    else if (password !== 'admin' && id === 'jdihbrebes') {
      Alert.alert('Login Error', 'Password Yang Anda Masukan Salah');
    }
    else if (password === 'admin' && id !== 'jdihbrebes') {
      Alert.alert('Login Error', 'ID Yang Anda Masukan Tidak Terdaftar');
    }
    else {
      Alert.alert('Login Error', 'Data Yang Anda Masukan Salah');
    }

  }
  render() {

    return (
      <View style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor:this.state.background
      }}>
        <ScrollView>
          {db.renderHeader()}
          <View style={s.Body} backgroundColor={this.state.box}>
            <TextInput style={s.LoginBox} onChangeText={(id) => this.setState({ id })} placeholder="id" />
            <TextInput style={s.LoginBox} secureTextEntry onChangeText={(password) => this.setState({ password })} placeholder="password" />
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginHorizontal:20 }} onPress={() => this.loginbro(this.state.id, this.state.password)}>
              <View style={s.Button}>
                <Text style={s.Text}>Login</Text></View>
            </TouchableOpacity>
          </View>
          {db.renderSocial()}
        </ScrollView>
        {db.renderBottom('profil', this.props.navigation)}
      </View>
    );
  }
}

export default login;

