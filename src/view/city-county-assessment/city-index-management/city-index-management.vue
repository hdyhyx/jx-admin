<style lang="less">
@import "./../common.less";
</style>
<template>
  <div>
    <Row>
      <Card>
        <div style="margin-top: 6px">
              <Form ref="searchData" :model="searchData" :rules="searchReg" :label-width="80">
                <Row>
                  <i-col :xs="24" :md="12" :lg="6" >
                    <FormItem label="指标等级" prop="indexType">
                        <Select v-model="searchData.indexType" placeholder="请选择指标等级" style="width:185px">
                            <Option value="一级指标">一级指标</Option>
                            <Option value="二级指标">二级指标</Option>
                            <Option value="三级指标">三级指标</Option>
                        </Select>
                    </FormItem>
                  </i-col>
                  <i-col :xs="24" :md="12" :lg="6" >
                    <FormItem label="指标名称">
                        <Input search placeholder="请输入指标名称" v-model="searchData.indexName" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                  <i-col :xs="24" :md="12" :lg="6" v-show="searchData.indexType==='二级指标'">
                    <FormItem label="牵头单位">
                        <Input search placeholder="请输入牵头单位" v-model="searchData.leadUnit" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                  <i-col :xs="24" :md="12" :lg="6" v-show="searchData.indexType==='二级指标'">
                    <FormItem label="责任单位">
                        <Input search placeholder="请输入搜索内容" v-model="searchData.responsibilityUnit" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                </Row>
                <Row>
                   <i-col :xs="24" :md="12" :lg="6">
                    <FormItem label="指标年份">
                        <Col span="12">
                            <DatePicker type="year" format="yyyy" @on-change="handlerFormat" placeholder="请选择指标年份" style="width:185px"></DatePicker>
                        </Col>
                    </FormItem>
                  </i-col>
                </Row>
                    <FormItem>
                      <Button type="primary" @click="seachSubmit('searchData')">提交搜索</Button>
                      <Button @click="seachReset('searchData')" style="margin-left: 8px">重置</Button>
                  </FormItem>
              </Form>
        </div>
        <div style="margin-top: 10px;margin-left:10px">
            <span>增加指标：</span>
            <Button   @click="addTarget($event)" >永泰县指标</Button>
        </div>
      </Card>
    </Row>
    <!-- 指标内容 -->
    <Row style="margin-top:20px">
        <Card>
          <div>
            <Table :loading="TableOneLoading" border :columns="colIndexOne" :data="indexOne" v-if="isIndexOne"></Table>
            <Table :loading="TableTwoLoading" border :columns="colIndexTwo" :data="indexTwo" v-if="isIndexTwo" ></Table>
            <Table :loading="TableThreeLoading" border :columns="columns7" :data="data6" v-if="searchData.indexType==='三级指标'"></Table>
          </div>
          <div style="margin:20px 0;margin-left:35%;">
                <Page @on-change="pageNumberChange" :current="pageCurrent" :page-size="pageSize"  :total="pageTotal" @on-page-size-change="pageSizeChange" show-elevator show-sizer />
          </div>
        </Card>
    </Row>
    <!-- 上传指标 -->
    <div>
      <Card title="导入EXCEL">
        <Row>
           <i-col :xs="24" :md="8" :lg="3">
            <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
              <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
            </Upload>
           </i-col>
          <i-col :xs="24" :md="8" :lg="3">
            <DatePicker  type="year" format="yyyy" value="formCityList.monthTime" @on-change="updateTime" placeholder="请选择指标年份" style="width: auto"></DatePicker>
          </i-col>
          <i-col :xs="24" :md="8" :lg="3">
            <Button type="primary" :loading="UploadLoadingBtn" @click="updateExcel">
                <span v-if="!UploadLoadingBtn">确认添加</span>
                <span v-else>Loading...</span>
            </Button>
           </i-col>
        </Row>
        <Row>
          <div class="ivu-upload-list-file" v-if="file !== null">
            <Icon type="ios-stats"></Icon>
              {{ file.name }}
            <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
          </div>
        </Row>
        <Row>
          <transition name="fade">
            <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
              <div v-if="progressPercent == 100">
                <Icon type="ios-checkmark-circle"></Icon>
                <span>成功</span>
              </div>
            </Progress>
          </transition>
        </Row>
      </Card>
      <Row class="margin-top-10">
        <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
      </Row>
    </div>
    <!-- 模态框  增加指标-->
    <Modal
        v-model="addIndex"
        :title="targetName"
        @on-cancel="closeAddIndex"
        width='700px'>
        <Form ref="formCityList" :model="formCityList" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称指标" prop="indexName">
              <Input v-model="formCityList.indexName" placeholder="请输入指标名称" style="width:500px"></Input>
          </FormItem>
          <FormItem label="指标等级" prop="indexType">
              <Select v-model="formCityList.indexType" placeholder="请选择指标等级" style="width:500px" :disabled="isIndexType">
                  <Option value="一级指标">一级指标</Option>
                  <Option value="二级指标">二级指标</Option>
                  <Option value="三级指标">三级指标</Option>
              </Select>
          </FormItem>
          <FormItem label="上级指标" prop="superiorIndexId" v-if="isFormFlase">
              <Select v-model="formCityList.superiorIndexId"  placeholder="请选择上级指标" style="width:500px">
                  <Option v-for="item in superiorIndexSelect" :value="item" :key="item">{{ item }}</Option>
              </Select>
          </FormItem>
          <FormItem label="主要牵头单位" prop="mainUnit" v-if="isFormFlase">
              <Input v-model="formCityList.mainUnit" placeholder="请输入牵头单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="牵头单位" prop="leadUnit" v-if="isFormFlase">
              <Input v-model="formCityList.leadUnit" placeholder="请输入牵头单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="责任单位" prop="dutyUint" v-if="isFormFlase">
              <Input v-model="formCityList.responsibilityUnit" placeholder="请输入责任单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="标准值" prop="standard" v-if="isFormFlase">
              <Input v-model="formCityList.standardValue" placeholder="请输入标准值" style="width:500px"></Input>
          </FormItem>
          <FormItem label="方向" prop="direction" v-if="isFormFlase">
               <Select v-model="formCityList.direction" placeholder="请选择方向" style="width:500px">
                  <Option value="+">+</Option>
                  <Option value="-">-</Option>
               </Select>
          </FormItem>
          <FormItem label="权数" prop="weight">
              <Input v-model="formCityList.weight" placeholder="请输入权数值" style="width:500px"></Input>
          </FormItem>
          <FormItem label="指标年份"  prop="year">
             <DatePicker  type="year" format="yyyy" v-model="formCityList.year" @on-change="IndexFormat" placeholder="请选择指标年份" style="width:185px"></DatePicker>
          </FormItem>
        </Form>
        <div slot="footer">
              <Button type="success" :loading="submitloading" style="width:120px" @click="BtnSubmit($event)">
                <span v-if="!submitloading">提交</span>
                <span v-else>提交中...</span>
              </Button>
              <Button @click="closeAddIndex">取消</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import excel from "@/libs/excel";
