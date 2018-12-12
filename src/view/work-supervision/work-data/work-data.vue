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
              <FormItem label="牵头单位" prop="name">
                <Input v-model="searchData.leadUnit" placeholder="请输入牵头单位" style="width: auto"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="审核状态">
                <Select clearable v-model="searchData.audit" style="width:200px">
                  <Option value="5">未填写</Option>
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
        <Table
          border
          highlight-row
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
    <Row style="margin-top:20px">
      <Card>
        <Upload
          :on-success="handleSuccess"
          :format="['xls','xlsx']"
          :on-format-error="handleFormatError"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <Button icon="ios-cloud-upload-outline">上传指标</Button>
        </Upload>
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
                :disabled="isDisabledSubmit"
                :max="workForm.maxPoint"
                :min="0"
                :step="0.1"
                v-model="workForm.point"
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
              <Select
                clearable
                :disabled="isDisabledSubmit"
                v-model="searchData.monthTime"
                style="width:80px"
              >
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
        <FormItem label="回退原因" prop="maxPoint" v-if="workForm.reason !==null">
          <Input disabled v-model="workForm.reason" type="textarea" style="width:170%" :rows="1"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="success"
          :disabled="isDisabledSubmit"
          :loading="submitloading"
          style="width:120px"
          @click="workSubmit"
        >
          <span v-if="!submitloading">提交</span>
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
const QUERY_URL = "/workSupervision/query";
// 修改URL
const UPDATE_URL = "/workSupervision/setPoint";
export default {
  data() {
    return {
      modalTitle: "", // 模态框title
      submitloading: false, // 提交loading
      searchLoading: false, // 搜索loading
      isInsertModal: false, // 模态框
      pageSize: 10,
      pageNumber: 1,
      pageTotal: 10,
      searchData: {
        cityResponUnit: "", // 责任单位
        leadUnit: "", // 牵头单位
        audit: "", // 审核状态
        indexName: "", // 指标名称
        dateTime: "" // 年份
      },
      isDisabledSubmit: false,
      workForm: {
        cityResponUnit: "", // 责任单位
        cooperateUnit: "", // 配合单位
        leadUnit: "", // 牵头单位
        indexName: "", // 指标名称
        dateTime: "", // 年份
        monthTime: "", // 月份
        audit: "", // 审核状态
        point: null, // 分数
        maxPoint: null, // 分数上线
        reason: "" // 回退原因
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
          type: "index",
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
            var actualPoint = params.row.point === null ? 0 : params.row.point;
            if (params.row.point !== null) {
              pressWidth = (params.row.point / params.row.maxPoint) * 120;
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
                typeColor = "#333";
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
          width: 180,
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
                text = "改修分数";
                break;
              case "1":
                typeColor = "primary";
                text = "填写分数";
                break;
              case "2":
                typeColor = "success";
                text = "填写完成";
                break;
              case "3":
                typeColor = "error";
                text = "重新填写";
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
                        if (params.row.audit !== "1") {
                          this.$Notice.warning({
                            title: "权限不足",
                            desc: "如果要修改或填写分数，请联系对应单位"
                          });
                        }
                        return;
                      }
                      this.isInsertModal = true;
                      // 填写分数 可以提交
                      this.isDisabledSubmit = false;
                      // 表格数据 进行深拷贝
                      this.workForm = JSON.parse(JSON.stringify(params.row));
                    }
                  }
                },
                text
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  on: {
                    click: () => {
                      this.workForm = JSON.parse(JSON.stringify(params.row));
                      this.isInsertModal = true;
                      // 填写分数 可以提交
                      this.isDisabledSubmit = true;
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      workDataContent: []
    };
  },
  methods: {
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
    workSubmit() {
      this.$refs["work"].validate(valid => {
        if (valid) {
          this.submitloading = true;
          this._workAjax(UPDATE_URL, this.workForm).then(result => {
            this.submitloading = false;
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
    // 删除工作督查指标
    workRemove(index) {},
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
    // 文件上传成功
    handleSuccess(res, file) {
      console.log(res);
    },
    // 验证上传格式
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "文件" + file.name + " 格式错误, 请选择xls或者xlsx"
      });
    },
    // 添加编辑AJAX
    _workAjax(url, formData) {
      const keyOne = "workSupervisionEntity";
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
            console.lo(err);
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
      const keyOne = "workSupervisionFilter";
      workAjax({ formData, url, keyOne })
        .then(result => {
          this.tabelLoading = false;
          if (result.data.code === "200") {
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
