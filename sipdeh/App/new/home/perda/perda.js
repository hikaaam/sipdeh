import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import db from '../../../db';
import {PersistPeraturan} from '../../../Redux/Actions';

var s = require('../../../../assets/styles/perda');

class perda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props?.peraturan === null,
      dataSource: this.props?.peraturan?.[1]?.['perda']?.[0]?.['tahun'] ?? [],
      background: db.state.darkmode ? db.state.lightbg : db.state.darkbg,
      box: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      border: !db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      rgba: db.state.darkmode ? 'rgb(73, 80, 87)' : db.state.lightbox,
      Error: false,
    };
  }

  componentDidMount() {
    let link = 'http://jdih.brebeskab.go.id/android/listProduk.php';
    // let link2 = 'http://192.168.43.47/jdih_brebes-master/listProduk.php';
    fetch(link)
      .then(response => response.json())
      .then(responseJson => {
        // let array = JSON.stringify(responseJson);

        // console.log('ini baru ===> '+responseJson[0]['perbup'][0]['tahun'][0]['tahun2011'][0])
        // console.log(responseJson[0]['perbup'][0]['tahun'][0]['tahun2011'][0]);
        this.setState({
          isLoading: false,
          dataSource: responseJson[1]['perda'][0]['tahun'],
        });
        this.props.PersistPeraturan(responseJson);
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          Error: true,
        });
      });
  }
  isiperbup(data) {
    let array = [];
    Object.keys(data).forEach(function(key) {
      array.push(key);
      // ...
    });
    let tahun = [];
    let panjang = [];
    for (var i = 0; i < array.length; i++) {
      let data2 = data[i];
      tahun.push(Object.keys(data2));

      panjang.push(data[i][Object.keys(data2)].length);
    }
    // console.log(panjang)
    return tahun.map((value, i) => {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            // paddingHorizontal:10,
            paddingVertical: 20,
            borderBottomColor: '#999',
            borderBottomWidth: 1.2,
            backgroundColor: this.state.box,
          }}
          onPress={() => {
            this.props.navigation.navigate('pdflist', {
              data: this.state.dataSource[i],
              item: value[0],
              per: 'perda',
            });
          }}>
          <View style={s.IconContainer}>
            <Icon name="file-pdf" size={30} color={db.state.lightbox} />
          </View>
          <View style={s.NumberContainer}>
            <Text
              style={{
                color: db.state.darkmode ? 'black' : 'white',
                fontWeight: 'bold',
              }}>
              {panjang[i]}
            </Text>
          </View>
          <View style={s.TextContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: db.state.width / 22,
                color: db.state.darkmode ? '#111' : 'white',
              }}>
              Perda{' '}
              {value[0].charAt(0).toUpperCase() +
                value[0].substr(0, 5).slice(1) +
                ' ' +
                value[0].substr(5, 9)}{' '}
            </Text>
            <Text style={s.Text}>Bagian Hukum Setda Brebes</Text>
          </View>
        </TouchableOpacity>
      );
    });
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
          <ScrollView style={s.containerAsli}>
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
                backgroundColor: this.state.box,
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
                  Peraturan Daerah
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
        return db.renderError(this.props.navigation);
      } else {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              backgroundColor: this.state.background,
            }}>
            <ScrollView style={s.containerAsli}>
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
                  backgroundColor: this.state.box,
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
                    Peraturan Daerah
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
                {this.isiperbup(this.state.dataSource)}
              </View>
              {db.renderSocial()}
            </ScrollView>
            {db.renderBottom('', this.props.navigation)}
          </View>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  peraturan: state.peraturan?.peraturan,
});

const mapDispatchToProps = {
  PersistPeraturan,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(perda);
