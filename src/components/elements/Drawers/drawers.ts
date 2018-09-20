import anime from 'animejs';

export default {
  data():any {
    return {
      store: this.$store,
      drawerIsOpen: null,
      routes: []
    };
  },
  mounted():void {
    // get routes from store
    this.routes = this.store.getters._getRoutes();

    // get, set and watch drawer state
    this.drawerIsOpen = this.store.getters._drawerIsOpen();
    this.store.watch(this.store.getters._drawerIsOpen, val => {
      this.setDrawerState(val);
    });
    this.setDrawerState(this.drawerIsOpen);
  },
  methods: {
    closeDrawer():void {
      this.store.commit("setDrawerState", false);
    },
    setDrawerState(val:boolean):void {
      anime.timeline()
        .add({
          targets: document.querySelector("#drawers"),
          translateX: val ? 0 : "-100%",
          duration: 0,
        })
        .add({
          targets: document.querySelector("#drawers .slide-1"), 
          translateX: val ? 0 : "-100%", 
          easing: "easeOutExpo",
          duration: 500,
          delay: 100
        });
    }
  }
};