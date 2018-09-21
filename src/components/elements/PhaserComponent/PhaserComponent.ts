import {VJScriptLoader} from "../../../assets/js/vjs-scriptloader";
import {VJSPhaserloader} from "../../../assets/js/vjs-loaders";

export default {
  props: [],
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
      this.loadGame(`src/_phaser/phaser.test.js`)
    },
    async loadGame(file:string):Promise<any> {
      let {store, scriptLoader} = this;
      
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
    }    
  },
  destroyed():void {
   let {phaserInstance} = this;
   phaserInstance.destroy()
  }
}