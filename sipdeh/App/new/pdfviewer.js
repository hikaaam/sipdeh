import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Linking, Alert, Modal, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import db from '../db';
import Pdf from 'react-native-pdf';
var s = require('../../assets/styles/perda.js');
class pdfviewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: '',
            loading: true,
            currPage: 1,
            isHorizontal: false,
            total: 1,
            modalVisible: false,
            background: db.state.darkmode ? db.state.lightbg : db.state.darkbg,
            box: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
            border: !db.state.darkmode ? db.state.lightbox : db.state.darkbox,
            rgba: db.state.darkmode ? "rgb(73, 80, 87)" : db.state.lightbox
        };
    }
    componentDidMount() {
        this.setState({
            source: this.props.route.params.data,
            loading: false
        })
    }


    nextpage() {
        var current = this.state.currPage;
        var total = this.state.total;
        var next = current + 1;
        if (next > total) {
            Alert.alert("Info", "Ini Adalah Halaman Terakhir");
        }
        else {
            this.pdf.setPage(next);
        }
    }

    prevpage() {
        var current = this.state.currPage;
        var prev = current - 1;
        if (prev < 1) {
            Alert.alert("Info", "Ini Adalah Halaman Pertama");
        }
        else {
            this.pdf.setPage(prev);
        }
    }

    orientasi() {
        var isHorizontal = this.state.isHorizontal;
        if (isHorizontal) {
            this.setState({
                isHorizontal: false
            })
        }
        else {
            this.setState({
                isHorizontal: true
            })
        }
    }

    download(link) {
        return (
            Alert.alert("Info", "Apakah anda ingin mendownload file ini?", [
                {
                    text: "Cancel",
                },
                {
                    text: "OK",
                    onPress: () => Linking.openURL(link)
                }

            ])
        )
    }
    goTo(page) {
        var current = this.state.currPage;
        var total = this.state.total;
        if (page > total) {
            try {
                this.setModalVisible(false);
                setTimeout(() => {
                    this.pdf.setPage(total);
                }, 500);
            } catch (error) {

            }
        }
        else if (page < 1) {
            try {
                this.setModalVisible(false);
                setTimeout(() => {
                    this.pdf.setPage(1);
                }, 500);
            } catch (error) {

            }
        }
        else {
            try {
                this.setModalVisible(false);
                setTimeout(() => {

                    this.pdf.setPage(page);

                }, 500);
            } catch (error) {

            }

        }
    }


    setModalVisible(visible) {
        this.setState({
            modalVisible: visible,
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" animating color={db.state.lightred} />
                </View>
            )
        }
        else {
            return (

                <View style={{
                    flex: 1,
                    justifyContent: "space-between",
                    backgroundColor: db.state.lightbg
                }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <View style={styles.ModalBody}>

                            <View style={styles.ModalBox}>
                                <View style={styles.TitleContainer}>
                                    <Text style={styles.ModalTitle}>Go To Page</Text>
                                    <TouchableOpacity style={{ marginRight: 10, width: 60, alignItems: 'flex-end' }}

                                        onPress={() => { this.setModalVisible(false, 1) }}
                                    >
                                        <Icon3 name='times' color="white" size={40} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    justifyContent: 'center',
                                    flex: 1
                                }}>
                                    <TextInput style={{
                                        fontSize: 35,
                                        padding: 12,
                                        marginHorizontal: 30,
                                        borderBottomWidth: 0.5
                                    }}
                                        onChangeText={(Text) => {
                                            this.setState({
                                                Text
                                            });
                                        }}
                                        autoFocus={true}
                                        returnKeyType='search'
                                        placeholder='type here'
                                        keyboardType="decimal-pad"

                                        onSubmitEditing={() => {

                                            if ((this.state.Text).length == 0) {
                                                let value = ' ';

                                                // this.props.navigation.replace('penyusunan', { data: value })
                                            }
                                            else {
                                                let value = this.state.Text;
                                                this.goTo(parseInt(value))
                                                // this.props.navigation.replace('penyusunan', { data: value })
                                            }


                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.container}>
                        <Pdf
                            ref={(pdf) => { this.pdf = pdf; }}
                            source={this.state.source}
                            onLoadComplete={(numberOfPages, filePath) => {
                                this.setState({
                                    total: numberOfPages
                                })
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                this.setState({
                                    currPage: page
                                })
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            onPressLink={(uri) => {
                                Linking.openURL(uri);
                            }}
                            style={styles.pdf}
                            horizontal={this.state.isHorizontal}
                            fitWidth={true}
                            enablePaging={true}
                        // enableRTL={true}
                        />

                    </View>
                    <View style={{
                        height: db.state.height / 12,
                        backgroundColor: db.state.darkmode?db.state.lightslider:db.state.darkslider,
                        borderWidth: 0.1,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}>

                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 5
                            }}
                                onPress={() => {
                                    this.prevpage()
                                }}
                            >
                                <View style={{ width: 35, height: 35, margin: 10, marginBottom: 0, borderRadius: 100,  }}>
                                    <Icon name="arrow-left" size={db.state.width/18} color="red" />
                                </View>
                                <Text style={{
                                    color:this.state.border,
                                    fontWeight: 'bold',
                                    fontSize:db.state.width/38,
                                }}>Prev Page</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 5
                            }}
                                onPress={
                                    () => {
                                        this.download(this.state.source.uri);
                                    }
                                }
                            >
                                <View style={{ width: 35, height: 35, margin: 10, marginBottom: 0, borderRadius: 100, }}>
                                    <Icon name="download" size={db.state.width/18} color="green" />
                                </View>
                                <Text style={{
                                    color:this.state.border,
                                    fontWeight: 'bold',
                                    fontSize:db.state.width/38,
                                }}>Download</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 5
                            }}
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}
                            >
                                <View style={{ width: 35, height: 35, margin: 10, marginBottom: 0, borderRadius: 100, }}>
                                    <Icon name="search" size={db.state.width/18} color={db.state.lightheader} />
                                </View>
                                <Text style={{
                                    color:this.state.border,
                                    fontWeight: 'bold',
                                    fontSize:db.state.width/38,
                                }}>Ke halaman</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 5
                            }}
                                onPress={
                                    () => {
                                        this.orientasi();
                                    }
                                }
                            >
                                <View style={{ width: 38, height: 38, margin: 10, marginBottom: 0, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon2 name={!this.state.isHorizontal ? "document" : "document-landscape"} size={db.state.width/20} color="green" />
                                </View>
                                <Text style={{
                                    color:this.state.border,
                                    fontWeight: 'bold',
                                    fontSize:db.state.width/38,
                                }}>{!this.state.isHorizontal ? "Potrait" : "Horizontal"}</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 5
                            }}
                                onPress={() => {
                                    this.nextpage()
                                }}
                            >
                                <View style={{ width: 35, height: 35, margin: 10, marginBottom: 0, borderRadius: 100,  }}>
                                    <Icon name="arrow-right" size={db.state.width/18} color="red" />
                                </View>
                                <Text style={{
                                    color:this.state.border,
                                    fontWeight: 'bold',
                                    fontSize:db.state.width/38,
                                }}>Next Page</Text>

                            </TouchableOpacity>

                        </View>
                    </View>
                    {/* {db.renderBottom()} */}
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: db.state.width,
        height: db.state.height,
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
        backgroundColor: '#2c91e1',
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
        width: Dimensions.get('window').width / 1.1,
        flexDirection: 'row',
        alignItems: 'center',
        height: Dimensions.get('window').width / 6,
        elevation: 2,
        shadowOpacity: 0.30,
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        marginTop: 10
    },
    TextTitle: {
        fontSize: 16,
        color: rgb(73, 80, 87),
        fontWeight: 'bold'
    }
});
export default pdfviewer;
