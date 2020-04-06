import {StyleSheet} from 'react-native';


module.exports = StyleSheet.create({
    Body:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-end',
        marginHorizontal:60,
        marginBottom:'20%'
    },
    LoginBox:{
        backgroundColor:'#999',
        fontSize:18,
        color:'white',
        marginBottom:32,
        height:60,
        borderRadius:10,
        paddingHorizontal:20
    },
  Button:{
      height:60,
      backgroundColor:'#2c91e1',
      width:'100%',
      justifyContent:'center',
      alignItems:'center'
  },
  Text:{
    fontSize:22,
    color:'white',
    fontWeight:'bold'
  }
});