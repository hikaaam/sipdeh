import {StyleSheet} from 'react-native';
import db from '../../App/db';

module.exports = StyleSheet.create(
    {
        Body:{
           
        },
        BodyItems:{
            flexDirection:'row',
            // paddingHorizontal:10,
            paddingVertical:20,
            borderBottomColor:'#999',
            borderBottomWidth:1.2,
            backgroundColor:db.state.darkmode?db.state.lightbox:db.state.darkbox
        },
        IconContainer:{
            width:db.state.width/9,
            height:db.state.width/9,
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            backgroundColor:db.state.iconRed,
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
            color:db.state.darkmode?"#111":"white"
        },
        Text:{
            fontSize:db.state.width/28,
            color:'#888'
        },
        Number:{
            color:db.state.darkmode?"black":"white",
            fontWeight:'bold'
        },
        NumberContainer:{
        //    backgroundColor:db.state.darkmode?db.state.lightheader:db.state.lightbox ,
           height:32,
           width:32,
           flexDirection:'column',
           justifyContent:'center',
           alignItems:'center',
           borderRadius:100,
           position:'absolute',
           right:15,
           top:20
        },
        bold:{
            fontWeight:"bold",
            fontSize:db.state.width/28,
            color:db.state.darkmode?"black":"white"
        },
        textSamar:{
            color:"#666"
        }
    }
)