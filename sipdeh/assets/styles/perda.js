import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create(
    {
        Body:{
           
        },
        BodyItems:{
            flexDirection:'row',
            // paddingHorizontal:10,
            paddingVertical:20,
            borderBottomColor:'#999',
            borderBottomWidth:1.2
        },
        IconContainer:{
            width:45,
            height:45,
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            backgroundColor:'#fc9a00',
            borderRadius:100,
            marginHorizontal:15
        },
        Icon:{

        },
        TextContainer:{
         
        },
        TextTitle:{
            fontWeight:'bold',
            fontSize:20,
            color:'#111'
        },
        Text:{
            fontSize:17,
            color:'#888'
        },
        Number:{
            color:'white',
        },
        NumberContainer:{
           backgroundColor:'green' ,
           height:32,
           width:32,
           flexDirection:'column',
           justifyContent:'center',
           alignItems:'center',
           borderRadius:100,
           position:'absolute',
           right:15,
           top:20
        }
    }
)