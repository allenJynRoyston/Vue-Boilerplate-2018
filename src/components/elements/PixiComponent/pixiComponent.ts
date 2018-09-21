import {VJScriptLoader} from "../../../assets/js/vjs-scriptloader";
import {VJSPixiloader} from "../../../assets/js/vjs-loaders";

export default {
  props: ['file'],
  data():Object {
    return {
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
      if(!!this.$props.file){
        this.loadFile(`${this.$props.file}`)
      }
    },
    async loadFile(file:string):Promise<any> {
      let {store, scriptLoader, pixiInstance} = this;
      if(pixiInstance !== null){
        this.destroy()
      }

      if(!store.getters._pixiJSIsLoaded()) {
        await scriptLoader.loadFile(`/node_modules/pixi.js/dist/pixi.min.js`);
        store.commit("setPixiIsLoaded", true);
        store.commit("setPhaserIsLoaded", false);
      }
      await scriptLoader.loadFile(file);
      
      // load pixi instance
      let _p = new VJSPixiloader({ele: this.$el, component: this, file, width: 800, height: 600})
      await _p.createNew()      
    },

    reload(){
      this.loadGame(`src/_pixi/pixi.test.js`)
    },    

    destroy(){
      let {pixiInstance} = this
      pixiInstance.destroy()
    }
  },
  destroyed():void {
    this.destroy()
  }
};