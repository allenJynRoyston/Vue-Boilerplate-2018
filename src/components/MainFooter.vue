<template lang="pug">
  footer
    .row
      h2 Made by Allen Royston 2018
      br
      marquee
        span I'm bringing the marquee back baby!  Wubba lubba dub duuuubbb!!!
</template>

<script>
export default {
  name: 'main-footer',
  data () {
    return {

    }
  },
  created: function () {
    this.bar()
  },
  methods: {
    async foo(){
      
    },
    async bar(){
      await this.foo();
    }
  }
}
</script>


<style lang="sass" scoped>
  footer
    margin-top: 100px
    padding: 20px 0px
    text-decoration: none
    margin-left: 5px
    display: flex
    align-items: center
    justify-content: center
    color: white

  .row
    align-items: center
    justify-content: center
    color: white    
</style>
