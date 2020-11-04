<template>
  <div class="goods">
    <el-row :gutter="20">
      <el-col :span="2">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table
          :data="goodsData"
          style="width: 100%;">
          <el-table-column
            prop="id"
            label="id"
            width="68px">
          </el-table-column>
          <el-table-column
            prop="unique"
            label="商品ID"
            width="188px">
          </el-table-column>
          <el-table-column
            label="商品大图"
            width="128px">
            <template slot-scope="scope">
              <img style="width: 32px; height: 32px;" :src="baseUrl + 'storage/' + scope.row.thumb">
            </template>
          </el-table-column>
          <el-table-column
            label="商品所属栏目">
            <template slot-scope="scope">
              <span>{{ typeFilter(scope.row.type) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="price"
            label="商品价格">
          </el-table-column>
          <el-table-column
            prop="tally"
            label="商品标签">
          </el-table-column>
          <el-table-column label="操作" width="240px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--删除商品对话框-->
    <el-dialog
      title="删除商品"
      :visible.sync="dialogDel"
      width="320px"
      center>
      <span>您确定要删除该商品吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDel = false">取 消</el-button>
        <el-button type="primary" @click="goodsDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!--新增商品对话框-->
    <el-dialog
      title="新增商品"
      :visible.sync="dialogAdd"
      width="540px">
      <span>
        <el-row :gutter="24">
          <el-col :span="19" :offset="2">
            <el-form label-position="left" label-width="86px" ref="addData" :model="addData" :rules="addRules">
              <el-form-item label="商品大图:">
                <el-upload
                  class="avatar-uploader"
                  :multiple="false"
                  :action="baseUrl + 'apg/goods/upload'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="addData.thumb" :src="baseUrl + 'storage/' + addData.thumb" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="所属栏目:" prop="type">
                <el-radio-group v-model="addData.type" size="small">
                  <el-radio label="0" border>标签 1</el-radio>
                  <el-radio label="1" border>标签 2</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="商品名称:" prop="title">
                <el-input v-model="addData.title" type="text" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品价格:" prop="price">
                <el-input v-model="addData.price" type="text" placeholder="请输入商品价格"></el-input>
              </el-form-item>
              <el-form-item label="商品标签:" prop="tally">
                <el-input v-model="addData.tally" type="text" placeholder="请输入商品标签"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 42%;" @click="dialogAdd = false">取 消</el-button>
                <el-button type="primary" style="width: 42%;" @click="verifyAddForm('addData')">确 定</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <!--编辑商品对话框-->
    <el-dialog
      title="编辑商品"
      :visible.sync="dialogEdit"
      width="540px">
      <span>
        <el-row :gutter="24">
          <el-col :span="19" :offset="2">
            <el-form label-position="left" label-width="86px" ref="editData" :model="editData" :rules="editRules">
              <el-form-item label="商品大图:">
                <el-upload
                  class="avatar-uploader"
                  :multiple="false"
                  :action="baseUrl + 'apg/goods/upload'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="editData.thumb" :src="baseUrl + 'storage/' + editData.thumb" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="所属栏目:" prop="type">
                <el-radio-group v-model="editData.type" size="small">
                  <el-radio label="0" border>标签 1</el-radio>
                  <el-radio label="1" border>标签 2</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="商品名称:" prop="title">
                <el-input v-model="editData.title" type="text" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品价格:" prop="price">
                <el-input v-model="editData.price" type="text" placeholder="请输入商品价格"></el-input>
              </el-form-item>
              <el-form-item label="商品标签:" prop="tally">
                <el-input v-model="editData.tally" type="text" placeholder="请输入商品标签"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 42%;" @click="dialogEdit = false">取 消</el-button>
                <el-button type="primary" style="width: 42%;" @click="verifyEditForm('editData')">确 定</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "./../assets/css/goods.less"
import { queryGoods, addGoods, editGoods, deleteGoods } from "./../assets/api/goods.js"
export default {
  name: "Goods",
  data() {
    return {
      baseUrl: process.env.VUE_APP_DOMAIN,
      goodsData: [],
      dialogDel: false,
      delData: {},
      dialogAdd: false,
      addData: {
        thumb: '',
        title: '',
        price: '',
        tally: '',
        type: '0',
      },
      addRules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ],
        tally: [
          { required: true, message: '请输入商品标签', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ]
      },
      dialogEdit: false,
      editData: {
        id: '',
        index: 0,
        thumb: '',
        title: '',
        price: '',
        tally: '',
        type: '0'
      },
      editRules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ],
        tally: [
          { required: true, message: '请输入商品标签', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.manageGoods();
  },
  methods: {
    async manageGoods() {
      let result = await queryGoods();
      if (result.status) {
        this.goodsData = result.data;
      }
    },
    handleDelete(index, row) {
      this.delData = row;
      this.dialogDel = true;
    },
    async goodsDelete() {
      let result = await deleteGoods(this.delData);
      if (result.status) {
        this.goodsData = this.goodsData.filter(item => item.id != this.delData.id);
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
      this.dialogDel = false;
    },
    handleEdit(index, row) {
      console.log(row, "row")
      this.editData.id = row.id;
      this.editData.index = index;
      this.editData.unique = row.unique;
      this.editData.thumb = row.thumb;
      this.editData.title = row.title;
      this.editData.price = row.price.toString();
      this.editData.tally = row.tally;
      this.editData.type = row.type.toString();
      this.dialogEdit = true;
    },
    handleAdd() {
      this.dialogAdd = true;
    },
    verifyAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.addData.thumb) {
          this.createGoods();
        } else {
          this.$message({
            message: '请输入商品信息～',
            type: 'warning'
          });
          return false;
        }
      });
    },
    verifyEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.editData.thumb) {
          this.eidtGoods();
        } else {
          this.$message({
            message: '请输入商品信息～',
            type: 'warning'
          });
          return false;
        }
      });
    },
    async eidtGoods() {
      let result = await editGoods(this.editData);
      if (result.status) {
        let index = this.editData.index;
        this.goodsData[index].price = result.data.price;
        this.goodsData[index].tally = result.data.tally;
        this.goodsData[index].thumb = result.data.thumb;
        this.goodsData[index].title = result.data.title;
        this.dialogEdit = false;
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
    },
    async createGoods() {
      let result = await addGoods(this.addData);
      if (result.status) {
        this.goodsData.push(result.data);
        this.addData.thumb = '';
        this.addData.title = '';
        this.addData.price = '';
        this.addData.tally = '';
        this.addData.type = '';
        this.dialogAdd = false;
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      if (this.dialogAdd) {
        this.addData.thumb = res.data;
      } else {
        this.editData.thumb = res.data;
      }
    },
    beforeAvatarUpload(file) {
      const type = file.type === 'image/jpeg' || file.type === 'image/png';
      const size = file.size / 1024 / 1024 < 1;

      if (!type) {
        this.$message.error('上传头像图片只能是JPG或PNG格式!');
      }
      if (!size) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return type && size;
    },
    typeFilter(type) {
      switch(type)
      {
        case 0:
          return '标签 1';
        case 1:
          return '标签 2';
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods {
  position: relative;
  margin: 18px 0 0 0;
  width: 100%;
  min-height: 100vh;
}
</style>