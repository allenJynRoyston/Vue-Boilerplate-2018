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
            scriptLoader: new VJScriptLoader(),
            demos: [
                { title: "Sprite Class Manager", file: "boilerplate/spriteManagerDemo.min.js" },
                { title: "Controller Class Manager", file: "boilerplate/controllerManagerDemo.min.js" },
                { title: "Bitmapdata Layer Demo", file: "boilerplate/bitmapLayerDemo.min.js" },
                { title: "Bitmapdata Fill Demo", file: "boilerplate/bitmapFillDemo.min.js" },
            ]
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // this.loadGame("boilerplate/spriteManagerDemo.min.js")
        },
        loadGame(file) {
            return __awaiter(this, void 0, void 0, function* () {
                // remove old game first
                if (this.game !== null) {
                    this.game.destroy();
                }
                // load phaser (once)
                if (!this.store.getters._phaserIsLoaded()) {
                    yield this.scriptLoader.loadFile(`/node_modules/phaser-ce/build/phaser.min.js`);
                    this.store.commit("setPixiIsLoaded", false);
                    this.store.commit("setPhaserIsLoaded", true);
                }
                yield this.scriptLoader.loadFile(file);
                __phaser.init(this.$el, this, { width: 640, height: 640 });
            });
        },
        loadFile(file) {
            this.loadGame(file);
        }
    },
    destroyed() {
        this.game.destroy();
    }
};
//# sourceMappingURL=gameComponent.js.map