import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Colors from '../../Colors';
const index = ({tulisan, onPress, isDisable, otherStyle, otherProps}) => {
  return (
    <TouchableOpacity
      {...otherProps}
      disabled={isDisable}
      style={{
        ...otherStyle,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: RFPercentage(2),
        paddingHorizontal: RFPercentage(2),
        backgroundColor: Colors.Biru(),
        borderRadius: 15,
      }}
      onPress={() => {
        onPress();
      }}>
      <Text
        style={{
          fontSize: RFPercentage(2.2),
          color: 'white',
          textTransform: 'capitalize',
          fontWeight: 'bold',
        }}>
        {tulisan}
      </Text>
    </TouchableOpacity>
  );
};

export default index;
