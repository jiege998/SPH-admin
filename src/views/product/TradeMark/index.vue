<!--
  功能：功能描述
  作者：fyj
  邮箱：1981820505@qq.com
  时间：2022年04月27日 14:13:54
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
-->
<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="addradeMark"
      >添加</el-button
    >
    <el-table style="width: 100%" border :data="trademarkInfo">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 20px; text-align: center"
      @current-change="getData"
      @size-change="handleSizeChange"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="tmfrom">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            autocomplete="off"
            label-width="100px"
            v-model="tmForm.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip" style="marginleft: 70px">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "TradeMark",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      limit: 5,
      page: 1,
      total: 0,
      trademarkInfo: [],
      dialogFormVisible: false,
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        logoUrl: [
          { required: true, message: "请选择Logo图片" },
        ],
      },
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async getData(pager = 1) {
      this.page = pager;
      const { page, limit } = this;
      let res = await this.$API.trademark.reqTradeMark(page, limit);
      if (res.code == 200) {
        this.total = res.data.total;
        this.trademarkInfo = res.data.records;
      }
    },
    handleSizeChange(limitr) {
      this.limit = limitr;
      this.getData();
    },
    addradeMark() {
      this.tmForm.tmName = "";
      this.tmForm.logoUrl = "";
      this.dialogFormVisible = true;
    },
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      this.tmForm = { ...row };
    },
    deleteTradeMark(row) {
        this.$confirm(`此操作将永久删除${row.tmName}品牌, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
         let res = await this.$API.trademark.reqDeleteTradeMark(row.id)
         if(res.code == 200){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData(this.trademarkInfo.length >1?this.page:this.page)
         }else{
           this.$message({
            type: 'error',
            message: '删除失败!'
          });
         } 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addOrUpdateTradeMark() {
       this.dialogFormVisible = false;
      this.$nextTick(()=>{
         this.$refs.tmfrom.validate(async(vaild) => {
        if(vaild){
        let res = await this.$API.trademark.reqAddOrUpdateTradeMark(
          this.tmForm
        );
        if (res.code == 200) {
          this.$message.success(this.tmForm.id ? "修改品牌成功" : "添加品牌成功");
          this.tmForm.tmName = "";
          this.tmForm.logoUrl = "";
          this.getData(this.tmForm.id ? this.page : 1);
        }
        }
        
      });
      })
     
    },

    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {
    this.getData();
  },
};
</script> 
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
</style>
