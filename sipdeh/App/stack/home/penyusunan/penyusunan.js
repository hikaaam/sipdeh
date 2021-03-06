import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal, StyleSheet,TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';

import { TextInput } from 'react-native-gesture-handler';
import db from '../../../db';

var s = require('../../../../assets/styles/perda');
class Penyusunan extends Component {
    constructor(props) {
        super(props);
        this.state = {
           isLoading:true,
           dataSource: [],
           modalVisible:false,
           currenData:1,
           Text:''
        };
    }


    componentDidMount(){
        try {
        if(this.props.route.params.data){
           
            // let link2 = 'http://192.168.43.47/jdih_brebes-master/sk.php?search='+this.props.route.params.data;
            let link = 'http://jdih.brebeskab.go.id/android/sk.php?search='+this.props.route.params.data;;
        
            fetch(link).then((response) => 
            response.json()).then((responseJson) => {
             
                this.setState({
                    isLoading:false,
                    dataSource:responseJson
                })
            })
        }
        } catch (error) {
         
    
        }
       
  
    }
    setModalVisible(visible,data) {
        this.setState({
            modalVisible:visible,
            currenData:data
        })
 
      }
    
    tampilan(data){
       if(Object.keys(data).length==0){
           return(
               <View style={{
                    flexDirection:'column',
                    justifyContent:'center',
                    height:Dimensions.get('window').height-90,
                    alignItems:'center'
               }  }>
                   
                   <Icon2 name='bug' size={200} color='#222222' />
                  
                   <Text style={{fontSize:40, color:'#222',marginTop:20}}> Data Kosong </Text>
               </View>
           )
       }
       else{
        return data.map((value) =>{
            return(
                
            <TouchableOpacity 
            onPress={()=>{this.props.navigation.push('detail_penyusunan',{data:value.id})}}
          
            >
                <View style={styles.BodyItems}>
                    <View style={styles.IconContainer}>
                    <Icon2 name='user-tie' size={50} color={rgb(73, 80, 87)} />
                    </View>
                    <View style={s.NumberContainer} backgroundColor='white' borderColor={rgb(73, 80, 87)}  top={'25%'}> 
                       <Icon2  name="angle-right" size={35} color={rgb(73, 80, 87)} />
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.TextTitle}> {value.nama_sk} </Text>
                        {/* <Text style={s.Text}>Bagian Hukum Setda Brebes</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
           
          
            )
        })
    }
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator  size='large' animating />
                </View>
            )
        }
        return (
            <View style={{flex:1,height:Dimensions.get('window').height}}>   
            <ScrollView >
            <View style={{ flex: 1, alignItems:'center',justifyContent:'center'}}>
                    {db.renderHeader}
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
                            <Text style={styles.ModalTitle}>Search</Text>
                            <TouchableOpacity style={{marginRight:10,width:60,alignItems:'flex-end'}} 
                          
                            onPress={()=>{this.setModalVisible(false,1)}} 
                            >
                               
                                <Icon2 name='times' color="white" size={40}/>
                            </TouchableOpacity>
                            </View>
                            <View style={{
                                justifyContent:'center',      
                                flex:1
                            }}>
                             <TextInput style={{
                                fontSize:35,
                                padding:12,
                                marginHorizontal:30,
                                borderBottomWidth:0.5
                             }}
                             onChangeText={(Text)=>{
                                 this.setState({
                                     Text
                                 });
                             }}
                             autoFocus={true}
                             returnKeyType='search'
                             placeholder='type here'
                            
                             onSubmitEditing={()=>{
                                
                                 if((this.state.Text).length==0){
                                    let value = ' ';
                                    this.props.navigation.replace('penyusunan',{data:value})
                                 }
                                 else{
                                     let value= this.state.Text;
                                    this.props.navigation.replace('penyusunan',{data:value})
                                 }
                                
                                
                                }}
                             />
                            </View>
                            </View>
                        </View>
                </Modal>
            </View>
            </ScrollView>
            <TouchableHighlight
                 onPress={()=>{this.setModalVisible(true,0)}}
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
                    opacity:this.state.currenData
                    
                }}>
                         <Icon2 name="search" size={40} color="white" />
            </TouchableHighlight>
            </View>
        );
    }
}

export default Penyusunan;

const styles = StyleSheet.create({
    ModalBody:{
        flex:1,
        backgroundColor:'#000000aa',
        justifyContent:'center',
        alignItems:'center'
    },
    ModalBox:{
        backgroundColor:'white',
        margin:50,
        height:Dimensions.get('window').height/4,
        width:Dimensions.get('window').width/1.3,
        borderRadius:18,
        borderWidth:1

    },
    ModalTitle:{
        fontSize:25,
        alignItems:'center',
        fontWeight:'bold',
        color:'white'
    },
    IconContainer:{
        width:70,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'transparent',
        position:'absolute',
        bottom:10
  
    },
    TitleContainer:{
       
        padding:14,
        borderBottomColor:'#555',
        borderBottomWidth:1,
        alignItems:'center',
        backgroundColor:'#2c91e1',
        borderTopRightRadius:18,
        borderTopLeftRadius:17,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    ItemContainer:{
        marginTop:5,
        borderBottomColor:'#999',
        borderBottomWidth:1,
        padding:20,
        paddingVertical:22
    },
    TextItemContainer:{
        fontSize:19,
        left:52,
        position:'relative',
        top:8,
        fontWeight:'bold',
        width:'70%'
    },
    ItemBody:{
        marginHorizontal:20,
        flexDirection:'column',
        // justifyContent:'flex-start',
        flex:1,
        // marginBottom:60
    },
    DateContainer:{
        marginLeft:50,
        position:'relative',
        top:6
    },
    TextDate:{
        fontWeight:'700',
        fontSize:15
    },
    IconContainer:{
        width:70,
        height:70,
        alignItems:'center',
        justifyContent:'center'
    },
    BodyItems:{
        width:Dimensions.get('window').width/1.1,
        flexDirection:'row',
        alignItems:'center',
        height:Dimensions.get('window').width/6,
        elevation:2,
        shadowOpacity:0.30,
        backgroundColor:'white',
        paddingHorizontal:'5%',
        marginTop:10
    },
    TextTitle:{
        fontSize:16,
        color:rgb(73, 80, 87),
        fontWeight:'bold'
    }
});