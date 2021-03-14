import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const index = ({name, size, color}) => {
  return <Icon name={name} size={size} color={color} />;
};

export default index;
