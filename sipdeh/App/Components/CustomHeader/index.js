import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Colors from '../../Colors';
import Icons from '../Icons';
import {useNavigation} from '@react-navigation/native';
const index = ({title, noBack}) => {
  const nav = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: RFPercentage(2),
        marginBottom: RFPercentage(3),
      }}>
      <TouchableOpacity
        onPress={() => {
          nav.goBack();
        }}>
        <Icons
          name="chevron-left"
          size={RFPercentage(2.8)}
          color={Colors.TextColor()}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: RFPercentage(2.2),
          color: Colors.TextColor(),
          marginLeft: RFPercentage(2),
          //   fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default index;
