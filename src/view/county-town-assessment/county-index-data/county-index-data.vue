<template>
  <div>
    <Row>
      <Card>
        <!-- 搜索 -->
        <Form ref="searchData" :model="searchData" :label-width="100">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="选择显示">
                <Cascader
                  :data="selectScore"
                  v-model="searchData.showDefault"
                  change-on-select
                  @on-change="selectScoreType"
                ></Cascader>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="指标搜索" prop="superiorIndexId">
                <Cascader :data="selectIndex" change-on-select @on-change="selectIndexType"></Cascader>
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
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="责任单位">
                <Select
                  clearable
                  placeholder="请输入责任单位"
                  v-model="searchData.responsibilityUnit"
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
                <Select v-model="searchData.audit" placeholder="请选择审核状态" style="width: 150px">
                  <Option value="5">全部</Option>
                  <Option value="4">未填写</Option>
                  <Option value="0">未审核</Option>
                  <Option value="1">责任人已审核</Option>
                  <Option value="2">管理员已审核</Option>
                  <Option value="3">退回</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="选择年份">
                <DatePicker
                  type="year"
                  format="yyyy"
                  @on-change="handlerFormat"
                  placeholder="请选择指标年份"
                  style="width:185px"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="选择月份">
                <Select
                  clearable
                  v-model="searchData.monthTime"
                  placeholder="请选择方向"
                  style="width: 150px"
                >
                  <Option value="01">1月</Option>
                  <Option value="02">2月</Option>
                  <Option value="03">3月</Option>
                  <Option value="04">4月</Option>
                  <Option value="05">5月</Option>
                  <Option value="06">6月</Option>
                  <Option value="07">7月</Option>
                  <Option value="08">8月</Option>
                  <Option value="09">9月</Option>
                  <Option value="10">10月</Option>
                  <Option value="11">11月</Option>
                  <Option value="12">12月</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
          <FormItem>
            <!-- 10是pageSize,1当前页 -->
            <Button :loading="submitloading" type="primary" @click="seachSubmit(1,10)">提交搜索</Button>
            <Button @click="seachReset('searchData')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </Card>
    </Row>
    <Row>
      <Card>
        <Table
          v-if="isTabelAllShow"
          border
          stripe
          :loading="isTabelAllLoading"
          :columns="tabelShowAll"
          :data="IndexAll"
        ></Table>
        <Table
          v-if=" isTabelInedxShow"
          border
          stripe
          :loading="isTabelInedxLoading"
          :columns="tabelShowIndex"
          :data="IndexAll"
        ></Table>
        <div style="margin-top:20px;margin-left:40%">
          <Page
            @on-change="pageNumberChange"
            :current="pageCurrent"
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
          action="/townScore/importTownScore"
        >
          <Button icon="ios-cloud-upload-outline">上传分数</Button>
        </Upload>
      </Card>
    </Row>
    <Drawer
      title="各乡镇数据"
      :mask-closable="false"
      :styles="styles"
      width="100%"
      v-model="isDrawerShow"
    >
      <Form ref="formData" :model="formData" :rules="countyReg">
        <Row :gutter="32">
          <Col span="10">
            <FormItem label="一级指标" label-position="top">
              <Input disabled v-model="formData.superiorIndexId" placeholder/>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="二级指标" label-position="top">
              <Input disabled v-model="formData.indexName" placeholder></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="7">
            <FormItem label="牵头单位" label-position="top">
              <Input disabled v-model="formData.leadUnit" placeholder></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="责任单位" label-position="top">
              <Input disabled v-model="formData.responsibilityUnit" placeholder></Input>
            </FormItem>
          </Col>,
          <Col span="6">
            <FormItem label="权数" label-position="top">
              <Input disabled v-model="formData.weight" placeholder></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="24">
          <Col span="3" v-for="(item,index) in countyList" :key="index" v-if="item.weight !==null">
            <Card style="width:100%">
              <div class="title" style="text-align: center;margin-bottom:10px;">{{index}}</div>
              <div class="content">
                <Row>
                  <Col span="12">
                    <FormItem>
                      <Button type="primary" style="width:100%">权数</Button>
                      <InputNumber
                        style="width:100%"
                        :max="100"
                        :min="0"
                        disabled
                        v-model="countyList[index].weight"
                      ></InputNumber>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem>
                      <Button type="success" style="width:100%">得分</Button>
                      <InputNumber
                        style="width:100%"
                        disabled
                        :max="100"
                        :min="0"
                        v-model="countyList[index].finalScore"
                      ></InputNumber>
                    </FormItem>
                  </Col>
                </Row>
                <Row style="height:72px">
                  <Col span="12">
                    <FormItem prop="score">
                      <Button type="error" style="width:100%">得分率</Button>
                      <InputNumber
                        :disabled="isScoreDisabled || countyList[index].weight===null"
                        style="width:100%"
                        :max="100"
                        :min="0"
                        v-model="countyList[index].score"
                      ></InputNumber>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem>
                      <Button type="warning" style="width:100%">排名</Button>
                      <InputNumber
                        :disabled="true"
                        style="width:100%"
                        :max="100"
                        :min="0"
                        v-model="countyList[index].rank"
                      ></InputNumber>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </Row>
        <Row style="margin-top:20px">
          <i-col :xs="24" :md="12" :lg="4">
            <FormItem label="选择月份" prop="monthTime">
              <Select
                clearable
                :disabled="isScoreDisabled"
                v-model="formData.monthTime"
                placeholder="请选择方向"
                style="width: 150px"
              >
                <Option value="01">1月</Option>
                <Option value="02">2月</Option>
                <Option value="03">3月</Option>
                <Option value="04">4月</Option>
                <Option value="05">5月</Option>
                <Option value="06">6月</Option>
                <Option value="07">7月</Option>
                <Option value="08">8月</Option>
                <Option value="09">9月</Option>
                <Option value="10">10月</Option>
                <Option value="11">11月</Option>
                <Option value="12">12月</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col :lg="11" v-if="isAuditText">
            <FormItem label="回退原因" :label-width="60">
              <Input
                v-model="formData.reason"
                type="textarea"
                disabled
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="如果回退输入原因，其他操作无需输入"
              ></Input>
            </FormItem>
          </i-col>
        </Row>
      </Form>
      <div class="demo-drawer-footer" style="margin-left:50px">
        <Button
          :disabled="isScoreDisabled"
          :loading="isScoreSubmitLoading"
          style="width:200px;margin-right:20px"
          type="primary"
          @click="submitCountyScore"
        >确认提交</Button>
        <Button style="width:100px;" @click="closeDrawerShow">取消</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { countyAjax } from "@/api/city";
