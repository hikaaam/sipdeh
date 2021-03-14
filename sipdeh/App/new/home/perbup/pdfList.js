import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import db from '../../../db';


var s = require('../../../../assets/styles/perda');

class PdfList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      per: '',
      background: db.state.darkmode ? db.state.lightbg : db.state.darkbg,
      box: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      border: !db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      rgba: db.state.darkmode ? "rgb(73, 80, 87)" : db.state.lightbox
    };
  }

  componentDidMount() {
    let value = this.props.route.params.item;
    let data1 = this.props.route.params.data;
    let peraturan = this.props.route.params.per;
    let data = data1[value]
    this.setState({
      isLoading: false,
      dataSource: data

    });
    if (peraturan == 'perda') {
      this.setState(
        {
          per: 'Daerah',
          judulList: 'Peraturan Daerah'
        }
      )
    }
    else {
      this.setState({
        per: 'Bupati',
        judulList: 'Peraturan Bupati'
      })
    }
  }
  isiperbup(data) {



    return data.map((value, i) => {

      return (
        <TouchableOpacity style={{
          flexDirection: 'column',
          paddingVertical: 20,
          borderBottomColor: '#999',
          borderBottomWidth: 1.2,
          // marginHorizontal:db.state.width/20,
          backgroundColor: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
          borderRadius: 16,
          marginTop: 5,
          paddingHorizontal: db.state.width / 22,
          width:'100%'
        }} onPress={() => { this.props.navigation.navigate('pdfview', { data: value.PdfPath, nama: 'Peraturan ' + this.state.per + ' Nomor  ' + value.Nomor + '\n Tahun ' + this.props.route.params.item.substr(5, 8) }) }}>
          <View style={{
            flexDirection: 'row',
          }}>
            <View style={s.IconContainer} backgroundColor="red" >
              <Icon2 name='file-pdf' size={db.state.width/15} color='white' />
            </View>
            <Text style={{
              fontWeight: 'bold',
              fontSize: db.state.width / 25,
              color: db.state.darkmode ? "#111" : "white"
            }}>Peraturan {this.state.per + ' Nomor  ' + value.Nomor + ' \nTahun ' + this.props.route.params.item.substr(5, 8)} </Text>

          </View>
          <View style={{
            width: "100%",
            paddingHorizontal:db.state.width/22
          }}>

            <Text style={{
              fontSize: db.state.width/35,
              // fontFamily:"serif",
              fontWeight: "normal",
              color: db.state.lightred
              // fontStyle:"italic"
            }}>{value.Tentang.toUpperCase()} </Text>

          </View>
        </TouchableOpacity>
      );
    }

    )

  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' animating />
        </View>
      )
    }
    else {
      return (
        <View style={{
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: this.state.background
        }}>
          <ScrollView style={s.containerAsli}>
            {db.renderHeader()}
            <View style={{
              marginHorizontal: db.state.width / 22,
              elevation: 4,
              shadowRadius: 10,
              shadowOpacity: 1,
              borderLeftWidth: 0.1,
              borderRightWidth: 0.1,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              backgroundColor: this.state.box
            }}>
              <View style={{
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
                <Text style={{
                  // fontFamily:'roboto',
                  fontWeight: 'bold',
                  fontSize: db.state.width / 13,
                  color: "white",
                  marginBottom: db.state.width / 48
                }}>{this.state.judulList}</Text>
                <Text style={{
                  color: db.state.lightbg,
                  marginBottom: db.state.width / 48,
                  fontSize:db.state.width/32
                }}>Jaringan Dokumentasi {"&"} Informasi Hukum (JDIH)</Text>
                <Text style={{
                  color: db.state.lightbg,
                  marginBottom: db.state.width / 48,
                  fontSize:db.state.width/32
                }}>Kab.Brebes</Text>
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

export default PdfList;
