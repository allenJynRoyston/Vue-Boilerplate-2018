import * as headerImg from "../../../assets/images/site/img.jpg";
import anime from 'animejs';
export default {
    data() {
        return {
            headerImg,
            store: this.$store
        };
    },
    watch: {
        "$route"(to, from) {
            anime({
                easing: 'easeOutSine',
                targets: document.querySelector("body"),
                translateY: (to.path !== '/') ? `-${document.querySelector(".custom-header").offsetHeight}px` : "0px",
                duration: 250,
                delay: 500
            });
        }
    },
    methods: {}
};
//# sourceMappingURL=header.js.map