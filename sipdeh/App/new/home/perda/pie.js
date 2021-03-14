import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, Modal, Text, View, ActivityIndicator, Dimensions, TouchableOpacity, Alert } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { LineChart, BarChart } from 'react-native-chart-kit';
import db from '../../../db';

var s = require('../../../../assets/styles/perda');

// var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
export default class test extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isLoading: true,
            dataSource: [],
            dataSource2: [],
            modalVisible: false,
            currenData: [],
            isPerda: true,
            background: db.state.darkmode ? db.state.lightbg : db.state.darkbg,
            box: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
            border: !db.state.darkmode ? db.state.lightbox : db.state.darkbox,
            rgba: db.state.darkmode ? "rgb(73, 80, 87)" : db.state.lightbox,
            Error:false
        }

    }


    setModalVisible(visible, data) {
        //  console.log(data)
        this.setState({
            modalVisible: visible,
            currenData: data
        })

    }

    Warna(warna, tahun, panjang, total, hits) {
        let id = 0;
        let tahun2 = []
        tahun.map((data, i) => {
            tahun2.push(data[0])
        })
        //   console.log(tahun2)
        return warna.map((userData) => {
            let tahun1 = tahun2[id];
            let text = tahun1.charAt(0).toUpperCase() + tahun1.substr(0, 5).slice(1) + ' ' + tahun1.substr(5, 9);
            // let text=tahun1;
            let panjang1 = panjang[id];
            let hits1 = hits[id];
            let percentage = (panjang1 / total * 100).toFixed(2) + '%';
            id = id + 1;
            return (
                <TouchableOpacity style={{
                    width: Dimensions.get('window').width / 1.2,
                    height: 85,
                    borderBottomColor: '#555',
                    borderBottomWidth: 1,
                    marginBottom: 5,
                    justifyContent: 'center',
                    flexDirection: "column",
                    marginLeft: 30
                    // alignItems:'center'
                }} onPress={() => {

                    let data = [panjang1, percentage,
                        text,
                        userData,
                        total,
                        hits1
                    ];
                    this.setModalVisible(true, data)
                    // Alert.alert("myTitle", "my message");

                }}>

                    <View style={
                        {
                            width: 60,
                            height: 60,
                            position: 'absolute',
                            backgroundColor: userData,
                            borderRadius: 100,
                            borderColor: 'black',
                            borderWidth: 1.8,
                            bottom: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }><Text style={{ color: 'white', backgroundColor: '#000000aa', fontSize: 14 }}>{percentage}</Text></View>
                    <Text
                        style={{ marginLeft: 90, fontSize: 22, marginTop: 20 }}
                    >Perda {text} </Text>
                </TouchableOpacity>
            )
        });
    }

    isiperbup(data) {
        let array = []
        Object.keys(data).forEach(function (key) {
            array.push(key);
            // ...
        });
        let tahun = []
        let panjang = []
        let colors = []
        let hits = []
        let label = []
        let total = 0;
        for (var i = 0; i < array.length; i++) {
            let data2 = data[i];
            // console.log(Object.keys(data2)[0])
            tahun.push(Object.keys(data2));
            label.push(Object.keys(data2)[0]);
            //   console.log(tahun[i][0])
            colors.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')');
            i + 1;
            panjang.push(data[i][tahun[i][0]].length);
            hits.push(data[i][tahun[i][1]][0][tahun[i][1]]);
            total = total + panjang[i];

        }
        // console.log(label)
        return (
            <LineChart
                data={{
                    labels: label,
                    datasets: [
                        {
                            data: hits
                        }
                    ]
                }}
                width={array.length * 70} // from react-native
                height={db.state.height / 1.8}
                yAxisLabel=""
                yAxisSuffix=" HITS"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: this.state.box,
                    backgroundGradientFrom: this.state.box,
                    backgroundGradientTo: this.state.box,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(77, 136, 216, ${opacity})`,
                    labelColor: (opacity = 1) => this.state.rgba,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: this.state.border
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />

        );

    }
    componentDidMount() {
        let link2 = 'http://192.168.43.47/jdih_brebes-master/hits.php';
        let link = 'http://jdih.brebeskab.go.id/android/hits.php';
        fetch(link).then((response) =>
            response.json()).then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson[1]['perda'][0]['tahun'],
                    dataSource2: responseJson[0]['perbup'][0]['tahun']
                })
                // console.log(responseJson[1]['perda'][0]['tahun'][0])
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
                <View style={{
                    flex: 1,
                    justifyContent: "space-between",
                    backgroundColor: this.state.background
                }}>
                    <ScrollView style={{backgroundColor: this.state.box}}>
                        {db.renderHeader()}
                        <View style={{
                            marginHorizontal: db.state.width / 22,
                            elevation: 4,
                            shadowRadius: 10,
                            shadowOpacity: 1,
                            borderLeftWidth: 0.1,
                            borderRightWidth: 0.1,
                            borderRadius: 15,
                            backgroundColor: this.state.box
                        }}>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                height: db.state.height / 5,
                                backgroundColor: this.state.box,
                                borderRadius: 15,
                                elevation: 1,
                                shadowRadius: 10,
                                shadowOpacity: 1,
                                borderColor: this.state.box,
                                borderWidth: 0.4,
                                borderTopLeftRadius: 15,
                                borderTopRightRadius: 15,
                                paddingTop: db.state.height / 14,
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor: this.state.isPerda ? this.state.box : db.state.lightheader,
                                    width: db.state.width / 3,
                                    height: db.state.height / 14,
                                    borderWidth: 0.7,
                                    borderColor: this.state.isPerda ? db.state.lightheader : this.state.box,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: db.state.width / 12,
                                    elevation: 4,
                                    shadowRadius: 5
                                }} onPress={() => {
                                    this.gantiView();
                                }}
                                    disabled={this.state.isPerda}>
                                    <Text style={{
                                        color: this.state.isPerda ? db.state.lightheader : this.state.box,
                                        fontSize: db.state.width / 28,
                                        fontWeight: "bold",
                                        fontFamily: 'roboto'
                                    }}>PERDA</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: !this.state.isPerda ? this.state.box : db.state.lightheader,
                                    width: db.state.width / 3,
                                    height: db.state.height / 14,
                                    borderWidth: 0.7,
                                    borderColor: !this.state.isPerda ? db.state.lightheader : db.state.lightbg,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: db.state.width / 12,
                                    elevation: 4,
                                    shadowRadius: 5
                                }}
                                    onPress={() => {
                                        this.gantiView();
                                    }}
                                    disabled={!this.state.isPerda}>
                                    <Text style={{
                                        color: !this.state.isPerda ? db.state.lightheader : this.state.box,
                                        fontSize: db.state.width / 28,
                                        fontWeight: "bold",
                                        fontFamily: 'roboto'
                                    }}>PERBUP</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                backgroundColor: this.state.box,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: "100%",
                                height: db.state.height / 10,
                                marginTop: 8,
                                borderRadius: 16
                            }}>
                                <Text style={{
                                    color: this.state.border,
                                    fontFamily: 'roboto',
                                    fontWeight: '500',
                                    fontSize: db.state.width / 18
                                }}>{this.state.isPerda ? "Statistik Perda" : "Statistik Perbup"} </Text>
                            </View>
                          
                                <View style={{ justifyContent: 'center', alignItems: 'center',height:db.state.height/4,backgroundColor:this.state.box }}>
                                    <ActivityIndicator size='large' animating />
                                </View>
                        
                        </View>


                        {db.renderSocial()}
                    </ScrollView>
                    {db.renderBottom('', this.props.navigation)}
                </View>

            );
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
                    <ScrollView style={s.containerAsli}>
                        {db.renderHeader()}
                        <View style={{
                            marginHorizontal: db.state.width / 22,
                            elevation: 4,
                            shadowRadius: 10,
                            shadowOpacity: 1,
                            borderLeftWidth: 0.1,
                            borderRightWidth: 0.1,
                            borderRadius: 15,
                            backgroundColor: this.state.box
                        }}>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                height: db.state.height / 5,
                                backgroundColor: this.state.box,
                                borderRadius: 15,
                                elevation: 1,
                                shadowRadius: 10,
                                shadowOpacity: 1,
                                borderColor: this.state.box,
                                borderWidth: 0.4,
                                borderTopLeftRadius: 15,
                                borderTopRightRadius: 15,
                                paddingTop: db.state.height / 14,
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor: this.state.isPerda ? this.state.box : db.state.lightheader,
                                    width: db.state.width / 3,
                                    height: db.state.height / 14,
                                    borderWidth: 0.7,
                                    borderColor: this.state.isPerda ? db.state.lightheader : this.state.box,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: db.state.width / 12,
                                    elevation: 4,
                                    shadowRadius: 5
                                }} onPress={() => {
                                    this.gantiView();
                                }}
                                    disabled={this.state.isPerda}>
                                    <Text style={{
                                        color: this.state.isPerda ? db.state.lightheader : this.state.box,
                                        fontSize: db.state.width / 28,
                                        fontWeight: "bold",
                                        fontFamily: 'roboto'
                                    }}>PERDA</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: !this.state.isPerda ? this.state.box : db.state.lightheader,
                                    width: db.state.width / 3,
                                    height: db.state.height / 14,
                                    borderWidth: 0.7,
                                    borderColor: !this.state.isPerda ? db.state.lightheader : this.state.background,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: db.state.width / 12,
                                    elevation: 4,
                                    shadowRadius: 5
                                }}
                                    onPress={() => {
                                        this.gantiView();
                                    }}
                                    disabled={!this.state.isPerda}>
                                    <Text style={{
                                        color: !this.state.isPerda ? db.state.lightheader : this.state.box,
                                        fontSize: db.state.width / 28,
                                        fontWeight: "bold",
                                        fontFamily: 'roboto'
                                    }}>PERBUP</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                backgroundColor: this.state.box,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: "100%",
                                height: db.state.height / 10,
                                marginTop: 8,
                                borderRadius: 16
                            }}>
                                <Text style={{
                                    color: this.state.border,
                                    fontFamily: 'roboto',
                                    fontWeight: '500',
                                    fontSize: db.state.width / 18
                                }}>{this.state.isPerda ? "Statistik Perda" : "Statistik Perbup"} </Text>
                            </View>
                            <ScrollView horizontal={true}>
                                {this.isiperbup((this.state.isPerda) ? this.state.dataSource : this.state.dataSource2)}
                            </ScrollView>
                        </View>


                        {db.renderSocial()}
                    </ScrollView>
                    {db.renderBottom('', this.props.navigation)}
                </View>

            );
        }
    }

    gantiView() {
        var bool = this.state.isPerda;
        if (bool) {
            this.setState({
                isPerda: false
            })
        }
        else {
            this.setState({
                isPerda: true
            })
        }
    }
}

AppRegistry.registerComponent('test', () => test);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    title: {
        fontSize: 24,
        margin: 10,
        paddingBottom: 20
    },
    ModalBody: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ModalBox: {
        backgroundColor: 'white',
        margin: 50,
        height: Dimensions.get('window').height / 1.8,
        width: Dimensions.get('window').width / 1.3,
        borderRadius: 25,
        borderWidth: 1,


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
        position: 'absolute',
        bottom: 10,
        right: 10

    },
    TitleContainer: {

        padding: 20,
        borderBottomColor: '#555',
        borderBottomWidth: 1,
        alignItems: 'center',
        backgroundColor: '#2c91e1',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    ItemContainer: {
        marginTop: 5,
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        padding: 20,
        paddingVertical: 25
    },
    TextItemContainer: {
        fontSize: 20,

        position: 'relative',
        top: 8,
        fontWeight: 'bold'
    },
    ItemBody: {
        margin: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
        fontSize: 16
    }
});