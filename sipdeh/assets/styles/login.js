import {StyleSheet} from 'react-native';
import db from '../../App/db';


module.exports = StyleSheet.create({
    Body:{
        flexDirection:'column',
        justifyContent:'flex-start',
        height:db.state.height/2,
        marginHorizontal:db.state.width/22,
        backgroundColor:db.state.lightbox,
        borderRadius:20,
        marginTop:db.state.height/20,
        paddingTop:db.state.height/8
    },
    LoginBox:{
        backgroundColor:'#999999aa',
        fontSize:18,
        color:'white',
        marginBottom:32,
        height:60,
        borderRadius:10,
        paddingHorizontal:20,
        marginHorizontal:20
    },
  Button:{
      height:60,
      backgroundColor:db.state.lightheader,
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:16,
      
  },
  Text:{
    fontSize:22,
    color:'white',
    fontWeight:'bold'
  }
});