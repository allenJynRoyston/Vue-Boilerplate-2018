<template lang='pug'>
  #app
    h1 Hello World
    main-header
    navigation
    router-view
    main-footer
</template>

<script>
import './assets/js/global.js'

export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import './assets/css/global.css';
</style>

<style lang="sass" scoped>

</style>
