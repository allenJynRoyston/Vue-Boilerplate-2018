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
    data() {
        return {
            store: this.$store,
            scriptLoader: new VJScriptLoader(),
            phaserInstance: null
        };
    },
    mounted() {
        this.$parent.component.push(this);
    },
    methods: {
        loadFile(file) {
            return __awaiter(this, void 0, void 0, function* () {
                let { store, scriptLoader, phaserInstance } = this;
                if (phaserInstance !== null) {
                    this.destroy();
                }
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
        },
        reload() {
            this.loadGame(`src/_phaser/phaser.test.js`);
        },
        destroy() {
            let { phaserInstance } = this;
            phaserInstance.destroy();
        }
    },
    destroyed() {
        this.destroy();
    }
};
//# sourceMappingURL=PhaserComponent.js.map