import {VJScriptLoader} from "./vjs-scriptloader";

//--------------------------
export class VJSThreeloader {
    constructor(props){      
        this.props = props;
        this.scriptLoader = new VJScriptLoader()
        this.obj = null        
    }
    async createNew(){
        let {ele, file, width, height} = this.props;        
        await this.scriptLoader.loadFile(file);     
        this.obj = __three.init(this.props);          
    }
}
//--------------------------

//--------------------------
export class VJSPixiloader {
    constructor(props){      
        this.props = props;
        this.scriptLoader = new VJScriptLoader()
        this.obj = null        
    }

    async createNew(){
        let {ele, file, width, height} = this.props;        
        await this.scriptLoader.loadFile(file);     
        this.obj = __pixi.init(this.props);          
    }
}
//--------------------------

//--------------------------
export class VJSPhaserloader {
    constructor(props){      
        this.props = props;
        this.scriptLoader = new VJScriptLoader()
        this.obj = null        
    }

    async createNew(){
        let {ele, file, width, height} = this.props;        
        await this.scriptLoader.loadFile(file);     
        this.obj = __phaser.init(this.props);          
    }
}
//--------------------------