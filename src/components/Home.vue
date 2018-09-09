<template lang="pug">
  .row(style='margin-top: 100px')
    .col-xs-12.col-md
    .col-xs-12.col-md
      .vs-slider            
    .col-xs-12.col-md
</template>

<script>
import {VJSlider} from '../assets/js/classes/slider'


export default {
  name: 'home',
  data () {
    return {

    }
  },
  mounted: function () {
    let slider = new VJSlider(document.querySelector('.vs-slider'));
    console.log(slider)
  },
  methods: {

  }
}
</script>


<style lang="scss">
  @import '../assets/scss/slider';
</style>

<style lang="sass" scoped>

</style>
