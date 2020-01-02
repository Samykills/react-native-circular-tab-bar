/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, Platform, Animated, TouchableWithoutFeedback} from 'react-native';
import {inject, observer} from 'mobx-react';

const ANIMATION_DURATION = 250;
const animatedTabBar = new Animated.Value(0);
const animatedTabBarOpacity = new Animated.Value(0);
const animatedYPostion = new Animated.Value(0);
const animatedPostion = new Animated.Value(0);
const topAnimatedInterpolation = animatedYPostion.interpolate({
  inputRange: [0, 1],
  outputRange: [0, -15],
  extrapolate: 'clamp',
});
const leftAnimatedInterpolation = animatedPostion.interpolate({
  inputRange: [0, 1],
  outputRange: [0, -10],
  extrapolate: 'clamp',
});
const rightAnimatedInterpolation = animatedPostion.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 10],
  extrapolate: 'clamp',
});
const tabbarColor = animatedTabBar.interpolate({
  inputRange: [0, 1],
  outputRange: ['red', 'transparent'],
  extrapolate: 'clamp',
});
const tabBarBorderColor = animatedTabBar.interpolate({
  inputRange: [0, 1],
  outputRange: ['transparent', 'white'],
  extrapolate: 'clamp',
});
let translateXVal;
let tabBarHideTimer;

const TabBar = ({TabBarStore, RouterStore}) => {
  const {currentScene} = TabBarStore;
  const {navigate} = RouterStore;
  const showTabBar = () =>
    Animated.parallel([
      Animated.timing(animatedTabBar, {
        toValue: 0,
        duration: 350,
      }),
      Animated.timing(animatedTabBarOpacity, {
        toValue: 1,
        duration: 350,
      }),
    ]).start();

  const hideTabBar = () => {
    tabBarHideTimer = setTimeout(() => {
      Animated.sequence([
        Animated.timing(animatedTabBar, {
          toValue: 1,
          duration: 350,
        }),
        Animated.timing(animatedTabBarOpacity, {
          toValue: 0.2,
          duration: 350,
        }),
      ]).start();
    }, 1500);
  };

  useEffect(() => {
    hideTabBar();
    return function cleanUp() {
      clearTimeout(tabBarHideTimer);
    };
  });

  switch (currentScene) {
    case 'home':
      Animated.parallel([
        Animated.timing(animatedPostion, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animatedYPostion, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animatedTabBar, {
          toValue: 0,
          duration: 350,
        }),
        Animated.timing(animatedTabBarOpacity, {
          toValue: 1,
          duration: 350,
        }),
      ]).start();
      break;
    default:
      Animated.parallel([
        Animated.timing(animatedPostion, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animatedYPostion, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animatedTabBar, {
          toValue: 0,
          duration: 350,
        }),
        Animated.timing(animatedTabBarOpacity, {
          toValue: 1,
          duration: 350,
        }),
      ]).start();
      break;
  }

  const navigateTo = routeName => {
    //play sound here
    navigate(routeName);
  };

  translateXVal;
  if (currentScene === 'tab1') {
    translateXVal = leftAnimatedInterpolation;
  } else if (currentScene === 'tab2') {
    translateXVal = rightAnimatedInterpolation;
  }

  const onClickTabBar = () => {
    showTabBar();
    clearTimeout(tabBarHideTimer);
    hideTabBar();
  };

  return (
    <TouchableWithoutFeedback onPress={onClickTabBar}>
      <Animated.View
        style={{
          opacity: animatedTabBarOpacity,
          height: 125,
          width: 125,
          backgroundColor: tabbarColor,
          borderRadius: 62.5,
          position: 'absolute',
          bottom: -52.5,
          left: '35%',
          alignItems: 'center',
          borderColor: tabBarBorderColor,
          borderWidth: 1,
          ...Platform.select({
            ios: {
              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 10,
              shadowOpacity: 0.5,
            },
            android: {
              elevation: 8,
            },
          }),
        }}>
        <Text
          onPress={() => navigateTo('home')}
          style={{
            position: 'absolute',
            top: '5%',
            color: 'white',
            fontSize: currentScene.includes('home') ? 15 : 10,
            fontWeight: currentScene.includes('home') ? 'bold' : '500',
          }}>
          Home
        </Text>
        <Text
          onPress={() => navigateTo('tab1')}
          style={{
            position: 'absolute',
            left: '10%',
            top: '30%',
            color: 'white',
            fontSize: currentScene.includes('tab1') ? 15 : 10,
            fontWeight: currentScene.includes('tab1') ? 'bold' : '500',
          }}>
          tab1
        </Text>
        <Text
          onPress={() => navigateTo('tab2')}
          style={{
            position: 'absolute',
            right: '10%',
            top: '30%',
            color: 'white',
            fontSize: currentScene.includes('tab2') ? 15 : 10,
            fontWeight: currentScene.includes('tab2') ? 'bold' : '500',
          }}>
          tab2
        </Text>
        <Animated.View
          style={{
            backgroundColor: 'white',
            height: 5,
            width: 5,
            borderRadius: 2.5,
            position: 'absolute',
            top: '35%',
            transform: [
              {
                translateX: translateXVal,
              },
              {
                translateY: topAnimatedInterpolation,
              },
            ],
          }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default inject('TabBarStore', 'RouterStore')(observer(TabBar));
