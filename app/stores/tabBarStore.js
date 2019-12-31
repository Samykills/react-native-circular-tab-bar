import {observable, action} from 'mobx';
import RouterStore from './routerStore';
class TabBarStore {
  @observable currentScene = 'tab1';

  @action setCurrentScene = () => {
    // console.log(Actions.currentScene);
    let routeName = RouterStore.currentRoute;
    routeName ? (this.currentScene = routeName) : null;
  };
}

export default new TabBarStore();
