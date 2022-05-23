<template>
    <div ref="progressCharts" style="width:100%;height:100%">
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  // 组件名称
  name: '',
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
      let progressCharts = echarts.init(this.$refs.progressCharts);
      progressCharts.setOption({
          xAxis:{
              show:false,
              min:0,
              max:100,
          },
          yAxis:{
              show:false,
              type:'category',
          },
          series:[
              {
                  type:'bar',   
                  data:[78],
                  color:'cyan',
                  barWidth:10,
                  showBackground:true,
                  backgroundStyle:{
                      color:'#eee'
                  },
                  label:{
                      show:true,
                      formatter:'|',
                      position:'right'
                  }


              }
          ],
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
