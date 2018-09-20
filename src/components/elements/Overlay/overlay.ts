export default {
  data():Object {
    return {
      store: this.$store,
      progress: 0,
      isActive: null,
    };
  },
  mounted():void {
    // watch for isActive
    this.store.watch(this.store.getters._isActive, val => {
      this.isActive = val;
    });

    this.store.watch(this.store.getters._progressBar, val => {
      this.progress = val;
    });
  },
  methods: {

  }
}