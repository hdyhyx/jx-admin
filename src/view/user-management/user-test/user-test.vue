<template>
  <div>
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="用户名" prop="name">
                <Input
                  v-model="searchData.name"
                  suffix="ios-search"
                  placeholder="请输入用户名称"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="用户单位" prop="name">
                <Input v-model="searchData.department" placeholder="请输入用户单位" style="width: auto"></Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="用户性别" prop="name">
                <Select v-model="searchData.gender" style="width:200px">
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
          <FormItem>
            <Button
              type="primary"
              style="marigin:0 20px"
              :loading="searchLoading"
              @click="searchSubmit(10,1)"
            >提交搜索</Button>
            <Button @click="submitReset">重置搜索</Button>
          </FormItem>
        </Form>
        <Button @click="showUserModal">添加用户</Button>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
        <Button type="error" @click="deleteUser" :disabled="!deleteArr['list'].length">批量删除</Button>
        <Table
          @on-select-all="tabelBatchSelect"
          @on-select-all-cancel="TableCancelSelect"
          :loading="tabelLoading"
          :columns="userHead"
          :data="userData"
        ></Table>
        <div style="margin-top:20px;margin-left:35%">
          <Page
            @on-change="pageNumberChange"
            :page-size="pageSize"
            :total="pageTotal"
            @on-page-size-change="pageSizeChange"
            show-elevator
            show-sizer
          />
        </div>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
        <Upload
          :on-success="handleSuccess"
          :format="['xls','xlsx']"
          :on-format-error="handleFormatError"
          action="/api/evaluateUser/importEvaluateUser"
        >
          <Button icon="ios-cloud-upload-outline">上传测试对象</Button>
        </Upload>
      </Card>
    </Row>
    <!-- 添加用户/编辑用户 -->
    <Modal
      v-model="isUserModal"
      :title="userModalTitle"
      :loading="userModalLoading"
      @on-cancel="cancelUserModal"
    >
      <Form ref="userManagement" :model="userForm" :rules="userReg" :label-width="80">
        <FormItem label="用户名" prop="name">
          <Input v-model="userForm.name" placeholder="请输入用户名称" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input :number="true" v-model="userForm.phone" placeholder="请输入联系电话" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="用户年龄">
          <InputNumber :max="100" :min="1" v-model="userForm.age" style="width: 300px"></InputNumber>
        </FormItem>
        <FormItem label="用户单位" prop="department">
          <Input v-model="userForm.department" placeholder="请输入用户单位" style="width: auto"></Input>
        </FormItem>
        <FormItem label="性别">
          <Select v-model="userForm.gender" style="width:200px">
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" :loading="userModalLoading" @click="submitUserModal">提交</Button>
        <Button size="large" @click="cancelUserModal">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { userAjax, userTestAjax } from "@/api/city";
