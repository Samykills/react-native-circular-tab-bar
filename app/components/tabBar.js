/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Platform, Animated} from 'react-native';
import {inject, observer} from 'mobx-react';

const TabBar = ({TabBarStore, RouterStore}) => {
  const {currentScene} = TabBarStore;
  const {navigate} = RouterStore;
  let pointerPosition;
  switch (currentScene) {
    case 'tab2':
      pointerPosition = {
        top: '35%',
        right: '35%',
        left: undefined,
      };
      break;
    case 'tab1':
      pointerPosition = {
        top: '34%',
        left: '35%',
        right: undefined,
      };
      break;
    default:
      pointerPosition = {
        top: '17%',
        left: undefined,
        right: undefined,
      };
      break;
  }

  return (
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
      <Text
        onPress={() => navigate('Home')}
        style={{
          position: 'absolute',
          top: '5%',
          color: 'white',
          fontSize: currentScene.includes('Home') ? 18 : 12,
        }}>
        Home
      </Text>
      <Text
        onPress={() => navigate('tab1')}
        style={{
          position: 'absolute',
          left: '10%',
          top: '30%',
          color: 'white',
          fontSize: currentScene.includes('tab1') ? 18 : 12,
        }}>
        tabs1
      </Text>
      <Text
        onPress={() => navigate('tab2')}
        style={{
          position: 'absolute',
          right: '10%',
          top: '30%',
          color: 'white',
          fontSize: currentScene.includes('tab2') ? 18 : 12,
        }}>
        tabs2
      </Text>
      <Animated.View
        style={{
          backgroundColor: 'white',
          height: 5,
          width: 5,
          borderRadius: 2.5,
          position: 'absolute',
          ...pointerPosition,
        }}
      />
    </View>
  );
};

export default inject('TabBarStore', 'RouterStore')(observer(TabBar));
