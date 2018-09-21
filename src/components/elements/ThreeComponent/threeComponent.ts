import {VJScriptLoader} from "../../../assets/js/vjs-scriptloader";
import {VJSThreeloader} from "../../../assets/js/vjs-loaders";

export default {
  props: [],
  data():Object {
    return {
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
      let {store, scriptLoader, threeInstance} = this;
      if(threeInstance !== null){
        this.destroyed()
      }

      if(!store.getters._threeJSIsLoaded()){
        await scriptLoader.loadFile(`/node_modules/three/build/three.min.js`);
        store.commit("setThreeJsIsLoaded", true)
      }
      await scriptLoader.loadFile(file);
      
      // load instance
      let t = new VJSThreeloader({ele: this.$el, component: this, file, width: 800, height: 600})
      await t.createNew()       
    }
  },
  destroyed():void {
    let {threeInstance} = this;    
    threeInstance.renderer.isAlive = false
    threeInstance.camera = null
    threeInstance.scene = null
    threeInstance.projector = null;
  }
}