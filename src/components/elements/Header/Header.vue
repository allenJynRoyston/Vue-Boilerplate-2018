<template lang="pug">
  section
    .custom-header.center
      .image(:style='"background:url(" + headerImg.default + ") center center no-repeat; background-size: cover; width: 100%; height: 100%"')
      .hero
        h1 Hello World
</template>

<script src='./header.js'></script>


<style lang="sass" scoped>
  .custom-header
    position: relative
    width: 100%
    height: 200px
    overflow: hidden

    .hero
      position: absolute
      color: white
      font-size: 2em

      h1
        padding: 0px
        margin: 0px
</style>
