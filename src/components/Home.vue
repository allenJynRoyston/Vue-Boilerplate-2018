<template lang="pug">
  .container
    .row  
      .col-md-8.col-xs-offset-2
        p default
        hr
        .vs-slider(dots controls arrowdots size='large')   
          data(type='image' image='https://picsum.photos/600/400?image=111' )
          data(type='image' image='https://picsum.photos/600/400?image=222' )
          data(type='image' image='https://picsum.photos/600/400?image=178' )
          data(type='image' image='https://picsum.photos/600/400?image=444' )                      
        xmp  
          textarea 
            <div class='vs-slider' dots controls arrowdots size='large'> 
              <data type='image' image='https://picsum.photos/600/400?image=111'>
              <data type='image' image='https://picsum.photos/600/400?image=222'>
              <data type='image' image='https://picsum.photos/600/400?image=178'>
            </div>
                      

    .row
      .col-md-6
        p Custom elements (Example 1)
        hr
        .vs-slider(dots controls arrowdots size='large')   
          data(type='image' image='https://picsum.photos/600/400?image=111'  header='Image 1' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')
          data(type='image' image='https://picsum.photos/600/400?image=222'  header='Image 2' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')
          data(type='image' image='https://picsum.photos/600/400?image=178'  header='Image 3' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')
          data(type='image' image='https://picsum.photos/600/400?image=444'  header='Image 4' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')      

          data(type='dots' html='X')
          data(type='leftarrowdot' html='<')
          data(type='rightarrowdot' html='>')
          data(type='leftbtn' html='<p>PREV</p>')
          data(type='rightbtn' html='<p>MORE</p>')   

        xmp  
          textarea 
            <div class='vs-slider' dots controls arrowdots size='large'> 
              <data type='image' image='https://picsum.photos/600/400?image=111'>
              <!-- INSERT IMAGES -->
              
              <data type='dots' html='X'></div>
              <data type='leftarrowdot' html='<'></div>
              <data type='rightarrowdot' html='>'></div>
              <data type='leftbtn' html='<p>PREV</p>'></div>
              <data type='rightbtn' html='<p>MORE</p>'></div>            
            </div>          
      .col-md-6
        p Custom elements (Font Awesome example)
        hr
        .vs-slider(dots controls arrowdots size='large')   
          data(type='image' image='https://picsum.photos/600/400?image=111'  header='Image 1' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')
          data(type='image' image='https://picsum.photos/600/400?image=222'  header='Image 2' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')
          data(type='image' image='https://picsum.photos/600/400?image=178'  header='Image 3' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')
          data(type='image' image='https://picsum.photos/600/400?image=444'  header='Image 4' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')      

          data(type='dots' html='<i class="fas fa-circle"></i>')
          data(type='leftarrowdot' html='<i class="fas fa-arrow-left"></i>')
          data(type='rightarrowdot' html='<i class="fas fa-arrow-right"></i>')
          data(type='leftbtn' html='<i class="fas fa-arrow-circle-left"></i>')
          data(type='rightbtn' html='<i class="fas fa-arrow-circle-right"></i>')                         
        xmp  
          textarea 
            <div class='vs-slider' dots controls arrowdots size='large'> 
              <data type='image' image='https://picsum.photos/600/400?image=111'>
              <!-- INSERT IMAGES -->
              
              <data type='dots' html='<i class="fas fa-circle"></i>'></div>
              <data type='leftarrowdot' html='<i class="fas fa-arrow-left"></i>'></div>
              <data type='rightarrowdot' html='<i class="fas fa-arrow-right"></i>'></div>
              <data type='leftbtn' html='<i class="fas fa-arrow-circle-left"></i>'></div>
              <data type='rightbtn' html='<i class="fas fa-arrow-circle-right"></i>'></div>            
            </div>               
                         
    .row(style='margin-top: 100px')
      .col-xs-12.col-md-4(v-for='type in types')   
        p {{type.title}}
        hr
        .vs-slider(dots controls v-bind:type='type.title')    
            data(image='https://picsum.photos/600/400?image=111'  header='Image 1' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')
            data(image='https://picsum.photos/600/400?image=222'  header='Image 2' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')
            data(image='https://picsum.photos/600/400?image=178'  header='Image 3' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')
            data(image='https://picsum.photos/600/400?image=444'  header='Image 4' footer='Lorem ipsum dolor sit amet, consectetur adipiscing elit')          
        br
        br   
                 
</template>

<script>
import {VJSlider} from '../assets/js/classes/slider'


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
      ]
    }
  },
  mounted: function () {
    document.querySelectorAll('.vs-slider').forEach(ele => {
      let slider = new VJSlider(ele);
    })   
  },
  methods: {

  }
}
</script>


<style lang="scss">
  @import '../assets/scss/slider';
</style>

<style lang="sass" scoped>
  p
    color: white
    text-transform: uppercase
    width: 100%
    padding: 0; margin: 0
  
  hr 
    border: 2px solid white
    padding: 0
    margin-bottom: 10px

  .container
    max-width: 1200px; 
    margin-left: auto; 
    margin-right: auto;
    padding: 50px;
    margin-top: 50px;  

    xmp 
      overflow: hidden
      margin: 0; padding: 0;  

    textarea
      border: none
      font-size: 12px
      background-color: #581845
      color: #ffc300    
      margin: 0; padding: 10px;      
      width: 100%
      min-height: 150px

  
  .row
    margin-top: 100px
    
</style>
