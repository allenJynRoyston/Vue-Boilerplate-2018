<template lang='pug'>
  #app
    main-header
    navigation
    router-view
    main-footer
    link(href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow" rel="stylesheet")
    link(rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous")
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
