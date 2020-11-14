<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass">
  @import "./assets/css/uikit.min.css"

  @font-face
    font-family: "Roboto"
    src: url("./assets/fonts/Roboto/Roboto-Regular.ttf") format('truetype'),
    url("./assets/fonts/Roboto/Roboto-Regular.woff") format('woff')

  $body-color: #EDF7FF, 100%

  *
    margin: 0
    padding: 0
    box-sizing: border-box

  body
    font-family: "Roboto", sans-serif
    background-color: $body-color
    color: #0b0b0b
</style>
