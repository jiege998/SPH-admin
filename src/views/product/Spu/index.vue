
<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene==0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!show" @click="addSpu(spuInfo.category3Id)"
          >添加spu</el-button
        >
        <el-table style="width: 100%" border :data="spuList">
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row}">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateSpu(row)"
                title="修改"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="详情"
              ></hint-button>
              <el-popconfirm :title="`确定删除该${row.spuName}`" @onConfirm="deleteSpu(row)">
                <hint-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除" 
              ></hint-button>
              </el-popconfirm>
              
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="textalign: center"
          :current-page="spuInfo.page"
          :page-sizes="[3, 5, 8]"
          :page-size="spuInfo.limit"
          layout=" prev, pager, next, jumper,->,total, sizes"
          :total="total"
        >
        </el-pagination>
      </div>
      <div>
        <spuForm v-show="scene==1" @changeScene='changeScene' ref="spuForm"></spuForm>
      </div>
      <div>
        <skuForm v-show="scene==2"></skuForm>
      </div>
    </el-card>
  </div>
</template>

<script>
import skuForm from '@/views/product/Spu/skuForm'
import spuForm from '@/views/product/Spu/spuForm'
export default {
  // 组件名称
  name: "Spu",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    skuForm,
    spuForm
  },
  // 组件状态值
  data() {
    return {
      ids: "",
      show: false,
      isShowTable: true,
      spuInfo: {
        page: 1,
        limit: 3,
        category3Id: "",
      },
      spuList: [],
      total: 0,
      scene:0,//0代表展示spu列表数据 1代表添加或修改spu 2代表添加sku
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
     getCategoryId(ids) {
      this.ids = ids;
      const { category3Id } = ids;
      this.spuInfo.category3Id = category3Id;
      if (category3Id) this.show = true;
      this.getSpuList()
    },
   async getSpuList(pages = 1) {
       this.spuInfo.page =pages
      const { page, limit ,category3Id} = this.spuInfo;
      let res = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (res.code == 200) {
        this.total = res.data.total;
        this.spuList = res.data.records;
      }
    },
    handleSizeChange(e) {
      this.spuInfo.limit = e;
      this.getSpuList()
    },
    handleCurrentChange(e){
      this.spuInfo.page = e
       this.getSpuList(e)
    },
    addSpu(category3Id){
      this.scene = 1
      this.$refs.spuForm.addSpuDate(category3Id)
    },
   async deleteSpu(row){
     let res = await this.$API.spu.reqDeleteSpu(row.id)
      if(res.code == 200){
        this.$message.success('删除成功')
        if(this.spuInfo.length > 1){
          this.getSpuList(this.spuInfo.page)
        }else{
        this.getSpuList(this.spuInfo.page - 1)
      }
        
      }
      
    },
    updateSpu(row){
      this.scene = 1
      this.$refs.spuForm.initSpuDate(row)
    },
    changeScene({scene,flag}){
      this.scene = scene
      if(flag == '修改'){
        this.getSpuList(this.spuInfo.page)
      }
      else{
        this.getSpuList()
      }
      
    }
  },
};
</script> 
<style scoped>
</style>
