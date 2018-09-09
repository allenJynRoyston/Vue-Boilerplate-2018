<template lang="pug">
  div
    h1 Header    
</template>

<script>
export default {
  name: 'main-header',
  data () {
    return {

    }
  },
  created: function () {
    this.bar()
  },
  methods: {
    async foo(){
      console.log( "Async works in Header!" )
    },
    async bar(){
      await this.foo();
    }
  }
}
</script>


<style lang="sass" scoped>
  a
    text-decoration: none
    margin-left: 5px
</style>
