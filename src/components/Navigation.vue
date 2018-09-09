<template lang="pug">
  div
    br
    a
      router-link(to="/") Home
    a
      router-link(to="/about") About
    br
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
      console.log( "Async works in Navigation!" )
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
