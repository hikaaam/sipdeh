import axios from 'axios';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Modal,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Colors from '../../../../Colors';
import {
  TextInputUnderline,
  Icons,
  Loading,
  Button,
  CustomHeader,
} from '../../../../Components';
import db from '../../../../db';
import {Picker} from '@react-native-picker/picker';
import {Alert} from 'react-native';
export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isLoading: true,
      data: [],
      profile: this.props.route.params.data,
      visible: false,
    };
  }
  renderPickerItem(data) {
    return data.map((item, i) => {
      return (
        <Picker.Item
          color={Colors.Biru()}
          label={item.nama_kategori}
          value={item.id_kat}
        />
      );
    });
  }
  onRefresh() {
    this.setState({
      refreshing: true,
    });
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 400);
  }
  async componentDidMount() {
    let profile = this.state.profile;
    console.log(profile);
    let link = 'http://jdih.brebeskab.go.id/ApiSKPD';
    let data = await axios(link).catch(e => {
      console.log(e);
    });
    data = data.data;
    this.setState({
      data,
      isLoading: false,
    });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.Primary(),
        }}>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.onRefresh();
                }}
                colors={[Colors.Biru(), Colors.TextColor()]}
              />
            }>
            <View
              style={{
                paddingHorizontal: RFPercentage(3),
                width: '100%',
              }}>
              <CustomHeader title="Buat SK Baru" />
              <Text
                style={{
                  fontSize: RFPercentage(2.2),
                  color: Colors.TextColor(),
                  marginBottom: RFPercentage(1),
                  fontWeight: 'bold',
                }}>
                {this.state.profile.nama_sk}
              </Text>
              <Text
                style={{
                  fontSize: RFPercentage(2.2),
                  color: Colors.TextColor(),
                  marginBottom: RFPercentage(1),
                }}>
                Tipe SK
              </Text>
              <Picker
                dropdownIconColor={Colors.Biru()}
                itemStyle={{
                  color: Colors.TextColor(),
                  backgroundColor: Colors.BoxColor(),
                }}
                mode="dropdown"
                style={{
                  color: Colors.TextColor(),
                  marginBottom: RFPercentage(2),
                }}
                onValueChange={id_kat => {
                  this.setState({id_kat});
                }}>
                {this.renderPickerItem(this.state.data.kategori)}
              </Picker>
              <Text
                style={{
                  fontSize: RFPercentage(2.2),
                  color: Colors.TextColor(),
                  marginBottom: RFPercentage(1),
                }}>
                Nama Penyusunan
              </Text>
              <TextInputUnderline
                onChangeText={keterangan => {
                  this.setState({
                    keterangan,
                  });
                }}
                placeholder="Keterangan"
                otherStyle={{
                  marginBottom: RFPercentage(2),
                }}
              />
              <Button
                tulisan="buat penyusunan"
                onPress={() => {
                  this.setState({visible: true});
                  let link = 'http://jdih.brebeskab.go.id/ApiSKPD/post';
                  let body = JSON.stringify({
                    id_sk: this.state.profile.id_sk,
                    id_skpd: this.state.profile.id_sk,
                    id_kat: this.state.id_kat,
                    keterangan: this.state.keterangan,
                    status: 'Dikirim ke Asisten',
                    users_id: this.state.profile.id,
                  });
                  console.log(body);
                  fetch(link, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: body,
                  })
                    .then(res => res.json())
                    .then(data => {
                      if (data) {
                        Alert.alert('Berhasil', 'Data berhasil ditambahkan');
                        this.props.navigation.goBack();
                      } else {
                        Alert.alert('Error', 'Gagal membuat request');
                      }
                    })
                    .catch(e => {
                      console.log(e);
                      Alert.alert('Error', e);
                    })
                    .finally(() => {
                      this.setState({visible: false});
                    });

                  // this.setState({visible: false});
                }}
                otherStyle={{marginBottom: RFPercentage(6.5)}}
              />
            </View>
            {db.renderSocial()}
          </ScrollView>
        )}
        <Modal transparent visible={this.state.visible}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#eeeeeeaa',
              marginTop: RFPercentage(8.5),
            }}>
            <ActivityIndicator animating size="large" color={Colors.Merah()} />
          </View>
        </Modal>
        {db.renderBottom('penyusunan', this.props.navigation)}
      </View>
    );
  }
}

export default index;
