import {VJScriptLoader} from "../../../assets/js/vjs-scriptloader";
import {VJSPixiloader} from "../../../assets/js/vjs-loaders";

export default {
  props: [],
  data():Object {
    return {
      game: null,
      store: this.$store,
      scriptLoader: new VJScriptLoader(),
      pixiInstance: null
    };
  },
  mounted():void {
    this.init();
  },
  methods: {
    init():void {
      this.loadGame(`src/_pixi/pixi.test.js`)
    },
    async loadGame(file:string):Promise<any> {
      let {game, store, scriptLoader, pixiInstance} = this;
      if(game !== null){
        game = null;
      }
      if(!store.getters._pixiJSIsLoaded()) {
        await scriptLoader.loadFile(`/node_modules/pixi.js/dist/pixi.min.js`);
        store.commit("setPixiIsLoaded", true);
        store.commit("setPhaserIsLoaded", false);
      }
      await scriptLoader.loadFile(file);
      
      // load pixi instance
      pixiInstance = new VJSPixiloader({ele: this.$el, component: this, file, width: 800, height: 600})
      await pixiInstance.createNew()
    }
  },
  destroyed():void {

  }
};