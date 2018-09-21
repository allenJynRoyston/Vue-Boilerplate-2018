import {VJScriptLoader} from "../../../assets/js/vjs-scriptloader";
import {VJSPhaserloader} from "../../../assets/js/vjs-loaders";

export default {
  props: ['file'],
  data():Object {
    return {      
      store: this.$store,
      scriptLoader: new VJScriptLoader(),
      phaserInstance: null
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
      let {store, scriptLoader, phaserInstance} = this;
      if(phaserInstance !== null){
        this.destroy()
      }

      // load phaser (once)
      if(!store.getters._phaserIsLoaded()){
        await scriptLoader.loadFile(`/node_modules/phaser-ce/build/phaser.min.js`);
        store.commit("setPixiIsLoaded", false);
        store.commit("setPhaserIsLoaded", true);
      }
      await scriptLoader.loadFile(file);

      // load pixi instance     
      let ph = new VJSPhaserloader({ele: this.$el, component: this, file, width: 800, height: 600})
      await ph.createNew()
    },
    
    reload(){
      this.loadGame(`src/_phaser/phaser.test.js`)
    },

    destroy(){
      let {phaserInstance} = this;
      phaserInstance.destroy()
    }
  },
  destroyed():void {
   this.destroy()
  }
}