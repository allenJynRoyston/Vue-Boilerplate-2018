var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VJScriptLoader } from "../../../assets/js/vjs-scriptloader";
import { VJSPixiloader } from "../../../assets/js/vjs-loaders";
export default {
    props: [],
    data() {
        return {
            store: this.$store,
            scriptLoader: new VJScriptLoader(),
            pixiInstance: null
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.loadGame(`src/_pixi/pixi.test.js`);
        },
        loadGame(file) {
            return __awaiter(this, void 0, void 0, function* () {
                let { store, scriptLoader } = this;
                if (!store.getters._pixiJSIsLoaded()) {
                    yield scriptLoader.loadFile(`/node_modules/pixi.js/dist/pixi.min.js`);
                    store.commit("setPixiIsLoaded", true);
                    store.commit("setPhaserIsLoaded", false);
                }
                yield scriptLoader.loadFile(file);
                // load pixi instance
                let _p = new VJSPixiloader({ ele: this.$el, component: this, file, width: 800, height: 600 });
                yield _p.createNew();
            });
        }
    },
    destroyed() {
        let { pixiInstance } = this;
        pixiInstance.destroy();
    }
};
//# sourceMappingURL=pixiComponent.js.map