<!-- app.vue -->
<template>
  <div id="app">
    <c-top></c-top>
    <c-nav></c-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import CTop from '../src/components/top.vue'
import CNav from '../src/components/nav.vue'

export default {
  name: 'app',
  components: {
    CTop,
    CNav
  }
}
</script>
