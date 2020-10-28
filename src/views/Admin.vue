<template>
  <div class="admin">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table
          :data="adminData"
          style="width: 100%;">
          <el-table-column
            prop="id"
            label="id">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="account"
            label="账号">
          </el-table-column>
          <el-table-column
            label="密码">
            <template>
              <span style="margin-left: 10px">******</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.id == 1"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handleAdd(scope.$index, scope.row)">新增</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--新增管理员对话框-->
    <el-dialog
      title="新增管理员"
      :visible.sync="dialogAdd"
      width="420px">
      <span>
        <el-row :gutter="24">
          <el-col :span="19" :offset="2">
            <el-form label-position="left" label-width="58px" ref="addData" :model="addData" :rules="addRules">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="addData.name" type="text" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="账号" prop="account">
                <el-input v-model="addData.account" type="text" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="addData.password" type="password" placeholder="请输入密码"></el-input>
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
    <!--编辑管理员对话框-->
    <el-dialog
      title="编辑管理员"
      :visible.sync="dialogEdit"
      width="420px">
      <span>
        <el-row :gutter="24">
          <el-col :span="19" :offset="2">
            <el-form label-position="left" label-width="64px" ref="editData" :model="editData" :rules="editRules">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="editData.name" type="text" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="账号" prop="account">
                <el-input v-model="editData.account" type="text" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="旧密码" prop="password">
                <el-input v-model="editData.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="change">
                <el-input v-model="editData.change" type="password" placeholder="请输入密码"></el-input>
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
import { queryAdmin, addAdmin, editAdmin, deleteAdmin } from "./../assets/api/admin.js"
export default {
  name: "Admin",
  data() {
    return {
      adminData: [],
      dialogAdd: false,
      addData: {
        name: '',
        account: '',
        password: ''
      },
      addRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      },
      dialogEdit: false,
      editData: {
        id: '',
        index: 0,
        name: '',
        account: '',
        password: '',
        change: ''
      },
      editRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        change: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.manageAdmin();
  },
  methods: {
    async manageAdmin() {
      let result = await queryAdmin();
      if (result.status) {
        this.adminData = result.data;
      }
    },
    async handleDelete(index, row) {
      let result = await deleteAdmin(row);
      if (result.status) {
        this.adminData = this.adminData.filter(item => item.id != row.id);
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
    },
    async handleEdit(index, row) {
      this.editData.id = row.id;
      this.editData.index = index;
      this.editData.name = row.name;
      this.editData.account = row.account;
      this.dialogEdit = true;
    },
    handleAdd() {
      this.dialogAdd = true;
    },
    verifyAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addAccount();
        } else {
          this.$message({
            message: '姓名账号密码输入错误～',
            type: 'warning'
          });
          return false;
        }
      });
    },
    verifyEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editAccount();
        } else {
          this.$message({
            message: '姓名账号密码输入错误～',
            type: 'warning'
          });
          return false;
        }
      });
    },
    async addAccount() {
      let result = await addAdmin(this.addData);
      if (result.status) {
        this.adminData.push(result.data);
        this.dialogAdd = false;
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
    },
    async editAccount() {
      let result = await editAdmin(this.editData);
      if (result.status) {
        let index = this.editData.index;
        this.adminData[index].name = result.data.name;
        this.editData.password = '';
        this.editData.change = '';
        this.dialogEdit = false;
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.admin {
  position: relative;
  margin: 18px 0 0 0;
  width: 100%;
  min-height: 100vh;
}
</style>