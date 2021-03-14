import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Carousel, {Pagination} from 'react-native-snap-carousel';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import db from '../../db';
var s = require('../../../assets/styles/home');

const styles = StyleSheet.create({
  BodyCard: {
    // marginHorizontal:2,
    height: Dimensions.get('window').height / 4,
    elevation: 4,
    borderWidth: 0.5,
    shadowOpacity: 0.3,
    width: db.state.width / 2.5,
    marginVertical: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  BodyIcon: {
    marginTop: '5%',
  },
  BodyText: {
    marginVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  BodyItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#eee',
    elevation: 8,
    // width: db.state.width,
    shadowOpacity: 0.5,
    height: 90,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#999',
    marginBottom: 10,
    height: Dimensions.get('window').height / 10,
    // marginTop:"10%"
  },
  tulisan: {
    color: db.state.lightheader,
  },
  ketuk: {
    color: '#c0c0c0',
    marginTop: '5%',
  },
});

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../../../assets/images/2.jpg'),
        require('../../../assets/images/12.jpg'),
        require('../../../assets/images/b1.jpg'),
        require('../../../assets/images/b3.jpg'),
      ],
      activeSlide: 0,
      isNavBarHidden: false,
      background: db.state.darkmode ? db.state.lightbg : db.state.darkbg,
      box: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      border: !db.state.darkmode ? db.state.lightbox : db.state.darkbox,
    };
  }

  cardview(_title, _link, _icon, _color, _size, _fontsize) {
    var tulisan = 'Produk Hukum';
    if (_title == 'Perda') {
      tulisan = 'Peraturan Daerah';
    } else if (_title == 'Perbup') {
      tulisan = 'Peraturan Bupati';
    }
    return (
      <TouchableOpacity
        style={{
          height: Dimensions.get('window').height / 4.8,
          elevation: 4,
          borderWidth: 0.5,
          shadowOpacity: 0.3,
          width: db.state.width / 2.5,
          marginVertical: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: this.state.box,
          borderColor: this.state.border,
          borderRadius: 15,
        }}
        onPress={() => {
          // console.log(_title=="Penyusunan")
          if (_title == 'Penyusunan') {
            try {
              (async () => {
                await AsyncStorage.getItem('profile').then(value => {
                  if (value) {
                    let data = JSON.parse(value);
                    // if (data.id == '4' || data.username == 'jdihbrebes') {
                    this.props.navigation.replace('penyusunanall', {
                      data: ' ',
                    });
                    // } else {
                    //   this.props.navigation.replace('penyusunan', {data: ' '});
                    // }
                  } else {
                    Alert.alert(
                      'Gagal',
                      'Maaf Anda Harus Login Dahulu',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () =>
                            this.props.navigation.navigate('login'),
                        },
                      ],
                      {cancelable: false},
                    );
                  }
                });
              })();
            } catch {}
          } else {
            this.props.navigation.navigate(_link);
          }
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
          }}>
          <View style={styles.BodyIcon}>
            <Icon name={_icon} size={_size} color={_color} />
          </View>
          <View style={styles.BodyText}>
            <Text
              style={{
                fontSize: _fontsize,
                fontWeight: '700',
                color: this.state.border,
              }}>
              {' '}
              {_title}{' '}
            </Text>
            <Text style={styles.tulisan}>{tulisan}</Text>
          </View>
        </View>
        <Text style={styles.ketuk}>Ketuk untuk melihat</Text>
      </TouchableOpacity>
    );
  }

  _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: 'floralwhite',
          borderRadius: 20,
          height: db.state.height / 4,
          // marginRight: db.state.width / 10,
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          source={item}
          resizeMode="cover"
          borderRadius={20}
        />
      </View>
    );
  };
  get pagination() {
    const {images, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 10,
          marginHorizontal: 8,
          backgroundColor: db.state.lightheader,
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  componentDidMount() {}
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: db.state.lightbg,
        }}>
        <ScrollView style={{backgroundColor: this.state.background}}>
          {db.renderHeader()}
          <View style={{marginTop: db.state.height / 38}} />
          <View style={s.body}>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.state.images}
              renderItem={this._renderItem}
              sliderWidth={db.state.width / 1.2}
              itemWidth={db.state.width / 1.2}
              autoplay={true}
              loop={true}
              bounces={true}
              onSnapToItem={index => this.setState({activeSlide: index})}
            />
            {this.pagination}

            <View style={styles.CardContainer}>
              {this.cardview('Perda', 'perda', 'folder', 'red', 52, 18)}
              {this.cardview('Perbup', 'perbup', 'folder', '#2c91e1', 52, 18)}
            </View>
            <View style={styles.CardContainer}>
              {this.cardview('Statisik', 'pie', 'pie-chart', '#4eaf4e', 52, 18)}
              {this.cardview(
                'Penyusunan',
                'pie2',
                'briefcase',
                'orange',
                52,
                18,
              )}
            </View>
          </View>

          {db.renderSocial()}
        </ScrollView>

        {db.renderBottom('home', this.props.navigation)}
      </View>
    );
  }
}

export default home;
