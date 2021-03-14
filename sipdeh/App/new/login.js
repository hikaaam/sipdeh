import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Alert,
  AsyncStorage,
} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import db from '../db';
import {TextInputUnderline, Icons} from '../Components';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Colors from '../Colors';
const s = require('../../assets/styles/login');

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      background: db.state.darkmode ? db.state.lightbg : db.state.darkbg,
      box: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      border: !db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      rgba: db.state.darkmode ? 'rgb(73, 80, 87)' : db.state.lightbox,
      link: 'http://jdih.brebeskab.go.id/ApiLogin/login',
    };
  }
  loginbro(id, email, first_name, last_name, username, phone) {
    let profile = {
      id: id,
      email: email,
      first_name: first_name,
      last_name: last_name,
      username: username,
      phone: phone,
    };
    AsyncStorage.setItem('profile', JSON.stringify(profile), (err, result) => {
      if (err) {
        return err;
      } else {
        // this.props.navigation.replace('profile');
      }
    });
  }

  componentDidMount() {
    // this.LoginPost("jdihbrebes", "admin");
    // this.props.navigation.replace('profile')
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: this.state.background,
        }}>
        <ScrollView>
          {db.renderHeader()}
          <View style={s.Body} backgroundColor={this.state.box}>
            <View
              style={{
                paddingHorizontal: RFPercentage(3),
                top: -RFPercentage(2),
              }}>
              {/* <Text
                style={{
                  color: Colors.TextColor(),
                  fontSize: RFPercentage(2.3),
                  marginBottom: RFPercentage(3),
                }}>
                Login ke aplikasi sipdeh
              </Text> */}
              <TextInputUnderline
                onChangeText={id => this.setState({id})}
                placeholder="username"
                otherStyle={{
                  marginBottom: RFPercentage(4),
                }}
              />
              <TextInputUnderline
                onChangeText={password => this.setState({password})}
                placeholder="password"
                secureText
                otherStyle={{
                  marginBottom: RFPercentage(3),
                }}
              />
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
              }}
              onPress={() =>
                this.LoginPost(this.state.id, this.state.password)
              }>
              <View style={s.Button}>
                <Text style={s.Text}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          {db.renderSocial()}
        </ScrollView>
        {db.renderBottom('profil', this.props.navigation)}
      </View>
    );
  }

  LoginPost(username, password) {
    let link = this.state.link;
    try {
      fetch(link, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.error == false) {
            let data = responseJson.data;
            this.loginbro(
              data.id,
              data.email,
              data.first_name,
              data.last_name,
              data.username,
              data.phone,
            );
            Alert.alert('Success', responseJson.message, [
              {
                text: 'OK',
                onPress: () => {
                  this.props.navigation.replace('profile');
                },
              },
            ]);
          } else {
            Alert.alert('Error', responseJson.message);
          }
        })
        .catch(error => {
          Alert.alert('Error', 'Tidak Dapat Terhubung Dengan Server');
        });
    } catch (error) {
      console.log(error);
    }
  }
}

export default login;
