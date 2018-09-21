var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VJScriptLoader } from "../../../assets/js/vjs-scriptloader";
import { VJSPhaserloader } from "../../../assets/js/vjs-loaders";
export default {
    props: [],
    data() {
        return {
            store: this.$store,
            scriptLoader: new VJScriptLoader(),
            phaserInstance: null
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.loadGame(`src/_phaser/phaser.test.js`);
        },
        loadGame(file) {
            return __awaiter(this, void 0, void 0, function* () {
                let { store, scriptLoader } = this;
                // load phaser (once)
                if (!store.getters._phaserIsLoaded()) {
                    yield scriptLoader.loadFile(`/node_modules/phaser-ce/build/phaser.min.js`);
                    store.commit("setPixiIsLoaded", false);
                    store.commit("setPhaserIsLoaded", true);
                }
                yield scriptLoader.loadFile(file);
                // load pixi instance
                let ph = new VJSPhaserloader({ ele: this.$el, component: this, file, width: 800, height: 600 });
                yield ph.createNew();
            });
        }
    },
    destroyed() {
        let { phaserInstance } = this;
        phaserInstance.destroy();
    }
};
//# sourceMappingURL=PhaserComponent.js.map