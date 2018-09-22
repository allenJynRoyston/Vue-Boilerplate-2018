import {VJScriptLoader} from "../../../assets/js/vjs-scriptloader";
import {VJSThreeloader} from "../../../assets/js/vjs-loaders";

export default {
  data():Object {
    return {
      store: this.$store,
      scriptLoader: new VJScriptLoader(),
      threeInstance: null
    }
  },
  mounted():void {
    this.$parent.component.push(this)
  },
  methods: {
    async loadFile(file:string):Promise<any> {
      let {store, scriptLoader, threeInstance} = this;
      if(threeInstance !== null){
        this.destroy()
      }

      if(!store.getters._threeJSIsLoaded()){
        await scriptLoader.loadFile(`/node_modules/three/build/three.min.js`);
        store.commit("setThreeJsIsLoaded", true)
      }
      await scriptLoader.loadFile(file);
      
      // load instance
      let t = new VJSThreeloader({ele: this.$el, component: this, file, width: 800, height: 600})
      await t.createNew()       
    },

    reload(){
      this.loadFile('src/_threeJS/three.test.js')
    },
    
    destroy(){
      let {threeInstance} = this;    
      threeInstance.renderer.isAlive = false
      threeInstance.camera = null
      threeInstance.scene = null
      threeInstance.projector = null;
      this.$el.getElementsByTagName('canvas')[0].remove()
    }
  },
  destroyed():void {
    this.destroy()
  }
}