
<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-nav">
            <Select v-model="selectTestId" clearable style="width:200px">
              <Option
                v-for="item in selectTestList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <Button @click="watchTest(selectTestId)" style="margin-left:5px">搜索</Button>
          </div>
        </Menu>
      </Header>
      <Content
        :style="{margin: '88px 20px 0',  overflowY:'scroll',  background: '#fff', maxHeight: '600px'}"
      >
        <div style="padding:10px 10px 30px 10px">
          <Row>
            <Col :span="24" v-if="!measurementInfo.length">
              <h2 class="info-title">{{measurementInfo.name}}</h2>
              <div class="test-info">
                <Row>
                  <Col :xs="24" :sm="24" :md="8" :lg="8">开始时间：{{measurementInfo.startTime}}</Col>
                  <Col :xs="24" :sm="24" :md="8" :lg="8">截止时间：{{measurementInfo.endTime}}</Col>
                  <Col :xs="24" :sm="24" :md="8" :lg="8">测评对象：{{measurementInfo.testObj}}</Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Divider/>
          <Row type="flex" justify="center" align="top">
            <Col :xs="24" :sm="24" :md="16" :lg="12">
              <Form ref="formDynamic" :model="formDynamic">
                <div v-for="(item,idx) in formDynamic.radio " :key="idx">
                  <FormItem
                    :label="item.question"
                    :prop="'radio.'+idx + '.answer'"
                    :rules="{required: item.required==='1', message: '此为必填项', trigger: 'blur'}"
                  >
                    <p>(单选)</p>
                    <RadioGroup v-model="item.answer" style="width:100%">
                      <Row>
                        <Col :xs="8" :sm="8" :md="8" :lg="4" style="text-align:center">
                          <Radio label="A" v-if="item.optionA!==''">{{item.optionA}}</Radio>
                        </Col>
                        <Col :xs="8" :sm="8" :md="8" :lg="4" style="text-align:center">
                          <Radio label="B" v-if="item.optionB!==''">{{item.optionB}}</Radio>
                        </Col>
                        <Col :xs="8" :sm="8" :md="8" :lg="4" style="text-align:center">
                          <Radio label="C" v-if="item.optionC!==''">{{item.optionC}}</Radio>
                        </Col>
                        <Col :xs="8" :sm="8" :md="8" :lg="4" style="text-align:center">
                          <Radio label="D" v-if="item.optionD!==''">{{item.optionD}}</Radio>
                        </Col>
                        <Col :xs="8" :sm="8" :md="8" :lg="4" style="text-align:center">
                          <Radio label="E" v-if="item.optionE!==''">{{item.optionE}}</Radio>
                        </Col>
                        <Col :xs="8" :sm="8" :md="8" :lg="4" style="text-align:center">
                          <Radio label="F" v-if="item.optionF!==''">{{item.optionF}}</Radio>
                        </Col>
                      </Row>
                    </RadioGroup>
                  </FormItem>
                </div>
                <div>
                  <FormItem
                    v-for="(item,idx) in formDynamic.checkbox"
                    :key="idx"
                    :prop="'checkbox.'+idx + '.answer'"
                    :label="item.question"
                    :rules="{required: item.required==='1', message: '此为必填项'}"
                  >
                    <p>(多选)</p>
                    <CheckboxGroup v-model="item.answer">
                      <Row>
                        <Col :xs="8" :sm="4" :md="4" :lg="4" style="text-align:center">
                          <Checkbox label="A" v-if="item.optionA!==''">{{item.optionA}}</Checkbox>
                        </Col>
                        <Col :xs="8" :sm="4" :md="4" :lg="4" style="text-align:center">
                          <Checkbox label="B" v-if="item.optionB!==''">{{item.optionB}}</Checkbox>
                        </Col>
                        <Col :xs="8" :sm="4" :md="4" :lg="4" style="text-align:center">
                          <Checkbox label="C" v-if="item.optionC!==''">{{item.optionC}}</Checkbox>
                        </Col>
                        <Col :xs="8" :sm="4" :md="4" :lg="4" style="text-align:center">
                          <Checkbox label="D" v-if="item.optionD!==''">{{item.optionD}}</Checkbox>
                        </Col>
                        <Col :xs="8" :sm="4" :md="4" :lg="4" style="text-align:center">
                          <Checkbox label="E" v-if="item.optionE!==''">{{item.optionE}}</Checkbox>
                        </Col>
                        <Col :xs="8" :sm="4" :md="4" :lg="4" style="text-align:center">
                          <Checkbox label="F" v-if="item.optionF!==''">{{item.optionF}}</Checkbox>
                        </Col>
                      </Row>
                    </CheckboxGroup>
                  </FormItem>
                </div>
                <div>
                  <FormItem
                    v-for="(item,idx) in formDynamic.text"
                    v-if="item.question"
                    :prop="'text.'+idx + '.answer'"
                    :key="idx"
                    :label="item.question"
                    :rules="{required: item.required==='1', message: '此为必填项', trigger: 'blur'}"
                  >
                    <p>(简答题)</p>
                    <Input v-model="item.answer" type="textarea" placeholder="请输入内容"/>
                  </FormItem>
                </div>
              </Form>
              <div style="text-align:center">
                <Button type="primary" size="large" @click="submitTest">提交测评</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <Spin size="large" fix v-if="isLoading"></Spin>
    </Layout>
    <Modal :title="modalTitle" v-model="isShowModal" :mask-closable="false">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="phone" v-if="isLoginShow">
          <Input type="text" v-model="formInline.phone" placeholder="请输入手机号">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <Row>
        <Col :span="24">
          <div
            class="test-wrapper"
            @click="watchTest(item.id)"
            v-for="(item,index) in testList"
            :key="index"
          >
            <p class="test-item">{{item.name}}</p>
            <span class="start-time">开始时间：{{item.startTime}}</span>
            <span class="end-time">结束时间：{{item.endTime}}</span>
          </div>
        </Col>
      </Row>
      <div slot="footer">
        <Button
          v-if="isLoginShow"
          type="primary"
          :loading="submitLoading"
          @click="handleSubmit('formInline')"
        >登录</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { questionnaireAjax, answerAjax } from "@/api/measurement";
