export default {
  data():any {
    return {
      store: this.$store,
      component: [],
      files: [
        {filename: "Test 1", file: "src/_three/three.test.js"}, 
        {filename: "Test 2", file: "src/_three/three.test.js"}
      ],
      selected: null,
      currentfile: null
    };
  },
  methods: {
    load(index:number){
      this.selected = this.files[0].filename
      this.currentfile = this.files[0]
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
    this.load(0)
  }
};