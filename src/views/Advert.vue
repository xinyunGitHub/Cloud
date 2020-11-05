<template>
  <div class="advert">
    <el-row :gutter="20" style="padding: 12px 0 12px 0;">
      <el-col :span="2">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table
          :data="advertData"
          style="width: 100%;">
          <el-table-column
            prop="id"
            label="id"
            width="68px">
          </el-table-column>
          <el-table-column
            label="商品大图">
            <template slot-scope="scope">
              <img style="width: 32px; height: 32px;" :src="baseUrl + 'storage/' + scope.row.thumb">
            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序">
          </el-table-column>
          <el-table-column
            prop="route"
            label="跳转ID">
          </el-table-column>
          <el-table-column label="操作" width="168px">
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
    <!--删除广告对话框-->
    <el-dialog
      title="删除广告"
      :visible.sync="dialogDel"
      width="320px"
      center>
      <span>您确定要删除该广告吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDel = false">取 消</el-button>
        <el-button type="primary" @click="advertDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!--新增广告对话框-->
    <el-dialog
      title="新增广告"
      :visible.sync="dialogAdd"
      width="540px">
      <span>
        <el-row :gutter="24">
          <el-col :span="19" :offset="2">
            <el-form label-position="left" label-width="86px" ref="addData" :model="addData" :rules="addRules">
              <el-form-item label="广告大图:">
                <el-upload
                  class="avatar-uploader"
                  :multiple="false"
                  :action="baseUrl + 'apg/advert/upload'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="addData.thumb" :src="baseUrl + 'storage/' + addData.thumb" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="广告排序:" prop="sort">
                <el-input v-model="addData.sort" type="text" placeholder="请输入广告排序号"></el-input>
              </el-form-item>
              <el-form-item label="跳转ID" prop="route">
                <el-input v-model="addData.route" type="text" placeholder="请输入跳转ID"></el-input>
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
    <!--编辑广告对话框-->
    <el-dialog
      title="编辑广告"
      :visible.sync="dialogEdit"
      width="540px">
      <span>
        <el-row :gutter="24">
          <el-col :span="19" :offset="2">
            <el-form label-position="left" label-width="86px" ref="editData" :model="editData" :rules="editRules">
              <el-form-item label="广告大图:">
                <el-upload
                  class="avatar-uploader"
                  :multiple="false"
                  :action="baseUrl + 'apg/advert/upload'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="editData.thumb" :src="baseUrl + 'storage/' + editData.thumb" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="广告排序:" prop="sort">
                <el-input v-model="editData.sort" type="text" placeholder="请输入广告排序号"></el-input>
              </el-form-item>
              <el-form-item label="跳转ID" prop="route">
                <el-input v-model="editData.route" type="text" placeholder="请输入跳转ID"></el-input>
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
import { queryAdvert, addAdvert, editAdvert, delAdvert } from "./../assets/api/advert.js"
export default {
  name: "Advert",
  data() {
    return {
      baseUrl: process.env.VUE_APP_DOMAIN,
      advertData: [],
      dialogDel: false,
      delData: {},
      dialogAdd: false,
      addData: {
        thumb: '',
        sort: '',
        route: ''
      },
      addRules: {
        sort: [
          { required: true, message: '请输入广告序号', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        route: [
          { required: true, message: '请输入跳转ID', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      },
      dialogEdit: false,
      editData: {
        id: '',
        index: 0,
        thumb: '',
        sort: '',
        route: ''
      },
      editRules: {
        sort: [
          { required: true, message: '请输入广告序号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        route: [
          { required: true, message: '请输入跳转ID', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.manageAdvert();
  },
  methods: {
    handleAdd() {
      this.dialogAdd = true;
    },
    handleEdit(index, row) {
      console.log(row, "row")
      this.editData.id = row.id;
      this.editData.index = index;
      this.editData.thumb = row.thumb;
      this.editData.sort = row.sort;
      this.editData.route = row.route;
      this.dialogEdit = true;
    },
    async advertDelete() {
      let result = await delAdvert(this.delData);
      if (result.status) {
        this.advertData = this.advertData.filter(item => item.id != this.delData.id);
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
      this.dialogDel = false;
    },
    handleDelete(index, row) {
      this.delData = row;
      this.dialogDel = true;
    },
    async manageAdvert() {
      let result = await queryAdvert();
      if (result.status) {
        this.advertData = result.data;
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
    verifyAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.addData.thumb) {
          this.createAdvert();
        } else {
          this.$message({
            message: '请上传广告大图～',
            type: 'warning'
          });
          return false;
        }
      });
    },
    verifyEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.editData.thumb) {
          this.editAdvert();
        } else {
          this.$message({
            message: '请上传广告大图～',
            type: 'warning'
          });
          return false;
        }
      });
    },
    async createAdvert() {
      let result = await addAdvert(this.addData);
      if (result.status) {
        this.advertData.push(result.data);
        this.addData.thumb = '';
        this.addData.sort = '';
        this.addData.route = '';
        this.dialogAdd = false;
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
    },
    async editAdvert() {
      let result = await editAdvert(this.editData);
      if (result.status) {
        let index = this.editData.index;
        this.advertData[index].thumb = result.data.thumb;
        this.advertData[index].sort = result.data.sort;
        this.advertData[index].route = result.data.route;
        this.dialogEdit = false;
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
    },
  }
}
</script>

<style lang="less" scoped>
.advert {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
</style>