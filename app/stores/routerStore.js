class RouterStore {
  routerRef;
  setRouterRef = ref => {
    this.routerRef = ref;
  };
  navigate = routeName => {
    this.routerRef.navigate(routeName);
  };
}

export default new RouterStore();
