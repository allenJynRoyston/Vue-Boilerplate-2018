<template lang="pug">
  .container
    .row  
      .col-xs-12.col-md-6.col-md-offset-3
        h1 Basic Setup        
        hr       
        h2 VJ-Slider is a lightweight, yet powerful, slider made with basic ass vanilla Javascript (hence the name - eh, clever) and powered by AnimeJS.  No jQuery dependency. Simple installation and highly customizable. 
        div(style='margin: 50px')     
        p default
        hr
        .vj-slider(dots controls preload)   
          data(:image='img1')
          data(:image='img2')
          data(:image='img3')
          data(:image='img4')

        h2 In your HTML:                 
        xmp  
          textarea
            | 
            | <div class='vs-slider' dots controls> 
            |   <data image='https://picsum.photos/600/400?image=111'>
            |   <data image='https://picsum.photos/600/400?image=222'>
            |   <data image='https://picsum.photos/600/400?image=178'>
            |   <data image='https://picsum.photos/600/400?image=444'>
            | </div>
            | 

        h2 Then excute in code:
        xmp
          textarea(oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"') 
            | new VJSlider(document.querySelector('.vs-slider'))
          


                
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
