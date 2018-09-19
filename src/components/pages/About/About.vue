<template lang="pug">
  .section
    .container
      .row
        .col-xs-12.col-no-gutter
          h1 ABOUT
          GridComponent(:columns=3 :rows=3 :blocksize=300 :padding=1 :data='gridData_1')              
          br
        .col-xs-12.col-no-gutter
          GridComponent(:columns=4 :rows=3 :blocksize=300 :padding=1 :data='gridData_2')
</template>

<script src='./about.js'></script>

<style lang="sass" scoped>
  .row
    margin-top: 10px
</style>
