<template>
  <div class="user">
    <el-row :gutter="20" style="padding: 22px 0 0 0;">
      <el-col :span="24">
        <el-table
          :data="userData"
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
            label="头像"
            width="68px">
            <template slot-scope="scope">
              <img style="width: 32px; height: 32px;" :src="scope.row.headimgurl">
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称">
          </el-table-column>
          <el-table-column
            label="性别">
            <template slot-scope="scope">
              <span>{{ sexFilter(scope.row.sex) }}</span>
              </template>
          </el-table-column>
          <el-table-column
            prop="country"
            label="国家">
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
            prop="unionid"
            label="unionid">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { queryUser } from "./../assets/api/user.js"
export default {
  name: "User",
  data() {
    return {
      userData: []
    }
  },
  created() {
    this.manageUser();
  },
  methods: {
    async manageUser() {
      let result = await queryUser();
      if (result.status) {
        this.userData = result.data;
      }
    },
    sexFilter(type) {
      switch(type)
      {
        case 0:
          return '未知';
        case 1:
          return '男';
        case 2:
          return '女';
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
</style>