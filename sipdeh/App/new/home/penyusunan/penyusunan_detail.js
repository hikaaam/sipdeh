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
  Alert,
  Linking,
  RefreshControl,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';

import {TextInput} from 'react-native-gesture-handler';
import db from '../../../db';
import {Button} from '../../../Components';
import {RFPercentage} from 'react-native-responsive-fontsize';

var s = require('../../../../assets/styles/perda');
class Penyusunan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      modalVisible: false,
      currenData: [],
      Text: '',
      background: db.state.darkmode ? db.state.lightbg : db.state.darkbg,
      box: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      border: !db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      rgba: db.state.darkmode ? 'rgb(73, 80, 87)' : db.state.lightbox,
      sk: 0,
      id_sk: this.props.route.params.data,
      profile: [{id: 0}],
      refreshing: false,
    };
  }

  getPenyusunan() {
    let link =
      'http://jdih.brebeskab.go.id/android/status.php?id=' +
      this.props.route.params.data;
    fetch(link)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  renderButtonCreate() {
    if (this.state.user.email == 'baghukum0@gmail.com') {
      return (
        <View
          style={{
            paddingHorizontal: RFPercentage(3),
            width: '100%',
            marginBottom: RFPercentage(3),
          }}>
          <Button
            tulisan="Buat penyusunan baru"
            onPress={() => {
              this.props.navigation.navigate('createSk', {
                data: {
                  id: this.state.profile[0].id,
                  id_sk: this.state.id_sk,
                  nama_sk: this.state.sk.nama_sk,
                },
              });
            }}
          />
        </View>
      );
    }
  }
  async getUserId() {
    let link =
      'http://jdih.brebeskab.go.id/android/search.php?search=' +
      this.props.route.params.data;
    const data = await fetch(link)
      .then(e => e.json())
      .catch(err => {
        console.log(err);
      });
    console.log(data);
    if (data.length > 0) {
      this.setState({
        profile: data,
      });
    }
  }
  onRefresh() {
    this.setState({
      isLoading: true,
      refreshing: false,
      modalVisible: false,
    });

    this.getPenyusunan();
    this.getUserId().then(() => {
      this.setState({
        refreshing: false,
      });
    });
  }
  async componentDidMount() {
    console.log(this.props.route.params.data);
    const user = await db.getProfilez();
    console.log(user);
    let isAdmin = user.email == 'baghukum0@gmail.com';
    console.log(this.props.route.params.sk);
    this.setState({
      sk: this.props.route.params.sk,
      user,
      isAdmin,
    });
    this.getPenyusunan();
    this.getUserId();
  }
  setModalVisible(visible, data) {
    this.setState({
      modalVisible: visible,
      currenData: data,
    });
  }
  downloadDocs() {
    let link = 'http://jdih.brebeskab.go.id/uploads/sk/';
    let path = this.state.currenData.PdfPath;
    Linking.openURL(link + path);
  }
  JudulSk(data) {
    if (!data == 0) {
      return (
        <View
          style={{
            marginBottom: db.state.width / 22,
          }}>
          <Text
            style={{
              fontSize: db.state.width / 27,
              color: this.state.border,
              fontWeight: 'bold',
            }}>
            {data.nama_sk}
          </Text>
        </View>
      );
    }
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
            <Icon name="exclamation-circle" size={30} color="white" />
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
            onPress={() => {
              this.setModalVisible(true, value);
            }}>
            <View
              style={{
                width: Dimensions.get('window').width / 1.1,
                flexDirection: 'row',
                alignItems: 'center',
                height: Dimensions.get('window').width / 6,
                elevation: 2,
                shadowOpacity: 0.3,
                backgroundColor: this.state.box,
                paddingHorizontal: '5%',
                marginTop: 10,
                borderRadius: 16,
              }}>
              <View style={styles.IconContainer}>
                <Icon
                  name="bullhorn"
                  size={RFPercentage(3)}
                  color={this.state.rgba}
                />
              </View>
              <View
                style={s.NumberContainer}
                borderColor={this.state.rgba}
                top={'25%'}>
                <Icon
                  name="angle-right"
                  size={RFPercentage(3)}
                  color={this.state.rgba}
                />
              </View>
              <View style={styles.TextContainer}>
                <Text
                  style={{
                    fontSize: RFPercentage(2.2),
                    color: this.state.rgba,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}>
                  {value.keterangan}
                </Text>
                {/* <Text style={s.Text}>Bagian Hukum Setda Brebes</Text> */}
              </View>
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
          <ScrollView>
            {db.renderHeader()}
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
                  <Icon name="user-tie" size={40} color={rgb(73, 80, 87)} />
                </View>
                <View
                  style={{
                    marginLeft: db.state.width / 28,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: this.state.border,
                      fontSize: db.state.width / 16,
                      fontFamily: 'roboto',
                    }}>
                    Administrator
                  </Text>
                  <Text
                    style={{
                      color: db.state.lightheader,
                      fontWeight: 'bold',
                    }}>
                    Jdihbrebes
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: RFPercentage(3),
                  marginHorizontal: db.state.width / 20,
                }}>
                <Text
                  style={{
                    fontSize: RFPercentage(2),
                    color: '#888',
                  }}>
                  Sistem Informasi Produk Hukum Daerah (SIPDEH)
                </Text>
                <Text
                  style={{
                    fontSize: RFPercentage(2),
                    color: '#888',
                  }}>
                  Bagian Hukum Setda Kab. Brebes
                </Text>
              </View>
            </View>

            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  width: Dimensions.get('window').width / 1.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: Dimensions.get('window').width / 6,
                  elevation: 2,
                  shadowOpacity: 0.3,
                  backgroundColor: this.state.box,
                  paddingHorizontal: '5%',
                  marginTop: 10,
                  borderRadius: 16,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator
                    size="large"
                    animating
                    color={db.state.lightred}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: db.state.height / 24}} />
            {db.renderSocial()}
          </ScrollView>
          {db.renderBottom('penyusunan', this.props.navigation)}
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
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
                <Icon name="user-tie" size={40} color={rgb(73, 80, 87)} />
              </View>
              <View
                style={{
                  marginLeft: db.state.width / 28,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: this.state.border,
                    fontSize: db.state.width / 16,
                    fontFamily: 'roboto',
                  }}>
                  Administrator
                </Text>
                <Text
                  style={{
                    color: db.state.lightheader,
                    fontWeight: 'bold',
                  }}>
                  Jdihbrebes
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: RFPercentage(2),
                marginHorizontal: db.state.width / 20,
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(2),
                  color: '#888',
                }}>
                Sistem Informasi Produk Hukum Daerah (SIPDEH)
              </Text>
              <Text
                style={{
                  fontSize: RFPercentage(2),
                  color: '#888',
                }}>
                Bagian Hukum Setda Kab. Brebes
              </Text>
            </View>
          </View>

          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {this.renderButtonCreate()}
            {this.JudulSk(this.state.sk)}
            {this.tampilan(this.state.dataSource)}
            <Modal
              animationType="slide"
              transparent={true}
              onRequestClose={() => {
                this.setState({
                  modalVisible: false,
                });
              }}
              visible={this.state.modalVisible}>
              <View style={styles.ModalBody}>
                <View style={styles.ModalBox}>
                  <View style={styles.TitleContainer}>
                    <Text style={styles.ModalTitle}>
                      {this.state.currenData.keterangan}
                    </Text>
                    <TouchableOpacity
                      style={{
                        width: RFPercentage(5),
                        position: 'absolute',
                        right: 2,
                      }}
                      onPress={() => {
                        this.setModalVisible(false, this.state.currenData);
                      }}>
                      <Icon name="times" color="white" size={RFPercentage(3)} />
                    </TouchableOpacity>
                  </View>

                  <ScrollView style={{marginHorizontal: 10}}>
                    <View style={styles.BodyItems} height={80}>
                      <TouchableOpacity
                        style={styles.IconContainer}
                        onPress={() => {
                          if (!this.state.isAdmin) {
                            Alert.alert(
                              'Info',
                              'apakah anda ingin mengirim penyusunana ke Sekda?',
                              [
                                {
                                  text: 'Cancel',
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK!',
                                  onPress: () => {
                                    let link =
                                      'http://jdih.brebeskab.go.id/ApiSKPD/';
                                    fetch(link, {
                                      method: 'PUT',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        id: this.state.currenData.id,
                                        status2: 'Dikirim ke Sekda',
                                      }),
                                    })
                                      .then(e => {
                                        console.log(e);
                                        e.json();
                                      })
                                      .then(data => {
                                        console.log(data);
                                        this.onRefresh();
                                      })
                                      .catch(err => {
                                        console.log(err);
                                      });
                                  },
                                },
                              ],
                            );
                          } else {
                            Alert.alert(
                              'Info',
                              'Admin hanya bisa membuat penyusunan',
                            );
                          }
                        }}>
                        <Icon2 name="edit" size={42} color="rgb(73, 80, 87)" />
                      </TouchableOpacity>
                      <View
                        style={s.NumberContainer}
                        backgroundColor={this.state.box}
                        borderColor={rgb(73, 80, 87)}
                        top={'25%'}>
                        <Icon2
                          name="angle-right"
                          size={35}
                          color={rgb(73, 80, 87)}
                        />
                      </View>
                      <View style={styles.DateContainer}>
                        <Text style={styles.TextDate}>
                          {Moment(this.state.currenData.tanggal).format(
                            'DD MM Y - H:mm A',
                          )}
                        </Text>
                      </View>
                      <View style={styles.TextContainer} width="50%">
                        <Text style={styles.TextTitle}>
                          {this.state.currenData.status}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.BodyItems} height={80}>
                      <TouchableOpacity
                        style={styles.IconContainer}
                        onPress={() => {
                          if (!this.state.isAdmin) {
                            Alert.alert(
                              'Info',
                              'apakah anda ingin mengirim penyusunana ke Bupati?',
                              [
                                {
                                  text: 'Cancel',
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK!',
                                  onPress: () => {
                                    let link =
                                      'http://jdih.brebeskab.go.id/ApiSKPD/sekda';
                                    fetch(link, {
                                      method: 'PUT',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        id: this.state.currenData.id,
                                        status3: 'Dikirim ke Bupati',
                                      }),
                                    })
                                      .then(e => {
                                        console.log(e);
                                        e.json();
                                      })
                                      .then(data => {
                                        console.log(data);
                                        this.onRefresh();
                                      })
                                      .catch(err => {
                                        console.log(err);
                                      });
                                  },
                                },
                              ],
                            );
                          } else {
                            Alert.alert(
                              'Info',
                              'Admin hanya bisa membuat penyusunan',
                            );
                          }
                        }}>
                        <Icon2 name="edit" size={42} color="rgb(73, 80, 87)" />
                      </TouchableOpacity>
                      <View
                        style={s.NumberContainer}
                        backgroundColor="white"
                        borderColor={rgb(73, 80, 87)}
                        top={'25%'}>
                        <Icon2
                          name="angle-right"
                          size={35}
                          color={rgb(73, 80, 87)}
                        />
                      </View>
                      <View style={styles.DateContainer}>
                        <Text style={styles.TextDate}>
                          {Moment(this.state.currenData.tanggal2).format(
                            'DD MM Y - H:mm A',
                          )}
                        </Text>
                      </View>
                      <View style={styles.TextContainer} width="50%">
                        <Text style={styles.TextTitle}>
                          {this.state.currenData.status2}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.BodyItems} height={80}>
                      <TouchableOpacity
                        style={styles.IconContainer}
                        onPress={() => {
                          if (!this.state.isAdmin) {
                            Alert.alert(
                              'Info',
                              'apakah anda ingin mengirim penyusunana ke bagian hukum?',
                              [
                                {
                                  text: 'Cancel',
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK!',
                                  onPress: () => {
                                    let link =
                                      'http://jdih.brebeskab.go.id/ApiSKPD/sekda';
                                    fetch(link, {
                                      method: 'PUT',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        id: this.state.currenData.id,
                                        status4: 'Dikirim ke Bupati',
                                      }),
                                    })
                                      .then(e => {
                                        console.log(e);
                                        e.json();
                                      })
                                      .then(data => {
                                        console.log(data);
                                        this.onRefresh();
                                      })
                                      .catch(err => {
                                        console.log(err);
                                      });
                                  },
                                },
                              ],
                            );
                          } else {
                            Alert.alert(
                              'Info',
                              'Admin hanya bisa membuat penyusunan',
                            );
                          }
                        }}>
                        <Icon2 name="edit" size={42} color="rgb(73, 80, 87)" />
                      </TouchableOpacity>
                      <View
                        style={s.NumberContainer}
                        backgroundColor="white"
                        borderColor={rgb(73, 80, 87)}
                        top={'25%'}>
                        <Icon2
                          name="angle-right"
                          size={35}
                          color={rgb(73, 80, 87)}
                        />
                      </View>
                      <View style={styles.DateContainer}>
                        <Text style={styles.TextDate}>
                          {Moment(this.state.currenData.tanggal3).format(
                            'DD MM Y - H:mm A',
                          )}
                        </Text>
                      </View>
                      <View style={styles.TextContainer} width="50%">
                        <Text style={styles.TextTitle}>
                          {this.state.currenData.status3}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.BodyItems} height={80}>
                      <TouchableOpacity
                        style={styles.IconContainer}
                        onPress={() => {
                          if (!this.state.isAdmin) {
                            Alert.alert(
                              'Info',
                              'apakah anda ingin mengirim penyusunana ke bagian hukum?',
                              [
                                {
                                  text: 'Cancel',
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK!',
                                  onPress: () => {
                                    let link =
                                      'http://jdih.brebeskab.go.id/ApiSKPD/bupati';
                                    fetch(link, {
                                      method: 'PUT',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        id: this.state.currenData.id,
                                        status5: 'Dikirim ke Bagian Hukum',
                                      }),
                                    })
                                      .then(e => {
                                        console.log(e);
                                        e.json();
                                      })
                                      .then(data => {
                                        console.log(data);
                                        this.onRefresh();
                                      })
                                      .catch(err => {
                                        console.log(err);
                                      });
                                  },
                                },
                              ],
                            );
                          } else {
                            Alert.alert(
                              'Info',
                              'Admin hanya bisa membuat penyusunan',
                            );
                          }
                        }}>
                        <Icon2 name="edit" size={42} color="rgb(73, 80, 87)" />
                      </TouchableOpacity>
                      <View
                        style={s.NumberContainer}
                        backgroundColor="white"
                        borderColor={rgb(73, 80, 87)}
                        top={'25%'}>
                        <Icon2
                          name="angle-right"
                          size={35}
                          color={rgb(73, 80, 87)}
                        />
                      </View>
                      <View style={styles.DateContainer}>
                        <Text style={styles.TextDate}>
                          {Moment(this.state.currenData.tanggal4).format(
                            'DD MM Y - H:mm A',
                          )}{' '}
                        </Text>
                      </View>
                      <View style={styles.TextContainer} width="50%">
                        <Text style={styles.TextTitle}>
                          {this.state.currenData.status4}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.BodyItems} height={80}>
                      <TouchableOpacity
                        style={styles.IconContainer}
                        onPress={() => {
                          if (!this.state.isAdmin) {
                            Alert.alert(
                              'Info',
                              'Apakah penyusunan sudah selesai?',
                              [
                                {
                                  text: 'Cancel',
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK!',
                                  onPress: () => {
                                    let link =
                                      'http://jdih.brebeskab.go.id/ApiSKPD/hukum';
                                    fetch(link, {
                                      method: 'PUT',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        id: this.state.currenData.id,
                                        status5: 'Dikirim ke Bupati',
                                      }),
                                    })
                                      .then(e => {
                                        console.log(e);
                                        e.json();
                                      })
                                      .then(data => {
                                        console.log(data);
                                        this.onRefresh();
                                      })
                                      .catch(err => {
                                        console.log(err);
                                      });
                                  },
                                },
                              ],
                            );
                          } else {
                            Alert.alert(
                              'Info',
                              'Admin hanya bisa membuat penyusunan',
                            );
                          }
                        }}>
                        <Icon2 name="edit" size={42} color="rgb(73, 80, 87)" />
                      </TouchableOpacity>
                      <View
                        style={s.NumberContainer}
                        backgroundColor="white"
                        borderColor={rgb(73, 80, 87)}
                        top={'25%'}>
                        <Icon2
                          name="angle-right"
                          size={35}
                          color={rgb(73, 80, 87)}
                        />
                      </View>
                      <View style={styles.DateContainer}>
                        <Text style={styles.TextDate}>
                          {Moment(this.state.currenData.tanggal5).format(
                            'DD MM Y - H:mm A',
                          )}
                        </Text>
                      </View>
                      <View style={styles.TextContainer} width="50%">
                        <Text style={styles.TextTitle}>
                          {this.state.currenData.status5}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.download}>
                      <TouchableOpacity
                        style={styles.downloadContainer}
                        onPress={() => {
                          Alert.alert(
                            'Info',
                            'Apakah anda ingin mendownload file ini?',
                            [
                              {
                                text: 'Batal',
                              },
                              {
                                text: 'Ok',
                                onPress: () => {
                                  this.downloadDocs();
                                },
                              },
                            ],
                          );
                        }}>
                        <Text style={styles.downloadText}>Download File</Text>
                        <Icon
                          name="download"
                          size={42}
                          color="rgb(73, 80, 87)"
                        />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{marginTop: db.state.height / 24}} />
          {db.renderSocial()}
        </ScrollView>
        {db.renderBottom('penyusunan', this.props.navigation)}
        {/* <TouchableOpacity 
                 onPress={()=>{this.setModalVisible(true,null)}}
              style={{
                    position:'absolute',
                    width:70,
                    height:70,
                    bottom:'10%',
                    right:'10%',
                    borderWidth:1,
                    borderRadius:100,
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column',
                    backgroundColor:rgb(73, 80, 87),

                    
                }}>
                         <Icon2 name="search" size={40} color="white" />
            </TouchableOpacity> */}
      </View>
    );
  }
}

export default Penyusunan;

const styles = StyleSheet.create({
  ModalBody: {
    flex: 1,
    // backgroundColor: '#eeeeeeaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalBox: {
    backgroundColor: 'white',
    margin: 50,
    height: Dimensions.get('window').height / 1.6,
    width: Dimensions.get('window').width / 1.3,
    borderRadius: 18,
    borderWidth: 0.5,
    elevation: 4,
    borderColor: '#808080aa',
  },
  ModalTitle: {
    fontSize: 24,
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
    backgroundColor: 'rgb(73, 80, 87)',
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
    width: '70%',
    position: 'absolute',
    top: 0,
    left: 27,
  },
  TextDate: {
    fontSize: 12,
  },
  IconContainer: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BodyItems: {
    width: Dimensions.get('window').width / 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    height: Dimensions.get('window').width / 6,
    elevation: 2,
    shadowOpacity: 0.3,
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    marginTop: 10,
    borderRadius: 16,
  },
  TextTitle: {
    fontSize: 16,
    color: rgb(73, 80, 87),
    fontWeight: 'bold',
  },
  download: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOpacity: 0.3,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  downloadContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  downloadText: {
    fontSize: 18,
    color: 'rgb(73, 80, 87)',
    fontWeight: 'bold',
  },
});
