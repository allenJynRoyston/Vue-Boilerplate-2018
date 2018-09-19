import * as testimage from '../../../assets/images/site/short-paragraph.png'
export default {
  data () {
    return {
      testimage,
      store: this.$store,
    }
  },
  mounted(){
    console.log(this.testimage)
  }
}