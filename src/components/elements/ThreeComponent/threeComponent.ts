import {VJScriptLoader} from "../../../assets/js/vjs-scriptloader";
import {VJSThreeloader} from "../../../assets/js/vjs-loaders";

export default {
  props: [],
  data():Object {
    return {
      game: null,
      store: this.$store,
      scriptLoader: new VJScriptLoader(),
      threeInstance: null
    }
  },
  mounted():void {
    this.init()
  },
  methods: {
    init():void {
      this.loadGame('src/_threeJS/three.test.js')
    },
    async loadGame(file:string):Promise<any> {
      let {game, store, scriptLoader, threeInstance} = this;
      if(game !== null){
        game = null;
      }
      if(!store.getters._threeJSIsLoaded()){
        await scriptLoader.loadFile(`/node_modules/three/build/three.min.js`);
        store.commit("setThreeJsIsLoaded", true)
      }
      await scriptLoader.loadFile(file);
      
      // load instance
      threeInstance = new VJSThreeloader({ele: this.$el, component: this, file, width: 800, height: 600})
      await threeInstance.createNew()       
    }
  },
  destroyed():void {
    this.game = null;
  }
}