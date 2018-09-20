import {VJScriptLoader} from "../../../assets/js/vjs-scriptloader";
declare var __phaser: any;

export default {
  props: [],
  data():Object {
    return {
      game: null,
      store: this.$store,
      scriptLoader: new VJScriptLoader(),
      demos: [
        {title: "Sprite Class Manager", file: "boilerplate/spriteManagerDemo.min.js"},
        {title: "Controller Class Manager", file: "boilerplate/controllerManagerDemo.min.js"},
        {title: "Bitmapdata Layer Demo", file: "boilerplate/bitmapLayerDemo.min.js"},
        {title: "Bitmapdata Fill Demo", file: "boilerplate/bitmapFillDemo.min.js"},
      ]
    };
  },
  mounted():void {
    this.init();
  },
  methods: {
    init():void {
      // this.loadGame("boilerplate/spriteManagerDemo.min.js")
    },
    async loadGame(file:string):Promise<any> {
      // remove old game first
      if(this.game !== null) {
        this.game.destroy();
      }
      // load phaser (once)
      if(!this.store.getters._phaserIsLoaded()){
        await this.scriptLoader.loadFile(`/node_modules/phaser-ce/build/phaser.min.js`);
        this.store.commit("setPixiIsLoaded", false);
        this.store.commit("setPhaserIsLoaded", true);
      }
      await this.scriptLoader.loadFile(file);
      __phaser.init(this.$el, this, {width: 640, height: 640});
    },
    loadFile(file:string){
      this.loadGame(file)
    }
  },
  destroyed():void {
    this.game.destroy();
  }
}