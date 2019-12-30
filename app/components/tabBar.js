/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Platform} from 'react-native';
import {inject, observer} from 'mobx-react';

const TabBar = () => (
  <View
    style={{
      height: 200,
      width: 200,
      backgroundColor: 'red',
      borderRadius: 100,
      position: 'absolute',
      bottom: -100,
      left: '25%',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 0},
          shadowRadius: 10,
          shadowOpacity: 0.5,
        },
        android: {
          elevation: 12,
        },
      }),
    }}>
    <Text style={{position: 'absolute', top: '5%'}}>tabs</Text>
    <Text style={{position: 'absolute', left: '10%', top: '30%'}}>tabs2</Text>
    <Text style={{position: 'absolute', right: '10%', top: '30%'}}>tabs3</Text>
  </View>
);

export default inject('TabBarStore')(observer(TabBar));
