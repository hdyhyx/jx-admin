<template>
  <div>
    <Row>
      <Card>
        <Form ref="formData" :model="formData" :label-width="80" :rules="formDataValidate">
          <Row :gutter="32">
            <Col :xs="24" :sm="12" :md="8" :lg="8">
              <FormItem label="测评名称" prop="name">
                <Input v-model="formData.name" placeholder="请输入测评名称"/>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="12" :md="8" :lg="8">
              <FormItem label="测评类型" prop="type">
                <Select v-model="formData.type" placeholder="请选择测评试卷的类型" style="width:auto">
                  <Option value="0">指定对象</Option>
                  <Option value="1">不指定对象</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col :xs="24" :sm="12" :md="8" :lg="8">
              <FormItem label="测试时间" prop="dateTime">
                <DatePicker
                  style="width:auto"
                  type="daterange"
                  placement="right-start"
                  placeholder="请选择测试时间"
                  format="yyyy-MM-dd"
                  :value="formData.dateTime"
                  @on-change="selectTime"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="12" :md="8" :lg="8">
              <FormItem label="评估对象" prop="evalutedObj">
                <Select clearable v-model="formData.evalutedObj" style="width:200px">
                  <Option
                    v-for="item in getDepartmentList"
                    :value="item"
                    :key="item.value"
                  >{{ item }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="12" :md="8" :lg="8">
              <FormItem label="测评对象" prop="testObj" v-show="false || formData.type === '0'">
                <Select v-model="formData.testObj" multiple style="width:200px">
                  <Option
                    v-for="item in testObj"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :xs="24" :sm="6" :md="3" :lg="3">
              <FormItem label="选项A分值" prop="testObj">
                <InputNumber :max="10" :min="0" v-model="formData.scoreA"></InputNumber>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="6" :md="3" :lg="3">
              <FormItem label="选项B分值" prop="testObj">
                <InputNumber :max="10" :min="0" v-model="formData.scoreB"></InputNumber>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="6" :md="3" :lg="3">
              <FormItem label="选项C分值" prop="testObj">
                <InputNumber :max="10" :min="0" v-model="formData.scoreC"></InputNumber>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="6" :md="3" :lg="3">
              <FormItem label="选项D分值" prop="testObj">
                <InputNumber :max="10" :min="0" v-model="formData.scoreD"></InputNumber>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="6" :md="3" :lg="3">
              <FormItem label="选项E分值" prop="testObj">
                <InputNumber :max="10" :min="0" v-model="formData.scoreE"></InputNumber>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="6" :md="3" :lg="3">
              <FormItem label="选项F分值" prop="testObj">
                <InputNumber :max="10" :min="0" v-model="formData.scoreF"></InputNumber>
              </FormItem>
            </Col>
          </Row>
          <Divider style="margin:10px 0"/>
          <Button @click="showTestTitle">添加题目</Button>
          <Table :columns="columns" :data="data">
            <template slot-scope="{ row, index }" slot="question">
              <Input type="text" v-model="editName" v-if="editIndex === index"/>
              <span v-else>{{ row.question }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="required">
              <Select type="text" v-model="editRequired" v-if="editIndex === index">
                <Option value="0">否</Option>
                <Option value="1">是</Option>
              </Select>
              <span v-else>{{ isRequired(row.required)}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="type">
              <Select type="text" v-model="editType" v-if="editIndex === index">
                <Option value="0">单选题</Option>
                <Option value="1">简答题</Option>
                <Option value="2">多选题</Option>
              </Select>
              <span v-else>{{ selectTestType(row.type)}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="optionA">
              <Input type="text" v-model="editOptionA" v-if="editIndex === index"/>
              <span v-else>{{ row.optionA }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="optionB">
              <Input type="text" v-model="editOptionB" v-if="editIndex === index"/>
              <span v-else>{{ row.optionB }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="optionC">
              <Input type="text" v-model="editOptionC" v-if="editIndex === index"/>
              <span v-else>{{ row.optionC }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="optionD">
              <Input type="text" v-model="editOptionD" v-if="editIndex === index"/>
              <span v-else>{{ row.optionD }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="optionE">
              <Input type="text" v-model="editOptionE" v-if="editIndex === index"/>
              <span v-else>{{ row.optionE }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="optionF">
              <Input type="text" v-model="editOptionF" v-if="editIndex === index"/>
              <span v-else>{{ row.optionF }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <div v-if="editIndex === index">
                <Button @click="handleSave(index)">保存</Button>
                <Button @click="editIndex = -1">取消</Button>
              </div>
              <div v-else>
                <Button @click="handleEdit(row, index)">操作</Button>
                <Button @click="handleRemove(index)">删除</Button>
              </div>
            </template>
          </Table>
        </Form>
        <div style="margin-top:10px;text-align: center;">
          <Button type="primary" :loading="submitLoading" size="large" @click="submitTest">提交测评</Button>
          <Button type="warning" size="large" @click="resetForm" style="margin-left:10px">重置测评</Button>
        </div>
      </Card>
    </Row>
    <Modal v-model="isTestTitle" title="添加题目" @on-cancel="cancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70">
        <FormItem label="题目名" prop="question">
          <Input v-model="formValidate.question"></Input>
        </FormItem>
        <Row>
          <Col :span="12">
            <FormItem label="题目类型" prop="type">
              <Select type="text" v-model="formValidate.type">
                <Option value="0">单选题</Option>
                <Option value="1">简答题</Option>
                <Option value="2">多选题</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="是否必选" prop="required">
              <Select type="text" v-model="formValidate.required">
                <Option value="0">否</Option>
                <Option value="1">是</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <div v-if="isShowOption">
          <FormItem label="选项A">
            <Input v-model="formValidate.optionA"></Input>
          </FormItem>
          <FormItem label="选项B">
            <Input v-model="formValidate.optionB"></Input>
          </FormItem>
          <FormItem label="选项C">
            <Input v-model="formValidate.optionC"></Input>
          </FormItem>
          <FormItem label="选项D">
            <Input v-model="formValidate.optionD"></Input>
          </FormItem>
          <FormItem label="选项E">
            <Input v-model="formValidate.optionE"></Input>
          </FormItem>
          <FormItem label="选项F">
            <Input v-model="formValidate.optionF"></Input>
          </FormItem>
        </div>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="insetTest">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { measurementAjax } from "@/api/measurement";
// 添加测评
const INSERT_URL = "/assessmentTest/insert";
// 查询
const QUERY_URL = "/assessmentTest/queryForPaper";
// 修改
const UPDATE_URL = "/assessmentTest/update";
// keyOne
const KEY_ONE = "measurementInformationEntity";
const KEY_TWO = "questionEntityList";
export default {
  data() {
    return {
      paramsData: "",
      submitLoading: false,
      isTestTitle: false,
      isShowOption: false, // 是否显示选项
      formData: {
        dateTime: [],
        name: "", // 试卷名称
        testObj: [], // 测评对象
        evalutedObj: "", // 评估对象
        type: "", // 是否指定类型
        startTime: "", // 开始时间
        endTime: "", // 截止时间
        scoreA: null,
        scoreB: null,
        scoreC: null,
        scoreD: null,
        scoreE: null,
        scoreF: null
      },
      formValidate: {
        question: "",
        required: "",
        type: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        optionE: "",
        optionF: ""
      },
      ruleValidate: {
        question: [
          {
            required: true,
            message: "请输入题目名称",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择题目名称",
            trigger: "change"
          }
        ],
        required: [
          {
            required: true,
            message: "请选择是否必选",
            trigger: "change"
          }
        ]
      },
      formDataValidate: {
        name: [
          {
            required: true,
            message: "请输入题目名称",
            trigger: "blur"
          }
        ],
        evalutedObj: [
          {
            required: false,
            message: "评估对象不能为空",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请输入测评类型",
            trigger: "change"
          }
        ],
        dateTime: [
          {
            required: true,
            type: "array",
            message: "请输入测评时间",
            trigger: "change"
          }
        ],
        testObj: [
          {
            required: false
          }
        ]
      },
      testObj: [],
      columns: [
        {
          title: "题目名",
          slot: "question"
        },
        {
          title: "是否必选",
          slot: "required",
          maxwidth: "60"
        },
        {
          title: "题目类型",
          slot: "type"
        },
        {
          title: "选项A",
          slot: "optionA"
        },
        {
          title: "选项B",
          slot: "optionB"
        },
        {
          title: "选项C",
          slot: "optionC"
        },
        {
          title: "选项D",
          slot: "optionD"
        },
        {
          title: "选项E",
          slot: "optionE"
        },
        {
          title: "选项F",
          slot: "optionF"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editAge: "", // 第二列输入框
      editType: "", // 第三列输入框
      editOptionA: "", // 第四列输入框
      editOptionB: "", // 第四列输入框
      editOptionC: "", // 第四列输入框
      editOptionD: "", // 第四列输入框
      editOptionE: "", // 第四列输入框
      editOptionF: ""
    };
  },
  watch: {
    formValidate: {
      // 深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        if (val.type === "0" || val.type === "2") {
          this.isShowOption = true;
        } else {
          this.isShowOption = false;
        }
      },
      deep: true
    }
  },
  methods: {
    // 重置
    resetForm() {
      this.$refs["formData"].resetFields();
      this.formData = {
        dateTime: [],
        name: "", // 试卷名称
        testObj: [], // 测评对象
        evalutedObj: "", // 评估对象
        type: "", // 是否指定类型
        startTime: "", // 开始时间
        endTime: "", // 截止时间
        scoreA: null,
        scoreB: null,
        scoreC: null,
        scoreD: null,
        scoreE: null,
        scoreF: null
      };
      this.data = [];
    },
    // 选择时间
    selectTime(date) {
      this.formData.startTime = date[0];
      this.formData.endTime = date[1];
      this.formData.dateTime = date;
    },
    submitTest() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          // 如果页面没有params的值，为新创建
          if (this.paramsData === undefined) {
            let formData = Object.assign(this.formData, {
              list: this.data
            });
            let url = INSERT_URL;
            let keyOne = KEY_ONE;
            let keyTwo = KEY_TWO;
            measurementAjax({ formData, url, keyTwo, keyOne })
              .then(result => {
                if (result.data.code === "200") {
                  this.submitLoading = false;
                  this.$Message.success("添加成功!");
                  this.resetForm();
                } else {
                  this.$Message.error(result.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            let optionsList = [];
            this.data.forEach(item => {
              item = Object.assign(item, {
                id: ""
              });
              optionsList.push(item);
            });
            let formData = Object.assign(this.formData, {
              list: optionsList
            });
            let url = UPDATE_URL;
            let keyOne = KEY_ONE;
            let keyTwo = KEY_TWO;
            measurementAjax({ formData, url, keyTwo, keyOne })
              .then(result => {
                if (result.data.code === "200") {
                  this.submitLoading = false;
                  this.$Message.success("添加成功!");
                  this._getMeasurementData(this.paramsData);
                } else {
                  this.$Message.error(result.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          this.$Message.error("请填写完整");
        }
      });
    },
    showTestTitle() {
      this.isTestTitle = !this.isTestTitle;
    },
    insetTest() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          // 如果选择简答题则没有选项题
          if (this.formValidate.type === "1") {
            this.formValidate = Object.assign(
              {},
              {
                question: this.formValidate.question,
                required: this.formValidate.required,
                type: this.formValidate.type,
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                optionE: "",
                optionF: ""
              }
            );
          }
          this.data.push(JSON.parse(JSON.stringify(this.formValidate)));
          this.$Message.success("添加成功!");
          this.isTestTitle = false;
          this.cancel();
        } else {
          this.$Message.error("请填写完整");
        }
      });
    },
    cancel() {
      this.$refs["formValidate"].resetFields();
      this.formValidate = {
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        optionE: ""
      };
    },
    handleEdit(row, index) {
      this.editName = row.question;
      this.editRequired = row.required;
      this.editOptionA = row.optionA;
      this.editOptionB = row.optionB;
      this.editOptionC = row.optionC;
      this.editOptionD = row.optionD;
      this.editOptionE = row.optionE;
      this.editOptionF = row.optionF;
      this.editType = row.type;
      this.editIndex = index;
    },
    handleSave(index) {
      this.data[index].question = this.editName;
      this.data[index].required = this.editRequired;
      this.data[index].type = this.editType;
      if (this.data[index].type === "1") {
        this.data[index].optionA = "";
        this.data[index].optionB = "";
        this.data[index].optionC = "";
        this.data[index].optionD = "";
        this.data[index].optionE = "";
        this.data[index].optionF = "";
      } else {
        this.data[index].optionA = this.editOptionA;
        this.data[index].optionB = this.editOptionB;
        this.data[index].optionC = this.editOptionC;
        this.data[index].optionD = this.editOptionD;
        this.data[index].optionE = this.editOptionE;
        this.data[index].optionF = this.editOptionF;
      }
      this.editIndex = -1;
    },
    handleRemove(index) {
      this.data.splice(index, 1);
    },
    isRequired(val) {
      return val === "0" ? "否" : "是";
    },
    selectTestType(val) {
      if (val === "0") {
        return "单选题";
      } else if (val === "1") {
        return "简单题";
      } else {
        return "多选题";
      }
    },
    _getMeasurementData(searchData) {
      var url = QUERY_URL;
      var keyOne = "measurementInformationFilter";
      var keyTwo = "";
      var formData = Object.assign(
        {},
        {
          id: searchData.id
        }
      );
      measurementAjax({ formData, url, keyOne, keyTwo })
        .then(result => {
          if (result.data.code === "200" && result.data !== undefined) {
            this.data = [];
            var testData = result.data.results;
            this.formData = Object.assign(testData.information, {
              dateTime: [
                testData.information.startTime,
                testData.information.endTime
              ],
              testObj:
                testData.information.testObj === null
                  ? []
                  : testData.information.testObj.split("、")
            });
            this.data = this.data.concat(
              testData.singleList,
              testData.multipleList,
              testData.shortList
            );
          } else {
            this.$Message.error(result.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.paramsData = this.$route.params.data;
  },
  mounted() {
    if (this.paramsData !== undefined) {
      this._getMeasurementData(this.paramsData);
    }
    this.getDepartmentList.forEach(item => {
      item = Object.assign(
        {},
        {
          value: item,
          label: item
        }
      );
      this.testObj.push(item);
    });
  },
  computed: {
    getDepartmentList() {
      return this.$store.state.user.departmentList;
    }
  }
};
</script>
<style scoped>
</style>
