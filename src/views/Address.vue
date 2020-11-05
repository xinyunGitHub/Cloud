<template>
  <div class="address">
    <el-row :gutter="20" style="padding: 18px 0 0 0;">
      <el-col :span="2">
        <el-button type="primary" @click="refreshData">刷新</el-button>
      </el-col>
      <el-col :span="8">
        <el-form :inline="true" :model="queryForm" :rules="queryRules" ref="queryForm">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="queryForm.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="formQuery('queryForm')">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="padding: 8px 0 0 0;">
      <el-col :span="24">
        <el-table
          :data="addressData"
          style="width: 100%;">
          <el-table-column
            prop="id"
            label="id"
            width="68px">
          </el-table-column>
          <el-table-column
            prop="openid"
            label="openid"
            width="248px">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份">
          </el-table-column>
          <el-table-column
            prop="city"
            label="城市">
          </el-table-column>
          <el-table-column
            prop="county"
            label="区县">
          </el-table-column>
          <el-table-column
            prop="road"
            label="街道">
          </el-table-column>
          <el-table-column
            label="默认">
            <template slot-scope="scope">
              <span>{{ activeFilter(scope.row.active) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { queryAddress, phoneAddress } from "./../assets/api/address.js"
export default {
  name: "Address",
  data() {
    return {
      addressData: [],
      queryForm: {
        phone: ''
      },
      queryRules: {
        phone: [
          { required: true, message: '请输入手机号吗', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.manageAddress();
  },
  methods: {
    async manageAddress() {
      let result = await queryAddress();
      if (result.status) {
        this.addressData = result.data;
      }
    },
    activeFilter(act) {
      switch(act)
      {
        case 0:
          return '默认';
        case 1:
          return '非默认';
      }
    },
    formQuery(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.phoneQuery();
        } else {
          return false;
        }
      });
    },
    async phoneQuery() {
      let params = {
        phone: this.queryForm.phone
      };
      let result = await phoneAddress(params);
      if (result.status) {
        this.addressData = result.data;
        this.$message({
          message: '查询成功～',
          type: 'success'
        });
      }
    },
    refreshData() {
      this.manageAddress();
      this.$message({
        message: '刷新成功～',
        type: 'success'
      });
    }
  }
}
</script>

<style lang="less" scoped>
.address {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
</style>