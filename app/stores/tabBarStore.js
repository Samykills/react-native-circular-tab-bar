import {observable, action} from 'mobx';
import RouterStore from './routerStore';
import SoundPlayer from 'react-native-sound-player';
class TabBarStore {
  @observable currentScene = 'tab1';

  @action setCurrentScene = () => {
    let routeName = RouterStore.currentRoute;
    if (routeName) {
      SoundPlayer.playSoundFile('tick', 'mp3');
      this.currentScene = routeName;
    }
  };
}

export default new TabBarStore();
