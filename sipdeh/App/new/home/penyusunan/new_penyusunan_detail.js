import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, TouchableHighlight, Dimensions, Alert, Linking, AsyncStorage } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';

import { TextInput } from 'react-native-gesture-handler';
import db from '../../../db';
import { parse } from 'react-native-svg';

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
            rgba: db.state.darkmode ? "rgb(73, 80, 87)" : db.state.lightbox,
            profile: [],
            Error: false
        };
    }


    componentDidMount() {

        //   if (this.props.route.params.data) {
        //     console.log(this.props.route.params.data)
        //     // let link2 = 'http://192.168.43.47/jdih_brebes-master/status.php?id=' + this.props.route.params.data;
        //     let link = 'http://jdih.brebeskab.go.id/android/status.php?id=' + this.props.route.params.data;

        //     fetch(link).then((response) =>
        //       response.json()).then((responseJson) => {

        //         this.setState({
        //           isLoading: false,
        //           dataSource: responseJson
        //         })
        //       })
        //   }
        AsyncStorage.getItem("profile").then((value) => JSON.parse(value)).then((data) => {

            this.setState({
                profile: data
            })
            let id = '';
            if (data.id == '4' || data.username == 'jdihbrebes') {
                id = this.props.route.params.data;
                
            }
            else{
                id = data.id;

            }
            console.log(id);
            try {
                let link = 'http://jdih.brebeskab.go.id/android/status.php?id=' + id;
                fetch(link).then((response) =>
                    response.json()).then((responseJson) => {
                        this.setState({
                            isLoading: false,
                            dataSource: responseJson
                        })
                    }).catch((error) => {
                        console.log(error)
                        this.setState({
                            isLoading: false,
                            Error: true
                        })
                    })
            }
            catch (error) {
                this.setState({
                    isLoading: false,
                    Error: true
                })
            }
        })



    }
    setModalVisible(visible, data) {
        this.setState({
            modalVisible: visible,
            currenData: data
        })
    }
    downloadDocs() {
        let link = "http://jdih.brebeskab.go.id/uploads/sk/";
        let path = this.state.currenData.PdfPath;
        Linking.openURL(link + path)
    }
    tampilan(data) {
        if (Object.keys(data).length == 0) {
            return (
                <View style={{
                    width: Dimensions.get('window').width / 1.1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: Dimensions.get('window').width / 5,
                    elevation: 2,
                    shadowOpacity: 0.30,
                    backgroundColor: 'white',
                    // paddingHorizontal: '5%',
                    marginTop: 10,
                    borderRadius: 16
                }}>
                    <View style={{
                        backgroundColor: db.state.lightcaution,
                        width: "18%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: 'center',
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16
                    }}>
                        <Icon name='exclamation-circle' size={30} color='white' />
                    </View>
                    <View style={{
                        width: '82%',
                        height: "100%",
                        backgroundColor: db.state.lightred,
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: db.state.width / 20
                    }}>
                        <Text style={{ fontSize: db.state.width / 20, color: 'white', fontWeight: 'bold' }}>Mohon Maaf</Text>
                        <Text style={{ fontSize: db.state.width / 26, color: '#f0f0f0aa', fontWeight: 'bold' }}>Tidak Ada Data</Text>
                    </View>
                </View>
            )
        }
        else {
            return data.map((value) => {
                return (

                    <TouchableOpacity
                        onPress={() => { this.setModalVisible(true, value) }}

                    >
                        <View style={{
                            width: Dimensions.get('window').width / 1.1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: Dimensions.get('window').width / 6,
                            elevation: 2,
                            shadowOpacity: 0.30,
                            backgroundColor: this.state.box,
                            paddingHorizontal: '5%',
                            marginTop: 10,
                            borderRadius: 16
                        }}>
                            <View style={styles.IconContainer}>
                                <Icon name='bullhorn' size={42} color={this.state.rgba} />
                            </View>
                            <View style={s.NumberContainer} borderColor={this.state.rgba} top={'25%'}>
                                <Icon name="angle-right" size={35} color={this.state.rgba} />
                            </View>
                            <View style={styles.TextContainer}>
                                <Text style={{
                                    fontSize: db.state.width / 20,
                                    color: this.state.rgba,
                                    fontWeight: 'bold'
                                }}> {value.keterangan.toUpperCase()} </Text>
                                {/* <Text style={s.Text}>Bagian Hukum Setda Brebes</Text> */}
                            </View>
                        </View>
                    </TouchableOpacity>


                )
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: this.state.background }}>
                    <ScrollView >
                        {db.renderHeader()}
                        <View style={{
                            marginHorizontal: db.state.width / 20,
                            height: db.state.height / 4,
                            backgroundColor: this.state.box,
                            elevation: 4,
                            borderRadius: 16,
                            shadowRadius: 10,
                            borderWidth: 0.1,
                            marginTop: db.state.height / 20,
                            marginBottom: db.state.height / 28
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
                                        fontSize: db.state.width / 15,
                                        fontFamily: 'roboto'
                                    }}>Administrator</Text>
                                    <Text style={{
                                        color: db.state.lightheader,
                                        fontWeight: 'bold'
                                    }}>Jdihbrebes</Text>
                                </View>

                            </View>
                            <View style={{
                                marginTop: db.state.height / 20,
                                marginHorizontal: db.state.width / 20
                            }}>
                                <Text style={{
                                    fontSize: db.state.width / 28,
                                    color: "#888",
                                    fontSize: db.state.width / 32
                                }}>Sistem Informasi Produk Hukum Daerah (SIPDEH)</Text>
                                <Text style={{
                                    fontSize: db.state.width / 28,
                                    color: "#888",
                                    fontSize: db.state.width / 32
                                }}>Bagian Hukum Setda Kab. Brebes</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{
                                width: Dimensions.get('window').width / 1.1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: Dimensions.get('window').width / 6,
                                elevation: 2,
                                shadowOpacity: 0.30,
                                backgroundColor: this.state.box,
                                paddingHorizontal: '5%',
                                marginTop: 10,
                                borderRadius: 16
                            }}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <ActivityIndicator size="large" animating color={db.state.lightred} />
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{ marginTop: db.state.height / 24 }}></View>
                        {db.renderSocial()}
                    </ScrollView>
                    {db.renderBottom('', this.props.navigation)}

                </View>
            )
        }
        else {
            if (this.state.Error) {
                return (
                    db.renderError(this.props.navigation)
                )
            }
            else {
                return (
                    <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: this.state.background }}>
                        <ScrollView >
                            {db.renderHeader()}
                            <View style={{
                                marginHorizontal: db.state.width / 20,
                                height: db.state.height / 4,
                                backgroundColor: this.state.box,
                                elevation: 4,
                                borderRadius: 16,
                                shadowRadius: 10,
                                borderWidth: 0.1,
                                marginTop: db.state.height / 20,
                                marginBottom: db.state.height / 28
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
                                            fontSize: db.state.width / 15,
                                            fontFamily: 'roboto'
                                        }}>{this.state.profile.first_name + " " + this.state.profile.last_name}</Text>
                                        <Text style={{
                                            color: db.state.lightheader,
                                            fontWeight: 'bold'
                                        }}>{this.state.profile.username}</Text>
                                    </View>

                                </View>
                                <View style={{
                                    marginTop: db.state.height / 20,
                                    marginHorizontal: db.state.width / 20
                                }}>
                                    <Text style={{
                                        fontSize: db.state.width / 28,
                                        color: "#888",
                                        fontSize: db.state.width / 32
                                    }}>Sistem Informasi Produk Hukum Daerah (SIPDEH)</Text>
                                    <Text style={{
                                        fontSize: db.state.width / 28,
                                        color: "#888",
                                        fontSize: db.state.width / 32
                                    }}>Bagian Hukum Setda Kab. Brebes</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {this.tampilan(this.state.dataSource)}
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={this.state.modalVisible}
                                >
                                    <View
                                        style={styles.ModalBody}>
                                        <View style={styles.ModalBox}>
                                            <View style={styles.TitleContainer}>
                                                <Text style={styles.ModalTitle}> {this.state.currenData.keterangan} </Text>
                                                <TouchableOpacity style={{ width: 60, position: 'absolute', right: 2 }}
                                                    onPress={() => { this.setModalVisible(false, this.state.currenData) }}
                                                >
                                                    <Icon name='times' color="white" size={40} />
                                                </TouchableOpacity>
                                            </View>

                                            <ScrollView style={{ marginHorizontal: 10 }}>


                                                <View style={styles.BodyItems} height={80}>
                                                    <View style={styles.IconContainer}>
                                                        <Icon2 name='edit' size={42} color='rgb(73, 80, 87)' />
                                                    </View>
                                                    <View style={s.NumberContainer} backgroundColor={this.state.box} borderColor={rgb(73, 80, 87)} top={'25%'}>
                                                        <Icon2 name="angle-right" size={35} color={rgb(73, 80, 87)} />
                                                    </View>
                                                    <View style={styles.DateContainer}>

                                                        <Text style={styles.TextDate}> {Moment(this.state.currenData.tanggal).format('DD MM Y - H:mm A')} </Text>
                                                    </View>
                                                    <View style={styles.TextContainer} width='50%'>
                                                        <Text style={styles.TextTitle} > {this.state.currenData.status}</Text>
                                                    </View>
                                                </View>

                                                <View style={styles.BodyItems} height={80}>
                                                    <View style={styles.IconContainer}>
                                                        <Icon2 name='edit' size={42} color='rgb(73, 80, 87)' />
                                                    </View>
                                                    <View style={s.NumberContainer} backgroundColor='white' borderColor={rgb(73, 80, 87)} top={'25%'}>
                                                        <Icon2 name="angle-right" size={35} color={rgb(73, 80, 87)} />
                                                    </View>
                                                    <View style={styles.DateContainer}>

                                                        <Text style={styles.TextDate}> {Moment(this.state.currenData.tanggal2).format('DD MM Y - H:mm A')} </Text>
                                                    </View>
                                                    <View style={styles.TextContainer} width='50%'>
                                                        <Text style={styles.TextTitle} > {this.state.currenData.status2}</Text>
                                                    </View>
                                                </View>

                                                <View style={styles.BodyItems} height={80}>
                                                    <View style={styles.IconContainer}>
                                                        <Icon2 name='edit' size={42} color='rgb(73, 80, 87)' />
                                                    </View>
                                                    <View style={s.NumberContainer} backgroundColor='white' borderColor={rgb(73, 80, 87)} top={'25%'}>
                                                        <Icon2 name="angle-right" size={35} color={rgb(73, 80, 87)} />
                                                    </View>
                                                    <View style={styles.DateContainer}>

                                                        <Text style={styles.TextDate}> {Moment(this.state.currenData.tanggal3).format('DD MM Y - H:mm A')} </Text>
                                                    </View>
                                                    <View style={styles.TextContainer} width='50%'>
                                                        <Text style={styles.TextTitle} > {this.state.currenData.status3}</Text>
                                                    </View>
                                                </View>

                                                <View style={styles.BodyItems} height={80}>
                                                    <View style={styles.IconContainer}>
                                                        <Icon2 name='edit' size={42} color='rgb(73, 80, 87)' />
                                                    </View>
                                                    <View style={s.NumberContainer} backgroundColor='white' borderColor={rgb(73, 80, 87)} top={'25%'}>
                                                        <Icon2 name="angle-right" size={35} color={rgb(73, 80, 87)} />
                                                    </View>
                                                    <View style={styles.DateContainer}>

                                                        <Text style={styles.TextDate}> {Moment(this.state.currenData.tanggal4).format('DD MM Y - H:mm A')} </Text>
                                                    </View>
                                                    <View style={styles.TextContainer} width='50%'>
                                                        <Text style={styles.TextTitle} > {this.state.currenData.status4}</Text>
                                                    </View>
                                                </View>

                                                <View style={styles.BodyItems} height={80}>
                                                    <View style={styles.IconContainer}>
                                                        <Icon2 name='edit' size={42} color='rgb(73, 80, 87)' />
                                                    </View>
                                                    <View style={s.NumberContainer} backgroundColor='white' borderColor={rgb(73, 80, 87)} top={'25%'}>
                                                        <Icon2 name="angle-right" size={35} color={rgb(73, 80, 87)} />
                                                    </View>
                                                    <View style={styles.DateContainer}>

                                                        <Text style={styles.TextDate}> {Moment(this.state.currenData.tanggal5).format('DD MM Y - H:mm A')} </Text>
                                                    </View>
                                                    <View style={styles.TextContainer} width='50%'>
                                                        <Text style={styles.TextTitle} > {this.state.currenData.status5}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.download}>
                                                    <TouchableOpacity style={styles.downloadContainer}
                                                        onPress={() => {
                                                            Alert.alert("Info", "Apakah anda ingin mendownload file ini?",
                                                                [{
                                                                    text: "Batal"
                                                                },
                                                                {
                                                                    text: "Ok",
                                                                    onPress: () => {
                                                                        this.downloadDocs();
                                                                    }
                                                                }]
                                                            )
                                                        }}
                                                    >
                                                        <Text style={styles.downloadText}>Download File</Text>
                                                        <Icon name="download" size={42} color='rgb(73, 80, 87)' />
                                                    </TouchableOpacity>
                                                </View>

                                            </ScrollView>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            <View style={{ marginTop: db.state.height / 24 }}></View>
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
    }






}

