<template>
    <div ref="bar" style="width:100%;height:100%">
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  // 组件名称
  name: 'bar',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
  },
  // 组件状态值
  data () {
    return {}
  },
  methods: {},
  mounted () {
      let barCharts = echarts.init(this.$refs.bar);
      barCharts.setOption({
          xAxis:{
              show:false,
              type:'category',
          },
          yAxis:{
              show:false
          },
          series:[
              {
                  type:'bar',   
                  data:[10,7,33,12,48,9,29,10,44,33,22,8]           
              }
          ],
          tooltip:{},
          grid:{
              left:0,
              top:0,
              right:0,
              bottom:0
          }
      })
  },
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
</style>
