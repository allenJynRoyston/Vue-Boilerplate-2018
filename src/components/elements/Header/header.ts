import * as headerImg from "../../../assets/images/site/img.jpg";

export default {
  data():Object {
    return {
      headerImg,
      currentroute: this.$route.path,
      store: this.$store
    };
  },
  watch: {
    "$route"(to:any, from:any):void {
      this.currentroute = to.path;
    }
  },
  methods: {

  }
};