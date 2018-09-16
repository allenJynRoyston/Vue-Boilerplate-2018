<template lang="pug">
  footer
    .row(style='text-align: center; color: white')
      .col-xs-12
        h2 Made with 
          span(style='color: red') &#9825 
          | Allen Royston 2018
        br
      .col-xs-12
        h2 Find me on 
          a(href='https://github.com/allenRoyston/') Github,
          | &nbsp;
          a(href='https://www.facebook.com/allen.royston') Facebook,
          | &nbsp;or visit my 
          a(href='http://www.allenroyston.com/ninja') website!
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

  a
    color: orange
</style>
