export default {
    data() {
        return {
            store: this.$store,
            parent: null
        };
    },
    methods: {},
    mounted() {
        this.isReady = true;
        this.parent = this;
    }
};
//# sourceMappingURL=phaser.js.map