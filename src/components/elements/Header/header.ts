import * as headerImg from "../../../assets/images/site/img.jpg";
import anime from 'animejs'

export default {
  data():Object {
    return {
      headerImg,
      store: this.$store,
    };
  },
  mounted(){
    this.animateHeader(this.$route.path !== '/', true)
  },
  watch: {
    "$route"(to:any, from:any):void {      
      this.animateHeader(to.path !== '/')
    }
  },
  methods: {
    animateHeader(state:Boolean, forced = false){
      anime({
        easing: 'easeOutSine',
        targets: document.querySelector("#app-layout"),
        translateY: state ? `-${ (document.querySelector(".custom-header") as any).offsetHeight}px` : "0px",
        duration: forced ? 0 : 250,
        delay: 500
      });
    }
  }
};