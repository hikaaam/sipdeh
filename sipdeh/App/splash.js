import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';



class splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    setTimeout(() => {
        this.props.navigation.replace('home');
  }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={require('../assets/images/logo.png')}
      />
      </View>
    );
  }
}

export default splash;

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  stretch: {
    width: Dimensions.get('screen').width/1.1,
    height: Dimensions.get('screen').height/1.1,
    resizeMode: 'stretch',
    borderRadius:20
  },
});