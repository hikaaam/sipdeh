import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Linking, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import db from '../../../db';
import Pdf from 'react-native-pdf';
var s = require('../../../../assets/styles/perda');
class pdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: '',
      data: [],
      link: '',
      source: { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true },
      background: db.state.darkmode?db.state.lightbg:db.state.darkbg,
      box: db.state.darkmode?db.state.lightbox:db.state.darkbox,
      border: !db.state.darkmode?db.state.lightbox:db.state.darkbox,
      rgba:db.state.darkmode?"rgb(73, 80, 87)":db.state.lightbox,
      Error:false

    
    };
  }
  download() {
    // let link2 = 'http://192.168.43.47/jdih_brebes-master/download.php?path='+this.state.dataSource;

    Linking.openURL('http://jdih.brebeskab.go.id/uploads/hukum/' + this.state.dataSource);

  }
  componentDidMount() {
    let link = 'http://jdih.brebeskab.go.id/android/download.php?path=' + this.props.route.params.data;
    fetch(link).then((response) =>
      response.json()).then((responseJson) => {
        console.log(responseJson)
        this.setState(
          {
            isLoading: false,
            dataSource: this.props.route.params.data,
            nama: this.props.route.params.nama,
            data: responseJson[0],
            link: { uri: "http://jdih.brebeskab.go.id/uploads/hukum/" + this.props.route.params.data, cache: true }
          }
        )

      }).catch((error)=>{
        this.setState({
          isLoading:false,
          Error:true
        })
      })

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
      if(this.state.Error){
        return(
          db.renderError(this.props.navigation)
        )
      }
      return (

        <View style={{
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: this.state.background
        }}>
          <ScrollView style={{
            //  backgroundColor:this.state.box
          }}>
            {db.renderHeader()}
            <View style={{
              marginHorizontal: db.state.width / 22,
              elevation: 4,
              shadowRadius: 10,
              shadowOpacity: 1,
              borderLeftWidth: 0.1,
              borderRightWidth: 0.1,
              borderRadius: 15,
              marginTop: db.state.height / 25,
              backgroundColor:this.state.box
            }}>
              <View style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                // height: db.state.height / 4,
                backgroundColor: this.state.box,
                borderRadius: 15,
                elevation: 4,
                shadowRadius: 10,
                shadowOpacity: 1,
                // borderColor: db.state.lightbox,
                borderWidth: 0.4,
                paddingHorizontal: 10
                // borderTopLeftRadius: 15,
                // borderTopRightRadius: 15,
              }}>
                <Text style={{
                  fontFamily: 'roboto',
                  fontWeight: 'bold',
                  fontSize: db.state.width / 18,
                  color: this.state.border,
                  marginBottom: db.state.width / 48
                }}> {this.state.nama} </Text>
                <Text style={{
                  color: "#666",
                  marginBottom: db.state.width / 48,
                  marginLeft: 10
                }}>{this.state.data["Tentang"]}</Text>

                <View style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: "100%",
                  
                }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: db.state.width / 8,
                    borderColor: "#999",
                    borderBottomWidth: 1,
                    width: "100%",
                    marginTop: db.state.width / 9,

                  }}>
                    <View style={{
                      width: db.state.width / 8,
                      height: db.state.width / 8,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Icon name="eye" size={30} color="blue" />
                    </View>

                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'flex-start'
                    }}>
                      <Text style={{
                        color:this.state.border,
                        fontSize:db.state.width/30
                      }}>Dilihat</Text>
                      <Text style={s.textSamar}> {this.state.data["hits"]} </Text>
                    </View>
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: db.state.width / 8,
                    borderColor: "#666",
                    borderBottomWidth: 0.7,
                    width: "100%",
                    marginTop: 15,
                   
                  }}>
                    <View style={{
                      width: db.state.width / 8,
                      height: db.state.width / 8,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Icon name="file" size={30} color="red" />
                    </View>

                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'flex-start'
                    }}>
                      <Text style={{
                        color:this.state.border,
                        fontSize:db.state.width/30
                      }}>Kategori</Text>
                      <Text style={s.textSamar}> {(this.state.data["id_kat"] == 1) ? "Peraturan Daerah" : "Peraturan Bupati"} </Text>
                    </View>
                  </View>

                  <TouchableOpacity style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: db.state.width / 8,
                    borderColor: "#999",
                    borderBottomWidth: 0.7,
                    width: db.state.width / 1.15,
                    marginBottom: db.state.width / 10,
                    marginTop: 15
                  }}
                    onPress={() => {
                      this.download();
                    }}
                  >
                    <View style={{
                      width: db.state.width / 8,
                      height: db.state.width / 8,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Icon name="download" size={30} color="green" />
                    </View>

                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'flex-start'
                    }}>
                      <Text style={{
                        color:this.state.border,
                        fontSize:db.state.width/30
                      }}>Download</Text>
                      <Text style={s.textSamar}>Download {(this.state.data["id_kat"] == 1) ? "Peraturan Daerah" : "Peraturan Bupati"} </Text>
                    </View>
                  </TouchableOpacity>

                </View>
              </View>
              <View style={{
                paddingHorizontal: db.state.width / 15,
                paddingVertical: db.state.width / 15,
                backgroundColor: db.state.darkmode?"#D1D1D1":db.state.darkbox,
                borderWidth: 0.3,
                // marginTop:10,
                // marginBottom:10
              }}>



                <View style={styles.container}>
                  <View style={{
                    width: "100%",
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    top: 0,
                    right: 1,
                    zIndex: 100
                  }}>
                    <TouchableOpacity style={{
                      backgroundColor: "#404040",
                      width: 45,
                      height: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                

                    }}
                    onPress={()=>{
                      this.props.navigation.push('pdfeditor',{data:this.state.link})
                    }}
                    >
                      <Icon name="external-link-alt" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                  <Pdf
                    source={this.state.link}
                    onLoadComplete={(numberOfPages, filePath) => {
                      console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                      console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                      console.log(error);
                    }}
                    onPressLink={(uri) => {
                      console.log(`Link presse: ${uri}`)
                    }}
                    style={styles.pdf}
                    horizontal={true}
                    // singlePage={true}
                    fitWidth={true}
                  />
                </View>
              </View>
            </View>
            {db.renderSocial()}
          </ScrollView>
          {db.renderBottom('',this.props.navigation)}
        </View>
      );
    }
  }
}

export default pdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: "100%",

    // paddingHorizontal:10,
    // paddingVertical:10,
    elevation: 10,
    shadowRadius: 10,
    borderWidth: 0.2,
    zIndex: 1
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: db.state.height / 3,
  }
});