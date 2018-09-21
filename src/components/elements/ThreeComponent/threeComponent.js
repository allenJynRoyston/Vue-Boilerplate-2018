var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VJScriptLoader } from "../../../assets/js/vjs-scriptloader";
import { VJSThreeloader } from "../../../assets/js/vjs-loaders";
export default {
    props: ['file'],
    data() {
        return {
            store: this.$store,
            scriptLoader: new VJScriptLoader(),
            threeInstance: null
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (!!this.$props.file) {
                this.loadFile(`${this.$props.file}`);
            }
        },
        loadFile(file) {
            return __awaiter(this, void 0, void 0, function* () {
                let { store, scriptLoader, threeInstance } = this;
                if (threeInstance !== null) {
                    this.destroy();
                }
                if (!store.getters._threeJSIsLoaded()) {
                    yield scriptLoader.loadFile(`/node_modules/three/build/three.min.js`);
                    store.commit("setThreeJsIsLoaded", true);
                }
                yield scriptLoader.loadFile(file);
                // load instance
                console.log(this.$el);
                let t = new VJSThreeloader({ ele: this.$el, component: this, file, width: 800, height: 600 });
                yield t.createNew();
            });
        },
        reload() {
            this.loadFile('src/_threeJS/three.test.js');
        },
        destroy() {
            let { threeInstance } = this;
            threeInstance.renderer.isAlive = false;
            threeInstance.camera = null;
            threeInstance.scene = null;
            threeInstance.projector = null;
            this.$el.remove(this.$el);
        }
    },
    destroyed() {
        this.destroy();
    }
};
//# sourceMappingURL=threeComponent.js.map