import { hasOneOf } from "@/libs/tools";
export default {
  data() {
    return {
      isTabelAllShow: true, // 显示所有
      isTabelAllLoading: true, // 显示所有表格Loading
      isTabelInedxShow: false, // 显示部分
      isTabelInedxLoading: true, // 显示部分表格Loading
      isDrawerShow: false, // 侧边栏隐藏
      pageTotal: 0, // 总页数
      pageSize: 10, // 显示条数
      pageNumber: 1, // 页码
      pageCurrent: 1, // 当前页
      submitloading: false, // 提交Loading
      isAuditText: false, // Audit状态值为3 退回原因
      setScoreId: "", // 当前添加或改变分数的Id
      selectTime: "", // 填写分数时间
      countyDateTime: "", // 年份
      countyMonthTime: "", // 月份
      isScoreSubmitLoading: false, // 提交分数Loading
      spinShow: false, // 侧边Loading
      isScoreDisabled: false, // 根据Audit 是否可以填写
      IndexAll: [],
      searchData: {
        showDefault: ["showAll", "0"], // 默认显示
        showType: "", // 显示类型
        responsibilityUnit: "",
        leadUnit: "",
        indexName: "", // 指标名称
        dateTime: "", // 年份
        monthTime: "", // 月份
        audit: "", // 审核状态
        scoreType: "0"
      },
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formScore: {
        indexName: "",
        indexType: "",
        superiorIndexId: "",
        leadUnit: "",
        responsibilityUnit: "",
        weight: "",
        score: "",
        dateTime: "",
        塘前乡: 0, // 塘前
        葛岭镇: 0, // 葛岭
        樟城镇: 0, // 樟城
        城峰镇: 0, // 城峰
        清凉镇: 0, // 清凉
        福泉镇: 0, // 福泉
        岭路乡: 0, // 岭路
        赤锡乡: 0, // 赤锡
        梧桐镇: 0, // 梧桐
        嵩口镇: 0, // 嵩口
        洑口乡: 0, // 伏口
        盖洋乡: 0, // 盖洋
        长庆镇: 0, // 长庆
        东洋乡: 0, // 东洋
        霞拔乡: 0, // 霞拔
        同安镇: 0, // 同安
        大洋乡: 0, // 大洋
        盘谷乡: 0, // 盘谷
        红星镇: 0, // 红星
        白云乡: 0, // 白云
        丹云乡: 0 // 丹云
      },
      selectIndex: [
        // 搜索指标里的关联指标
      ],
      selectScore: [
        {
          value: "showAll",
          label: "全部显示",
          children: [
            {
              value: "0",
              label: "权数"
            },
            {
              value: "1",
              label: "得分"
            },
            {
              value: "2",
              label: "得分率"
            },
            {
              value: "3",
              label: "排名"
            }
          ]
        },
        {
          value: " showIndex",
          label: "二级指标",
          children: [
            {
              value: "0",
              label: "权数"
            },
            {
              value: "1",
              label: "得分"
            },
            {
              value: "2",
              label: "得分率"
            },
            {
              value: "3",
              label: "排名"
            }
          ]
        }
      ],
      formData: {
        indexName: "",
        leadUnit: "",
        responsibilityUnit: "",
        superiorIndexId: "",
        weight: "",
        monthTime: ""
      },
      countyList: {},
      countyReg: {
        monthTime: [
          {
            required: true,
            message: "请输入时间",
            trigger: "blur"
          }
        ]
      },
      tabelShowIndex: [
        {
          title: "二级指标",
          key: "indexName",
          width: 180,
          fixed: "left"
        },
        {
          title: "权数",
          key: "weight",
          width: 70
        },
        {
          title: "塘前",
          key: "塘前乡",
          width: 70
        },
        {
          title: "葛岭",
          key: "葛岭镇",
          width: 70
        },
        {
          title: "樟城",
          key: "樟城镇",
          width: 70
        },
        {
          title: "城峰",
          key: "城峰镇",
          width: 70
        },
        {
          title: "清凉",
          key: "清凉镇",
          width: 70
        },
        {
          title: "福泉",
          key: "福泉镇",
          width: 70
        },
        {
          title: "岭路",
          key: "岭路乡",
          width: 70
        },
        {
          title: "赤锡",
          key: "赤锡乡",
          width: 70
        },
        {
          title: "梧桐",
          key: "梧桐镇",
          width: 70
        },
        {
          title: "嵩口",
          key: "嵩口镇",
          width: 70
        },
        {
          title: "洑口",
          key: "洑口乡",
          width: 70
        },
        {
          title: "盖洋",
          key: "盖洋乡",
          width: 70
        },
        {
          title: "长庆",
          key: "长庆镇",
          width: 70
        },
        {
          title: "东洋",
          key: "东洋乡",
          width: 70
        },
        {
          title: "霞拔",
          key: "霞拔乡",
          width: 70
        },
        {
          title: "同安",
          key: "同安镇",
          width: 70
        },
        {
          title: "大洋",
          key: "大洋乡",
          width: 70
        },
        {
          title: "盘谷",
          key: "盘谷乡",
          width: 70
        },
        {
          title: "红星",
          key: "红星镇",
          width: 70
        },
        {
          title: "白云",
          key: "白云乡",
          width: 70
        },
        {
          title: "丹云",
          key: "丹云乡",
          width: 70
        },
        {
          title: "审核状态",
          key: "audit",
          width: 120,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            const row = params.row;
            var color = "";
            var text = "";
            switch (row.audit) {
              case "0":
                color = "warning";
                text = "未审核";
                break;
              case "1":
                color = "primary";
                text = "责任人审核";
                break;
              case "2":
                color = "success";
                text = "管理员审核";
                break;
              case "3":
                color = "error";
                text = "回退";
                break;
              default:
                color = "#9e9e9e"; // 未填写
                text = "未填写";
                break;
            }
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            var text = "";
            var color = "";
            if (params.row.audit === "0" || params.row.audit === null) {
              text = "填写分数";
            } else if (params.row.audit === "3") {
              text = "重新填写";
              color = "error";
              this.isAuditText = true;
            } else if (params.row.audit === "1" || params.row.audit === "2") {
              color = "primary";
              text = "不可填写";
            }
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
                      if (this.accessRespons) {
                        this.$Message.error("权限不足");
                        return;
                      } else if (params.row.audit === "2" && this.accessAgent) {
                        this.$Message.error("管理员人才可填写");
                        return;
                      } else if (params.row.audit === "1" && this.accessAgent) {
                        this.$Message.error("管理员人才可填写");
                        return;
                      }
                      this.setScoreId = params.row.id; // id 获取本条Index详情
                      this.isDrawerShow = true; // 侧边栏显示
                      this.getIndexItem(this.setScoreId);
                    }
                  }
                },
                text
              )
            ]);
          }
        }
      ],
      tabelShowAll: [
        {
          title: "一级指标",
          key: "superiorIndexId",
          width: 150,
          fixed: "left"
        },
        {
          title: "二级指标",
          key: "indexName",
          width: 180,
          fixed: "left"
        },
        {
          title: "权数",
          key: "weight",
          width: 70
        },
        {
          title: "塘前",
          key: "塘前乡",
          width: 70
        },
        {
          title: "葛岭",
          key: "葛岭镇",
          width: 70
        },
        {
          title: "樟城",
          key: "樟城镇",
          width: 70
        },
        {
          title: "城峰",
          key: "城峰镇",
          width: 70
        },
        {
          title: "清凉",
          key: "清凉镇",
          width: 70
        },
        {
          title: "福泉",
          key: "福泉镇",
          width: 70
        },
        {
          title: "岭路",
          key: "岭路乡",
          width: 70
        },
        {
          title: "赤锡",
          key: "赤锡乡",
          width: 70
        },
        {
          title: "梧桐",
          key: "梧桐镇",
          width: 70
        },
        {
          title: "嵩口",
          key: "嵩口镇",
          width: 70
        },
        {
          title: "洑口",
          key: "洑口乡",
          width: 70
        },
        {
          title: "盖洋",
          key: "盖洋乡",
          width: 70
        },
        {
          title: "长庆",
          key: "长庆镇",
          width: 70
        },
        {
          title: "东洋",
          key: "东洋乡",
          width: 70
        },
        {
          title: "霞拔",
          key: "霞拔乡",
          width: 70
        },
        {
          title: "同安",
          key: "同安镇",
          width: 70
        },
        {
          title: "大洋",
          key: "大洋乡",
          width: 70
        },
        {
          title: "盘谷",
          key: "盘谷乡",
          width: 70
        },
        {
          title: "红星",
          key: "红星镇",
          width: 70
        },
        {
          title: "白云",
          key: "白云乡",
          width: 70
        },
        {
          title: "丹云",
          key: "丹云乡",
          width: 70
        },
        {
          title: "牵头单位",
          key: "leadUnit",
          width: 150
        },
        {
          title: "责任单位",
          key: "responsibilityUnit",
          width: 150
        },
        {
          title: "审核状态",
          key: "audit",
          width: 120,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            const row = params.row;
            var color = "";
            var text = "";
            switch (row.audit) {
              case "0":
                color = "warning";
                text = "未审核";
                break;
              case "1":
                color = "primary";
                text = "责任人审核";
                break;
              case "2":
                color = "success";
                text = "管理员审核";
                break;
              case "3":
                color = "error";
                text = "回退";
                break;
              default:
                color = "#9e9e9e"; // 未填写
                text = "未填写";
                break;
            }
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            var text = "";
            var color = "";
            if (params.row.audit === "0" || params.row.audit === null) {
              text = "填写分数";
            } else if (params.row.audit === "3") {
              text = "重新填写";
              color = "error";
            } else if (params.row.audit === "1" || params.row.audit === "2") {
              color = "primary";
              text = "不可填写";
            }
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
                      if (this.accessRespons) {
                        this.$Message.error("权限不足");
                        return;
                      } else if (params.row.audit === "2" && this.accessAgent) {
                        this.$Message.error("管理员人才可填写");
                        return;
                      } else if (params.row.audit === "1" && this.accessAgent) {
                        this.$Message.error("管理员人才可填写");
                        return;
                      }
                      this.setScoreId = params.row.id; // id 获取本条Index详情
                      this.isDrawerShow = true; // 侧边栏显示
                      this.getIndexItem(this.setScoreId);
                    }
                  }
                },
                text
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    // 验证上传格式
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "文件" + file.name + " 格式错误, 请选择xls或者xlsx"
      });
    },

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
    // 关闭侧边栏
    closeDrawerShow() {
      this.isDrawerShow = false;
      this.isScoreSubmitLoading = false;
    },
    // 提交分数
    submitCountyScore() {
      this.$refs["formData"].validate(valid => {
        if (valid) {
          var setCountyListScore = { list: [] };
          this.isScoreSubmitLoading = true;
          if (this.selectTime !== "") {
            // 组成后台处理格式
            for (const item in this.countyList) {
              console.log(this.countyList[item]);
              var countyObj = Object.assign(
                {},
                {
                  id: this.setScoreId,
                  townName: item,
                  monthTime: this.formData.monthTime,
                  score: this.countyList[item].score,
                  rank: this.countyList[item].rank,
                  weight:
                    this.countyList[item].weight === null
                      ? "0"
                      : this.countyList[item].weight
                }
              );
              setCountyListScore["list"].push(countyObj);
              this.formData = Object.assign(this.formData, setCountyListScore);
            }

            this._setCountyScore(this.formData).then(res => {
              if (res.code === "200") {
                this.$Message.success("操作成功");
                this.isScoreSubmitLoading = false;
                this.isDrawerShow = false;
                this.seachSubmit(this.pageNumber, this.pageSize); // 如果填入成功重新刷新页面
              } else {
                // 填入失败 打印失败详情
                this.$Message.error(res.message);
                this.isScoreSubmitLoading = false;
              }
            });
          } else {
            this.isScoreSubmitLoading = false;
            this.$Message.info({
              content: `填入时间不能为空`,
              duration: 5
            });
          }
        } else {
          this.$Message.error("请填写月份");
        }
      });
    },
    getIndexItem(id) {
      this.spinShow = true;
      const formData = Object.assign(
        {},
        {
          id,
          scoreType: 4
        }
      );
      this._getCountyList(
        formData,
        this.pageNumber, // 码数
        this.pageSize // 页数
      ).then(res => {
        if (res.code === "200") {
          this.formData = res.results.list[0];
          this.countyList = this.formData.townList;
          this.spinShow = false;
          if (this.formData.audit !== "1" && this.formData.audit !== "2") {
            this.isScoreDisabled = false;
            if (this.formData.audit === "3") {
              this.isAuditText = true;
            } else {
              this.isAuditText = false;
            }
          } else {
            this.isScoreDisabled = true;
          }
          // 如果指标有时间的话。 就保存起来
          if (this.formData.monthTime === "") {
            this.selectTime = "";
          } else {
            var date = [this.formData.dateTime, this.formData.monthTime];
            this.selectTime = date.join("-");
            this.countyDateTime = this.formData.dateTime;
            this.countyMonthTime = this.formData.monthTime;
          }
        }
      });
    },
    // 获取时间
    handlerFormat(year) {
      this.searchData.dateTime = year;
    },
    // 指标管理关联 on-change
    selectScoreType(value) {
      this.searchData.showType = value[0];
      this.searchData.scoreType = value[1];
    },
    selectIndexType(value) {
      if (value[1] !== undefined) {
        this.searchData.indexName = value[1];
        this.searchData.superiorIndexId = value[0] === "全部" ? "" : value[0]; // 选择为全部时 是一个空的字符串
      } else {
        this.searchData.superiorIndexId = value[0] === "全部" ? "" : value[0]; // 选择为全部时 是一个空的字符串
        this.searchData.indexName = "";
      }
    },
    // 提交搜索
    seachSubmit(pageNumber, pageSize) {
      this.submitloading = true;
      this.isTabelAllLoading = true;
      this.isTabelInedxLoading = true;
      if (!this.searchData.showDefault.length) {
        this.searchData.showDefault = ["showAll", "0"];
        this.searchData.showType = "showAll";
      }
      this._getCountyList(this.searchData, pageNumber, pageSize)
        .then(result => {
          if (result.code === "200") {
            this.submitloading = false;
            if (this.searchData.showType !== undefined) {
              if (this.searchData.showType === "showAll") {
                this.isTabelInedxShow = false;
                this.isTabelAllLoading = false;
                this.isTabelAllShow = true;
                this.pageTotal = parseInt(result.results.pageTotal) * 10;
                this.IndexAll = result.results.list;
              } else {
                this.isTabelAllShow = false;
                this.isTabelInedxShow = true;
                this.pageTotal = parseInt(result.results.pageTotal) * 10;
                this.IndexAll = result.results.list;
                this.isTabelInedxLoading = false;
              }
            }
          } else {
            this.$Message.error("请刷新页面后重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 页码
    pageNumberChange(number) {
      this.pageNumber = number;
      this.seachSubmit(this.pageNumber, this.pageSize);
    },
    // 一页的个数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.seachSubmit(this.pageNumber, this.pageSize);
    },
    // 重置搜索
    seachReset(name) {
      this.$refs[name].resetFields();
      this.searchData = {
        showDefault: ["showAll", "0"], // 默认显示
        showType: "", // 显示类型
        responsibilityUnit: "",
        leadUnit: "",
        indexName: "", // 指标名称
        dateTime: "", // 年份
        monthTime: "", // 月份
        audit: "", // 审核状态
        scoreType: "0"
      };
      this.submitloading = false;
    },
    // 查询数据
    _getCountyList(form, pageNumber, pageSize) {
      const url = "/townScore/query";
      const keyOne = "townIndicatorsFilter";
      let formData = Object.assign(form, {
        pageNumber: pageNumber,
        pageSize: pageSize
      });
      return new Promise((resolve, reject) => {
        countyAjax({ formData, url, keyOne }).then(res => {
          if (res.data !== undefined) {
            resolve(res.data);
          } else {
            reject(error);
          }
        });
      });
    },
    // 添加数据
    _addIndexCounty(formData) {
      const url = "/townIndicators/insert";
      const keyOne = "townIndicatorsEntity";
      const keyTwo = "townList";
      return new Promise((resolve, reject) => {
        countyAjax({ formData, url, keyOne, keyTwo }).then(res => {
          if (res.data.code === "200") {
            resolve(res.data);
          } else {
            reject(eer);
          }
        });
      });
    },
    // 更新修改
    _updateIndexCounty(formData) {
      const url = "/townIndicators/update";
      const keyOne = "townIndicatorsEntity";
      const keyTwo = "townList";
      return new Promise((resolve, reject) => {
        countyAjax({ formData, url, keyOne, keyTwo }).then(res => {
          if (res.data !== undefined) {
            resolve(res.data);
          } else {
            reject(error);
          }
        });
      });
    },
    // 添加分数
    _setCountyScore(formData) {
      const url = "/townScore/setScore";
      const keyOne = "townIndicatorsFilter";
      return new Promise((resolve, reject) => {
        countyAjax({ formData, url, keyOne }).then(res => {
          if (res.data !== undefined) {
            resolve(res.data);
          } else {
            reject(error);
          }
        });
      });
    }
  },
  created() {
    this._getCountyList(
      this.searchData,
      this.pageNumber, // 码数
      this.pageSize // 页数
    ).then(result => {
      var indexList = result.results.indexMap;
      indexList.forEach(list => {
        let children = [];
        if (list.secondIndex !== undefined) {
          list.secondIndex.forEach(item => {
            let listChild = Object.assign(
              {},
              {
                label: item.indexName,
                value: item.indexName
              }
            );
            children.push(listChild);
          });
        }
        let data = Object.assign(
          {},
          {
            label: list.firstName.indexName,
            value: list.firstName.id,
            children
          }
        );
        this.selectIndex.push(data);
      });
      this.pageTotal = parseInt(result.results.pageTotal) * 10;
      this.IndexAll = result.results.list;
      this.isTabelAllLoading = false;
    });
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
.ivu-input-number-disabled .ivu-input-number-input {
  color: #333;
}
</style>
