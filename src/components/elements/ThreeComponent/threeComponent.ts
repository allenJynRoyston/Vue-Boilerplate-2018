import {VJScriptLoader} from "../../../assets/js/vjs-scriptloader";
declare var __three: any;

export default {
  props: [],
  data():Object {
    return {
      game: null,
      store: this.$store,
      scriptLoader: new VJScriptLoader()
    }
  },
  mounted():void {
    this.init()
  },
  methods: {
    init():void {
      this.loadGame('src/_threeJS/ts_demo.js')
    },
    async loadGame(file:string):Promise<any> {
      if(this.game !== null){
        this.game = null;
      }
      if(!this.store.getters._threeJSIsLoaded()){
        await this.scriptLoader.loadFile(`/node_modules/three/build/three.min.js`);
        this.store.commit("setThreeJsIsLoaded", true)
      }
      await this.scriptLoader.loadFile(file);
       __three.init(this.$el, this, {width: 800, height: 600});
    }
  },
  destroyed():void {
    this.game = null;
  }
}