export default {
  data():any {
    return {
      store: this.$store,
    };
  },
  methods: {
  },
  mounted():void {
    this.isReady = true;
  }
};