// 登录
const LOGIN_URL = "/answer/login";
// 查询试卷
const QUERY_URL = "/answer/queryForPaper";
// 提交测评
const SUBMIT_URL = "/answer/answer";
// 非登录用户
const NO_LOGIN_URL = "/answer/noLogin";
export default {
  data() {
    return {
      test: [],
      option: "",
      selectTestId: "",
      submitLoading: false,
      isShowModal: false,
      isLoginShow: true,
      modalTitle: "指定对象登录",
      measurementInfo: [],
      measurementRadio: [],
      measurementCheckbox: [],
      measurementText: [],
      formDynamic: {},
      testList: [],
      formInline: {
        phone: ""
      },
      isLoading: true,
      selectTestList: [],
      ruleInline: {
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    showGrop() {},
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.login();
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    submitTest() {
      this.$refs["formDynamic"].validate(valid => {
        if (valid) {
          var answerList = [];
          var formData = {};
          var url = SUBMIT_URL;
          var keyOne = "measurementInformationEntity";
          var keyTwo = "answerList";
          for (const key in this.formDynamic) {
            if (key === "checkbox") {
              this.formDynamic[key].forEach(item => {
                var itemObj = {};
                var optionA = "0";
                var optionB = "0";
                var optionC = "0";
                var optionD = "0";
                var optionE = "0";
                var optionF = "0";
                item.answer.forEach(i => {
                  switch (i) {
                    case "A":
                      optionA = "1";
                      break;
                    case "B":
                      optionB = "1";
                      break;
                    case "C":
                      optionC = "1";
                      break;
                    case "D":
                      optionD = "1";
                      break;
                    case "E":
                      optionE = "1";
                      break;
                    default:
                      optionF = "1";
                      break;
                  }
                });
                itemObj = Object.assign(
                  {},
                  {
                    questionId: item.id,
                    questionType: item.type,
                    optionA: optionA,
                    optionB: optionB,
                    optionC: optionC,
                    optionD: optionD,
                    optionE: optionE,
                    optionF: optionF,
                    answer:
                      typeof item.answer === "object"
                        ? item.answer.join(",")
                        : item.answer
                  }
                );
                answerList.push(itemObj);
              });
            } else {
              this.formDynamic[key].forEach(item => {
                var itemObj = {};
                var optionA = "0";
                var optionB = "0";
                var optionC = "0";
                var optionD = "0";
                var optionE = "0";
                var optionF = "0";
                switch (item.answer) {
                  case "A":
                    optionA = "1";
                    break;
                  case "B":
                    optionB = "1";
                    break;
                  case "C":
                    optionC = "1";
                    break;
                  case "D":
                    optionD = "1";
                    break;
                  case "E":
                    optionE = "1";
                    break;
                  default:
                    optionF = "1";
                    break;
                }
                if (key === "radio") {
                  itemObj = Object.assign(
                    {},
                    {
                      questionId: item.id,
                      questionType: item.type,
                      optionA: optionA,
                      optionB: optionB,
                      optionC: optionC,
                      optionD: optionD,
                      optionE: optionE,
                      optionF: optionF,
                      answer:
                        typeof item.answer === "object"
                          ? item.answer.join(",")
                          : item.answer
                    }
                  );
                } else {
                  itemObj = Object.assign(
                    {},
                    {
                      questionId: item.id,
                      questionType: item.type,
                      answer:
                        typeof item.answer === "object"
                          ? item.answer.join(",")
                          : item.answer
                    }
                  );
                }
                answerList.push(itemObj);
              });
            }
          }
          // 如果是登录用户需要把userInfo传给后台
          if (this.option === "note") {
            var keyThree = "evaluateUserEntity";
            this.measurementInfo = Object.assign(this.measurementInfo, {
              testObj: this.measurementInfo.testObj.split("、")
            });
            formData = Object.assign(this.measurementInfo, {
              list: answerList,
              phone: this.formInline.phone
            });
          } else {
            formData = Object.assign(this.measurementInfo, {
              list: answerList
            });
          }
          answerAjax({ formData, url, keyOne, keyTwo, keyThree }).then(
            result => {
              console.log(result);
              if (result.data.code === "200") {
                this.$Message.success("操作成功");
                this.$router.push({
                  name: "questionnaire"
                });
              } else {
                this.$Message.error(result.data.message);
              }
            }
          );
        } else {
          this.$Message.error("请填写完整!");
        }
      });
    },
    watchTest(id) {
      let formData = Object.assign(
        {},
        {
          id
        }
      );
      this.selectTestId = id;
      let url = QUERY_URL;
      let keyOne = "measurementInformationFilter";
      var keyTwo = "evaluateUserEntity";
      this.getTestItem(formData, url, keyOne, keyTwo);
    },
    getTestItem(formData, url, keyOne, keyTwo) {
      formData = Object.assign(formData, {
        phone: this.formInline.phone
      });
      this.isLoading = true;
      questionnaireAjax({ formData, url, keyOne, keyTwo })
        .then(result => {
          this.submitLoading = false;
          this.isLoading = false;
          if (result.data.code === "200") {
            this.$Message.success("操作成功");
            this.measurementInfo = result.data.results.information;
            this.measurementRadio = result.data.results.singleList;
            result.data.results.multipleList.forEach(item => {
              item = Object.assign(item, {
                answer: []
              });
            });
            this.measurementCheckbox = result.data.results.multipleList;
            this.measurementText = result.data.results.shortList;
            this.formDynamic = Object.assign(
              {},
              {
                radio: this.measurementRadio,
                text: this.measurementText,
                checkbox: this.measurementCheckbox
              }
            );
            this.isShowModal = false;
          } else {
            this.$Message.error(result.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      let formData = this.formInline;
      let url = LOGIN_URL;
      let keyOne = "evaluateUserEntity";
      questionnaireAjax({ formData, url, keyOne })
        .then(result => {
          this.submitLoading = false;
          if (result.data.code === "200") {
            this.$Message.success("登录成功");
            this.testList = result.data.results;
            this.testList.forEach(item => {
              let itemObj = Object.assign(
                {},
                {
                  value: item.id,
                  label: item.name
                }
              );
              this.selectTestList.push(itemObj);
            });
            this.isLoginShow = false;
            this.modalTitle = "可填测评";
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
    this.option = this.$route.params.option;
    this.isShowModal = true;
    if (this.option === "note") {
    } else if (this.option === "random") {
      this.modalTitle = "随机用户";
      this.isLoginShow = false;
      let url = NO_LOGIN_URL;
      let keyOne = "measurementInformationFilter";
      let formData = "";
      questionnaireAjax({ formData, url, keyOne }).then(result => {
        this.submitLoading = false;
        if (result.data.code === "200") {
          this.$Message.success("登录成功");
          this.testList = result.data.results;
          this.testList.forEach(item => {
            let itemObj = Object.assign(
              {},
              {
                value: item.id,
                label: item.name
              }
            );
            this.selectTestList.push(itemObj);
          });
          this.isLoginShow = false;
          this.modalTitle = "可填测评";
        } else {
          this.$Message.error(result.data.message);
        }
      });
    }
  }
};
</script>
<style>
.ivu-layout-header {
  z-index: 9;
}
.layout {
  border: 1px solid #d7dde4;
  position: relative;
  border-radius: 4px;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.ivu-modal-close {
  display: none;
}

.test-wrapper {
  margin: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.test-wrapper .test-item:hover {
  color: #5cadff;
}
.test-wrapper .test-item {
  font-size: 14px;
  line-height: 28px;
}
.test-wrapper .start-time {
  float: left;
  font-size: 10px;
}
.test-wrapper .end-time {
  float: right;
  color: #e53935;
  font-size: 10px;
}
.info-title {
  padding: 10px 0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>
