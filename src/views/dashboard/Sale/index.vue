<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="data"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="100">
          <el-col :span="18">
            <div class="charts" ref="echarts"></div>
          </el-col>
          <el-col :span="6">
            <h3>门店{{ title }}排名</h3>
            <ul v-if="this.title === '销售额'">
              <li v-for="item in listState.orderRank" :key="item.no">
                <span class="rindex">{{item.no}}</span>
                <span>{{item.name}}</span>
                <span class="rvalue">{{item.money}}</span>
              </li>
            </ul>
             <ul v-else>
              <li v-for="item in listState.userRank" :key="item.no">
                <span class="rindex">{{item.no}}</span>
                <span>{{item.name}}</span>
                <span class="rvalue">{{item.money}}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from 'dayjs'
import {mapState} from 'vuex'
export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      activeName: "sale",
      myEcharts: null,
      data: [],
    };
  },
  // 计算属性
  computed: {
    title() {
      if (this.activeName == "sale") {
        return "销售额";
      } else {
        return "访问量";
      }
    },
    ...mapState({
      listState:state=>state.home.homeDate
    })
  },
  // 侦听器
  watch: {
    title() {
      this.myEcharts.setOption({
        title: {
          text: this.title,
        },
        xAxis:{
          data:this.title==='销售额'?this.listState.userFullYearAxis:this.listState.orderFullYearAxis
        },
        series:[{
          name: this.title === '销售额'?"销售额":"访问量",
          type: "bar",
          barWidth: "40%",
          data: this.title === '销售额'?this.listState.userFullYear:this.listState.orderFullYear,
        }]
      });
    },
    listState(){
        this.myEcharts.setOption({
        title: {
          text: this.title,
        },
        xAxis:{
          data:this.listState.userFullYearAxis
        },
        series:[{
          name: "销售额",
          type: "bar",
          barWidth: "40%",
          data: this.listState.userFullYear
        }]
      });
    }
  },
  // 组件方法
  methods: {
      setDay(){
          const day =dayjs().format('YYYY-MM-DD')
          this.data = [day,day]
      },
      setWeek(){
          const start =dayjs().day(1).format('YYYY-MM-DD')
          const end =dayjs().day(7).format('YYYY-MM-DD')
          this.data = [start,end]
      },
      setMonth(){
          const start =dayjs().startOf('month').format('YYYY-MM-DD')
          const end =dayjs().endOf('month').format('YYYY-MM-DD')
          this.data = [start,end]
      },
      setYear(){
          const start =dayjs().startOf('year').format('YYYY-MM-DD')
          const end =dayjs().endOf('year').format('YYYY-MM-DD')
          this.data = [start,end]
      }
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.echarts);
    this.myEcharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "销售额",
          type: "bar",
          barWidth: "40%",
          data: [],
        },
      ],
    });
  },
};
</script> 
<style lang="scss" scoped>
.data {
  width: 200px;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
  top: 5px;
  span {
    margin: 0px 10px;
  }
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.box-card {
  width: 100%;
}
.el-card_header {
  border-bottom: none;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
  li {
    height: 8%;
    margin: 5px 0px;
  }
}
.rindex {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
  float: left;
}
.rvalue {
  float: right;
}
</style>
