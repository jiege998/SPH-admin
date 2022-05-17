<template>
  <div>
    <el-table border style="width: 100%" :data="skuList">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"> </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column  label="默认图片" width="150">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="80">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button type="success" icon="el-icon-bottom" @click="Sale(row)" v-if="row.isSale == 0"></el-button>
          <el-button type="info" icon="el-icon-top" v-else @click="CancelSale(row)"></el-button>
          <el-button type="primary" icon="el-icon-warning" @click="edit"></el-button>
          <el-button type="info" icon="el-icon-edit"></el-button>
          <el-button type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="text-align: center"
      :current-page="skuInfo.page"
      :page-sizes="[3, 5, 10]"
      :page-size="skuInfo.limit"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "Sku",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      skuInfo: {
        page: 1,
        limit: 5,
      },
      skuList: [],
      total:0,
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async getSkuList(pageo = 1) {
      if (pageo) {
        this.skuInfo.page = pageo;
      }
      const { page, limit } = this.skuInfo;
      let res = await this.$API.sku.reqSkuList(page, limit);
      if (res.code == 200) {
        this.skuList = res.data.records;
        this.total = res.data.total
      }
    },
    handleSizeChange(e){
      this.skuInfo.limit = e
      this.getSkuList(1)
    },
    handleCurrentChange(e){
      this.skuInfo.page = e
      this.getSkuList(e)
    },
   async Sale(row){
     let res = await this.$API.sku.reqSale(row.id)
      if(res.code == 200){
        this.$message.success('下架成功')
        row.isSale = 1
      }
    },
    async CancelSale(row){
     let res = await this.$API.sku.reqCancelSale(row.id)
      if(res.code == 200){
        this.$message.success('上架成功')
        row.isSale = 0
      } 
    },
    edit(){
      this.$message('正在开发中')
    }
  },
  mounted() {
    this.getSkuList()
  },

};
</script> 
<style scoped>
</style>
