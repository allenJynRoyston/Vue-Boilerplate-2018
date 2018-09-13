<template lang="pug">
  .container
    .row  
      .col-xs-12.col-md-6.col-md-offset-3
        h2 Basic Setup        
        hr       
        h2 VJ-Slider is a lightweight, yet powerful, slider made with basic ass vanilla Javascript (hence the name - eh, clever) and powered by AnimeJS.  No jQuery dependency. Simple installation and highly customizable. 
        div(style='margin: 10px')     
        .vj-slider(size='small' controls dots lazyload type='fade')   
          data(:image='img1')
          data(:image='img2')
          data(:image='img3')
          data(:image='img4')  
   

    .row(style='margin-top: 50px')  
      .col-xs-12.col-md-6.col-md-offset-3
        h2 Touchscreen/mobile setup                
        div(style='margin: 10px')     
        .vj-slider(size='small' touch)   
          data(image='https://picsum.photos/400/400/?image=1082')
          data(image='https://picsum.photos/400/400/?image=1081')
          data(image='https://picsum.photos/400/400/?image=1080')   
        br
        br
        h2 Insert HTML on to page
        xmp  
          textarea 
            |
            |<div class='vj-slider' touch> 
            |   <!-- INSERT IMAGES HERE -->
            |</div>     
            |    
        br
        br      
        h2 Then execute in script
        xmp  
          textarea 
            |
            | import {VJSlider} from 'vjslider'
            |            
                
</template>

<script>
import {VJSlider} from '../assets/js/classes/slider'
import img1 from "../assets/images/img1.jpg"
import img2 from "../assets/images/img2.jpg"
import img3 from "../assets/images/img3.jpg"
import img4 from "../assets/images/img4.jpg"

export default {
  name: 'home',
  data () {
    return {
      types: [
        {title: 'slip'},
        {title: 'fade'},
        {title: 'cascade'},
        {title: 'waterfall'},
        {title: 'leaf'},
        {title: 'warpspeed'},
        {title: 'hyperzoom'},
        {title: 'newsroom'},
        {title: 'flip'},
        {title: 'unflip'},
        {title: 'fold'},
        {title: 'unfold'}
      ],
      img1, img2, img3, img4
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

  }
}
</script>


<style lang="scss">
  @import '../assets/scss/_slider';
</style>

<style lang="sass" scoped>
  a 
    font-size: 2em
    color: white
    cursor: pointer
    text-decoration: none
</style>
