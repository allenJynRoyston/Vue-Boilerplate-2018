<template lang="pug">
    #animateme.nav-bar          
      router-link.left-link(to="/" @click='setHeader(true)')
        img(v-bind:src='logo.default' style='height: 80px; width: auto; margin-top: -30px')
      a.links(v-for='route in routes' v-on:click='setHeader(route.expand)')
        router-link(v-bind:to="route.goto"  v-bind:class='currentroute === route.goto ? "active" : ""') {{route.title}} 
      a(@click='setDrawer(!drawerIsOpen)')
       i.fas.fa-bars        
</template>

<script src='./navigation.js'></script>


<style lang="sass" scoped>
  .nav-bar
    padding: 15px
    text-align: center
    display: flex    
    justify-content: center 
    margin-bottom: 30px

  a
    font-size: 1em
    text-decoration: none   
    color: white
    cursor: pointer    
  
  a:not(:last-child)
    margin-right: 30px

  a.links
    @media only screen and (max-width: 640px) 
      display: none
    
  .left-link
    position: absolute
    left: 20px
    opacity: 0
    @media only screen and (max-width: 640px) 
      display: none

  .active
    color: orange

</style>
