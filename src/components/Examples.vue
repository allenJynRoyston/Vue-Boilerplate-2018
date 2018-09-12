<template lang="pug">
  .container
    h1 Transitions
    hr
    div(style='margin: 50px')  
    .row
      .col-xs-12.col-md-4(v-for='type in types')   
        p {{type.title}}
        hr
        .vj-slider(dots controls v-bind:type='type.title' preload)    
          data(:image='img1')
          data(:image='img2')
          data(:image='img3')
          data(:image='img4')   
        xmp  
          textarea 
            |
            |<div class='vj-slider' type='{{type.title}}'> 
            |   <!-- INSERT IMAGES HERE -->
            |</div>     
            |    
    div(style='margin: 50px')
    h1 Modifiers
    hr
    div(style='margin: 50px')  
    .row
      .col-xs-12.col-md-4
        p No dots or arrows
        hr      
        .vj-slider(controls)   
          data(:image='img1')
          data(:image='img2')
          data(:image='img3')
          data(:image='img4')   
        xmp  
          textarea 
            |
            |<div class='vj-slider' controls> 
            |   <!-- INSERT IMAGES HERE -->
            |</div>     
            |   
      .col-xs-12.col-md-4
        p No controls
        hr      
        .vj-slider(dots)   
          data(:image='img1')
          data(:image='img2')
          data(:image='img3')
          data(:image='img4')   
        xmp  
          textarea 
            |
            |<div class='vj-slider' dots> 
            |   <!-- INSERT IMAGES HERE -->
            |</div>     
            |   
      .col-xs-12.col-md-4
        p Autoplay
        hr      
        //- .vj-slider(autoplay)   
        //-   data(image='https://picsum.photos/600/400?image=111'  )
        //-   data(image='https://picsum.photos/600/400?image=222'  )
        //-   data(image='https://picsum.photos/600/400?image=178'  )
        //-   data(image='https://picsum.photos/600/400?image=444'  )     
        xmp  
          textarea 
            |
            |<div class='vj-slider' autoplay delay=2000 interval=3000> 
            |   <!-- INSERT IMAGES HERE -->
            |</div>     
            |     

    div(style='margin: 50px')
    h1 Variations
    hr
    div(style='margin: 50px')
    .row
      .col-xs-12.col-md-6
        p Custom elements (Example 1)
        hr
        .vj-slider(dots controls arrowdots size='large')   
          data(:image='img1')
          data(:image='img2')
          data(:image='img3')
          data(:image='img4')    

          data(type='dots' html='X')
          data(type='leftarrowdot' html='<')
          data(type='rightarrowdot' html='>')
          data(type='leftbtn' html='<a>PREV</a>')
          data(type='rightbtn' html='<a>MORE</a>')   

        xmp  
          textarea 
            |
            |<div class='vj-slider' dots controls arrowdots size='large'> 
            | 
            |   <data image='https://picsum.photos/600/400?image=111'>
            |   <data image='https://picsum.photos/600/400?image=222'>
            |   <data image='https://picsum.photos/600/400?image=444'>
            | 
            |   <data type='dots' html='X'></div>
            |   <data type='leftarrowdot' html='<'></div>
            |   <data type='rightarrowdot' html='>'></div>
            |   <data type='leftbtn' html='<a>PREV</a>'></div>
            |   <data type='rightbtn' html='<a>NEXT</a>'></div>            
            | 
            |</div> 
            |          
      .col-xs-12.col-md-6
        p Custom elements (Font Awesome example)
        hr
        .vj-slider(dots controls arrowdots size='large')   
          data(:image='img1')
          data(:image='img2')
          data(:image='img3')
          data(:image='img4')   

          data(type='dots' html='<i class="fas fa-circle"></i>')
          data(type='leftarrowdot' html='<i class="fas fa-arrow-left"></i>')
          data(type='rightarrowdot' html='<i class="fas fa-arrow-right"></i>')
          data(type='leftbtn' html='<i class="fas fa-arrow-circle-left"></i>')
          data(type='rightbtn' html='<i class="fas fa-arrow-circle-right"></i>')                         
        xmp  
          textarea 
            |
            |<div class='vj-slider' dots controls arrowdots size='large'> 
            | 
            |   <data image='https://picsum.photos/600/400?image=111'>
            |   <data image='https://picsum.photos/600/400?image=222'>
            |   <data image='https://picsum.photos/600/400?image=444'>
            | 
            |   <data type='dots' html='<i class="fas fa-circle"></i>'></div>
            |   <data type='leftarrowdot' html='<i class="fas fa-arrow-left"></i>'></div>
            |   <data type='rightarrowdot' html='<i class="fas fa-arrow-right"></i>'></div>
            |   <data type='leftbtn' html='<i class="fas fa-arrow-circle-left"></i>'></div>
            |   <data type='rightbtn' html='<i class="fas fa-arrow-circle-right"></i>'></div>            
            | 
            |</div>    
            |

    div(style='margin: 50px')
    h1 Animated Texts
    hr
    div(style='margin: 50px') 
    .row
      .col-xs-12.col-md-8.col-md-offset-2
        p Animated Text
        hr
        .vj-slider(dots controls arrowdots size='large')   
          data(:image='img1' header='Image 1' footer='Lorem ipsum is the best phrase' )
          data(:image='img2' header='Image 2' footer='Lorem ipsum is the best phrase' )
          data(:image='img3' header='Image 3' footer='Lorem ipsum is the best phrase' )
          data(:image='img4' header='Image 4' footer='Lorem ipsum is the best phrase' )                     
        xmp  
          textarea 
            |
            |<div class='vj-slider' dots controls arrowdots size='large'> 
            | 
            |   <data image='https://picsum.photos/600/400?image=111' header='Image 1' footer='Lorem ipsum is the best phrase' >
            |   <data image='https://picsum.photos/600/400?image=222' header='Image 2' footer='Lorem ipsum is the best phrase' >
            |   <data image='https://picsum.photos/600/400?image=178' header='Image 3' footer='Lorem ipsum is the best phrase' >
            |   <data image='https://picsum.photos/600/400?image=444' header='Image 4' footer='Lorem ipsum is the best phrase' >
            |       
            |</div>    

    div(style='margin: 50px')
    h1 Sizes
    hr
    div(style='margin: 50px')  
    .row
      .col-xs-12.col-md-4
        p Small
        hr      
        .vj-slider(size='small' controls)   
          data(:image='img1')
          data(:image='img2')
          data(:image='img3')
          data(:image='img4')     
        xmp  
          textarea 
            |
            |<div class='vj-slider' size='small'> 
            |   <!-- INSERT IMAGES HERE -->
            |</div>     
            |      
      .col-xs-12.col-md-4
        p Default
        hr      
        .vj-slider(controls)      
          data(:image='img1')
          data(:image='img2')
          data(:image='img3')
          data(:image='img4')   
        xmp  
          textarea 
            |
            |<div class='vj-slider' size='default'> 
            |   <!-- INSERT IMAGES HERE -->
            |</div>     
            |      
      .col-xs-12.col-md-4
        p Large
        hr      
        .vj-slider(size='large' controls)   
          data(:image='img1')
          data(:image='img2')
          data(:image='img3')
          data(:image='img4')   
        xmp  
          textarea 
            |
            |<div class='vj-slider' size='large'> 
            |   <!-- INSERT IMAGES HERE -->
            |</div>     
            |  

    div(style='margin: 50px')
    h1 Lazyloading
    hr
    div(style='margin: 50px')  
    .row
      .col-xs-12.col-md-6
        p Default 
        hr      
        .vj-slider(controls lazyload)   
          data(image='https://picsum.photos/1200/1400/?image=1082')
          data(image='https://picsum.photos/1200/1400/?image=1081')
          data(image='https://picsum.photos/1200/1400/?image=1080')

        xmp  
          textarea 
            |
            |<div class='vj-slider'> 
            |   <!-- INSERT IMAGES HERE -->
            |</div>     
            |                 

      .col-xs-12.col-md-6
        p Custom spinner 
        hr      
        .vj-slider(controls lazyload)   
          data(image='https://picsum.photos/1200/1400/?image=444')
          data(image='https://picsum.photos/1200/1400/?image=1084')
          data(image='https://picsum.photos/1200/1400/?image=1075')
          
          data(type='lazyloader' html="<i class='fa-3x fas fa-spinner fa-spin' style='color: white'></i>")

        xmp  
          textarea 
            |
            |<div class='vj-slider' lazyload> 
            |   <!-- INSERT IMAGES HERE -->
            |</div>     
            |         
            |<data type='lazyloader' html='<i class="fa-3x fas fa-spinner fa-spin" style="color: white"></i>'></div>                  
            |  

    div(style='margin: 50px')
    h1 Preloading
    hr
    div(style='margin: 50px')  
    .row
      .col-xs-12.col-md-6
        p Preload 
        hr      
        .vj-slider(controls preload)   
          data(:image='img1')
          data(:image='img2')
          data(:image='img3')
          data(:image='img4')    
        xmp  
          textarea 
            |
            |<div class='vj-slider' controls preload> 
            |   <!-- INSERT IMAGES HERE -->
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
  data () {
    return {
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
