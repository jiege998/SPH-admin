<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="getCategroy2List"
          :disabled="show"
        >
          <el-option
            v-for="c1 in List1"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" :disabled="!cForm.category1Id || show" v-model="cForm.category2Id" @change="getCategroy3List">
          <el-option v-for="c2 in List2" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" :disabled="!cForm.category2Id || show" v-model="cForm.category3Id" @change="categoryIds">
          <el-option v-for="c3 in List3" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "CategorySelect",
  // 组件参数 接收来自父组件的数据
  props: ['show'],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      List1: [],
      List2: [],
      List3: [],
      cForm:{
          category1Id:'',
          category2Id:'',
          category3Id:'',
      }
    };
  },

  methods: {
    async getCategory1List() {
      let res = await this.$API.attr.reqCategory1List();
      if (res.code == 200) {
        this.List1 = res.data;
      }
    },
    async getCategroy2List(option) {
        this.cForm.category2Id = ''
        this.cForm.category3Id = ''
      let res = await this.$API.attr.reqCategory2List(option);
      if (res.code == 200) {
        this.List2 = res.data;
      }
    },
    async getCategroy3List(option) {
        this.cForm.category3Id = ''
      let res = await this.$API.attr.reqCategory3List(option);
      if (res.code == 200) {
        this.List3 = res.data;
      }
    },
    categoryIds(){
        const {category1Id,category2Id,category3Id} = this.cForm
        this.$emit("getCategoryId",{category1Id,category2Id,category3Id})
    }
  },
  mounted() {
    this.getCategory1List();
  },
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
</style>
