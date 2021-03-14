import React, {Component, useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Colors from '../../Colors';
const index = ({
  onChangeText,
  disable,
  placeholder,
  value,
  otherProps,
  otherStyle,
  secureText,
}) => {
  const [borderColor, setBorderColor] = useState({
    border: '#808080aa',
    width: 0.8,
  });
  return (
    <TextInput
      style={{
        ...otherStyle,
        fontSize: RFPercentage(2.2),
        color: Colors.TextColor(),
        paddingHorizontal: RFPercentage(2),
        paddingVertical: RFPercentage(1.5),
        borderColor: borderColor.border,
        borderWidth: borderColor.width,
        borderRadius: RFPercentage(1),
      }}
      placeholder={placeholder}
      onFocus={() => {
        setBorderColor({border: Colors.Biru(), width: 2});
      }}
      onBlur={() => {
        setBorderColor({border: '#808080aa', width: 0.8});
      }}
      onChangeText={text => {
        onChangeText(text);
      }}
      placeholderTextColor={Colors.PlaceHolderColor()}
      editable={disable}
      secureTextEntry={secureText}
      {...otherProps}
    />
  );
};

export default index;
