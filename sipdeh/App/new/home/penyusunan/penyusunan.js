import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';
import Colors from '../../../Colors';
import {Icons} from '../../../Components';
import {TextInput} from 'react-native-gesture-handler';
import db from '../../../db';
import {RFPercentage} from 'react-native-responsive-fontsize';

var s = require('../../../../assets/styles/perda');
class Penyusunan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      modalVisible: false,
      currenData: 1,
      Text: '',
      background: db.state.darkmode ? db.state.lightbg : db.state.darkbg,
      box: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      border: !db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      icon: !db.state.darkmode ? '{rgb(73, 80, 87)}' : '{rgb(73, 80, 87)}',
      textz: !db.state.darkmode ? db.state.lightbox : '{rgb(73, 80, 87)}',
      profile: [],
      search: this.props.route.params.data,
      refreshing: false,
      isAdmin: false,
    };
  }

  async onRefresh() {
    this.setState({
      refreshing: true,
    });
    if (this.state.search) {
      let profile = [];
      let value = await AsyncStorage.getItem('profile');
      let data = JSON.parse(value);
      profile = data;
      console.log(profile);
      // let link2 = 'http://192.168.43.47/jdih_brebes-master/sk.php?search='+this.props.route.params.data;
      let link = 'http://jdih.brebeskab.go.id/android/sk.php?search=';
      fetch(link)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            dataSource: responseJson,
            profile,
          });
        })
        .catch(Erorr => {
          this.setState({
            isLoading: false,
            Error: true,
            profile,
          });
        })
        .finally(() => {
          this.setState({
            isLoading: false,
            refreshing: false,
          });
        });
    }
  }

  async componentDidMount() {
    try {
      if (this.state.search) {
        let profile = [];
        let value = await AsyncStorage.getItem('profile');
        let data = JSON.parse(value);
        profile = data;
        let isAdmin = data.email == 'baghukum0@gmail.com';
        console.log(profile);
        // let link2 = 'http://192.168.43.47/jdih_brebes-master/sk.php?search='+this.props.route.params.data;
        let link =
          'http://jdih.brebeskab.go.id/android/sk.php?search=' +
          this.props.route.params.data;
        fetch(link)
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              isLoading: false,
              dataSource: responseJson,
              profile,
              isAdmin,
            });
          })
          .catch(Erorr => {
            this.setState({
              isLoading: false,
              Error: true,
              profile,
              isAdmin,
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
  setModalVisible(visible, data) {
    this.setState({
      modalVisible: visible,
      currenData: data,
    });
  }

  tampilan(data) {
    if (Object.keys(data).length == 0) {
      return (
        <View
          style={{
            width: Dimensions.get('window').width / 1.1,
            flexDirection: 'row',
            alignItems: 'center',
            height: Dimensions.get('window').width / 5,
            elevation: 2,
            shadowOpacity: 0.3,
            backgroundColor: 'white',
            // paddingHorizontal: '5%',
            marginTop: 10,
            borderRadius: 16,
          }}>
          <View
            style={{
              backgroundColor: db.state.lightcaution,
              width: '18%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            }}>
            <Icon2 name="exclamation-circle" size={30} color="white" />
          </View>
          <View
            style={{
              width: '82%',
              height: '100%',
              backgroundColor: db.state.lightred,
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: db.state.width / 20,
            }}>
            <Text
              style={{
                fontSize: db.state.width / 20,
                color: 'white',
                fontWeight: 'bold',
              }}>
              Mohon Maaf
            </Text>
            <Text
              style={{
                fontSize: db.state.width / 26,
                color: '#f0f0f0aa',
                fontWeight: 'bold',
              }}>
              Tidak Ada Data
            </Text>
          </View>
        </View>
      );
    } else {
      return data.map(value => {
        return (
          <TouchableOpacity
            style={{
              width: '100%',
              paddingHorizontal: RFPercentage(3),
              justifyContent: 'flex-start',
            }}
            onPress={() => {
              this.props.navigation.navigate('detail_penyusunan', {
                data: value.id,
                sk: value,
              });
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                elevation: 2,
                shadowOpacity: 0.3,
                backgroundColor: 'white',
                paddingHorizontal: RFPercentage(3),
                paddingVertical: RFPercentage(1.5),
                marginTop: 10,
                borderRadius: 16,
                backgroundColor: this.state.box,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '80%',
                }}>
                <Icon2
                  name="user-tie"
                  size={RFPercentage(3)}
                  color={this.state.icon}
                  style={{
                    marginRight: RFPercentage(3),
                  }}
                />
                <Text
                  style={{
                    fontSize: RFPercentage(2),
                    color: this.state.textz,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}>
                  {value.nama_sk}
                </Text>
              </View>
              <Icon2
                name="angle-right"
                size={RFPercentage(2.5)}
                color={rgb(73, 80, 87)}
              />
            </View>
          </TouchableOpacity>
        );
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: this.state.background,
          }}>
          <ScrollView
            style={{backgroundColor: this.state.background}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.onRefresh();
                }}
              />
            }>
            {db.renderHeader()}
            <View
              style={{
                marginHorizontal: db.state.width / 22,
                elevation: 4,
                shadowRadius: 10,
                shadowOpacity: 1,
                borderLeftWidth: 0.1,
                borderRightWidth: 0.1,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: db.state.height / 4,
                  backgroundColor: db.state.lightheader,
                  borderRadius: 40,
                  elevation: 4,
                  shadowRadius: 10,
                  shadowOpacity: 1,
                  borderColor: db.state.lightbox,
                  borderWidth: 0.4,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}>
                <Text
                  style={{
                    // fontFamily:'roboto',
                    fontWeight: 'bold',
                    fontSize: db.state.width / 13,
                    color: 'white',
                    marginBottom: db.state.width / 48,
                  }}>
                  Loading. . .
                </Text>
                <Text
                  style={{
                    color: db.state.lightbg,
                    marginBottom: db.state.width / 48,
                    fontSize: db.state.width / 32,
                  }}>
                  Jaringan Dokumentasi {'&'} Informasi Hukum (JDIH)
                </Text>
                <Text
                  style={{
                    color: db.state.lightbg,
                    marginBottom: db.state.width / 48,
                    fontSize: db.state.width / 32,
                  }}>
                  Kab.Brebes
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: db.state.height / 3,
                }}>
                <ActivityIndicator size="large" animating />
              </View>
            </View>
            {db.renderSocial()}
          </ScrollView>
          {db.renderBottom('', this.props.navigation)}
        </View>
      );
    } else {
      if (this.state.Error) {
        return (
          <View
            style={{
              flex: 1,
            }}>
            {db.renderError(this.props.navigation)}
            {this.state.profile.username == 'jdihbrebes' && (
              <View
                style={{
                  position: 'absolute',
                  top: RFPercentage(10),
                  width: '100%',
                  paddingHorizontal: RFPercentage(3),
                }}>
                {/* <TouchableOpacity
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: RFPercentage(2),
                    paddingHorizontal: RFPercentage(2),
                    backgroundColor: Colors.BoxColor(),
                    borderRadius: 15,
                    elevation: 2,
                  }}
                  activeOpacity={0.9}
                  onPress={() => {
                    this.props.navigation.navigate('createSk', {
                      data: this.state.profile,
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: RFPercentage(2),
                      color: Colors.TextColor(),
                    }}>
                    Tambahkan SK
                  </Text>
                </TouchableOpacity> */}
              </View>
            )}
          </View>
        );
      }
      return (
        <View
          style={{
            flex: 1,
            height: Dimensions.get('window').height,
            backgroundColor: this.state.background,
          }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.onRefresh();
                }}
              />
            }>
            {db.renderHeader()}
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  marginHorizontal: db.state.width / 20,
                  height: db.state.height / 4,
                  backgroundColor: this.state.box,
                  elevation: 4,
                  borderRadius: 16,
                  shadowRadius: 10,
                  borderWidth: 0.1,
                  marginTop: db.state.height / 20,
                  marginBottom: db.state.height / 28,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: db.state.height / 22,
                    marginHorizontal: db.state.width / 20,
                    // backgroundColor:this.state.box
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: 60,
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 100,
                      shadowRadius: 10,
                      elevation: 5,
                      borderWidth: 0.1,
                    }}>
                    <Icon2 name="user-tie" size={40} color={rgb(73, 80, 87)} />
                  </View>
                  <View
                    style={{
                      marginLeft: db.state.width / 28,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: this.state.border,
                        fontSize: db.state.width / 15,
                        fontFamily: 'roboto',
                        textTransform: 'capitalize',
                      }}>
                      {this.state.isAdmin
                        ? 'Administrator'
                        : this.state.profile.first_name +
                          ' ' +
                          this.state.profile.last_name}
                    </Text>
                    <Text
                      style={{
                        color: db.state.lightheader,
                        fontWeight: 'bold',
                      }}>
                      {this.state.profile.username}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: db.state.height / 20,
                    marginHorizontal: db.state.width / 20,
                  }}>
                  <Text
                    style={{
                      fontSize: db.state.width / 28,
                      color: '#888',
                      fontSize: db.state.width / 32,
                    }}>
                    Sistem Informasi Produk Hukum Daerah (SIPDEH)
                  </Text>
                  <Text
                    style={{
                      fontSize: db.state.width / 28,
                      color: '#888',
                      fontSize: db.state.width / 32,
                    }}>
                    Bagian Hukum Setda Kab. Brebes
                  </Text>
                </View>
              </View>

              {this.tampilan(this.state.dataSource)}

              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.onRequestClose();
                }}>
                <View style={styles.ModalBody}>
                  <View style={styles.ModalBox}>
                    <View style={styles.TitleContainer}>
                      <Text style={styles.ModalTitle}>Search</Text>
                      <TouchableOpacity
                        style={{
                          marginRight: 10,
                          width: RFPercentage(10),
                          alignItems: 'flex-end',
                        }}
                        onPress={() => {
                          this.setModalVisible(false, 1);
                        }}>
                        <Icon2
                          name="times"
                          color="white"
                          size={RFPercentage(3)}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        flex: 1,
                      }}>
                      <TextInput
                        style={{
                          fontSize: RFPercentage(2.5),
                          padding: 12,
                          marginHorizontal: RFPercentage(3),
                          borderBottomWidth: 0.5,
                        }}
                        onChangeText={Text => {
                          this.setState({
                            Text,
                          });
                        }}
                        autoFocus={true}
                        returnKeyType="search"
                        placeholder="cari.."
                        onSubmitEditing={() => {
                          if (this.state.Text.length == 0) {
                            let value = ' ';
                            this.props.navigation.replace('penyusunanall', {
                              data: value,
                            });
                          } else {
                            let value = this.state.Text;
                            this.props.navigation.replace('penyusunanall', {
                              data: value,
                            });
                          }
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            {db.renderSocial()}
          </ScrollView>
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true, 0);
            }}
            style={{
              position: 'absolute',
              width: RFPercentage(8),
              height: RFPercentage(8),
              bottom: RFPercentage(14),
              right: RFPercentage(3),
              borderWidth: 1,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: rgb(73, 80, 87),
              opacity: this.state.currenData,
            }}>
            <Icon2 name="search" size={RFPercentage(5)} color="white" />
          </TouchableHighlight>
          {db.renderBottom('penyusunan', this.props.navigation)}
        </View>
      );
    }
  }
  onRequestClose() {
    this.setModalVisible(false, 1);
  }
}

export default Penyusunan;

const styles = StyleSheet.create({
  ModalBody: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalBox: {
    backgroundColor: 'white',
    margin: 50,
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width / 1.3,
    borderRadius: 18,
    borderWidth: 1,
  },
  ModalTitle: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  IconContainer: {
    width: 70,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 10,
  },
  TitleContainer: {
    padding: 14,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    alignItems: 'center',
    backgroundColor: db.state.lightheader,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ItemContainer: {
    marginTop: 5,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    padding: 20,
    paddingVertical: 22,
  },
  TextItemContainer: {
    fontSize: 19,
    left: 52,
    position: 'relative',
    top: 8,
    fontWeight: 'bold',
    width: '70%',
  },
  ItemBody: {
    marginHorizontal: 20,
    flexDirection: 'column',
    // justifyContent:'flex-start',
    flex: 1,
    // marginBottom:60
  },
  DateContainer: {
    marginLeft: 50,
    position: 'relative',
    top: 6,
  },
  TextDate: {
    fontWeight: '700',
    fontSize: 15,
  },
  IconContainer: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BodyItems: {},
  TextTitle: {
    fontSize: 16,
    color: rgb(73, 80, 87),
    fontWeight: 'bold',
  },
});
