export default {
  data():any {
    return {
      store: this.$store,
      component: [],
      files: [
        {filename: "Demo", file: "src/_pixi/pixi.test.js"}, 
        {filename: "Water", file: "src/_pixi/pixi.water.js"}
      ],
      selected: null,
      currentfile: null
    };
  },
  methods: {
    load(index:number){
      this.selected = this.files[index].filename
      this.currentfile = this.files[index]
      this.loadfile()
    },

    onchange(){
      let {files, selected} = this
      let res = files.filter(file => {
        return file.filename === selected        
      })
      this.currentfile = res[0]
      this.loadfile()
    },

    loadfile(){
      this.component[0].loadFile(this.currentfile.file)
    }
  },
  mounted():void {
    this.load(1)
  }
};