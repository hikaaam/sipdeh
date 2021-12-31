import React, {Component} from 'react';
import {View, Text, ScrollView, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import db from '../db';

var s = require('../../assets/styles/perda.js');

class notifikasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      background: db.state.darkmode ? db.state.lightbg : db.state.darkbg,
      box: db.state.darkmode ? db.state.lightbox : db.state.darkbox,
      border: !db.state.darkmode ? db.state.lightbox : db.state.darkbox,
    };
  }

  boxY = new Animated.Value(-1000);
  boxRadius = new Animated.Value(150);

  showAnimation = () => {
    Animated.parallel([
      Animated.spring(this.boxY, {
        useNativeDriver: true,
        toValue: 0,
        friction: 5,
        tension: 15,
      }),
      Animated.spring(this.boxRadius, {
        useNativeDriver: true,
        toValue: 30,
        friction: 2,
        tension: 50,
      }),
    ]).start();
  };

  componentDidMount() {
    this.showAnimation();
  }

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
          <Animated.View
            style={{
              marginHorizontal: db.state.width / 22,
              elevation: 4,
              shadowRadius: 10,
              shadowOpacity: 1,
              borderLeftWidth: 0.1,
              borderRightWidth: 0.1,
              marginTop: db.state.height / 20,
              borderRadius: this.boxRadius,
              backgroundColor: this.state.box,
              transform: [
                {
                  translateY: this.boxY ?? -800,
                },
              ],
            }}>
            <Animated.View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: db.state.height / 3,
                backgroundColor: this.state.box,
                borderRadius: this.boxRadius,
                elevation: 4,
                shadowRadius: 10,
                shadowOpacity: 1,
                borderColor: this.state.border,
                borderWidth: 0.4,
              }}>
              <Icon name="sync" color={db.state.lightred} size={70} />
              <Text
                style={{
                  // fontFamily:'roboto',
                  fontWeight: 'bold',
                  fontSize: db.state.width / 16,
                  color: this.state.border,
                  marginBottom: db.state.width / 48,
                  marginTop: '5%',
                }}>
                Pengembangan
              </Text>
              <Text
                style={{
                  color: '#777777aa',
                  marginBottom: db.state.width / 48,
                }}>
                Sayang sekali fitur ini masih
              </Text>
              <Text
                style={{
                  color: '#777777aa',
                  marginBottom: db.state.width / 48,
                }}>
                dikembangkan
              </Text>
            </Animated.View>
          </Animated.View>
          <View style={{marginVertical: db.state.height / 38}} />
          {db.renderSocial()}
        </ScrollView>
        {db.renderBottom('', this.props.navigation)}
      </View>
    );
  }
}

export default notifikasi;
