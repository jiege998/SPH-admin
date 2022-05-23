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
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="main">
      <span class="title">454545</span>
      <span class="context">17.1</span>
      <svg
        t="1653274843985"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5501"
        width="16"
        height="16"
      >
        <path
          d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
          fill="#d81e06"
          p-id="5502"
        ></path>
      </svg>
      <svg
        t="1653274814188"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4503"
        width="16"
        height="16"
      >
        <path
          d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
          fill="#d81e06"
          p-id="4504"
        ></path>
      </svg>
    </div>
    <div ref="echarts" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {};
  },
  methods: {},
  mounted() {
    let lineCharts = echarts.init(this.$refs.echarts);
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [10, 7, 33, 25, 48],
          itemStyle: {
            opacity: 0,
          },
          smooth: true,
          lineStyle: {
            color: "blue",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "white",
                },
                {
                  offset: 1,
                  color: "blue",
                },
              ],
              global: false,
            },
          },
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style lang="scss" scoped>
.header {
  align-items: center;
  display: flex;
  justify-content: flex-start;
  i {
    margin-left: 5px;
    color: #d9d9d9;
  }
  .search-header {
    margin-right: 20px;
  }
}
.main {
  padding-top: 10px;
  .title {
    font-size: 25px;
    color: #000;
    margin-right: 10px;
  }
  .context {
    margin-right: 10px;
  }
}
</style>
