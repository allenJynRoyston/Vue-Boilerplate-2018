<template lang="pug">
  div
    h1 About
</template>

<script>
export default {
  name: 'about',
  data () {
    return {

    }
  },
  created: function () {
    this.bar()
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


<style lang="sass" scoped>

</style>
