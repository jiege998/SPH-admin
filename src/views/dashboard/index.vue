<template>
  <div>
    <card></card>
    <sale></sale>
    <observe></observe>
  </div>
</template>

<script>
import card from './Card'
import sale from './Sale'
import observe from './Observe'

export default {
  name: 'Dashboard',
  components:{
    card,
    sale,
    observe
  },
  mounted(){
    this.$store.dispatch('home/getData')
  }
}
</script>

<style lang="scss" scoped>
</style>
