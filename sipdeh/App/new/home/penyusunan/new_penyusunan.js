import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';
import { TabView, SceneMap, NavigationState, SceneRendererProps } from 'react-native-tab-view';
import { TextInput } from 'react-native-gesture-handler';
import db from '../../../db';

var s = require('../../../../assets/styles/perda');



class Penyusunan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: [],
            modalVisible: false,
            currenData: 1,
            Text: '',
            background: db.state.darkmode ? db.state.lightbg : db.state.darkbg,
            box: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
            border: !db.state.darkmode ? db.state.lightbox : db.state.darkbox,
            icon: !db.state.darkmode ? '{rgb(73, 80, 87)}' : '{rgb(73, 80, 87)}',
            textz: !db.state.darkmode ? db.state.lightbox : '{rgb(73, 80, 87)}',
            link: 'http://jdih.brebeskab.go.id/android/status.php?id=',
            active: 0,
            sk: ['Bag Hukum', 'Asisten', 'Sekda', 'Bupati'],
            array: {
                0: {
                    id: "4",
                    id_sk: "29",
                    id_kat: "2",
                    revisi: "0",
                    keterangan: "Coba Final",
                    PdfPath: "Penyertaan_Modal_No_14(1).docx",
                    status: "Di terima Bagian Hukum",
                    tanggal: "2020-10-05 02:20:35",
                    status2: "Dikirim ke Asisten",
                    tanggal2: "2020-10-06 12:20:45",
                    status3: null,
                    tanggal3: null,
                    status4: null,
                    tanggal4: null,
                    status5: null,
                    tanggal5: null,
                    users_id: "0"
                },
                1: {
                    id: "4",
                    id_sk: "29",
                    id_kat: "2",
                    revisi: "0",
                    keterangan: "Coba Final",
                    PdfPath: "Penyertaan_Modal_No_14(1).docx",
                    status: "Di terima Bagian Hukum",
                    tanggal: "2020-10-05 02:20:35",
                    status2: "Dikirim ke Asisten",
                    tanggal2: "2020-10-06 12:20:45",
                    status3: null,
                    tanggal3: null,
                    status4: null,
                    tanggal4: null,
                    status5: null,
                    tanggal5: null,
                    users_id: "0"
                }
            },
            arrayKosong: []

        };
    }

    handleApi(data) {
        let asisten;
        let sekda;
        let baghukum;
        let bupati;
        let path;
        if (data.length >= 1) {

            data.map((item, i) => {
                
            })
        }
        else {

        }
    }

    

    headerTergaje(data) {
        let length = data.length;
        console.log(length)
        return data.map((item, i) => {
            return (
                <View style={{
                    flexDirection: 'row',
                    height: db.state.height / 6,
                    alignItems: 'center',
                    paddingHorizontal: db.state.width / 44

                }}>
                    <TouchableOpacity style={(this.state.active == i) ? styles.active : styles.notActive}
                        disabled={(this.state.active == i)}
                        onPress={() => {

                        }}>
                        <Text style={(this.state.active == i) ? styles.TextActive : styles.TextNotActive}>{item}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    componentDidMount() {
        try {
            if (this.props.route.params.data) {


            }
        } catch (error) {
            console.log(error)

        }


    }
    setModalVisible(visible, data) {
        this.setState({
            modalVisible: visible,
            currenData: data
        })

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
                                    fontSize: db.state.width/20,
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
                <View style={{
                    flex: 1,
                    justifyContent: "space-between",
                    backgroundColor: this.state.background
                }}>
                    <ScrollView style={{ backgroundColor: this.state.background }}>
                        {db.renderHeader()}
                        <View style={{
                            marginHorizontal: db.state.width / 22,
                            elevation: 4,
                            shadowRadius: 10,
                            shadowOpacity: 1,
                            borderLeftWidth: 0.1,
                            borderRightWidth: 0.1,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15
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
                                }}>Loading. . .</Text>
                                <Text style={{
                                    color: db.state.lightbg,
                                    marginBottom: db.state.width / 48
                                }}>Jaringan Dokumentasi {"&"} Informasi Hukum (JDIH)</Text>
                                <Text style={{
                                    color: db.state.lightbg,
                                    marginBottom: db.state.width / 48
                                }}>Kab.Brebes</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: db.state.height / 3 }}>
                                <ActivityIndicator size='large' animating />
                            </View>
                        </View>
                        {db.renderSocial()}
                    </ScrollView>
                    {db.renderBottom('', this.props.navigation)}
                </View>
            )
        }
        return (
            <View style={{ flex: 1, height: Dimensions.get('window').height, backgroundColor: this.state.background }}>
                <ScrollView >
                    {db.renderHeader()}
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                        {/* {this.tampilan(this.state.dataSource)} */}
                        <View style={{
                            width: db.state.width,
                            marginTop: db.state.height / 22
                        }}>
                            <ScrollView horizontal={true} style={{
                                width: db.state.width - db.state.width / 10,
                                marginHorizontal: db.state.width / 22,
                                backgroundColor: this.state.box,
                                borderRadius: 16,
                            }}>
                                {this.headerTergaje(this.state.sk)}
                            </ScrollView>
                            <View>

                            </View>
                        </View>

                    </View>
                    {db.renderSocial()}
                </ScrollView>
                <TouchableHighlight
                    onPress={() => { this.setModalVisible(true, 0) }}
                    style={{
                        position: 'absolute',
                        width: 70,
                        height: 70,
                        bottom: '10%',
                        right: '10%',
                        borderWidth: 1,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor: rgb(73, 80, 87),
                        opacity: this.state.currenData

                    }}>
                    <Icon2 name="search" size={40} color="white" />
                </TouchableHighlight>
                {db.renderBottom("penyusunan", this.props.navigation)}
            </View>
        );
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
        height: Dimensions.get('window').height / 4,
        width: Dimensions.get('window').width / 1.3,
        borderRadius: 18,
        borderWidth: 1

    },
    ModalTitle: {
        fontSize: 25,
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
        backgroundColor: db.state.lightheader,
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
        marginLeft: 50,
        position: 'relative',
        top: 6
    },
    TextDate: {
        fontWeight: '700',
        fontSize: 15
    },
    IconContainer: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    BodyItems: {

    },
    TextTitle: {
        fontSize: 16,
        color: rgb(73, 80, 87),
        fontWeight: 'bold'
    },
    scene: {
        flex: 1,
    },
    notActive: {
        width: db.state.width / 3.5,
        backgroundColor: "white",
        paddingVertical: db.state.width / 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: db.state.width / 44,
        borderRadius: 16,
        borderWidth: 2.5,
        borderColor: db.state.lightheader,
        elevation: 10,
        shadowRadius: 10

    },
    active: {
        width: db.state.width / 3.5,
        backgroundColor: db.state.lightheader,
        paddingVertical: db.state.width / 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: db.state.width / 44,
        borderRadius: 16,
        borderWidth: 2.5,
        borderColor: "white",
        elevation: 10,
        shadowRadius: 10
    },
    TextActive: {
        color: "white",
        fontSize: db.state.width / 20,
        fontWeight: 'bold'
    },
    TextNotActive: {
        color: db.state.lightheader,
        fontSize: db.state.width / 20,
        fontWeight: 'bold'
    }
});