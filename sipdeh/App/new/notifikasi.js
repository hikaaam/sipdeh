import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import db from '../db';


var s = require('../../assets/styles/perda.js');

class notifikasi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            background: db.state.darkmode?db.state.lightbg:db.state.darkbg,
            box: db.state.darkmode?db.state.lightbox:db.state.darkbox,
            border: !db.state.darkmode?db.state.lightbox:db.state.darkbox,

        };
    }

    componentDidMount() {
       
    }
 
    render() {

        return (
            <View style={{
                flex: 1,
                justifyContent: "space-between",
                backgroundColor: db.state.lightbg
            }}>
                <ScrollView style={{backgroundColor:this.state.background}} >
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
                        marginTop:db.state.height/20,
                        borderRadius:15,
                        backgroundColor:this.state.box
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: db.state.height / 3,
                            backgroundColor:this.state.box,
                            borderRadius: 15,
                            elevation: 4,
                            shadowRadius: 10,
                            shadowOpacity: 1,
                            borderColor: this.state.border,
                            borderWidth: 0.4,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                        }}>
                            <Icon name="sync" color={db.state.lightred} size={70} />
                            <Text style={{
                                // fontFamily:'roboto',
                                fontWeight: 'bold',
                                fontSize: db.state.width / 16,
                                color: this.state.border,
                                marginBottom: db.state.width / 48,
                                marginTop:'5%'
                            }}>Pengembangan</Text>
                            <Text style={{
                                color: "#777777aa",
                                marginBottom: db.state.width / 48
                            }}>Sayang sekali fitur ini masih</Text>
                            <Text style={{
                                color: "#777777aa",
                                marginBottom: db.state.width / 48
                            }}>dikembangkan</Text>
                        </View>
                        
                    </View>
                    <View style={{marginVertical:db.state.height/38}}></View>
                    {db.renderSocial()}
                </ScrollView>
                {db.renderBottom('', this.props.navigation)}
            </View>

        );
    }

}

export default notifikasi;
