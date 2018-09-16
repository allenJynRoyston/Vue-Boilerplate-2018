<template lang="pug">
  .container
    .row  
      .col-xs-12.col-md-6.col-md-offset-3
        h1 Install       
        hr  
        div(style='margin: 50px')
        h2 1. Install both vjslider and animejs from NPM or download the files manually
        xmp  
          textarea 
            |
            | npm install vjslider --save
            | npm install animejs --save
            |

        br

        h2 2. Import that bad boy into your project or include the script file
        xmp  
          textarea.textarea-js 
            |
            | import {VJSlider} from 'vjslider'
            |
            | OR  
            |
            | <script src='[file location]/vjs-slider.js' ></script>
            |

        br
        h2 3. Import or link the CSS file
        xmp  
          textarea
            |
            | @import '[file location]/_slider';
            |
            | OR  
            |
            | <link rel="stylesheet" type="text/css" href="slider.css" />
            |            

        br
        h2 3x. Change the .css to your liking (optional)
        xmp  
          textarea.textarea-js 
            |
            |  .js-slider{
            |       ....
            |  }
            |     

        br
        h2 5. Initalize
        xmp  
          textarea
            |
            | new VJSlider(document.querySelector('.vs-slider'))
            |
        br
        h2 6. VICTORY
        br
        .vj-slider   
          data(:image='victory')


  

</template>

<script>
import {VJSlider} from '../assets/js/classes/slider'
import victory from "../assets/images/victory.jpg"

export default {
  data () {
    return {
      victory
    }
  },
  mounted: function () {
    document.querySelectorAll('.vj-slider').forEach(ele => {
      let slider = new VJSlider(ele);
    })   
    document.querySelectorAll('textarea').forEach(ele => {
      ele.style.height = (ele.scrollHeight-20) + "px"
    })      
  },
  methods: {
    async foo(){
      console.log( "Async works in About!" )
    },
    async bar(){
      await this.foo();
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/_slider';
</style>

<style lang="sass" scoped>

</style>
