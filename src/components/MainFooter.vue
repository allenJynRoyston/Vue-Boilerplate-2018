<template lang="pug">
  div
    h1 Footer
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
      console.log( "Async works in Footer!" )
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
