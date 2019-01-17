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
          <Row>
            <i-col :xs="24" :md="12" :lg="3">
              <Button type="success" @click="showInsertModal">添加工作督查</Button>
            </i-col>
          </Row>
        </Form>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
        <Table
          border
          highlight-row
          :loading="tabelLoading"
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
          action="/api/workSupervision/importData"
        >
          <Button icon="ios-cloud-upload-outline">上传指标</Button>
        </Upload>
      </Card>
    </Row>
    <!-- 增加项目 -->
    <Modal @on-cancel="showState" v-model="isInsertModal" :title="modalTitle">
      <Form ref="work" :model="workForm" :rules="workFormReg" :label-width="120" inline>
        <FormItem label="名称指标" prop="indexName">
          <Input v-model="workForm.indexName" placeholder="请输入指标名称" style="width:300px"></Input>
        </FormItem>
        <FormItem label="市考核责任单位" prop="cityResponUnit">
          <Input v-model="workForm.cityResponUnit" placeholder="请输入市考核责任单位" style="width:300px"></Input>
        </FormItem>
        <FormItem label="市考核牵头单位" prop="leadUnit">
          <Input v-model="workForm.leadUnit" placeholder="请输入市考核责任单位" style="width:300px"></Input>
        </FormItem>
        <FormItem label="考核配合单位">
          <Input v-model="workForm.cooperateUnit" placeholder="请输入考核配合单位" style="width:300px"></Input>
        </FormItem>
        <FormItem label="扣分上限" prop="maxPoint">
          <InputNumber :max="10" :min="1" :step="0.1" v-model="workForm.maxPoint"></InputNumber>
        </FormItem>
        <FormItem label="年份" prop="dateTime">
          <DatePicker
            type="year"
            format="yyyy"
            @on-change="workSelectYear"
            placeholder="按年份搜索"
            style="width:185px"
            :value="workForm.dateTime"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="success" :loading="submitloading" style="width:120px" @click="workSubmit">
          <span v-if="!submitloading">提交</span>
          <span v-else>提交中...</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { workAjax } from "@/api/city";
// 模态框TITLE
const INSERT_TITLE = "添加工作督查指标";
const UPDATE_TITLE = "编辑工作督查指标";
// 添加URL
const INSERT_URL = "/workSupervision/insert";
// 查询URL
const QUERY_URL = "/workSupervision/query";
// 修改URL
const UPDATE_URL = "/workSupervision/update";
// 删除RL
const DELETE_URL = "/workSupervision/delete";
export default {
  data() {
    return {
      host: "", // 上传地址
      modalTitle: "", // 模态框title
      submitloading: false, // 提交loading
      searchLoading: false, // 搜索loading
      isInsertModal: false, // 模态框
      tabelLoading: false, // 表格loading
      pageSize: 10,
      pageNumber: 1,
      pageTotal: 10,
      searchData: {
        cityResponUnit: "", // 责任单位
        leadUnit: "", // 牵头单位
        indexName: "", // 指标名称
        dateTime: "" // 年份
      },
      workForm: {
        cityResponUnit: "", // 责任单位
        cooperateUnit: "", // 配合单位
        leadUnit: "", // 牵头单位
        indexName: "", // 指标名称
        dateTime: "", // 年份
        maxPoint: null // 分数上线
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
          key: "indexName",
          minWidth: 130
        },
        {
          title: "扣分上限",
          key: "maxPoint",
          maxWidth: 90,
          align: "center"
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
          title: "操作", // <Icon type="ios-trash-outline" />
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
                      this.modalTitle = UPDATE_TITLE;
                      // 表格数据 进行深拷贝
                      this.workForm = JSON.parse(JSON.stringify(params.row));
                      this.isInsertModal = true;
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
                      this.workRemove(params.row);
                    }
                  }
                },
                "删除"
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
        dateTime: "" // 年份
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
    // 工作督查指标提交
    workSubmit() {
      this.$refs["work"].validate(valid => {
        if (valid) {
          this.submitloading = true;
          // 添加工作督查指标
          if (this.modalTitle === INSERT_TITLE) {
            this._workAjax(INSERT_URL, this.workForm).then(result => {
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
            // 编辑工作督查指标
          } else if (this.modalTitle === UPDATE_TITLE) {
            this._workAjax(UPDATE_URL, this.workForm).then(result => {
              this.submitloading = false;
              if (result.code === "200") {
                this.isInsertModal = false;
                this.$Message.success("修改成功");
                // 修改成功 重新查询
                this._getWorkeData(
                  this.searchData,
                  QUERY_URL,
                  this.pageSize,
                  this.pageNumber
                );
              } else {
                this.$Message.error("修改失败！请刷新页面后尝试");
              }
            });
          }
        } else {
          this.$Message.error("带*为必填项");
        }
      });
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
    // 删除工作督查指标
    workRemove(params) {
      this.$Modal.confirm({
        title: "删除新闻",
        content: "<p>删除后将无法恢复</p>",
        loading: true,
        onOk: () => {
          this._workAjax(DELETE_URL, params).then(result => {
            if (result.code === "200") {
              this.$Message.success("删除成功");
              this.$Modal.remove();
              // 删除成功 重新查询
              this._getWorkeData(
                this.searchData,
                QUERY_URL,
                this.pageSize,
                this.pageNumber
              );
            } else {
              this.$Message.error("删除失败！请刷新页面重试");
            }
          });
        }
      });
    },
    // 搜索年份时间转换
    searchSelectYear(year) {
      this.searchData.dateTime = year;
    },
    // 工作督查指标年份
    workSelectYear(year) {
      this.workForm.dateTime = year;
    },
    // 模态框
    showInsertModal() {
      this.isInsertModal = true;
      // 改变模态框title
      this.modalTitle = INSERT_TITLE;
    },
    // 文件上传成功
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
  computed: {
    getDepartmentList() {
      return this.$store.state.user.departmentList;
    }
  },
  created() {
    this._getWorkeData(
      this.searchData,
      QUERY_URL,
      this.pageSize,
      this.pageNumber
    );
  }
};
</script>
