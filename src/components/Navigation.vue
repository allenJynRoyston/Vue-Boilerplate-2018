<template lang="pug">
  header
    a
      router-link(to="/") Setup
    a
      router-link(to="/examples") Examples    
    a
      router-link(to="/advanced") Advanced            
    a
      router-link(to="/install") Install
    a(href='https://github.com/allenRoyston/VJ-Slider' target="_blank") 
      a Github      
</template>

<script>
export default {
  name: 'navigation',
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
  header    
    padding: 20px 0px
    text-decoration: none
    margin-left: 5px
    display: flex
    align-items: center
    justify-content: center
    color: white
    display: flex
    align-items: center
    justify-content: center
    background-color: rgba(0, 0, 0, 1)
    width: 100%
    z-index: 100


    a
      text-decoration: none
      margin-left: 5px
      margin-right: 2%
      color: white
      font-size: 2rem

    @media (min-width: 0em) and (max-width: 46.24em) 
      a
        font-size: 1rem
          
</style>
