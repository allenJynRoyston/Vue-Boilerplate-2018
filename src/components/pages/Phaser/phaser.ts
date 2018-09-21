export default {
  data():any {
    return {
      store: this.$store,
      parent: null
    };
  },
  methods: {

  },
  mounted():void {
    this.isReady = true;
    this.parent = this
  }
};