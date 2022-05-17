<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          v-model="skuInfo.price"
          type="number"
          min="0"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          placeholder="规格描述"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id" style="margin-top:15px" label-width="150px">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option v-for="attrValue in attr.attrValueList" :key="attrValue.id" :value="`${attr.id}:${attrValue.id}`" :label="attrValue.valueName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndsaleValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="80">
          </el-table-column>
          <el-table-column  label="图片" width="width">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" alt="" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <el-button type="primary" v-if="row.isDefault == 0" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancal">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        category3Id: "",
        price: 0,
        spuId: "",
        tmId: "",
        skuName: "",
        skuDefaultImg:'',
        weight: "",
        skuDesc: "",
        skuImageList: [
          //   {
          //   id:0,
          //   imgName:'',
          //   imUrl:'',
          //   isDefault:'',
          //   skuId:0,
          //   spuImgId:0,
          // }
        ],
        skuAttrValueList: [
          // {
          //   attrId:0,
          //   attrName:'',
          //   id:0,
          //   skuId:0,
          //   valueId:0,
          //   valueName:''
          // }
        ],
        skuSaleAttrValueList: [
          // {
          //   //   id:0,
          //   //   saleAttrId:0
          //   //   saleAttrName:'',
          //   //   saleAttrValueId:0,
          //   //   skuId:0,
          //   //   spuId:0,
          //   //   saleAttrValueName:''
          // },
        ],
      },
      spu: {},
      imgList:[],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async getDate(sku, category1Id, category2Id) {
      this.skuInfo.category3Id = sku.category3Id;
      this.skuInfo.spuId = sku.id;
      this.skuInfo.tmId = sku.tmId;
      this.spu = sku;
      let spuImageList = await this.$API.spu.reqSpuImageList(sku.id);
      if (spuImageList.code == 200) {
        let result = spuImageList.data
        result.forEach(element => {
          element.isDefault = 0
        });
        this.spuImageList = result;
      }
      let spuSaleAttrList = await this.$API.spu.reqSpuSaleAttrList(sku.id);
      if (spuSaleAttrList == 200) {
        this.spuSaleAttrList = spuSaleAttrList.data;
      }
      let attrInfoList = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        sku.category3Id
      );
      if (attrInfoList.code == 200) {
        this.attrInfoList = attrInfoList.data;
      }
    },
    handleSelectionChange(parmas){
      this.imgList = parmas
    },
    changeDefault(row){
      this.spuImageList.forEach(item=>{
        item.isDefault = 0
      })
      row.isDefault =  1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    cancal(){
      this.$emit('changeScene',{scene:0})
      Object.assign(this._data,this.$options.data())
    },
   async save(){
     const {attrInfoList,skuInfo,spuSaleAttrList,imgList} = this
   let attr = attrInfoList.reduce((pre,item)=>{
      if(item.attrIdAndValueId){
        const [attrId,valueId]=  item.attrIdAndValueId.split(':')
        pre.push({attrId,valueId})
      }
      return pre
    },[])
     skuInfo.skuAttrValueList = attr
     let sku = spuSaleAttrList.reduce((pre,item)=>{
      if(item.attrIdAndValueId){
        const [saleAttrId,saleAttrvalueId]=  item.saleAttrIdAndsaleValueId.split(':')
        pre.push({saleAttrId,saleAttrvalueId})
      }
      return pre
    },[])
     skuInfo.skuSaleAttrValueList = sku
     skuInfo.skuImageList = imgList.map(item=>{
       return {
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id
       }
      
     })
    let res = await  this.$API.spu.reqAddSku(skuInfo)
    if(res.code == 200){
      this.$message.success('添加sku成功')
      this.$emit("changeScene", {scene:0})
    }
    }
  }
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
</style>
