import React from 'react';
import Home from '../components/home';
import Tab1 from '../components/tab1';
import Tab2 from '../components/tab2';
import TabBar from '../components/tabBar';
import {Provider} from 'mobx-react';
import Store from '../stores/index';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const AppRouter = () => (
  <Provider {...Store}>
    <NavigationNativeContainer
      onStateChange={state => Store.RouterStore.setRouterState(state)}
      ref={navigatorRef => Store.RouterStore.setRouterRef(navigatorRef)}>
      <Tab.Navigator
        tabBar={() => <TabBar />}
        // initialRouteName={Store.TabBarStore.currentScene}
        tabBarPosition={'bottom'}>
        <Tab.Screen name="tab1" component={Tab1} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="tab2" component={Tab2} />
      </Tab.Navigator>
    </NavigationNativeContainer>
  </Provider>
);
export default AppRouter;
