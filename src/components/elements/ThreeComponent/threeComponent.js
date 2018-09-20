var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VJScriptLoader } from "../../../assets/js/vjs-scriptloader";
export default {
    props: [],
    data() {
        return {
            game: null,
            store: this.$store,
            scriptLoader: new VJScriptLoader()
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.loadGame('src/_threeJS/ts_demo.js');
        },
        loadGame(file) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.game !== null) {
                    this.game = null;
                }
                if (!this.store.getters._threeJSIsLoaded()) {
                    yield this.scriptLoader.loadFile(`/node_modules/three/build/three.min.js`);
                    this.store.commit("setThreeJsIsLoaded", true);
                }
                yield this.scriptLoader.loadFile(file);
                __three.init(this.$el, this, { width: 800, height: 600 });
            });
        }
    },
    destroyed() {
        this.game = null;
    }
};
//# sourceMappingURL=threeComponent.js.map