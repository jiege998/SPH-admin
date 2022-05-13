<!--
  功能：功能描述
  作者：fyj
  邮箱：1981820505@qq.com
  时间：2022年04月27日 14:13:06
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" @click="addAttr" :disabled="!show">添加属性</el-button>
        <el-table :data="attrList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="width">
          </el-table-column>
          <el-table-column
            label="属性值列表"
            width="width"
          >
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attr in row.attrValueList"
                :key="attr.id"
                style="margin: 5px 20px"
                >{{ attr.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row,$index }">
              <el-button type="warning" icon="el-icon-edit" size="mini"
                @click="updateAttr(row)">修改</el-button
              >
              <el-button type="danger" icon="el-icon-delete" size="mini"
                @click="deleteAttr(row,$index)">删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form"  label-width="80">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button>
        <el-button type="primary" @click="isShowTable = true">取消</el-button>
        <el-table
          border
          :data="attrInfo.attrValueList"
          style="width: 100%;margin:20px 0px">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80">
          </el-table-column>
           <el-table-column
            label="属性值名称"
            width="width">
            <template slot-scope="{row ,$index}">
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="row.flag = false" :ref="$index"></el-input>
              <span v-else @click="toEdit(row,$index)" style="display:block">{{row.valueName}}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="操作"
            width="width">
            <template slot-scope="{row,$index}">
                <el-popconfirm :title="`确认删除该${row.valueName}`" @onConfirm="deleteAttrValue(row,$index)">
                <el-button type="danger" slot="reference" icon="el-icon-delete" size="mini"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveAttr" :disabled="attrInfo.attrValueList.length<1 || attrInfo.attrName ==''">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  // 组件名称
  name: "Attr",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      attrList: [],
      flag:true,
      isShowTable:true,
      show:false,
      ids:{},
      attrInfo:{
        attrName:'',
        attrValueList:[
        ],
        categoryId:'',//3级分类id
        categoryLevel:3
      }
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async getCategoryId(ids) {
      this.ids = ids
      const { category1Id, category2Id, category3Id } = ids;
      this.attrInfo.categoryId = category3Id
      if(category3Id) this.show = true

      let res = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (res.code == 200) {
        this.attrList = res.data;
      }
    },
    addAttrValue(){
        this.attrInfo.attrValueList.push({attrId:this.attrInfo.categoryId,valueName:'',flag:true})
        this.$nextTick(()=>{
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      })
    },
    addAttr(){
      this.isShowTable = false
      this.attrInfo={
        attrName:'',
        attrValueList:[
        ],
        categoryId:this.attrInfo.categoryId,//3级分类id
        categoryLevel:3
      }
    },
    updateAttr(row){
      this.isShowTable = false
      this.attrInfo=cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item=>{
        this.$set(item,'flag',false)
      })
    },
    deleteAttrValue(index){
     this.attrInfo.attrValueList.splice(index,1)
    },
    toLook(row){
      if(row.valueName.trim()==''){
        this.$message.error('请你输入一个正确的属性值')
        return;
      }
      let isRept = this.attrInfo.attrValueList.some(item=>{
        if(row != item){
          return row.valueName == item.valueName
        }
      })
      if(isRept){
         this.$message.error('属性值重复请重新输入')
        return;
      }
         row.flag = false
    },
    toEdit(row,index){
      row.flag = true
      this.$nextTick(()=>{
        this.$refs[index].focus();
      })
    },
    saveAttr(){
      this.attrInfo.attrValueList=this.attrInfo.attrValueList.filter(item=>{
        if(item.valueName != ''){
          delete item.flag
          return true
        }
      })
      this.$API.attr.reqAddAttr(this.attrInfo).then(res=>{
        if(res.code == 200){
           this.$message.success('保存成功')
           this.getCategoryId(this.ids)
           this.isShowTable = true
        }
        else{
          this.$message.error('保存失败')
        }
      })
    }
  },
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
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
</style>
