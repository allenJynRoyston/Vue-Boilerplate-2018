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
            this.loadGame(`src/_pixi/pixi_demo.js`);
        },
        loadGame(file) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.game !== null) {
                    this.game = null;
                }
                if (!this.store.getters._pixiJSIsLoaded()) {
                    yield this.scriptLoader.loadFile(`/node_modules/pixi.js/dist/pixi.min.js`);
                    this.store.commit("setPixiIsLoaded", true);
                    this.store.commit("setPhaserIsLoaded", false);
                }
                yield this.scriptLoader.loadFile(file);
                __pixi.init(this.$el, this, { width: 800, height: 600 });
            });
        }
    },
    destroyed() {
        function PixiObject() { }
        ;
        this.game = null;
    }
};
//# sourceMappingURL=pixiComponent.js.map