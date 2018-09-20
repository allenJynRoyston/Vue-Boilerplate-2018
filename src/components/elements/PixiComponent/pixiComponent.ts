import {VJScriptLoader} from "../../../assets/js/vjs-scriptloader";
declare var __pixi: any;

export default {
  props: [],
  data():Object {
    return {
      game: null,
      store: this.$store,
      scriptLoader: new VJScriptLoader()
    };
  },
  mounted():void {
    this.init();
  },
  methods: {
    init():void {
      this.loadGame(`src/_pixi/pixi_demo.js`)
    },
    async loadGame(file:string):Promise<any> {
      if(this.game !== null){
        this.game = null;
      }
      if(!this.store.getters._pixiJSIsLoaded()) {
        await this.scriptLoader.loadFile(`/node_modules/pixi.js/dist/pixi.min.js`);
        this.store.commit("setPixiIsLoaded", true);
        this.store.commit("setPhaserIsLoaded", false);
      }
      await this.scriptLoader.loadFile(file);
      __pixi.init(this.$el, this, {width: 800, height: 600});
    }
  },
  destroyed():void {
    function PixiObject(){};
    this.game = null;
  }
};