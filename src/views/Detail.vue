<template>
  <div class="detail">
    <el-row :gutter="20">
      <el-col :span="2">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table
          :data="detailData"
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
            label="商品详情大图"
            width="320px">
            <template slot-scope="scope">
              <template v-for="(item, index) in scope.row.figure">
                <img :key="index" :src="baseUrl + 'storage/' + item" class="figure">
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品名称"
            width="148px">
          </el-table-column>
          <el-table-column
            prop="price"
            label="商品价格"
            width="88px">
          </el-table-column>
          <el-table-column
            label="商品详情描述"
            width="320px">
            <template slot-scope="scope">
              <template v-for="(item, index) in scope.row.describe">
                <img :key="index" :src="baseUrl + 'storage/' + item" class="describe">
              </template>
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
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--删除商品详情对话框-->
    <el-dialog
      title="删除商品详情"
      :visible.sync="dialogDel"
      width="320px"
      center>
      <span>您确定要删除该商品详情配置信息吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDel = false">取 消</el-button>
        <el-button type="primary" @click="goodsDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!--新增商品详情对话框-->
    <el-dialog
      title="新增商品详情"
      :visible.sync="dialogAdd"
      width="580px">
      <span>
        <el-row :gutter="24">
          <el-col :span="19" :offset="2">
            <el-form label-position="left" label-width="auto" ref="addData" :model="addData" :rules="addRules">
              <el-form-item label="商品选择:">
                <el-select v-model="addData.unique" placeholder="请选择">
                  <el-option
                    v-for="item in goodsList"
                    :key="item.unique"
                    :label="item.title"
                    :value="item.unique">
                    <span style="float: left">
                      <img style="margin: 2px; width: 30px; height: 30px;" :src="baseUrl + 'storage/' + item.thumb" class="figure">
                    </span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.title }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品详情大图:">
                <el-upload
                  class="upload-demo"
                  :action="baseUrl + 'apg/detail/upload'"
                  :on-success="addFigureSuccess"
                  :on-remove="addFigureRemove"
                  :file-list="figureFileList"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="商品名称:" prop="title">
                <el-input v-model="addData.title" type="text" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品价格:" prop="price">
                <el-input v-model="addData.price" type="text" placeholder="请输入商品价格"></el-input>
              </el-form-item>
              <el-form-item label="商品详情描述:">
                <el-upload
                  class="upload-demo"
                  :action="baseUrl + 'apg/detail/upload'"
                  :on-success="addDescribeSuccess"
                  :on-remove="addDescribeRemove"
                  :file-list="describeFileList"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
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
    <!--编辑商品详情对话框-->
    <el-dialog
      title="编辑商品详情"
      :visible.sync="dialogEdit"
      width="580px">
      <span>
        <el-row :gutter="24">
          <el-col :span="19" :offset="2">
            <el-form label-position="left" label-width="auto" ref="editData" :model="editData" :rules="editRules">
              <el-form-item label="商品名称:">
                <el-card>
                  <img :src="baseUrl + 'storage/' + editData.thumbGoods" style="display: inline-block; width: 68px; height: 68px">
                  <span style="padding: 12px;line-height: 24px;">{{ editData.titleGoods }}</span>
                </el-card>
              </el-form-item>
              <el-form-item label="商品详情大图:">
                <el-upload
                  class="upload-demo"
                  :action="baseUrl + 'apg/detail/upload'"
                  :on-success="editFigureSuccess"
                  :on-remove="editFigureRemove"
                  :file-list="figureFileEdit"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="商品名称:" prop="title">
                <el-input v-model="editData.title" type="text" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品价格:" prop="price">
                <el-input v-model="editData.price" type="text" placeholder="请输入商品价格"></el-input>
              </el-form-item>
              <el-form-item label="商品详情描述:">
                <el-upload
                  class="upload-demo"
                  :action="baseUrl + 'apg/detail/upload'"
                  :on-success="editDescribeSuccess"
                  :on-remove="editDescribeRemove"
                  :file-list="describeFileEdit"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
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
import "./../assets/css/detail.less"
import { queryDetail, addDetail, editDetail, deleteDetail } from "./../assets/api/detail.js"
import { queryGoods } from "./../assets/api/goods.js"
export default {
  name: "Detail",
  data() {
    return {
      baseUrl: process.env.VUE_APP_DOMAIN,
      detailData: [],
      dialogDel: false,
      delData: {},
      dialogAdd: false,
      goodsList: [],
      goodsData: [],
      addData: {
        unique: '',
        figure: [],
        title: '',
        price: '',
        describe: []
      },
      figureFileList: [],
      describeFileList: [],
      addRules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ]
      },
      dialogEdit: false,
      editData: {
        unique: '',
        figure: [],
        title: '',
        price: '',
        describe: []
      },
      figureFileEdit: [],
      describeFileEdit: [],
      editRules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    this.manageDetail();
    this.keepGoods();
  },
  methods: {
    async manageDetail() {
      let result = await queryDetail();
      if (result.status) {
        this.detailData = result.data;
      }
    },
    handleDelete(index, row) {
      this.delData = row;
      this.dialogDel = true;
    },
    async goodsDelete() {
      let result = await deleteDetail(this.delData);
      if (result.status) {
        this.detailData = this.detailData.filter(item => item.id != this.delData.id);
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
      this.dialogDel = false;
    },
    handleAdd() {
      this.manageGoods();
    },
    async keepGoods() {
      let result = await queryGoods();
      if (result.status) {
        this.goodsData = result.data;
      }
    },
    async manageGoods() {
      let result = await queryGoods();
      if (result.status) {
        let detailArr = [];
        let goodsArr = [];
        this.detailData.filter(item => detailArr.push(item.unique));
        result.data.filter(item => goodsArr.push(item.unique));
        let inter = goodsArr.filter(function(item){ return detailArr.indexOf(item) > -1 });
        this.goodsList = result.data.filter(item => !inter.includes(item.unique));
        if (this.goodsList.length > 0) {
          this.dialogAdd = true;
        } else {
            this.$message({
              message: '请在商品列表管理新增商品～',
              type: 'warning'
            });
            return false;
        }
      }
    },
    verifyAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addData.figure.length == 0) {
            this.$message({
              message: '请上传商品详情大图～',
              type: 'warning'
            });
            return false;
          }
          if (this.addData.describe.length == 0) {
            this.$message({
              message: '请上传商品描述图片～',
              type: 'warning'
            });
            return false;
          }
          this.createDetail();
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
        if (valid) {
          if (this.editData.figure.length == 0) {
            this.$message({
              message: '请上传商品详情大图～',
              type: 'warning'
            });
            return false;
          }
          if (this.editData.describe.length == 0) {
            this.$message({
              message: '请上传商品描述图片～',
              type: 'warning'
            });
            return false;
          }
          this.editDetail();
        } else {
          this.$message({
            message: '请输入商品信息～',
            type: 'warning'
          });
          return false;
        }
      });
    },
    async editDetail() {
      let result = await editDetail(this.editData);
      if (result.status) {
        let index = this.editData.index;
        this.detailData[index].figure = result.data.figure;
        this.detailData[index].title = result.data.title;
        this.detailData[index].price = result.data.price;
        this.detailData[index].describe = result.data.describe;
        this.dialogEdit = false;
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
    },
    async createDetail() {
      let result = await addDetail(this.addData);
      if (result.status) {
        this.detailData.push(result.data);
        this.addData.unique = '';
        this.addData.figure = [];
        this.addData.title = '';
        this.addData.price = '';
        this.addData.describe = [];
        this.figureFileList = [];
        this.describeFileList = [];
        this.dialogAdd = false;
        this.$message({
          message: result.message,
          type: 'success'
        });
      } else {
        this.$message.error(result.message);
      }
    },
    handleEdit(index, row) {
      this.editData.id = row.id;
      this.editData.index = index;
      this.editData.unique = row.unique;
      this.editData.figure = row.figure;
      this.editData.title = row.title;
      this.editData.price = row.price.toString();
      this.editData.describe = row.describe;
      // 查询编辑商品的列表信息
      let list = this.goodsData.filter(item => item.unique == this.editData.unique);
      this.editData.thumbGoods = list[0].thumb;
      this.editData.titleGoods = list[0].title;
      // 初始化已上传大图和描述
      const figure = [];
      this.editData.figure.filter(item => figure.push({name: '', url: this.baseUrl + 'storage/' + item}));
      const describe = [];
      this.editData.describe.filter(item => describe.push({name: '', url: this.baseUrl + 'storage/' + item}));

      this.figureFileEdit = figure;
      this.describeFileEdit = describe;
      this.dialogEdit = true;
    },
    addFigureSuccess(res, file) {
      console.log(res, file);
      this.addData.figure.push(res.data);
    },
    addFigureRemove(file, fileList) {
      console.log(file, fileList);
      const list = [];
      fileList.filter(item => list.push(item.response.data))
      this.addData.figure = list;
    },
    addDescribeSuccess(res, file) {
      console.log(res, file);
      this.addData.describe.push(res.data);
    },
    addDescribeRemove(file, fileList) {
      console.log(file, fileList);
      const list = [];
      fileList.filter(item => list.push(item.response.data))
      this.addData.describe = list;
    },
    editFigureSuccess(res, file) {
      console.log(res, file);
      this.editData.figure.push(res.data);
    },
    editFigureRemove(file, fileList) {
      console.log(file, fileList);
      const list = [];
      fileList.filter(item => list.push(item.response.data))
      this.editData.figure = list;
    },
    editDescribeSuccess(res, file) {
      console.log(res, file);
      this.editData.describe.push(res.data);
    },
    editDescribeRemove(file, fileList) {
      console.log(file, fileList);
      const list = [];
      fileList.filter(item => list.push(item.response.data))
      this.editData.describe = list;
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
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  position: relative;
  width: 100%;
  min-height: 100vh;
  .figure {
    border: 1px solid #eeeeee;
    display: inline-block;
    width: 48px;
    height: 24px;
  }
  .describe {
    border: 1px solid #eeeeee;
    display: inline-block;
    width: 48px;
    height: 24px;
  }
}
</style>