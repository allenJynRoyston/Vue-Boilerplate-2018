<template lang="pug">
  .container
    .row
      .col-xs-12.col-md-6.col-md-offset-3
        h2 .build()
        hr                    
        xmp  
          textarea
            |
            |<div class='vj-slider'></div>                 
            |                          
        xmp  
          textarea.textarea-js
            |  let parameters = {
            |    images: [
            |      {src: 'https://picsum.photos/600/400?image=111'},
            |      {src: 'https://picsum.photos/600/400?image=444'},
            |      {src: 'https://picsum.photos/600/400?image=1078'},
            |      {src: 'https://picsum.photos/600/400?image=1077'}
            |    ],
            |    options: {
            |      type: 'slide',
            |      controls: true,
            |      dots: true,
            |      size: 'small
            |    }
            |  }
            |
            |  let slider = new VJSlider( document.querySelector('.vj-slider') );
            |  slider.build(parameters)       
        br 
        button(v-on:click='build()') BUILD
        br
        br
        .vj-slider           

    .row(style='margin-top: 100px')
      .col-xs-12.col-md-6.col-md-offset-3
        h2 .update()   
        hr 
        xmp  
          textarea.textarea-js
            |  let parameters = {
            |    images: [
            |      {src: 'newImage1.png'},
            |      {src: 'newImage2.png'},            
            |    ],              
            |    options: {
            |      cardbg: 'white',
            |      padding: 10,              
            |      type: 'fade',
            |      controls: false,
            |      dots: false, 
            |      autoplay: true,
            |      size: 'default',
            |      autoplay: {
            |       active: true
            |      }
            |    }
            |  }
            |            
            |  slider.update(parameters)    
        xmp  
          textarea.textarea
            |  AVAILABLE OPTIONS
            |    
            |  cardbg: [STRING] 'black', '#FFF', 'rgba(0, 0, 0, .2)'
            |  easing: [STRING] 'see easings'
            |  type: [STRING] 'see types'
            |  speed: [INT] 700
            |  controls: [BOOLEAN] true/false
            |  dots: [BOOLEAN] true/false
            |  arrowdots: [BOOLEAN] true/false
            |  size: [STRING] 'small', 'default', 'large'
            |  touch: [BOOLEAN]  true/false
            |  text:  [BOOLEAN]  true/false
            |  autoplay: { 
            |     active: [BOOLEAN]  true/false
            |     delay: [INT]  2000
            |     interval: [INT]  3000
            |  }
            |  preload [BOOLEAN] true/false
            |  lazyload [BOOLEAN] true/false
            |  lazyloadThreshold: [INT] 700
            |  mockdelay [INT] 0
            |  
        br 
        button(v-on:click='update()') UPDATE
        br
        br
      .col-xs-12.col-md-6.col-md-offset-3        
        .vj-slider   

    .row(style='margin-top: 100px')
      .col-xs-12.col-md-6.col-md-offset-3
        h2 .destroy( callback ) 
        hr                     
        xmp  
          textarea.textarea-js
            |            
            |  slider.destroy()
            |  
            |  // with callback
            |  slider.destroy( () => {
            |     console.log("slider destroyed") 
            |  })
        br 
        button(v-on:click='destroy()') DESTROY
        br
        br
        .vj-slider               

    .row(style='margin-top: 100px')
      .col-xs-12.col-md-6.col-md-offset-3
        h2 .currentProperties() 
        hr                     
        xmp  
          textarea.textarea-js
            |            
            |  console.log( slider.currentProperties() )
            | 
            |  // returns properties of current slider
        br 
        button(v-on:click='currentOptions()') CURRENT OPTIONS
        br
        br
        .vj-slider 
        xmp(v-if='response.currentOptions !== null')
          textarea.textarea-js
            |            
            |  {{response.currentOptions}}
            |             
        br         
            

    .row(style='margin-top: 100px')
      .col-xs-12.col-md-6.col-md-offset-3
        h2 .slideData() 
        hr                     
        xmp  
          textarea.textarea-js
            |            
            |  console.log( slider.slideData() )
            | 
            |  // returns data on current image
        br 
        button(v-on:click='slideData()') SLIDE DATA
        br
        br
        .vj-slider 
        xmp(v-if='response.slideData !== null')
          textarea.textarea-js
            |            
            |  {{response.slideData}}
            |             
        br 


    .row(style='margin-top: 100px')
      .col-xs-12.col-md-6.col-md-offset-3
        h2 .returnElement() 
        hr                     
        xmp  
          textarea.textarea-js
            |            
            |  console.log( slider.returnElement() )
            |  slider.returnElement().style.border = '2px solid orange'
            | 
            |  // returns data on current image
        br 
        button(v-on:click='returnElement()') CURRENT SLIDE
        br
        br
        .vj-slider 
        xmp(v-if='response.returnElement !== null')
          textarea.textarea-js
            |            
            |  {{response.returnElement}}
            |             
        br                       


    .row(style='margin-top: 100px')
      .col-xs-12.col-md-6.col-md-offset-3
        h2 EASING AND ANIMATION TYPES
        hr       
        .row(style='background-color: black; padding: 20px')
          .col-xs-6
            h2 AVAILABLE EASINGS
            hr                     
            xmp
              span(style='color: #00ff00' v-for='ease in easings') 
                | {{ease.title}} 
                br
          .col-xs-6
            h2 AVAILABLE TYPES
            hr                     
            xmp
              span(style='color: orange'  v-for='type in types') 
                | {{type.title}}
                br
                                        
          


                
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
      sliders: [],
      response: {
        destroy: null,
        returnElement: null,
        currentOptions: null,
        slideData: null
      },
      types: [
        {title: 'slide'},
        {title: 'slip'},
        {title: 'fade'},
        {title: 'cascade'},
        {title: 'waterfall'},
        {title: 'leaf'},
        {title: 'grow'},
        {title: 'skew'},
        {title: 'warpspeed'},
        {title: 'hyperzoom'},
        {title: 'newsroom'},
        {title: 'flip'},
        {title: 'unflip'},
        {title: 'fold'},
        {title: 'unfold'}
      ],
      easings: [
        {title: 'linear'},

        {title: 'easeInQuad'},
        {title: 'easeInCubic'},
        {title: 'easeInQuart'},
        {title: 'easeInQuint'},
        {title: 'easeInSine'},
        {title: 'easeInExpo'},
        {title: 'easeInCirc'},
        {title: 'easeInBack'},
        {title: 'easeInElastic'},

        {title: 'easeOutQuad'},
        {title: 'easeOutCubic'},
        {title: 'easeOutQuart'},
        {title: 'easeOutQuint'},
        {title: 'easeOutSine'},
        {title: 'easeOutExpo'},
        {title: 'easeOutBack'},
        {title: 'easeOutElastic'},

        {title: 'easeInOutQuad'},
        {title: 'easeInOutCubic'},
        {title: 'easeInOutQuart'},
        {title: 'easeInOutQuint'},
        {title: 'easeInOutSine'},
        {title: 'easeInOutExpo'},
        {title: 'easeInOutBack'},
        {title: 'easeInOutElastic'},            
      ],         
      img1, img2, img3, img4
    }
  },
  mounted: function () {  
    this.build()

    document.querySelectorAll('textarea').forEach(ele => {
      ele.style.height = (ele.scrollHeight-20) + "px"
    })       

  },
  methods: {
    build(){
      let parameters = {
        images: [
          {src: img1},
          {src: img2},
          {src: img3},
          {src: img4}
        ],
        options: {
          type: 'slide',
          controls: true,
          dots: true, 
          size: 'small'
        }
      }
      
      document.querySelectorAll('.vj-slider').forEach(ele => {
        let slider = new VJSlider( ele );
        this.sliders.push(slider)
        slider.build(parameters)       
      })
      
    },

    update(){
        let parameters = {
          images: [
            {src: 'https://picsum.photos/600/400?image=1'},
            {src: 'https://picsum.photos/600/400?image=31'},
          ],
          options: {
            cardbg: 'white',
            padding: 10,
            type: 'fade',
            controls: false,
            dots: false, 
            autoplay: true,
            size: 'default',
            autoplay: {
              active: true
            }
          }
        }
        this.sliders[1].update(parameters)         
    },

    destroy(){
      this.sliders[2].destroy( () => {
        console.log("DESTORYED")
      })       
    },    
    
    currentOptions(){
      this.response.currentOptions = this.sliders[3].currentProperties()
      setTimeout(() => {
        document.querySelectorAll('textarea').forEach(ele => {
          ele.style.height = (ele.scrollHeight-20) + "px"
        })  
      })
    },

    slideData(){
      this.response.slideData = this.sliders[4].slideData()
      setTimeout(() => {
        document.querySelectorAll('textarea').forEach(ele => {
          ele.style.height = (ele.scrollHeight-20) + "px"
        })  
      })
    },

    returnElement(){
      console.log( this.sliders[5].returnElement() )
      this.sliders[5].returnElement().style.border = '2px solid orange'
      this.response.returnElement = 'check console log for element'
      setTimeout(() => {
        document.querySelectorAll('textarea').forEach(ele => {
          ele.style.height = (ele.scrollHeight-20) + "px"
        })  
      })
    },    


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
