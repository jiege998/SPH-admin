<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            v-for="item in tardeMarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="imageUrl"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleValue.length}未选择`"
          v-model="attrIdAndName"
        >
          <el-option
            v-for="unSelect in unSelectSaleValue"
            :key="unSelect.id"
            :value="`${unSelect.id}:${unSelect.name}`"
            :label="unSelect.name"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" :data="spu.spuSaleAttrList">
          <el-table-column label="序号" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row, index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="calcel">取消</el-button>
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
      dialogImageUrl: "",
      dialogVisible: false,
      attrIdAndName: "", //收集销售属性的Id
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: "",
        spuImageList: [
          // {
          //   id:'',
          //   imgName:'',
          //   imgUrl:'',
          //   spuId:0,
          // }
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId:0,
          //   id:0,
          //   saleAttrName:'',
          //   spuSaleAttrValueList:[
          //     {
          //       baseSaleAttrId:0,
          //       id:0,
          //       isChecked:'',
          //       saleAttrName:'',
          //       saleAttrValueName:'',
          //       spuId:0,
          //     }
          //   ]
          // }
        ],
      },
      tardeMarkList: [],
      imageUrl: [],
      saleList: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  // 计算属性
  computed: {
    //还未选择的销售属性
    unSelectSaleValue() {
      return this.saleList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
    },
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    handleRemove(file, fileList) {
      this.imageUrl = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlerSuccess(response, file, fileList) {
      this.imageUrl = fileList;
    },
    async addSpuDate(category3Id) {
      this.spu.category3Id = category3Id
      let tardeMarkList = await this.$API.spu.reqtradeMark();
      if (tardeMarkList.code == 200) {
        this.tardeMarkList = tardeMarkList.data;
      }
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleList = saleResult.data;
      }
    },
    async initSpuDate(spu) {
      let res = await this.$API.spu.reqSpu(spu.id);
      if (res.code == 200) {
        this.spu = res.data;
      }
      let tardeMarkList = await this.$API.spu.reqtradeMark();
      if (tardeMarkList.code == 200) {
        this.tardeMarkList = tardeMarkList.data;
      }
      let imageList = await this.$API.spu.reqSpuImage(spu.id);
      if (imageList.code == 200) {
        imageList.data.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.imageUrl = imageList.data;
      }
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleList = saleResult.data;
      }
    },
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      row.inputVisible = false;
      if (inputValue.trim() == "") {
        this.$message.warning("属性值不能为空");
        return;
      }
      let result = row.spuSaleAttrValueList.every((item) => {
        return item.saleAttrValueName != inputValue;
      });
      if (!result) {
        this.$message.warning("属性值不能重复");
        return;
      }
      row.spuSaleAttrValueList.push({
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      });
    },
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(":");
      this.spu.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      });
      this.attrIdAndName = "";
    },
    addSaleAttrValue(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    async addOrUpdateSpu() {
      this.spu.spuImageList = this.imageUrl.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });

      let res = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      if (res.code == 200) {
        this.$message.success(this.spu.id ? "修改成功" : "添加成功");
        this.$emit("changeScene", {scene:0,flag:this.spuId?'修改':'添加'});
        Object.assign(this._data,this.$options.data())
      }
    },
    calcel(){
      this.$emit("changeScene", {scene:0})
      //清理数据
      Object.assign(this._data,this.$options.data())
    }
  },
};
</script> 
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #111111;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
