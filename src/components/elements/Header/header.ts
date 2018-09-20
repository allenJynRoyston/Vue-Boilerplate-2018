import * as headerImg from "../../../assets/images/site/img.jpg";
import anime from 'animejs'

export default {
  data():Object {
    return {
      headerImg,
      store: this.$store
    };
  },
  watch: {
    "$route"(to:any, from:any):void {      
      anime({
        easing: 'easeOutSine',
        targets: document.querySelector("body"),
        translateY: (to.path !== '/') ? `-${ (document.querySelector(".custom-header") as any).offsetHeight}px` : "0px",
        duration: 250,
        delay: 500
      });      
    }
  },
  methods: {

  }
};