<!--
  功能：功能描述
  作者：fyj
  邮箱：1981820505@qq.com
  时间：2022年05月23日 11:12:56
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
    <div ref="echarts" style="width:100%;height:100%"></div>
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
      let lineCharts = echarts.init(this.$refs.echarts);
      lineCharts.setOption({
          xAxis:{
              show:false,
              type:'category'
          },
          yAxis:{
               show:false
          },
          series:[
              {
                  type:'line',
                  data:[10,7,33,25,48],
                  itemStyle:{
                      opacity:0
                  },
                  smooth:true,
                  lineStyle:{
                      color:'purple'
                  },
                  areaStyle:{
                      color:{
                          type:'linear',
                          x:0,
                          y:1,
                          x2:0,
                          y2:0,
                          colorStops:[
                              {
                                  offset:0,
                                  color:'white',

                              },
                              {
                                  offset:1,
                                  color:'purple'
                              }
                          ],
                          global:false,
                      }

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
