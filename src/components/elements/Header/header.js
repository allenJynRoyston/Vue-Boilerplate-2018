import * as headerImg from '../../../assets/images/site/img.jpg';
export default {
    data() {
        return {
            headerImg,
            currentroute: this.$route.path,
            store: this.$store
        };
    },
    created() {
    },
    watch: {
        '$route'(to, from) {
            this.currentroute = to.path;
        }
    },
    methods: {}
};
//# sourceMappingURL=header.js.map