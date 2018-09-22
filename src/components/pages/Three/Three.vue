<template lang="pug">
  .container
    .col-xs-12.center
      select(v-model="selected" v-on:change='onchange()')
        option(v-for='file in files') {{file.filename}}
    .col-xs-12.center-text.center(style='padding: 20px')
      three-component(v-bind:ele='component')
    .col-xs-12.center
      button(v-on:click='loadfile()') Reload
</template>

<script src='./three.js'></script>

<style lang="sass" scoped>

</style>