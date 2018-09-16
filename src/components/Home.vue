<template lang="pug">
  .container
    .row  
      .col-xs-12.col-md-6.col-md-offset-3
        h1 WHAT AM I
        hr       
        h2 VJ-Slider is a lightweight image slider made with just basic Javascript.  No jQuery dependency, simple installation and highly customizable.  Check it out! 
        br
        h2 (However, AnimeJS IS required). 
        br
        br
        h2 Basic Setup        
        hr            
        #example-1
          .vj-slider(controls dots preload)   
            data(:image='img1')
            data(:image='img2')
            data(:image='img3')
            data(:image='img4')  
        br
        xmp  
          textarea
            |
            |<div class='vj-slider' controls dots> 
            |   <data image='https://picsum.photos/600/400?image=111' />
            |   <data image='https://picsum.photos/600/400?image=444' />
            |   <data image='https://picsum.photos/600/400?image=1078' />
            |   <data image='https://picsum.photos/600/400?image=1079' />
            |</div>     
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
      img1, img2, img3, img4
    }
  },
  mounted: function () {
    new VJSlider( document.querySelector('#example-1 .vj-slider') );
  
    document.querySelectorAll('.vj-slider').forEach((ele, index) => {
      if(index > 0){new VJSlider(ele)}
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
