<template>
  <div class="order">
    <el-row :gutter="20" style="padding: 12px 0 12px 0;">
      <el-col :span="2">
        <el-button type="primary" @click="refreshData">刷新</el-button>
      </el-col>
      <el-col :span="8">
        <el-form :inline="true" :model="queryForm" :rules="queryRules" ref="queryForm">
          <el-form-item label="手机号/流水号" prop="value">
            <el-input v-model="queryForm.value"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="formQuery('queryForm')">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="padding: 22px 0 0 0;">
      <el-col :span="24">
        <el-table
          :data="orderData"
          style="width: 100%;">
          <el-table-column
            prop="id"
            label="id"
            width="68px">
          </el-table-column>
          <el-table-column
            prop="openid"
            label="openid"
            width="128px">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="108px">
          </el-table-column>
          <el-table-column
            prop="area"
            label="区域"
            width="128px">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="178px">
          </el-table-column>
          <el-table-column
            prop="unique"
            label="商品ID">
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
            prop="amount"
            label="总价">
          </el-table-column>
          <el-table-column
            prop="gather"
            label="已选规格">
          </el-table-column>
          <el-table-column
            prop="count"
            label="已购数量">
          </el-table-column>
          <el-table-column
            prop="water"
            label="流水号"
            width="158px">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { orderList, orderValue } from "./../assets/api/order.js"
export default {
  name: "Order",
  data() {
    return {
      orderData: [],
      queryForm: {
        value: ''
      },
      queryRules: {
        value: [
          { required: true, message: '请输入手机号吗', trigger: 'blur' },
          { min: 5, max: 100, message: '长度在5到100个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.manageOrder();
  },
  methods: {
    async manageOrder() {
      let result = await orderList();
      if (result.status) {
        this.orderData = result.data;
      }
    },
    formQuery(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.valueQuery();
        } else {
          return false;
        }
      });
    },
    async valueQuery() {
      let params = {
        value: this.queryForm.value
      };
      let result = await orderValue(params);
      if (result.status) {
        this.orderData = result.data;
        this.$message({
          message: '查询成功～',
          type: 'success'
        });
      }
    },
    refreshData() {
      this.manageOrder();
      this.$message({
        message: '刷新成功～',
        type: 'success'
      });
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
</style>