import {VJScriptLoader} from "../../../assets/js/vjs-scriptloader";
import {VJSThreeloader} from "../../../assets/js/vjs-loaders";

export default {
  props: ['file'],
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
      if(!!this.$props.file){
        this.loadFile(`${this.$props.file}`)
      }
    },
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
      console.log(this.$el)
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
      this.$el.remove(this.$el)
    }
  },
  destroyed():void {
    this.destroy()
  }
}