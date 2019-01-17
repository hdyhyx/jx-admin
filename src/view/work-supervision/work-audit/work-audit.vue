<template>
  <div>
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="搜索指标" prop="name">
                <Input
                  v-model="searchData.indexName"
                  suffix="ios-search"
                  placeholder="请输入指标名称"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="责任单位" prop="name">
                <Input
                  v-model="searchData.cityResponUnit"
                  placeholder="请输入责任单位"
                  style="width: auto"
                ></Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="牵头单位">
                <Select
                  clearable
                  placeholder="请输入牵头单位"
                  v-model="searchData.leadUnit"
                  style="width: 150px"
                >
                  <Option v-for="item in getDepartmentList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="审核状态">
                <Select clearable v-model="searchData.audit" style="width:200px">
                  <Option value="0">未审核</Option>
                  <Option value="1">责任人审核</Option>
                  <Option value="2">管理员审核</Option>
                  <Option value="3">回退</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="年份">
                <DatePicker
                  type="year"
                  format="yyyy"
                  @on-change="searchSelectYear"
                  placeholder="按年份搜索"
                  style="width:185px"
                  v-model="searchData.dateTime"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="月份">
                <Select clearable v-model="searchData.monthTime" style="width:80px">
                  <Option value="1">1月</Option>
                  <Option value="2">2月</Option>
                  <Option value="3">3月</Option>
                  <Option value="4">4月</Option>
                  <Option value="5">5月</Option>
                  <Option value="6">6月</Option>
                  <Option value="7">7月</Option>
                  <Option value="8">8月</Option>
                  <Option value="9">9月</Option>
                  <Option value="10">10月</Option>
                  <Option value="11">11月</Option>
                  <Option value="12">12月</Option>
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
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
        <Button :disabled="!checkAllData.length" @click="checkAllPass">全选审核</Button>
        <Table
          border
          highlight-row
          :loading="tabelLoading"
          @on-select-all="handleCheckAll"
          @on-select-all-cancel="handleCheckCancel"
          ref="currentRowTable"
          :columns="workDataTitle"
          :data="workDataContent"
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
    <!-- 增加项目 -->
    <Modal @on-cancel="showState" v-model="isInsertModal" :title="'工作督查指标分数填入'">
      <Form ref="work" :model="workForm" :rules="workFormReg" :label-width="100" inline>
        <FormItem label="名称指标" prop="indexName">
          <Input v-model="workForm.indexName" disabled placeholder="请输入指标名称" style="width:300px"></Input>
        </FormItem>
        <FormItem label="市考核责任单位" prop="cityResponUnit">
          <Input
            v-model="workForm.cityResponUnit"
            disabled
            placeholder="请输入市考核责任单位"
            style="width:300px"
          ></Input>
        </FormItem>
        <FormItem label="市考核牵头单位" prop="leadUnit">
          <Input v-model="workForm.leadUnit" disabled placeholder="暂无数据" style="width:300px"></Input>
        </FormItem>
        <FormItem label="考核配合单位">
          <Input v-model="workForm.cooperateUnit" disabled placeholder="暂无数据" style="width:300px"></Input>
        </FormItem>
        <Row>
          <Col span="11">
            <FormItem label="扣分上限" prop="maxPoint">
              <InputNumber disabled :max="10" :min="0" :step="0.1" v-model="workForm.maxPoint"></InputNumber>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="实际扣分" prop="maxPoint">
              <InputNumber
                disabled
                :max="workForm.maxPoint"
                :min="0"
                :step="0.1"
                v-model="workForm.score"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="指标年份" prop="dateTime">
              <DatePicker
                type="year"
                format="yyyy"
                disabled
                @on-change="workSelectYear"
                placeholder="按年份搜索"
                style="width:auto"
                :value="workForm.dateTime"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="填入月份" prop="maxPoint">
              <Select clearable disabled v-model="workForm.monthTime" style="width:80px">
                <Option value="1">1月</Option>
                <Option value="2">2月</Option>
                <Option value="3">3月</Option>
                <Option value="4">4月</Option>
                <Option value="5">5月</Option>
                <Option value="6">6月</Option>
                <Option value="7">7月</Option>
                <Option value="8">8月</Option>
                <Option value="9">9月</Option>
                <Option value="10">10月</Option>
                <Option value="11">11月</Option>
                <Option value="12">12月</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="回退原因">
          <Tooltip content="选择回退，请填写回退原因" placement="top">
            <Input
              v-model="workForm.reason"
              type="textarea"
              placeholder="选择回退，请填写回退原因，其他操作可不填"
              style="width:170%"
              :rows="2"
            />
          </Tooltip>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="success" :loading="passLoading" style="width:120px" @click="passSubmit">
          <span v-if="!passLoading">通过审核</span>
          <span v-else>提交中...</span>
        </Button>
        <Button type="error" :loading="noPassLoading" style="width:120px" @click="noPassSubmit">
          <span v-if="!noPassLoading">回退审核</span>
          <span v-else>提交中...</span>
        </Button>
        <Button @click="closeModal">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { hasOneOf } from "@/libs/tools";