export default Penyusunan;

const styles = StyleSheet.create({
    ModalBody: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ModalBox: {
        backgroundColor: 'white',
        margin: 50,
        height: Dimensions.get('window').height / 1.6,
        width: Dimensions.get('window').width / 1.3,
        borderRadius: 18,
        borderWidth: 1

    },
    ModalTitle: {
        fontSize: 24,
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    IconContainer: {
        width: 70,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 10

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
        justifyContent: 'space-between'
    },
    ItemContainer: {
        marginTop: 5,
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        padding: 20,
        paddingVertical: 22
    },
    TextItemContainer: {
        fontSize: 19,
        left: 52,
        position: 'relative',
        top: 8,
        fontWeight: 'bold',
        width: '70%'
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
        left: 27

    },
    TextDate: {
        fontSize: 12
    },
    IconContainer: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    BodyItems: {
        width: Dimensions.get('window').width / 1.1,
        flexDirection: 'row',
        alignItems: 'center',
        height: Dimensions.get('window').width / 6,
        elevation: 2,
        shadowOpacity: 0.30,
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        marginTop: 10,
        borderRadius: 16
    },
    TextTitle: {
        fontSize: 16,
        color: rgb(73, 80, 87),
        fontWeight: 'bold'
    },
    download: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowOpacity: 0.30,
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
        fontWeight: 'bold'
    }
});