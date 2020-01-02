/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {inject, observer} from 'mobx-react';
import {useFocusEffect} from '@react-navigation/native';

const Tab1 = ({TabBarStore}) => {
  const {setCurrentScene} = TabBarStore;

  useFocusEffect(() => {
    setTimeout(() => setCurrentScene(), 0);
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>tab1</Text>
    </SafeAreaView>
  );
};
export default inject('TabBarStore')(observer(Tab1));
