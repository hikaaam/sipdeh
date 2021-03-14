import React, {Component} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Colors from '../../Colors';
const index = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <ActivityIndicator size="large" color={Colors.LoadingColor()} animating />
    </View>
  );
};

export default index;
