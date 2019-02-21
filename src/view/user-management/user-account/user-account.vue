<template>
  <div>
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="用户名" prop="name">
                <Input
                  v-model="searchData.userName"
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
                <Select
                  clearable
                  placeholder="请输入用户单位"
                  v-model="searchData.userDepartment"
                  style="width: 150px"
                >
                  <Option v-for="item in getDepartmentList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="用户权限" prop="name">
                <Select v-model="searchData.userPermissions" style="width:200px">
                  <Option v-if="this.accessAdmin" value="admin">管理员</Option>
                  <Option v-if="this.accessAdmin" value="responsible">责任人</Option>
                  <Option value="agent">经办人</Option>
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
        <FormItem label="用户名" prop="userName">
          <Input
            :disabled="roleSelect"
            v-model="userForm.userName"
            placeholder="请输入用户名称"
            style="width: 300px"
          ></Input>
        </FormItem>
        <FormItem label="用户密码" prop="userPassword">
          <Input
            v-model="userForm.userPassword"
            type="password"
            placeholder="请输入用户密码"
            style="width: auto"
          ></Input>
        </FormItem>
        <FormItem label="联系电话" prop="userPhone">
          <Input
            :number="true"
            v-model="userForm.userPhone"
            placeholder="请输入联系电话"
            style="width: 300px"
          ></Input>
        </FormItem>
        <FormItem label="用户单位" prop="department">
          <Select
            v-model="userForm.userDepartment"
            style="width:200px"
            :disabled="this.accessRespons || this.accessAgent"
          >
            <Option v-for="item in getDepartmentList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>

        <FormItem label="用户权限" prop="userPermissions">
          <Select :disabled="roleSelect" v-model="userForm.userPermissions" style="width:200px">
            <Option v-if="this.accessAdmin" value="admin">管理员</Option>
            <Option v-if="isResponsible" value="responsible">责任人</Option>
            <Option value="agent">经办人</Option>
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
import { hasOneOf } from "@/libs/tools";
import { userAjax } from "@/api/city";
// 删除URL
const DELETE_URL = "/user/delete";
// 修改URL
const UPDATE_URL = "/user/update";
// 添加URL
const INSERT_URL = "/user/insert";
// 查询URL
const QUERY_URL = "/user/query";
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
      } else if (!PHONE_REG.test(this.userForm.userPhone)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
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
        userName: "", // 用户名
        userDepartment: "", // 用户单位
        userPermissions: "", // 用户权限
        userPhone: "", // 手机号
        userPassword: "" // 密码
      },
      searchData: {
        userName: "",
        userDepartment: "",
        userPermissions: ""
      },
      searchReg: {},
      userReg: {
        userName: [
          {
            required: true,
            message: "请输入指标名称",
            trigger: "blur"
          }
        ],
        userDepartment: [
          {
            required: true,
            message: "请输入指标名称",
            trigger: "blur"
          }
        ],
        userPhone: [
          {
            required: true,
            validator: phoneReg,
            trigger: "blur"
          }
        ],
        userPassword: [
          {
            required: true,
            message: "请输入指标名称",
            trigger: "blur"
          }
        ],
        userPermissions: [
          {
            required: true,
            message: "请输入指标名称",
            trigger: "blur"
          }
        ]
      },
      userData: [
        {
          userName: "111",
          userPassword: "111",
          userDepartment: "user",
          userPermissions: "111"
        }
      ],
      userHead: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "用户名称",
          key: "userName"
        },
        {
          title: "联系电话",
          key: "userPhone"
        },
        {
          title: "用户密码",
          key: "userPassword",
          render: (h, params) => {
            return h("div", {}, "*********");
          }
        },
        {
          title: "用户单位",
          key: "userDepartment"
        },
        {
          title: "用户权限",
          key: "userPermissions",
          render: (h, params) => {
            var text = "";
            var tagColor = "";
            switch (params.row.userPermissions) {
              case "admin":
                text = "管理员";
                tagColor = "primary";
                break;
              case "responsible":
                text = "责任人";
                tagColor = "success";
                break;
              case "agent":
                text = "经办人";
                tagColor = "warning";
                break;
              default:
                break;
            }
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: tagColor
                }
              },
              text
            );
          }
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
        userName: "",
        userDepartment: "",
        userPermissions: ""
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
                this.$Message.error("添加失败！");
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
        userName: "", // 用户名
        userDepartment: "", // 用户单位
        userPermissions: "", // 用户权限
        userPhone: "", // 手机号
        userPassword: "" // 密码
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
      const keyOne = "userEntity";
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
      const keyOne = "userFilter";
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
