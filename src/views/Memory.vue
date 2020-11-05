<template>
  <div class="memory">
    <el-row :gutter="20" style="padding: 22px 0 0 0;">
      <el-col :span="24">
        <el-table
          :data="memoryData"
          style="width: 100%;">
          <el-table-column
            prop="id"
            label="id"
            width="68px">
          </el-table-column>
          <el-table-column
            prop="unique"
            label="商品ID"
            width="128px">
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="price"
            label="商品价格"
            width="88px">
          </el-table-column>
          <el-table-column
            label="商品SKU">
            <template slot-scope="scope">
              <template v-for="(item, index) in scope.row.memory">
                <el-row :gutter="20" :key="index">
                  <el-col :span="4" style="margin: 6px 0;">
                    <span>{{ item.type }}: </span>
                  </el-col>
                  <el-col :span="20">
                    <span v-for="(list, idx) in item.value" :key="idx">
                      <el-tag style="margin: 0 3px;">{{ list }}</el-tag>
                    </span>
                  </el-col>
                </el-row>
              </template>
            </template>
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
    <!--删除商品SKU对话框-->
    <el-dialog
      title="删除商品SKU"
      :visible.sync="dialogDel"
      width="320px"
      center>
      <span>您确定要删除该商品SKU配置信息吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDel = false">取 消</el-button>
        <el-button type="primary" @click="skuDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑商品SKU对话框-->
    <el-dialog
      title="编辑商品SKU"
      :visible.sync="dialogEdit"
      width="580px">
      <span>
        <el-row :gutter="24">
          <el-col :span="19" :offset="2">
            <el-form label-position="left" label-width="auto" ref="editData" :model="editData">
              <el-form-item label="商品名称:" prop="price">
                <el-input v-model="editData.title" type="text" disabled placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item
                  v-for="(item, index) in skuCreate"
                  :label="'Sku类型' + index"
                  :key="index"
                >
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-input v-model="item.type" size="small"></el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-button @click="addType" size="small">新增类型</el-button>
                  </el-col>
                  <el-col :span="6">
                    <el-button v-if="index != 0" @click.prevent="removeType(index)" size="small">删除</el-button>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="2">
                    <span>值:</span>
                  </el-col>
                  <el-col :span="22">
                    <el-input v-model="item.bunch" size="small" placeholder="红色、白色、紫色"></el-input>
                  </el-col>
                </el-row>
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
import { queryMemory, editMemory, delMemory } from "./../assets/api/memory.js"
export default {
  name: "Memory",
  data() {
    return {
      baseUrl: process.env.VUE_APP_DOMAIN,
      memoryData: [],
      dialogDel: false,
      delData: {},
      dialogEdit: false,
      editData: {
        id: '',
        index: '',
        price: '',
        title: '',
        unique: ''
      },
      skuCreate: [
        {
          type: '',
          bunch: '',
          value: []
        }
      ],
    }
  },
  created() {
    this.manageMemory();
  },
  methods: {
    async manageMemory() {
      let result = await queryMemory();
      if (result.status) {
        // 格式化SKU数据
        let memory = result.data.detail;
        let skukey = result.data.skukey;
        let skuvalue = result.data.skuvalue;

        for (let i = 0; i < memory.length; i++) {
          let arr = [];
          skukey.filter(item => {
            if (memory[i].unique == item.unique) {
              let val = [];
              skuvalue.filter(list => {
                if (list.sku == item.id) {
                  val.push(list.value);
                }
              });
              item['bunch'] = val.join('|');
              item['value'] = val;
              arr.push(item);
            }
          });
          memory[i]['memory'] = arr;
        }
        this.memoryData = memory;
      }
    },
    handleDelete(index, row) {
      row.index = index;
      this.delData = row;
      this.dialogDel = true;
    },
    async skuDelete() {
      let result = await delMemory(this.delData);
      if (result.status) {
        this.memoryData[this.delData.index].memory = [];
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
      this.editData.id = row.id;
      this.editData.index = index;
      this.editData.price = row.price;
      this.editData.title = row.title;
      this.editData.unique = row.unique;
      if (row.memory.length > 0) {
        this.skuCreate = row.memory;
      } else {
        this.skuCreate = [];
        let list = {
          type: '',
          bunch: '',
          value: []
        };
        this.skuCreate.push(list);
      }
      this.dialogEdit = true;
    },
    addType() {
      this.skuCreate.push({
        type: '',
        bunch: ''
      });
    },
    removeType(sort) {
      this.skuCreate = this.skuCreate.filter((item, index) => index != sort);
    },
    verifyEditForm() {
      if (this.skuCreate[0].type) {
        if (this.skuCreate[0].bunch) {
          for (let i = 0; i < this.skuCreate.length; i++) {
            let list = this.skuCreate[i].bunch.split('|');
            this.skuCreate[i].value = list;
          }
          this.editMemory();
        } else {
          this.$message({
            message: '请输入Sku值～',
            type: 'warning'
          });
          return false;
        }
      } else {
          this.$message({
            message: '请输入Sku类型～',
            type: 'warning'
          });
          return false;
      }
    },
    async editMemory() {
      let params = {
        unique: this.editData.unique,
        sku: this.skuCreate
      }
      let result = await editMemory(params);
      if (result.status) {
        // 重置数据
        this.editData.id = '';
        this.editData.price = '';
        this.editData.title = '';
        this.editData.unique = '';
        // 更新列表数据
        let index = this.editData.index;
        this.$set(this.memoryData[index], 'memory', this.skuCreate);
        this.$message({
          message: result.message,
          type: 'success'
        });
        this.dialogEdit = false;
      } else {
          this.$message({
            message: result.message,
            type: 'warning'
          });
          return false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.memory {
  position: relative;
  width: 100%;
  min-height: 100vh;
  .describe {
    border: 1px solid #eeeeee;
    display: inline-block;
    width: 118px;
    height: 56px;
  }
}
</style>