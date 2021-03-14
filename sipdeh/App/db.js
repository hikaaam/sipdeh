import React, {Component} from 'react';
import {
  AsyncStorage,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
  Linking,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';

class DB extends Component {
  componentDidMount() {}
  constructor(props) {
    super(props);
    this.state = {
      penyusunan: 'null',
      IconcolorActive: '#424874',
      Iconcolor: '#999',
      lightbg: '#EFEFEF',
      lightheader: '#4A85D5',
      lightperbup: '#E2F1D0',
      lightperda: '#CFE1F9',
      lightstatistik: '#CFE1F9',
      lightpenyusunanhome: '#FEE5A7',
      lighthome: '#C2DDF9',
      lightprofil: '#E6DED2',
      lightprofiloutline: '#B4AA9C',
      lightpenyusunan: '#CBE5B2',
      lightpenyusunanoutline: '#9FB87F',
      lightnotifikasi: '#F7C4C9',
      lightdarkmode: '#EAEBEF',
      lightchoose: '#4A8ADB',
      lightred: '#DB4453',
      lightcaution: '#E16975',
      lightbox: 'white',
      lightslider: '#F9F9F9',
      lightslideractive: '#498ADB',
      darkbox: '#101116',
      darkbg: '#1C1D21',
      darkslider: '#212429',
      iconRed: '#E04143',
      text: 'black',
      darktext: 'white',
      stroke: 'black',
      darkstroke: 'white',
      dot: 'rgba(255,255,255,1)',
      label: 'rgba(16, 17, 22,1)',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      darkmode: true,
    };
  }
  async getProfilez() {
    const data = await AsyncStorage.getItem('profile').then(res =>
      JSON.parse(res),
    );
    return data;
  }
  async CreatePenyusunan() {
    let account = await fetch(
      'http://jdih.brebeskab.go.id/android/listStatus.php',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.state.penyusunan = responseJson;
        return responseJson['result'];
      })
      .catch(error => {
        console.error(error);
      });
    AsyncStorage.setItem(
      'penyusunan',
      JSON.stringify(account),
      (err, result) => {
        if (err) {
          return err;
        } else {
          //    this.GetAccount();
        }
      },
    );
  }
  callbackdm() {
    this.getdarkmode(function(params) {
      if (params) {
        return true;
      } else {
        return false;
      }
    });
  }
  getdarkmode(navigasi) {
    try {
      AsyncStorage.getItem('darkmode').then(values => {
        if (values) {
          let value = JSON.parse(values);
          if (value.status) {
            this.state.darkmode = true;
            navigasi.replace('home');
          } else {
            this.state.darkmode = false;
            navigasi.replace('home');
          }
        } else {
          let data = {
            status: true,
          };
          AsyncStorage.setItem('darkmode', JSON.stringify(data));
          this.state.darkmode = true;
          navigasi.replace('home');
        }
      });
    } catch (error) {
      this.state.darkmode = true;
    }
  }
  changeDarkMode(navigasi) {
    console.log(this.state.darkmode);
    if (this.state.darkmode) {
      let data = {status: false};

      AsyncStorage.setItem('darkmode', JSON.stringify(data));
      this.state.darkmode = false;
      navigasi.replace('home');
    } else {
      let data = {status: true};
      AsyncStorage.setItem('darkmode', JSON.stringify(data));
      this.state.darkmode = true;
      navigasi.replace('home');
    }
  }
  GetAccount() {
    try {
      (async () => {
        await AsyncStorage.getItem('penyusunan').then(value => {
          // this.values = JSON.parse(value);
          console.log(value);
          return value;
        });
      })();
    } catch (error) {}
  }
  Logout() {
    AsyncStorage.removeItem('profile'),
      (err, result) => {
        if (err) {
          return err;
        }
        console.log(result);
      };
  }
  renderHeader() {
    return (
      <View
        style={{
          backgroundColor: this.state.lightheader,
          height: this.state.height / 8,
          width: this.state.width,
          borderBottomEndRadius: 50,
          borderBottomStartRadius: 50,
          position: 'absolute',
        }}>
        <StatusBar backgroundColor={db.state.lightheader} />
      </View>
    );
  }
  renderMargin() {
    return (
      <View
        style={{
          position: 'relative',
          top: -this.state.height / 20,
          marginHorizontal: this.state.width / 12,
        }}>
        <Text>Testing</Text>
      </View>
    );
  }

  renderBottom(active, navigasi) {
    var penyusunan = false;
    var profil = false;
    var home = false;
    var notifikasi = false;
    if (active == 'penyusunan') {
      penyusunan = true;
    } else if (active == 'profil') {
      profil = true;
    } else if (active == 'home') {
      home = true;
    } else if (active == 'profil') {
      notifikasi = true;
    }
    function actived(bool) {
      if (bool) {
        return (
          <View
            style={{
              width: '100%',
              borderBottomColor: db.state.lightslideractive,
              borderBottomWidth: 3,
              marginTop: 1,
            }}
          />
        );
      }
    }
    return (
      <View
        style={{
          height: db.state.height / 14,
          backgroundColor: db.state.darkmode
            ? db.state.lightslider
            : db.state.darkslider,
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          borderWidth: 0.5,
          elevation: 4,
          shadowRadius: 10,
          borderColor: db.state.darkmode ? 'black' : 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 5,
            }}
            onPress={() => {
              navigasi.replace('notifikasi');
            }}
            disabled={notifikasi}>
            <View
              style={{
                width: db.state.width / 18,
                height: db.state.width / 18,
                margin: 10,
                marginBottom: 0,
                borderRadius: 100,
              }}>
              <Icon name="bell" size={db.state.width / 18} color="red" />
            </View>
            <Text
              style={{
                color: !db.state.darkmode
                  ? db.state.lightbox
                  : db.state.darkbox,
                fontWeight: 'bold',
                fontSize: db.state.width / 38,
              }}>
              Notifikasi
            </Text>
            {actived(notifikasi)}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 5,
            }}
            onPress={() => {
              try {
                (async () => {
                  await AsyncStorage.getItem('profile').then(value => {
                    if (value) {
                      let data_profile = JSON.parse(value);
                      let id = data_profile.id;
                      let username = data_profile.username;
                      if (id == '4' || username == 'jdihbrebes') {
                        navigasi.replace('penyusunanall', {data: ' '});
                      } else {
                        navigasi.replace('penyusunan', {data: ' '});
                      }
                    } else {
                      Alert.alert(
                        'Gagal',
                        'Maaf Anda Harus Login Dahulu',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => navigasi.replace('login'),
                          },
                        ],
                        {cancelable: false},
                      );
                    }
                  });
                })();
              } catch (e) {
                console.log(e);
              }
            }}
            disabled={penyusunan}>
            <View
              style={{
                width: db.state.width / 18,
                height: db.state.width / 18,
                margin: 10,
                marginBottom: 0,
                borderRadius: 100,
              }}>
              <Icon name="briefcase" size={db.state.width / 18} color="green" />
            </View>
            <Text
              style={{
                color: !db.state.darkmode
                  ? db.state.lightbox
                  : db.state.darkbox,
                fontSize: db.state.width / 38,
                fontWeight: 'bold',
              }}>
              Penyusunan
            </Text>
            {actived(penyusunan)}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 5,
            }}
            onPress={() => {
              navigasi.replace('home');
            }}
            disabled={home}>
            <View
              style={{
                width: db.state.width / 18,
                height: db.state.width / 18,
                margin: 10,
                marginBottom: 0,
                borderRadius: 100,
              }}>
              <Icon
                name="home"
                size={db.state.width / 18}
                color={db.state.lightheader}
              />
            </View>
            <Text
              style={{
                color: !db.state.darkmode
                  ? db.state.lightbox
                  : db.state.darkbox,
                fontWeight: 'bold',
                fontSize: db.state.width / 38,
              }}>
              Home
            </Text>
            {actived(home)}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 5,
            }}
            onPress={() => {
              try {
                (async () => {
                  await AsyncStorage.getItem('profile').then(value => {
                    if (value) {
                      console.log(value);
                      navigasi.replace('profile');
                    } else {
                      console.log(value);
                      navigasi.replace('login');
                    }
                  });
                })();
              } catch (e) {
                console.log(e);
              }
            }}
            disabled={profil}>
            <View
              style={{
                width: db.state.width / 18,
                height: db.state.width / 18,
                margin: 10,
                marginBottom: 0,
                borderRadius: 100,
              }}>
              <Icon name="user" size={db.state.width / 18} color="brown" />
            </View>
            <Text
              style={{
                color: !db.state.darkmode
                  ? db.state.lightbox
                  : db.state.darkbox,
                fontWeight: 'bold',
                fontSize: db.state.width / 38,
              }}>
              Profil
            </Text>
            {actived(profil)}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 5,
            }}
            onPress={() => {
              db.changeDarkMode(navigasi);
            }}>
            <View
              style={{
                width: db.state.width / 18,
                height: db.state.width / 18,
                margin: 10,
                marginBottom: 0,
                borderRadius: 100,
              }}>
              <Icon
                name="moon"
                size={db.state.width / 18}
                color={db.state.darkmode ? 'black' : 'orange'}
              />
            </View>
            <Text
              style={{
                color: !db.state.darkmode
                  ? db.state.lightbox
                  : db.state.darkbox,
                fontWeight: 'bold',
                fontSize: db.state.width / 38,
              }}>
              Dark Mode
            </Text>
            {/* {actived(profil)} */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  checkAdmin() {
    var boolean = AsyncStorage.getItem('profile').then(value => {
      if (value) {
        let data = JSON.parse(value);
        if (data.id == '4' || data.username == 'jdihbrebes') {
          return true;
        }
      } else {
        return false;
      }
    });
    return boolean;
  }
  renderSocial() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: db.state.lightheader,
            height: db.state.height / 4.5,
            width: db.state.width,
            borderTopStartRadius: 50,
            borderTopEndRadius: 50,
            position: 'absolute',
            bottom: 0,
          }}
        />
        <View
          style={{
            backgroundColor: db.state.darkmode
              ? db.state.lightbox
              : db.state.darkbox,
            marginHorizontal: db.state.width / 22,
            height: db.state.height / 3,
            marginBottom: db.state.height / 45,
            elevation: 4,
            borderWidth: 0.5,
            borderColor: 'white',
            shadowOpacity: 0.3,
            marginTop: 10,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: 30,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: db.state.width / 11,
                fontFamily: 'roboto',
                fontWeight: 'bold',
                color: !db.state.darkmode
                  ? db.state.lightbox
                  : db.state.darkbox,
              }}>
              SIPDEH
            </Text>
            <Text
              style={{
                color: '#666',
                fontSize: db.state.width / 38,
                marginTop: '2%',
              }}>
              Sistem Informasi Produk Hukum Daerah
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: db.state.width / 15,
                height: db.state.width / 15,
                backgroundColor: '#3B5999',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 6,
              }}
              onPress={() => {
                Linking.openURL(
                  'https://www.facebook.com/pages/category/Government-Organization/Bagian-Hukum-Setda-KabBrebes-218130179066147/?_rdc=1&_rdr',
                );
              }}>
              <Icon2 name="facebook" color="white" size={db.state.width / 20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: db.state.width / 15,
                height: db.state.width / 15,
                backgroundColor: '#3F9AFE',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 6,
              }}
              onPress={() => {
                Linking.openURL('https://twitter.com/HukumJdih');
              }}>
              <Icon2 name="twitter" color="white" size={db.state.width / 20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: db.state.width / 15,
                height: db.state.width / 15,
                backgroundColor: '#E42F6C',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 6,
              }}
              onPress={() => {
                Linking.openURL(
                  'https://www.instagram.com/bagianhukum_setdabrebes/',
                );
              }}>
              <Icon2
                name="instagram"
                color="white"
                size={db.state.width / 20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: db.state.width / 15,
                height: db.state.width / 15,
                backgroundColor: '#28AD61',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 6,
              }}>
              <Icon2 name="phone" color="white" size={db.state.width / 20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: db.state.width / 15,
                height: db.state.width / 15,
                backgroundColor: '#4B89DC',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 6,
              }}>
              <Icon name="arrow-up" color="white" size={db.state.width / 20} />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: '#666',
                fontSize: db.state.width / 40,
              }}>
              Copyright © SIPDEH APP V.10 2020. All Right Reserved.
            </Text>
          </View>
        </View>
      </View>
    );
  }
  renderError(nav) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: db.state.darkmode
            ? db.state.lightbg
            : db.state.darkbg,
        }}>
        <ScrollView>
          {db.renderHeader()}
          <View
            style={{
              marginHorizontal: db.state.width / 20,
              height: db.state.height / 4,
              backgroundColor: db.state.darkmode
                ? db.state.lightbox
                : db.state.darkbox,
              elevation: 4,
              borderRadius: 16,
              shadowRadius: 10,
              borderWidth: 0.1,
              marginTop: db.state.height / 6,
              marginBottom: db.state.height / 28,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: db.state.height / 22,
                marginHorizontal: db.state.width / 20,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: db.state.width / 5,
                  height: db.state.width / 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  // shadowRadius: 10,
                  // elevation: 5,
                  // borderWidth: 0.1
                }}>
                <Icon2
                  name="exclamation-circle"
                  size={db.state.width / 5}
                  color={db.state.lightred}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: db.state.width / 22,
              }}>
              <Text
                style={{
                  color: db.state.darkmode ? 'black' : 'white',
                  fontSize: db.state.width / 25,
                }}>
                Tidak Dapat Terhubung Dengan Server
              </Text>
            </View>
          </View>

          <View style={{marginTop: db.state.height / 24}} />
          {db.renderSocial()}
        </ScrollView>
        {db.renderBottom('', nav)}
      </View>
    );
  }
}
const db = new DB();
export default db;
