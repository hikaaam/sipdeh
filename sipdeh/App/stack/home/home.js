import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, AsyncStorage, Alert, StyleSheet } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';

var s = require('../../../assets/styles/home');

const styles = StyleSheet.create({
  BodyCard:{
    // marginHorizontal:2,
    marginVertical:10,
    width:Dimensions.get("window").width/2.2,
    alignItems:'center',
    backgroundColor:'#eee',
    justifyContent:'center',
    flexDirection:'column',
    shadowOpacity:0.30,
    elevation:8,
    borderWidth:0.5,
    borderColor:"#999",
    height:Dimensions.get('window').height/6
  },
  BodyIcon:{
    marginTop:2
  },
  BodyText:{
    marginVertical:9
  },
  CardContainer:{
    flexDirection:'row',
    width:Dimensions.get('window').width,
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  BodyItems:{
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#eee',
    elevation:8,
    width:(Dimensions.get('window').width/2.2 + Dimensions.get('window').width/2.2 ) + ( Dimensions.get('window').width - (Dimensions.get('window').width/2.2 + Dimensions.get('window').width/2.2 ))/3,
    shadowOpacity:0.50,
    height:90,
    alignItems:'center',
    borderWidth:0.5,
    borderColor:'#999',
    marginBottom:10,
    height:Dimensions.get('window').height/10
  }
});

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [ 
        require('../../../assets/images/2.jpg'),
        require('../../../assets/images/12.jpg'),
        require('../../../assets/images/b1.jpg'),
        require('../../../assets/images/b3.jpg')
      ]
    };
  }


cardview(_title,_link,_icon,_color,_size,_fontsize){
  return(
  <TouchableOpacity style={styles.BodyCard} 
  onPress={() => { this.props.navigation.navigate(_link) }}
  >
    <View style={styles.BodyIcon}>
    <Icon name={_icon} size={_size} color={_color} />
    </View>
    <View style={styles.BodyText}>
        <Text style={{fontSize:_fontsize,fontWeight:'700'}}> {_title} </Text>
    </View>
  </TouchableOpacity>
  );
}


  render() {
    return (
      <ScrollView style={s.body} >
        {/* <TouchableOpacity>
          <Icon2 name='user' size={35} />
        </TouchableOpacity> */}
        <SliderBox images={this.state.images} autoplay circleLoop
          sliderBoxHeight={Dimensions.get('window').height/3.5}
          parentWidth={Dimensions.get('screen').width}
          resizeMode={'cover'}

        />
        <View style={s.Title}>
          <Text style={s.TextTitle}>BAGIAN HUKUM SETDA BREBES</Text>
        </View>
       
        {/* <TouchableOpacity style={s.BodyItems} onPress={() => { this.props.navigation.navigate('perda') }}>
          <View style={s.Icon}>
            <Icon name='layer-group' size={42} color='red' />
          </View>
          <View style={s.TextBody}>
            <Text style={s.TextItemsTitle}>Peraturan Daerah</Text>
            <Text style={s.TextItems}>Bagian Hukum Setda Brebes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={s.BodyItems} onPress={() => { this.props.navigation.navigate('perbup') }}>
          <View style={s.Icon}>
            <Icon name='th-list' size={42} color='#2c91e1' />
          </View>
          <View style={s.TextBody}>
            <Text style={s.TextItemsTitle}>Peraturan Bupati</Text>
            <Text style={s.TextItems}>Bagian Hukum Setda Brebes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={s.BodyItems} onPress={() => { this.props.navigation.navigate('pie') }}>
          <View style={s.Icon}>
            <Icon name='chart-pie' size={42} color='#4eaf4e' />
          </View>
          <View style={s.TextBody}>
            <Text style={s.TextItemsTitle}>Analysis Perda</Text>
            <Text style={s.TextItems}>Bagian Hukum Setda Brebes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={s.BodyItems} onPress={() => { this.props.navigation.navigate('pie2') }}>
          <View style={s.Icon}>
            <Icon name='clipboard-list' size={42} color='orange' />
          </View>
          <View style={s.TextBody}>
            <Text style={s.TextItemsTitle}>Analysis Perbup</Text>
            <Text style={s.TextItems}>Bagian Hukum Setda Brebes</Text>
          </View>
        </TouchableOpacity> */}
        <View style={styles.CardContainer} marginTop={10}>
          {this.cardview('Peraturan Daerah','perda','layer-group','red',75,18)}
          {this.cardview('Peraturan Bupati','perbup','th-list','#2c91e1',75,18)}
        </View>
        <View style={styles.CardContainer}>
          {this.cardview('Analysis Perda','pie','chart-pie','#4eaf4e',75,18)}
          {this.cardview('Analysis Perbup','pie2','clipboard-list','orange',75,18)}
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity style={styles.BodyItems} onPress={() => {

          try {
            (async () => {

              await AsyncStorage.getItem('profile').then((value) => {
                if (value) {
                 
                  this.props.navigation.navigate('penyusunan',{data:' '});
                }
                else {
                  Alert.alert('Gagal','Maaf Anda Harus Login Dahulu',[
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => this.props.navigation.navigate('login')},
                  ],
                  {cancelable: false})
                 
                }

              });
            })();
          }
          catch{

          }

        }}>
          <View style={s.Icon}>
            <Icon name='briefcase' color='#775645' size={52} />
          </View>
          <View style={s.TextBody}>
            <Text style={s.TextItemsTitle}>Penyusunan</Text>
            <Text style={s.TextItems}>Bagian Hukum Setda Brebes</Text>
          </View>
        </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default home;

