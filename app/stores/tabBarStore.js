import {observable, action} from 'mobx';
import RouterStore from './routerStore';
class TabBarStore {
  @observable currentTab;
  constructor() {
    setTimeout(() => {
      RouterStore.navigate('tab2');
    }, 3000);
  }
  @action setCurrentScene = () => {
    // console.log(Actions.currentScene);
    // this.currentTab = Actions.currentScene;
  };
}

export default new TabBarStore();