// 删除URL
const DELETE_URL = "/evaluateUser/delete";
// 修改URL
const UPDATE_URL = "/evaluateUser/update";
// 添加URL
const INSERT_URL = "/evaluateUser/insert";
// 查询URL
const QUERY_URL = "/evaluateUser/query";
// 手机验证
const PHONE_REG = new RegExp("^1(3|4|5|7|8)\\d{9}$");
const INSERT_TITLE = "添加用户";
const UPDATE_TITLE = "编辑用户";
export default {
  data() {
    // 验证手机号码
    const phoneReg = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入联系电话"));
      } else {
        if (!PHONE_REG.test(value)) {
          callback(new Error("请输入正确的手机号码"));
        }
      }
      callback();
    };
    return {
      deleteArr: { list: [] }, // 批量删除
      isUserModal: false, // 模态框
      searchLoading: false, // 搜索Loading
      userModalLoading: false, // 提交loading
      tabelLoading: false, // 表格loading
      userModalTitle: "", // 模态框title
      pageSize: 10,
      pageNumber: 1,
      pageTotal: 10,
      userForm: {
        name: "",
        department: "",
        gender: "",
        phone: "",
        age: null
      },
      searchData: {
        name: "",
        department: "",
        gender: ""
      },
      searchReg: {},
      userReg: {
        name: [
          {
            required: true,
            message: "请输入指标名称",
            trigger: "blur"
          }
        ],
        department: [
          {
            required: true,
            message: "请输入指标名称",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            validator: phoneReg,
            trigger: "blur"
          }
        ]
      },
      userData: [],
      userHead: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户名称",
          key: "name"
        },
        {
          title: "联系电话",
          key: "phone"
        },
        {
          title: "用户年龄",
          key: "age"
        },
        {
          title: "用户单位",
          key: "department"
        },
        {
          title: "用户性别",
          key: "gender"
        },
        {
          title: "Action",
          key: "action",
          width: 160,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.userForm = JSON.parse(JSON.stringify(params.row));
                      this.userModalTitle = "编辑用户";
                      this.isUserModal = true;
                      // 如果编辑时候可以显示出来， 但是不可填写
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error"
                  },
                  on: {
                    click: () => {
                      this.deleteUser(params.row);
                      this.deleteArr = { list: [] };
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    // 表格取消全选
    TableCancelSelect(selection) {
      this.deleteArr["list"] = [];
    },
    // 表格全选
    tabelBatchSelect(selection) {
      selection.forEach(item => {
        this.deleteArr["list"].push(item.id); // 获取Id
      });
    },

    // 搜索
    searchSubmit(pageSize, pageNumber) {
      this.searchLoading = true;
      this._getUserData(this.searchData, QUERY_URL, pageSize, pageNumber);
    },
    // 重置搜索
    submitReset() {
      this.searchLoading = false;
      this.searchData = {
        userName: "",
        userDepartment: "",
        userPermissions: ""
      };
    },
    // 删除用户
    deleteUser(row) {
      this.$Modal.confirm({
        title: "删除用户",
        content: "<p>删除完成后将无法恢复</p>",
        loading: true,
        onOk: () => {
          if (row.id !== undefined) {
            this.deleteArr["list"].push(row.id);
          }
          this._userAjax(this.deleteArr, DELETE_URL).then(result => {
            this.$Modal.remove();
            if (result.code === "200") {
              this.$Message.info("删除成功!");
              this.deleteArr = { list: [] };
              this._getUserData(
                this.userData,
                QUERY_URL,
                this.pageSize,
                this.pageNumber
              );
            } else {
              this.$Message.error("删除失败！");
            }
          });
        }
      });
    },
    // 显示模态框
    showUserModal() {
      this.userModalTitle = "添加用户";
      this.isUserModal = true;
    },
    // 提交
    submitUserModal() {
      this.$refs["userManagement"].validate(valid => {
        if (valid) {
          this.userModalLoading = true;
          if (this.userModalTitle === INSERT_TITLE) {
            this._userAjax(this.userForm, INSERT_URL).then(result => {
              this.cancelUserModal();
              this.userModalLoading = false;
              if (result.code === "200") {
                this.$Message.success("添加成功！");
                this._getUserData(
                  this.searchData,
                  QUERY_URL,
                  this.pageSize,
                  this.pageNumber
                );
              } else {
                this.$Message.error("添加失败！");
              }
            });
          } else if (this.userModalTitle === UPDATE_TITLE) {
            this._userAjax(this.userForm, UPDATE_URL).then(result => {
              this.cancelUserModal();
              this.userModalLoading = false;
              if (result.code === "200") {
                this.$Message.success("添加成功！");
                this._getUserData(
                  this.searchData,
                  QUERY_URL,
                  this.pageSize,
                  this.pageNumber
                );
              } else {
                this.$Message.error("添加失败！");
              }
            });
          }
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    // 关闭模态框
    cancelUserModal() {
      this.$refs["userManagement"].resetFields();
      this.isUserModal = false;
      this.userModalLoading = false;
      this.userForm = {
        name: "",
        department: "",
        gender: "",
        phone: "",
        age: null
      };
    },
    // 页码
    pageNumberChange(pageNumber) {
      this.pageNumber = pageNumber;
      this._getUserData(
        this.searchData,
        QUERY_URL,
        this.pageSize,
        this.pageNumber
      );
    },
    // 页数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._getUserData(
        this.searchData,
        QUERY_URL,
        this.pageSize,
        this.pageNumber
      );
    },
    // 上传文件
    handleSuccess(res, file) {
      if (res.code === "200") {
        this.$Notice.success({
          title: res.message,
          desc: res.results
        });
      } else {
        this.$Notice.error({
          title: res.message,
          desc: res.results
        });
      }
    },
    // 验证上传格式
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "文件" + file.name + " 格式错误, 请选择xls或者xlsx"
      });
    },
    // 添加/修改
    _userAjax(formData, url) {
      const keyOne = "evaluateUserEntity";
      return new Promise((resolve, reject) => {
        userTestAjax({ formData, url, keyOne })
          .then(result => {
            if (result.data !== undefined) {
              resolve(result.data);
            } else {
              reject(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 查询
    _getUserData(formData, url, pageSize, pageNumber) {
      this.tabelLoading = true;
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      const keyOne = "evaluateUserFilter";
      userAjax({ formData, url, keyOne })
        .then(result => {
          this.tabelLoading = false;
          if (result.data.code === "200") {
            this.searchLoading = false;
            this.userData = result.data.results.list;
            this.pageTotal = parseInt(result.data.results.pageTotal) * 10;
            this.$Message.success("查询成功");
          } else {
            this.$Message.error("查询失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this._getUserData(
      this.searchData,
      QUERY_URL,
      this.pageSize,
      this.pageNumber
    );
  }
};
</script>
<style scoped>
</style>
