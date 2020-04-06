import {StyleSheet, Dimensions} from 'react-native';

module.exports = StyleSheet.create(
    {
        Body:{
            flexDirection:'column',
            justifyContent:'space-evenly',
            backgroundColor:'#b7b4af',
            flex:1,
            width:Dimensions.get("window").width
        },
        Title:{
            height:Dimensions.get("window").height/14,
            flexDirection:'row',
            justifyContent:'center',
            borderBottomColor:'#999',
            borderBottomWidth:0.7,
            alignItems:"center"
        },
        TextTitle:{
            fontSize:22,
            // color:'#f44236',
            fontWeight:'bold',
            color:'red'
        },
        BodyItems:{
            flexDirection:'row',
            justifyContent:'flex-start',
            borderBottomColor:'#555',
            borderBottomWidth:1,
            paddingHorizontal:25,
            paddingVertical:20,
            marginTop:1
        },
        TextItemsTitle:{
            color:'black',
            fontSize: 18,
            fontFamily:'Roboto',
            marginLeft:10,
            fontWeight:'700'
        },
        TextItems:{
            color:'#666',
            fontSize:16,
            fontFamily:'Roboto',
            marginLeft:10
        },
        TextBody:{
            flexDirection:'column',
        },
        Icon:{
            // position:'absolute',
            // left:10,
            flexDirection:'row',
            justifyContent:'center',
            marginLeft:10,
            width:65
            
        }
    }
)