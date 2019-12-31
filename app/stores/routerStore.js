import {observable, computed, action} from 'mobx';

class RouterStore {
  routerRef;
  @observable routerState;
  @action setRouterRef = ref => {
    this.routerRef = ref;
  };

  setRouterState = state => {
    this.routerState = state;
  };

  navigate = routeName => {
    this.routerRef.navigate(routeName);
  };

  @computed get currentRoute() {
    if (this.routerState) {
      return this.routerState.routeNames[this.routerState.index];
    } else {
      return null;
    }
  }
}

export default new RouterStore();
