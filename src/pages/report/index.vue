<template>
  <div class="main">
    报表
  </div>
</template>
<script>
import { dimSku } from '../../api/report/index'
export default {
  data() {
    return {}
  },
  created() {
  },
  methods: {
    async getData() {
      let res = await dimSku({})
      console.log('res', res)
    }
  }
}
</script>
