import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Button, AsyncStorage, ActivityIndicator, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import db from '../db';

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: db.state.darkmode ? db.state.lightbg : db.state.darkbg,
      box: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      border: !db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      rgba: db.state.darkmode ? "rgb(73, 80, 87)" : db.state.lightbox,
      isLoading: true,
      data: []

    };

  }
  logout() {
    AsyncStorage.removeItem('profile');
    this.props.navigation.replace('login');
  }
  componentDidMount() {
    AsyncStorage.getItem("profile").then((value) => JSON.parse(value)).then((data) => {
      // console.log(data)
      this.setState({
        data: data,
        isLoading: false
      })
    })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:this.state.background
        }}>
          <ActivityIndicator size="large" animating color="blue" />
        </View>
      )
    }
    else {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: this.state.background
        }}>
          <ScrollView>
            {db.renderHeader()}
            <View style={{
              marginHorizontal: db.state.width / 20,
              height: db.state.height / 3.7,
              backgroundColor: db.state.lightbox,
              elevation: 4,
              borderRadius: 16,
              shadowRadius: 10,
              borderWidth: 0.1,
              marginTop: db.state.height / 20,
              backgroundColor: this.state.box
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: db.state.height / 22,
                marginHorizontal: db.state.width / 20
              }}>
                <View style={{
                  backgroundColor: 'white',
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  shadowRadius: 10,
                  elevation: 5,
                  borderWidth: 0.1
                }}>
                  <Icon name="user-tie" size={40} color={rgb(73, 80, 87)} />
                </View>
                <View style={{
                  marginLeft: db.state.width / 28
                }}>
                  <Text style={{
                    fontWeight: 'bold',
                    color: this.state.border,
                    fontSize: db.state.width / 16,
                    fontFamily: 'roboto',
                  }}>{this.state.data.first_name + " " + this.state.data.last_name}</Text>
                  <Text style={{
                    color: db.state.lightheader,
                    fontWeight: 'bold'
                  }}>{this.state.data.username}</Text>
                </View>
                <TouchableOpacity style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: "10%",
                  marginTop: 8
                }}
                  onPress={() => { this.logout(); }}
                >
                  <Icon name="power-off" size={db.state.width / 16} color={db.state.lightred} />
                  <Text style={{
                    fontSize: db.state.width / 40,
                    fontWeight: 'bold',
                    color: db.state.lightred
                  }}>Logout</Text>
                </TouchableOpacity>
              </View>
              <View style={{
                marginTop: db.state.height / 22,
                marginHorizontal: db.state.width / 20
              }}>
                <Text style={{
                  fontSize: db.state.width / 30,
                  color: "#888"
                }}>Sistem Informasi Produk Hukum Daerah (SIPDEH)</Text>
                <Text style={{
                  fontSize: db.state.width / 30,
                  color: "#888"
                }}>Bagian Hukum Setda Kab. Brebes</Text>
              </View>
            </View>
            <View style={{
              marginHorizontal: db.state.width / 20,
              paddingHorizontal: db.state.width / 22,
              // height: db.state.height / 3.7,
              backgroundColor: db.state.lightbox,
              elevation: 4,
              borderRadius: 16,
              shadowRadius: 10,
              borderWidth: 0.1,
              marginVertical: db.state.height / 22,
              backgroundColor: this.state.box
            }}>
              <Text style={{
                fontWeight: 'bold',
                color: this.state.border,
                fontSize: db.state.width / 18,
                fontFamily: 'roboto',
                marginTop: db.state.width / 22,
                marginBottom: db.state.width / 32
              }}>Basic Info</Text>
              <Text style={{
                fontSize: db.state.width / 28,
                color: "#888",
                marginBottom: db.state.width / 22
              }}>
                Kamu hanya dapat melakukan perubahan data pada website JDIH Kab. Brebes
                </Text>
              <View style={{
                marginHorizontal: 10,
                justifyContent:'center',
                alignItems:'flex-start',
              }}>
                <Text style={{
                  color: db.state.lightheader,
                  fontWeight: 'bold',
                  marginLeft: db.state.width / 38,
                  // alignItems:'center',
                  // top: 2,
                  // zIndex: 100,
                  fontSize: 16
                }}>Username</Text>
                <TextInput style={{
                  width: "100%",
                  height: db.state.height / 20,
                  borderRadius: 9,
                  borderColor: "#888",
                  borderWidth: 0.7,
                  color: this.state.border,
                  paddingHorizontal: db.state.width / 38,
                  marginBottom: db.state.width / 30
                }} value={this.state.data.username} editable={false} />

                <Text style={{
                  color: db.state.lightheader,
                  fontWeight: 'bold',
                  marginLeft: db.state.width / 38,
                  // top: 2,
                  // zIndex: 100,
                  fontSize: 16
                }}>Email Address</Text>
                <TextInput style={{
                  width: "100%",
                  height: db.state.height / 20,
                  borderRadius: 9,
                  borderColor: "#888",
                  borderWidth: 0.7,
                  color: this.state.border,
                  paddingHorizontal: db.state.width / 38,
                  marginBottom: db.state.width / 30
                }} value={this.state.data.email} editable={false} />

                <Text style={{
                  color: db.state.lightheader,
                  fontWeight: 'bold',
                  marginLeft: db.state.width / 38,
                  // top: 2,
                  // zIndex: 100,
                  fontSize: 16
                }}>Nama Depan</Text>
                <TextInput style={{
                  width: "100%",
                  height: db.state.height / 20,
                  borderRadius: 9,
                  borderColor: "#888",
                  borderWidth: 0.7,
                  color: this.state.border,
                  paddingHorizontal: db.state.width / 38,
                  marginBottom: db.state.width / 30
                }} value={this.state.data.first_name} editable={false} />

                <Text style={{
                  color: db.state.lightheader,
                  fontWeight: 'bold',
                  marginLeft: db.state.width / 38,
                  // top: 2,
                  // zIndex: 100,
                  fontSize: 16
                }}>Nama Belakang</Text>
                <TextInput style={{
                  width: "100%",
                  height: db.state.height / 20,
                  borderRadius: 9,
                  borderColor: "#888",
                  borderWidth: 0.7,
                  color: this.state.border,
                  paddingHorizontal: db.state.width / 38,
                  marginBottom: db.state.width / 30
                }} value={this.state.data.last_name} editable={false} />

                <Text style={{
                  color: db.state.lightheader,
                  fontWeight: 'bold',
                  marginLeft: db.state.width / 38,
                  // top: 2,
                  // zIndex: 100,
                  fontSize: 16
                }}>Nomor Hp</Text>
                <TextInput style={{
                  width: "100%",
                  height: db.state.height / 20,
                  borderRadius: 9,
                  borderColor: "#888",
                  borderWidth: 0.7,
                  color: this.state.border,
                  paddingHorizontal: db.state.width / 38,
                  marginBottom: db.state.width / 12
                }} value={this.state.data.phone.length>2?this.state.data.phone:"-"} editable={false} />

              </View>
            </View>
            {db.renderSocial()}
          </ScrollView>
          {db.renderBottom("profil", this.props.navigation)}
        </View>
      );
    }
  }
}

export default profile;


const s = StyleSheet.create(
  {
    Body: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: Dimensions.get('window').height
    },
    Icon: {
      // color:'#4dabf5',
      color: 'white',
      // marginBottom:'25%',
      borderColor: "white",
      position: 'relative'
    },
    IconContainer: {
      backgroundColor: "#4dabf5",
      width: Dimensions.get('window').width / 3 + 10,
      height: Dimensions.get('window').width / 3 + 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      borderColor: '#999',
      borderWidth: 4,
    },
    Text: {
      fontSize: 40
    },
    BtnContainer: {
      width: Dimensions.get('window').width / 2,
      backgroundColor: '#4dabf5',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      marginTop: 20,
      borderWidth: 1.4,
      // borderColor:'#4dabf5'
    }
  }
)