import { cityAjax } from "@/api/city";
const regNumber = new RegExp("^[0-9]*$");
export default {
  data() {
    const validateWeight = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请填写分数"));
      } else if (!regNumber.test(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    return {
      addIndex: false, // 显示增加模态框
      isIndexOne: true, // 是否指标等级一
      isIndexTwo: false, // 是否指标等级二
      submitloading: false, // 增加模态框loading
      TableOneLoading: true, // 表格loading 一级指标
      TableTwoLoading: true, // 表格loading 二级指标
      isFormFlase: false, // form表单显示
      isFormTrue: true, // 一级指标显示Input
      isFormWeight: false, // 二级指标显示Input
      targetName: "", // 增加或者编辑的Title
      pageTotal: 0, // 总页数
      pageSize: 10, // 条数
      pageNumber: 1, // 页码
      pageCurrent: 1, // 当前页
      indexOne: [], // 一级指标数据
      indexTwo: [], // 二级指标数据
      storeSuperiorIndexId: "", // 处理当指标Id与select选择指标的Value不一致
      superiorIndexSelect: [], // form选择指标
      isIndexType: false,
      excelUpdate: "",
      searchData: {
        // 搜索数据
        indexType: "一级指标",
        responsibilityUnit: "",
        lead: "",
        indexName: "",
        year: ""
      },
      colIndexOne: [
        // 一级指标 表格表头
        {
          type: "index",
          maxWidth: 60,
          align: "center"
        },
        {
          title: "指标等级",
          key: "indexType"
        },
        {
          title: "指标名称",
          key: "indexName"
        },
        {
          title: "权数值",
          key: "weight"
        },
        {
          title: "Action",
          key: "action",
          maxwidth: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  on: {
                    click: () => {
                      // 显示模态框
                      if (params.row.id !== "") {
                        var row = params.row
                        this.formCityList = Object.assign(row, {
                          year: params.row.dateTime
                        })
                        this.formCityList = JSON.parse(JSON.stringify(this.formCityList));
                      } else {
                        this.$Message.error("刷新页面后尝试此操作");
                        return;
                      }
                      this.isIndexType = true; // 更新改修指标，禁止修改指标等级
                      this.addIndex = true;
                      this.isFormFlase = false;
                      this.isFormTrue = true;
                      this.targetName = "编辑指标";
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      colIndexTwo: [
        // 二级指标 表格表头
        {
          title: "指标等级",
          key: "indexType",
          maxWidth: 100
        },
        {
          title: "指标名称",
          key: "indexName"
        },
        {
          title: "上级单位",
          key: "superiorIndexId"
        },
        {
          title: "牵头单位",
          key: "leadUnit"
        },
        {
          title: "责任单位",
          key: "responsibilityUnit"
        },
        {
          title: "标准值",
          key: "standardValue"
        },
        {
          title: "权数",
          key: "weight"
        },
        {
          title: "方向",
          key: "direction",
          maxWidth: 60,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          maxWidth: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      if (params.row.id !== "") {
                        this.formCityList = Object.assign(params.row, {
                          year: params.row.dateTime
                        })
                      } else {
                        this.$Message.error("刷新页面后尝试此操作");
                        return;
                      }
                      this.formCityList = JSON.parse(JSON.stringify(this.formCityList));
                      this.isIndexType = true; // 更新改修指标，禁止修改指标等级
                      this.addIndex = true;
                      this.isFormfalse = true;
                      this.isFormTrue = false;
                      this.targetName = "编辑指标";
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      // 验证添加或者编辑表单
      ruleValidate: {
        indexName: [
          {
            required: true,
            message: "请输入指标名称",
            trigger: "blur"
          }
        ],
        indexType: [
          {
            required: true,
            message: "请选择指标等级",
            trigger: "change"
          }
        ],
        weight: [
          {
            required: true,
            validator: validateWeight,
            trigger: 'blur'
          }
        ],
        mainUnit: [
          {
            required: true,
            message: "请输入主要牵头单位",
            trigger: "blur"
          }
        ],
        year: [
          {
            required: true,
            message: "请选择年份",
            trigger: "blur"
          }
        ]
      },
      // 验证搜索
      searchReg: {
        indexType: [
          {
            required: true,
            message: "请选择指标等级",
            trigger: "change"
          }
        ]
      },
      // 表单
      formCityList: {
        id: "",
        indexName: "", // 指标名称
        indexType: "一级指标", // 指标类型
        superiorIndexId: "", // 上级单位 一级指标没有上级单位
        leadUnit: "", // 牵头单位
        responsibilityUnit: "", // 责任单位
        score: "", // 分数
        standardValue: "", // 标准值
        direction: "", // 方向
        weight: "", // 权数
        year: "", // 年份
        mainUnit: ''// 主要牵头单位 用来填写分数和审核分数
      },
      // 上传表格
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableData: [], // 上传Excel 内容
      tableTitle: [], //
      excelTime: "",
      tableLoading: false,
      UploadLoadingBtn: false
    };
  },
  methods: {
    // Excel 上传  定义指标年份
    updateTime(year) {
      this.excelTime = year;
    },
    // FORM表单年份
    IndexFormat(year) {
      this.formCityList.year = year;
    },
    // 搜索框年份
    handlerFormat(year) {
      this.searchData.year = year;
    },
    // 关闭模态框增加或者编辑
    closeAddIndex() {
      this.addIndex = false;
      this.isIndexType = false;
    },
    // 添加指标 编辑指标
    BtnSubmit(e) {
      this.$refs["formCityList"].validate(valid => {
        console.log(this.formCityList);
        if (valid) {
          this.submitloading = true;
          if (this.targetName === "永泰县指标增加") {
            this._addIndexCity(this.formCityList)
              .then(res => {
                if (res.code === "200") {
                  this.$Message.success("成功");
                  this.submitloading = false;
                  // 按照填入的indexType刷新页面
                  if (this.formCityList.indexType === "一级指标") {
                    let indexType = {
                      indexType: this.formCityList.indexType,
                      pageSize: this.pageSize
                    };
                    this._getCityList(
                      indexType,
                      this.pageSize,
                      this.page
                    ).then(res => {
                      this.superiorIndexSelect = [];
                      res.results.firstIndex.forEach(item => {
                        this.superiorIndexSelect.push(item.indexName);
                      });
                      this.indexOne = res.results.list;
                      this.addIndex = false;
                    });
                  } else if (this.formCityList.indexType === "二级指标") {
                    let indexType = {
                      indexType: this.formCityList.indexType
                    };
                    this._getCityList(
                      indexType,
                      this.pageSize,
                      this.page
                    ).then(res => {
                      this.indexTwo = res.results.list;
                      this.addIndex = false;
                      this.isIndexOne = false;
                      this.isIndexTwo = true;
                      this.TableTwoLoading = false;
                    });
                  }
                  this.addIndex = false;
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else if (this.targetName === "编辑指标") {
            this._updateIndexCity(this.formCityList).then(res => {
              if (res.code === "200") {
                this.submitloading = false;
                this.addIndex = false;
                this.$Message.success("修改成功");
                if (this.formCityList.indexType === "一级指标") {
                  let indexType = {
                    indexType: this.formCityList.indexType
                  };
                  this._getCityList(
                    indexType,
                    this.pageSize,
                    this.pageNumber
                  ).then(res => {
                    this.indexOne = res.results.list;
                    this.addIndex = false;
                  });
                } else if (this.formCityList.indexType === "二级指标") {
                  let indexType = {
                    indexType: this.formCityList.indexType
                  };
                  this._getCityList(
                    indexType,
                    this.pageSize,
                    this.pageNumber
                  ).then(res => {
                    this.indexTwo = res.results.list;
                    this.addIndex = false;
                    this.isIndexOne = false;
                    this.isIndexTwo = true;
                    this.TableTwoLoading = false;
                  });
                }
              }
            });
          }
        } else {
          this.$Message.error("带*为必填项");
        }
      });
    },
    // 删除指标
    remove(params) {
      this.pageCurrent = this.pageNumber;
      this.$Modal.confirm({
        title: "删除指标",
        content: "<p>删除后将无法恢复</p>",
        onOk: () => {
          this._removeIndexCity({ id: params.row.id }).then(res => {
            if (res.code === "200") {
              this.$Message.success("删除成功");
              this.seachSubmit("searchData", "remove");
            } else {
              this.$Message.error("操作失败");
            }
          });
        },
        onCancel: () => {
          this.$Message.info("已取消");
        }
      });
    },
    // 打开模态框
    addTarget(e) {
      this.targetName = "永泰县指标增加";
      // 清除INPUT框
      this.resetInput();
      this.isFormFlase = false;
      this.isFormTrue = true;
      this.addIndex = true;
    },
    // 搜索查询
    seachSubmit(name, isRemove) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.TableOneLoading = true;
          this.TableTwoLoading = true;
          // 清除formCityList表单
          this.resetInput();
          if (isRemove) {
            this.pageNumber = this.pageCurrent;
          } else {
            this.pageTotal = 0;
            this.pageSize = 10;
            this.pageNumber = 1;
          }
          const formData = Object.assign(this.formCityList, this.searchData);
          this._getCityList(
            formData,
            this.pageSize,
            this.pageNumber
          ).then(res => {
            if (res.code === "200") {
              // 按照IndexType类别 填入不同Tabel里
              if (this.searchData.indexType === "一级指标") {
                this.$Message.success("查询成功");
                this.indexOne = res.results.list;
                this.pageTotal = parseInt(res.results.pageTotal) * 10;
                this.TableOneLoading = false;
                this.isIndexOne = true;
                this.isIndexTwo = false;
              } else if (this.searchData.indexType === "二级指标") {
                this.isIndexOne = false;
                this.TableTwoLoading = false;
                this.isIndexTwo = true;
                this.$Message.success("查询成功");
                this.indexTwo = res.results.list;
                this.pageTotal = parseInt(res.results.pageTotal) * 10;
              }
            } else {
              this.$Message.error("查询失败");
            }
          });
        } else {
          this.$Message.error("带*不可为空");
        }
      });
    },
    // 重置搜索
    seachReset(name) {
      this.searchData = {
        indexType: "一级指标",
        ducyUnit: "",
        lead: "",
        indexName: ""
      };
    },
    // 重置表单
    resetInput() {
      if (this.formCityList.indexType !== "") {
        this.$refs["formCityList"].resetFields();
        this.formCityList = {
          indexName: "",
          indexType: "",
          superiorIndexId: "",
          leadUnit: "",
          responsibilityUnit: "",
          score: "",
          standardValue: "",
          direction: "",
          weight: "",
          year: "",
          mainUnit: ''
        };
      }
    },
    // 页码
    pageNumberChange(number) {
      this.pageNumber = number;
      this._getCityList(
        this.searchData,
        this.pageSize,
        this.pageNumber
      ).then(res => {
        if (res.code === "200") {
          // 按照IndexType类别 填入不同Tabel里
          if (
            this.formCityList.indexType === "一级指标" ||
            this.searchData.indexType === "一级指标"
          ) {
            this.indexOne = res.results.list;
            this.$Message.success("查询成功");
          } else if (
            this.formCityList.indexType === "二级指标" ||
            this.searchData.indexType === "二级指标"
          ) {
            this.indexTwo = res.results.list;
            this.$Message.success("查询成功");
          }
        } else {
          this.$Message.error("查询失败");
        }
      });
    },
    // 页数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._getCityList(
        this.searchData,
        this.pageSize,
        this.pageNumber
      ).then(res => {
        if (res.code === "200") {
          // 按照IndexType类别 填入不同Tabel里
          if (this.formCityList.indexType === "一级指标") {
            this.indexOne = res.results.list;
          } else if (this.formCityList.indexType === "二级指标") {
            this.indexTwo = res.results.list;
            this.$Message.success("查询成功");
          }
        } else {
          this.$Message.error("查询失败");
        }
      });
    },
    // 获取数据
    _getCityList(form, pageSize, pageNumber) {
      const url = "/countryIndicators/query";
      const key = "countryIndicatorsFilter";
      let formData = Object.assign(form, {
        pageSize: pageSize,
        pageNumber: pageNumber
      });
      return new Promise((resolve, reject) => {
        cityAjax({ formData, url, key }).then(res => {
          if (res.data !== undefined) {
            resolve(res.data);
          } else {
            reject();
          }
        });
      });
    },
    // 添加指标
    _addIndexCity(formData) {
      const url = "/countryIndicators/insert";
      const key = "countryIndicatorsEntity";
      return new Promise((resolve, reject) => {
        cityAjax({ formData, url, key }).then(res => {
          if (res.data !== undefined) {
            resolve(res.data);
          } else {
            reject();
          }
        });
      });
    },
    // 修改指标
    _updateIndexCity(formData) {
      const url = "/countryIndicators/update";
      const key = "countryIndicatorsEntity";
      return new Promise((resolve, reject) => {
        cityAjax({ formData, url, key }).then(res => {
          if (res.data !== undefined) {
            resolve(res.data);
          } else {
            reject();
          }
        });
      });
    },
    // 删除
    _removeIndexCity(formData) {
      const url = "/countryIndicators/delete";
      const key = "countryIndicatorsEntity";
      return new Promise((resolve, reject) => {
        cityAjax({ formData, url, key }).then(res => {
          if (res.data !== undefined) {
            resolve(res.data);
          } else {
            reject();
          }
        });
      });
    },
    // 上传elcel
    initUpload() {
      this.file = null;
      this.showProgress = false;
      this.loadingProgress = 0;
      this.tableData = [];
      this.tableTitle = [];
    },
    // 点击上传触发函数
    handleUploadFile() {
      this.initUpload();
    },
    // 删除Excel
    handleRemove() {
      this.initUpload();
      this.$Message.info("上传的文件已删除！");
    },
    handleBeforeUpload(file) {
      const fileExt = file.name
        .split(".")
        .pop()
        .toLocaleLowerCase();
      if (fileExt === "xlsx" || fileExt === "xls") {
        this.readFile(file);
        this.file = file;
      } else {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "文件：" +
            file.name +
            "不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。"
        });
      }
      return false;
    },
    // 读取文件
    readFile(file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadstart = e => {
        this.uploadLoading = true;
        this.tableLoading = true;
        this.showProgress = true;
      };
      reader.onprogress = e => {
        this.progressPercent = Math.round((e.loaded / e.total) * 100);
      };
      reader.onerror = e => {
        this.$Message.error("文件读取出错");
      };
      reader.onload = e => {
        this.$Message.info("文件读取成功");
        const data = e.target.result;
        var { header, results } = excel.read(data, "array");
        console.log(header);

        header = header.slice(0, 10); // 截取有效数据
        var tableTitle = header.map((item, i) => {
          return { title: results[0][item], key: item };
        });
        // 验证表头
        const regExcel = err => {
          this.$Notice.error({
            title: "Excel格式错误",
            desc: 'Excel："' + err + '"   格式错误,请核对Excel模块。'
          });
          results = ""; // 表内容
          tableTitle = ""; // 表头
          this.uploadLoading = false;
          this.tableLoading = false;
          this.showRemoveFile = true;
        };
        // 对Excel行进处理 提醒用户是不是导入Excel模板错误
        for (let i = 0; i < tableTitle.length; i++) {
          if (tableTitle[i].key === "indexTypeOne") {
            if (tableTitle[i].title !== "一级指标") {
              regExcel("一级指标");
              return;
            }
          } else if (tableTitle[i].key === "indexTypeTwo") {
            if (tableTitle[i].title !== "二级指标") {
              regExcel("二级指标");
              return;
            }
          } else if (tableTitle[i].key === "weightOne") {
            if (tableTitle[i].title !== "一级权数") {
              regExcel("一级权数");
              return;
            }
          } else if (tableTitle[i].key === "weightTwo") {
            if (tableTitle[i].title !== "二级权数") {
              regExcel("二级权数");
              return;
            }
          } else if (tableTitle[i].key === "direction") {
            if (tableTitle[i].title !== "方向") {
              regExcel("方向");
              return;
            }
          } else if (tableTitle[i].key === "standardValue") {
            if (tableTitle[i].title !== "标准值") {
              regExcel("标准值");
              return;
            }
          } else if (tableTitle[i].key === "leadUnit") {
            if (tableTitle[i].title !== "牵头单位") {
              regExcel("牵头单位");
              return;
            }
          } else if (tableTitle[i].key === "responsibilityUnit") {
            if (tableTitle[i].title !== "责任单位") {
              regExcel("责任单位");
              return;
            }
          } else if (tableTitle[i].key === "associated") {
            if (tableTitle[i].title !== "关联指标") {
              regExcel("关联指标");
              return;
            }
          } else if (tableTitle[i].key === "mainUnit") {
            if (tableTitle[i].title !== "主要牵头单位") {
              regExcel("主要牵头单位");
              return;
            }
          } else {
            regExcel("");
            return;
          }
        }
        this.tableData = results.slice(1);
        this.tableTitle = tableTitle;
        this.uploadLoading = false;
        this.tableLoading = false;
        this.showRemoveFile = true;
      };
    },
    updateExcel() {
      // 判断上传Excel表是不是为空且指标年份不为空
      this.UploadLoadingBtn = true;
      if (!this.tableData.length || this.excelTime === "") {
        this.$Message.error("请选择上传文件或选择指标年份");
        this.UploadLoadingBtn = false;
        return;
      }
      const fromIndexOne = { list: [] }; // 一级指标
      const formIndexTwo = { list: [] }; // 二级指标
      const associated = { list: [] };
      // 处理一级指标
      for (let i = 0; i < this.tableData.length; i++) {
        var indexDataOne = Object.assign(
          {},
          {
            id: "",
            indexType: "一级指标",
            indexName:
              this.tableData[i].indexTypeOne === undefined
                ? ""
                : this.tableData[i].indexTypeOne.trim(),
            weight:
              this.tableData[i].weightOne === undefined
                ? ""
                : this.tableData[i].weightOne.trim(),
            superiorIndexId: "",
            leadUnit: "",
            responsibilityUnit: "",
            score: "",
            standardValue: "",
            direction: "",
            dateTime: this.excelTime
          }
        );
        fromIndexOne["list"].push(indexDataOne);
      }
      for (let i = 0; i < this.tableData.length; i++) {}
      // 处理二级指标
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].associated !== undefined) {
          console.log(this.tableData[i].associated);
          var indexAssociated = Object.assign(
            {},
            {
              indexType: "二级指标",
              indexName:
                this.tableData[i].indexTypeTwo === undefined
                  ? ""
                  : this.tableData[i].indexTypeTwo.trim(),
              weight:
                this.tableData[i].weightTwo === undefined
                  ? ""
                  : this.tableData[i].weightTwo.trim(),
              leadUnit:
                this.tableData[i].leadUnit === undefined
                  ? ""
                  : this.tableData[i].leadUnit.trim(),
              direction:
                this.tableData[i].direction === undefined
                  ? ""
                  : this.tableData[i].direction.trim(),
              standardValue:
                this.tableData[i].standardValue === undefined
                  ? ""
                  : this.tableData[i].standardValue.trim(),
              responsibilityUnit:
                this.tableData[i].responsibilityUnit === undefined
                  ? ""
                  : this.tableData[i].responsibilityUnit.trim(),
              superiorIndexId:
                this.tableData[i].associated === undefined
                  ? ""
                  : this.tableData[i].associated.trim(),
              mainUnit:
                this.tableData[i].mainUnit === undefined
                  ? ""
                  : this.tableData[i].mainUnit.trim(),
              dateTime: this.excelTime
            }
          );
          associated["list"].push(indexAssociated);
          continue;
        }
        var indexDataTwo = Object.assign(
          {},
          {
            indexType: "二级指标",
            indexName:
              this.tableData[i].indexTypeTwo === undefined
                ? ""
                : this.tableData[i].indexTypeTwo.trim(),
            weight:
              this.tableData[i].weightTwo === undefined
                ? ""
                : this.tableData[i].weightTwo.trim(),
            leadUnit:
              this.tableData[i].leadUnit === undefined
                ? ""
                : this.tableData[i].leadUnit.trim(),
            direction:
              this.tableData[i].direction === undefined
                ? ""
                : this.tableData[i].direction.trim(),
            standardValue:
              this.tableData[i].standardValue === undefined
                ? ""
                : this.tableData[i].standardValue.trim(),
            responsibilityUnit:
              this.tableData[i].responsibilityUnit === undefined
                ? ""
                : this.tableData[i].responsibilityUnit.trim(),
            superiorIndexId:
              this.tableData[i].indexTypeOne === undefined
                ? ""
                : this.tableData[i].indexTypeOne.trim(),
            mainUnit:
              this.tableData[i].mainUnit === undefined
                ? ""
                : this.tableData[i].mainUnit.trim(),
            dateTime: this.excelTime
          }
        );
        // 根据后端要求 用户EXCEL上传的数据放在LIST里面
        formIndexTwo["list"].push(indexDataTwo);
      }
      this._addIndexCity(fromIndexOne).then(res => {
        if (res.code === "200") {
          this.UploadLoadingBtn = false;
          this._addIndexCity(formIndexTwo).then(res => {
            if (res.code === "200") {
              this._addIndexCity(associated).then(res => {
                this.$Message.info("添加成功");
              });
            } else {
              this.$Message.info("指标添加失败");
            }
          });
        } else {
          this.$Message.info("指标添加失败");
          this.UploadLoadingBtn = false;
        }
      });
      this.tableData = [];
      this.excelTime = "";
    }
  },
  watch: {
    // form表单根据指标等级
    formCityList: {
      handler(newVal) {
        if (newVal.indexType !== undefined) {
          if (newVal.indexType === "一级指标") {
            this.isFormFlase = false;
            this.isFormTrue = true;
          } else if (newVal.indexType === "二级指标") {
            this.isFormFlase = true;
            this.isFormTrue = false;
            this.formCityList.score = "";
          }
        }
      },
      deep: true
    }
  },
  created() {
    // 打开页面
    this._getCityList(
      this.formCityList,
      this.pageSize,
      this.pageNumber
    ).then(res => {
      res.results.firstIndex; // from表单 上级指标 seachSelect
      res.results.firstIndex.forEach(item => {
        this.superiorIndexSelect.push(item.indexName);
      });
      this.pageTotal = parseInt(res.results.pageTotal) * 10;
      this.indexOne = res.results.list;
      this.TableOneLoading = false;
    });
  }
};
</script>
<style scoped>
</style>
