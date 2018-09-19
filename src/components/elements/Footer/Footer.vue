<template lang="pug">
  #footer-panel.u-full-width.center
    .row
      p Made with 
        span(style="color: red; margin-right: 5px") ♡
        | Allen Royston 2018   
      p
        | Find me on 
        a(href='https://github.com/allenRoyston/') Github,
        | &nbsp;
        a(href='https://www.facebook.com/allen.royston') Facebook,
        | &nbsp;or visit my 
        a(href='http://www.allenroyston.com/ninja') website!

</template>

<script src='./footer.js'></script>


<style lang="sass" scoped>
  #footer-panel
    padding: 20px 
    background-color: rgba(0, 0, 0, .5)
    margin-top: 20px
  p 
    width: 100%
    padding: 5px
    margin: 0px
    text-align: center
    a 
      color: orange
</style>
