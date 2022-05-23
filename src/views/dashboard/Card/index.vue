<template>
  <div>
      <el-row :gutter="10">
          <el-col :span="6">
              <el-card>
                  <detail title="总销售额" count="￥12650">
                      <template slot="charts">
                          <span>周同比&nbsp;&nbsp;56.67%<svg t="1653274843985" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5501" width="16" height="16"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#d81e06" p-id="5502"></path></svg></span>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span>日同比&nbsp;&nbsp;33.6%<svg t="1653274814188" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4503" width="16" height="16"><path d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z" fill="#d81e06" p-id="4504"></path></svg></span>
                      </template>
                      <template slot="footer">
                          <span>日销售额￥12365</span>
                      </template>
                  </detail>
              </el-card>
          </el-col>
          <el-col :span="6">
              <el-card>
                  <detail title="访问量" count="88460">
                      <template slot="footer">
                          <span>日访问量12306</span>
                      </template>
                      <template slot="charts">
                          <lineCharts></lineCharts>
                      </template>
                  </detail>
              </el-card>
          </el-col>
          <el-col :span="6">
             <el-card>
                  <detail title="支付笔数" count="88460">
                      <template slot="charts">
                          <barCharts></barCharts>
                      </template>
                      <template slot="footer">
                          <span>转换率64%</span>
                      </template>
                  </detail>
              </el-card>
          </el-col>
          <el-col :span="6">
              <el-card>
                  <detail title="运营活动效果" count="78%">
                     <template slot="charts">
                          <progressCharts></progressCharts>
                      </template>
                      <template slot="footer">
                          <span>周同比&nbsp;&nbsp;56.67%<svg t="1653274843985" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5501" width="16" height="16"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#d81e06" p-id="5502"></path></svg></span>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span>日同比&nbsp;&nbsp;33.6%<svg t="1653274814188" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4503" width="16" height="16"><path d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z" fill="#d81e06" p-id="4504"></path></svg></span>
                      </template>
                  </detail>
              </el-card>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import detail from './Detail'
import lineCharts from './line'
import barCharts from './bar'
import progressCharts from './progress'
export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
      detail,
      lineCharts,
      barCharts,
      progressCharts
  },
  // 组件状态值
  data() {
    return {};
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {},
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
</style>
