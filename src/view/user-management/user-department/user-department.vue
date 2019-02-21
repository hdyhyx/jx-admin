<template>
  <div>
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="部门" prop="name">
                <Input
                  v-model="searchData.department"
                  suffix="ios-search"
                  placeholder="请输入用户名称"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
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
        <Button v-if="!this.accessAgent" @click="showUserModal">添加用户</Button>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
        <Table :loading="tabelLoading" :columns="userHead" :data="userData"></Table>
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
    <!-- 添加用户/编辑用户 -->
    <Modal
      v-model="isUserModal"
      :title="userModalTitle"
      :loading="userModalLoading"
      @on-cancel="cancelUserModal"
    >
      <Form ref="userManagement" :model="userForm" :rules="userReg" :label-width="80">
        <FormItem label="部门" prop="department">
          <Input
            :disabled="roleSelect"
            v-model="userForm.department"
            placeholder="请输入部门"
            style="width: 300px"
          ></Input>
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
import { hasOneOf } from "@/libs/tools";
import { userAjax } from "@/api/city";
// 删除URL
const DELETE_URL = "/department/delete";
// 修改URL
const UPDATE_URL = "/department/update";
// 添加URL
const INSERT_URL = "/department/insert";
// 查询URL
const QUERY_URL = "/department/query";
const INSERT_TITLE = "添加用户";
const UPDATE_TITLE = "编辑用户";
export default {
  data() {
    // 验证手机号码
    return {
      roleSelect: false, // 权限管理
      isUserModal: false, // 模态框
      searchLoading: false, // 搜索Loading
      userModalLoading: false, // 提交loading
      tabelLoading: false, // 表格loading
      userModalTitle: "", // 模态框title
      isResponsible: "",
      pageSize: 10,
      pageNumber: 1,
      pageTotal: 10,
      userForm: {
        department: "" // 用户名
      },
      searchData: {
        department: ""
      },
      userData: [],
      searchReg: {},
      userReg: {
        department: [
          {
            required: true,
            message: "请输入指标名称",
            trigger: "blur"
          }
        ]
      },
      userHead: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "部门",
          key: "department"
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
                      if (!this.accessAdmin) {
                        this.roleSelect = true;
                      }
                      this.isResponsible = true;
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
    // 搜索
    searchSubmit(pageSize, pageNumber) {
      this.searchLoading = true;
      this._getUserData(this.searchData, QUERY_URL, pageSize, pageNumber);
    },
    // 重置搜索
    submitReset() {
      this.searchLoading = false;
      this.searchData = {
        department: ""
      };
    },
    // 删除用户
    deleteUser(row) {
      if (this.accessAgent) {
        this.$Message.error("权限不足！");
        return;
      }
      this.$Modal.confirm({
        title: "删除用户",
        content: "<p>删除完成后将无法恢复</p>",
        loading: true,
        onOk: () => {
          this._userAjax(row, DELETE_URL).then(result => {
            this.$Modal.remove();
            if (result.code === "200") {
              this.$Message.info("删除成功!");
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
      this.roleSelect = false;
      // 登录角色不是admin,只能添加自己部门的啊
      if (!this.accessAdmin) {
        this.userForm.userDepartment = this.getDepartment;
      }
      // 添加用户，责任人只能添加经办人
      if (this.accessAdmin) {
        this.isResponsible = true;
      } else {
        this.isResponsible = false;
      }
    },
    // 提交
    submitUserModal() {
      this.$refs["userManagement"].validate(valid => {
        if (valid) {
          this.userModalLoading = true;
          if (this.userModalTitle === INSERT_TITLE) {
            this._userAjax(this.userForm, INSERT_URL).then(result => {
              this.isUserModal = false;
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
                this.$Message.error(result.message);
              }
            });
          } else if (this.userModalTitle === UPDATE_TITLE) {
            this._userAjax(this.userForm, UPDATE_URL).then(result => {
              this.isUserModal = false;
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
    cancelUserModal() {
      this.$refs["userManagement"].resetFields();
      this.userModalLoading = false;
      this.isUserModal = false;
      this.userForm = {
        department: "" // 用户单位
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
    // 添加/修改
    _userAjax(formData, url) {
      const keyOne = "departmentEntity";
      return new Promise((resolve, reject) => {
        userAjax({ formData, url, keyOne })
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
      const keyOne = "departmentFilter";
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
  mounted() {},
  created() {
    this._getUserData(
      this.searchData,
      QUERY_URL,
      this.pageSize,
      this.pageNumber
    );
  },
  computed: {
    getDepartmentList() {
      return this.$store.state.user.departmentList;
    },
    getDepartment() {
      return this.$store.state.user.department;
    },
    access() {
      return this.$store.state.user.access;
    },
    // 管理员
    accessAdmin() {
      return hasOneOf(["admin"], this.access);
    },
    // 责任人
    accessRespons() {
      return hasOneOf(["responsible"], this.access);
    },
    // 经办人
    accessAgent() {
      return hasOneOf(["agent"], this.access);
    }
    //
  }
};
</script>
<style scoped>
</style>
