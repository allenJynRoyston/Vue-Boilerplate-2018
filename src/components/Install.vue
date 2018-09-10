<template lang="pug">
  .container
    .row  
      .col-xs-12.col-md-6.col-md-offset-3
        h1 Install       
        hr  
        div(style='margin: 50px')
        h2 1. Grab it from NPM
        xmp  
          textarea 
            |
            | npm install vjslider
            |

        h2 2. Throw down some HTML
        xmp  
          textarea
            | 
            | <div class='vs-slider' dots controls arrowdots size='large'> 
            |   <data image='https://picsum.photos/600/400?image=111'>
            |   <data image='https://picsum.photos/600/400?image=222'>
            |   <data image='https://picsum.photos/600/400?image=178'>
            |   <data image='https://picsum.photos/600/400?image=444'>
            | </div>
            |   

        h2 3. Import that bad boy into your project.
        xmp  
          textarea 
            |
            | import {VJSlider} from 'vjslider'
            |

        h2 4. Initiate
        xmp  
          textarea
            |
            | new VJSlider(document.querySelector('.vs-slider'))
            |

        h2 5. Change the CSS to your liking (optional) 
        xmp  
          textarea
            |
            |.vj-slider{
            | // buttons, text, etc
            |}

        h2 6. Bask in the warmth of your genius
        .vj-slider(dots controls arrowdots size='')   
          data(image='https://picsum.photos/600/400?image=111' )
          data(image='https://picsum.photos/600/400?image=222' )
          data(image='https://picsum.photos/600/400?image=178' )
          data(image='https://picsum.photos/600/400?image=444' )      


  

</template>

<script>
import {VJSlider} from '../assets/js/classes/slider'

export default {
  data () {
    return {

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