import { workAjax } from "@/api/city";
// 查询URL
const QUERY_URL = "/workScore/audit";
// 审核通过URL
const PASS_URL = "/workScore/pass";
// 回退审核URL
const NO_PASS_URL = "/workScore/noPass";
export default {
  data() {
    return {
      checkAllData: [], // 表格全选
      passLoading: false, // 审核通过loading
      noPassLoading: false, // 回退审核loading
      searchLoading: false, // 搜索loading
      tabelLoading: false, // 表格loading
      isInsertModal: false, // 模态框
      pageSize: 10,
      pageNumber: 1,
      pageTotal: 10,
      searchData: {
        cityResponUnit: "", // 责任单位
        leadUnit: "", // 牵头单位
        audit: "", // 审核状态
        indexName: "", // 指标名称
        dateTime: "", // 年份
        monthTime: "" // 月份
      },
      workForm: {
        cityResponUnit: "", // 责任单位
        cooperateUnit: "", // 配合单位
        leadUnit: "", // 牵头单位
        indexName: "", // 指标名称
        dateTime: "", // 年份
        monthTime: "", // 月份
        audit: "", // 审核状态
        score: null, // 分数
        maxPoint: null, // 分数上线
        reason: null // 回退原因
      },
      searchReg: {},
      workFormReg: {
        indexName: [
          {
            required: true,
            message: "请输入指标名称",
            trigger: "blur"
          }
        ],
        cityResponUnit: [
          {
            required: true,
            message: "请输入责任单位",
            trigger: "blur"
          }
        ],
        leadUnit: [
          {
            required: true,
            message: "请输入牵头单位",
            trigger: "blur"
          }
        ],
        maxPoint: [
          {
            required: true,
            message: "请输入扣分上限值"
          }
        ],
        dateTime: [
          {
            required: true,
            message: "请输入扣分上限值",
            trigger: "blur"
          }
        ]
      },
      workDataTitle: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "指标名称",
          key: "indexName"
        },
        {
          title: "实际扣分/扣分上限",
          width: 160,
          render: (h, params) => {
            // 宽度占比
            var pressWidth = "";
            // 实际扣分
            var actualPoint = params.row.score === null ? 0 : params.row.score;
            if (params.row.score !== null) {
              pressWidth = (params.row.score / params.row.maxPoint) * 120;
            } else {
              pressWidth = 0;
            }
            return h("div", [
              h("div", {
                style: {
                  position: "relative",
                  width: "120px",
                  height: "30px",
                  lineHeight: "30px",
                  marginRight: "5px",
                  background: "#999",
                  color: "#fff"
                }
              }),
              h(
                "div",
                {
                  style: {
                    position: "absolute",
                    marginTop: "-30px",
                    width: pressWidth.toFixed(0) + "px",
                    height: "30px",
                    background: "#FF6975"
                  }
                },
                ""
              ),
              h(
                "div",
                {
                  style: {
                    position: "absolute",
                    marginTop: "-23px",
                    color: "#fff",
                    width: "120px",
                    height: "20px",
                    fontSize: "16px",
                    lineHeight: "20px",
                    textAlign: "center",
                    whiteSpace: "pre"
                  }
                },
                actualPoint + "   /   " + params.row.maxPoint
              )
            ]);
          }
        },
        {
          title: "市考核责任单位",
          key: "cityResponUnit"
        },
        {
          title: "工作目标牵头单位",
          key: "leadUnit"
        },
        {
          title: "考核配合单位",
          key: "cooperateUnit"
        },
        {
          title: "审核状态",
          key: "audit",
          maxWidth: 120,
          render: (h, params) => {
            var typeColor = "";
            var text = "";
            var isGhost = false;
            switch (params.row.audit) {
              case null:
                typeColor = "default";
                text = "未填写";
                isGhost = false;
                break;
              case "0":
                typeColor = "warning";
                text = "未审核";
                isGhost = true;
                break;
              case "1":
                typeColor = "primary";
                text = "责任人审核";
                isGhost = true;
                break;
              case "2":
                typeColor = "success";
                text = "管理员审核";
                isGhost = true;
                break;
              case "3":
                typeColor = "error";
                text = "回退";
                isGhost = true;
                break;
              default:
                break;
            }
            return h(
              "Button",
              {
                props: {
                  type: typeColor,
                  ghost: isGhost
                }
              },
              text
            );
          }
        },
        {
          title: "操作", // <Icon type="ios-trash-outline" />
          key: "action",
          width: 110,
          align: "center",
          render: (h, params) => {
            var typeColor = "";
            var text = "";
            var isDisabled = false;
            switch (params.row.audit) {
              case null:
                typeColor = "primary";
                text = "填写分数";
                break;
              case "0":
                typeColor = "primary";
                text = "分数审核";
                break;
              case "1":
                typeColor = "primary";
                text = "分数审核";
                break;
              case "2":
                typeColor = "success";
                text = "完成审核";
                break;
              case "3":
                typeColor = "error";
                text = "回退审核";
                break;
              default:
                break;
            }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: typeColor
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // 权限管理
                      if (this.accessRespons) {
                        if (params.row.audit === "1") {
                          this.$Notice.warning({
                            title: "权限不足",
                            desc: "如果要修改或填写分数，请联系对应单位"
                          });
                          return;
                        }
                      }
                      this.isInsertModal = true;
                      // 表格数据 进行深拷贝
                      this.workForm = JSON.parse(JSON.stringify(params.row));
                    }
                  }
                },
                text
              )
            ]);
          }
        }
      ],
      workDataContent: []
    };
  },
  methods: {
    checkAllPass() {
      if (!this.checkAllData.length) {
        return;
      }
      var data = { list: [] };
      this.checkAllData.forEach(item => {
        data["list"].push({ id: item.scoreId });
      });
      this.passLoading = true;
      this._workAjax(PASS_URL, data, "").then(result => {
        this.passLoading = false;
        if (result.code === "200") {
          this.isInsertModal = false;
          this.$Message.success("添加成功");
          // 添加成功 重新查询
          this._getWorkeData(
            this.searchData,
            QUERY_URL,
            this.pageSize,
            this.pageNumber
          );
        } else {
          this.$Message.error("添加失败！请刷新页面后尝试");
        }
      });
    },
    showState() {
      this.$refs["work"].resetFields();
    },
    // 重置搜索内容
    submitReset() {
      this.searchData = {
        cityResponUnit: "", // 责任单位
        leadUnit: "", // 牵头单位
        indexName: "", // 指标名称
        dateTime: "", // 年份
        audit: ""
      };
      this.searchLoading = false;
    },
    // 搜索提交
    searchSubmit(pageSize, pageNumber) {
      this.pageSize = pageSize;
      this.pageNumber = pageNumber;
      this.searchLoading = true;
      this._getWorkeData(
        this.searchData,
        QUERY_URL,
        this.pageSize,
        this.pageNumber
      );
    },
    // 关闭模态框
    closeModal() {
      this.isInsertModal = false;
    },
    // 工作督查指标提交
    passSubmit() {
      this.$refs["work"].validate(valid => {
        if (valid) {
          var data = { list: [] };
          data["list"].push({ id: this.workForm.scoreId });
          this.passLoading = true;
          this._workAjax(PASS_URL, data, "").then(result => {
            this.passLoading = false;
            if (result.code === "200") {
              this.isInsertModal = false;
              this.$Message.success("添加成功");
              // 添加成功 重新查询
              this._getWorkeData(
                this.searchData,
                QUERY_URL,
                this.pageSize,
                this.pageNumber
              );
            } else {
              this.$Message.error("添加失败！请刷新页面后尝试");
            }
          });
        } else {
          this.$Message.error("带*为必填项");
        }
      });
    },
    noPassSubmit() {
      if (this.workForm.reason === null) {
        this.$Message.error("请填写回退原因");
        return;
      }

      this.noPassLoading = true;
      const keyOne = "workScoreEntity";
      this._workAjax(NO_PASS_URL, this.workForm, keyOne).then(result => {
        this.noPassLoading = false;
        if (result.code === "200") {
          this.isInsertModal = false;
          this.$Message.success("添加成功");
          // 添加成功 重新查询
          this._getWorkeData(
            this.searchData,
            QUERY_URL,
            this.pageSize,
            this.pageNumber
          );
        } else {
          this.$Message.error("添加失败！请刷新页面后尝试");
        }
      });
    },
    // 表格全选
    handleCheckAll(selection) {
      this.checkAllData = selection;
    },
    // 取消全选
    handleCheckCancel(selection) {
      this.checkAllData = selection;
    },
    // 搜索年份时间转换
    searchSelectYear(year) {
      this.searchData.dateTime = year;
    },
    // 工作督查指标年份
    workSelectYear(year) {
      this.workForm.dateTime = year;
    },
    // 页码
    pageNumberChange(pageNumber) {
      this.pageNumber = pageNumber;
      this._getWorkeData(
        this.searchData,
        QUERY_URL,
        this.pageSize,
        this.pageNumber
      );
    },
    // 页数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._getWorkeData(
        this.searchData,
        QUERY_URL,
        this.pageSize,
        this.pageNumber
      );
    },
    // 添加编辑AJAX
    _workAjax(url, formData, keyOne) {
      return new Promise((resolve, reject) => {
        workAjax({ url, formData, keyOne })
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
    // 获取新闻
    _getWorkeData(formData, url, pageSize, pageNumber) {
      this.tabelLoading = true;
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      const keyOne = "workScoreFilter";
      workAjax({ formData, url, keyOne })
        .then(result => {
          this.tabelLoading = false;
          if (result.data.code === "200") {
            this.checkAllData = [];
            this.searchLoading = false;
            this.workDataContent = result.data.results.list;
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
    this._getWorkeData(
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
<style>
.ivu-input[disabled],
fieldset[disabled] .ivu-input {
  color: #333;
}
.ivu-input-number-input[disabled] {
  color: #333;
}
</style>
