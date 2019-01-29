<template>
  <div>
    <!-- 首页顶部四个框 -->
    <Row :gutter="20">
      <!-- 县绩效考核总分 -->
      <i-col :xs="24" :md="12" :lg="6" style="height: 160px;padding-bottom: 10px;">
        <infor-card shadow :icon-size="36" :color="inforCardData[0].color">
          <div class="henader-nav">
            <h2 class="head-title">
              <count-to :decimals="1" :end="inforCardData[0].count" count-class="count-style"/>
            </h2>
            <p class="sub-text">市对县指标得分</p>
            <div style="margin-top:50px">
              <bg-example style="height:70px;"></bg-example>
            </div>
          </div>
        </infor-card>
      </i-col>
      <!-- 县绩效考核排名 -->
      <i-col :xs="24" :md="12" :lg="6" style="height: 160px;padding-bottom: 10px;">
        <infor-card shadow :icon-size="36" :color="inforCardData[1].color">
          <div class="henader-nav">
            <h2 class="head-title">
              <count-to
                :end="inforCardData[1].count"
                style="margin:0 10px;"
                count-class="count-style"
              />分
            </h2>
            <p class="sub-text">正向激励</p>
            <div style="margin-top:70px">
              <bg-bar style="height:120px;"></bg-bar>
            </div>
          </div>
        </infor-card>
      </i-col>
      <!-- 指标预警 -->
      <i-col :xs="24" :md="12" :lg="6" style="height: 160px;padding-bottom: 10px;">
        <infor-card shadow :icon-size="36" :color="inforCardData[2].color">
          <div class="henader-nav">
            <h2 class="head-title blod-font">察访核验</h2>
          </div>
          <Row style="margin-top:50px;color:#fff;font-size:14px">
            <i-col :xs="12" :md="12" :lg="12">
              <p>市对县察访核验扣分</p>
              <p style="font-size:18px; margin-top:10px;">
                <count-to :end="0" style="margin:0 10px;" count-class="count-style"/>分
              </p>
            </i-col>
            <i-col :xs="12" :md="12" :lg="12">
              <p>县对部门察访核验扣分</p>
              <p style="font-size:18px; margin-top:10px;">
                <count-to :end="0" style="margin:0 10px;" count-class="count-style"/>分
              </p>
            </i-col>
          </Row>
        </infor-card>
      </i-col>
      <!-- 未录入指标单位 -->
      <i-col :xs="24" :md="12" :lg="6" style="height: 160px;padding-bottom: 10px;">
        <infor-card shadow :icon-size="36" :color="inforCardData[3].color">
          <div class="henader-nav">
            <h2 class="head-title blod-font">专项工作督查</h2>
          </div>
          <Row style="margin-top:50px;color:#fff;font-size:14px">
            <i-col :xs="8" :md="8" :lg="8">
              <p>市指标</p>
              <p style="font-size:18px; margin-top:10px;">
                <count-to :end="0" count-class="count-style"/>项
              </p>
            </i-col>
            <i-col :xs="8" :md="8" :lg="8">
              <p>县指标</p>
              <p style="font-size:18px; margin-top:10px;">
                <count-to :end="0" count-class="count-style"/>项
              </p>
            </i-col>
            <i-col :xs="8" :md="8" :lg="8">
              <p>六抓六赛</p>
              <p style="font-size:18px; margin-top:10px;">
                <count-to :end="0" count-class="count-style"/>项
              </p>
            </i-col>
          </Row>
        </infor-card>
      </i-col>
    </Row>

    <!-- 督查工作 -->
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow style="height:530px">
          <Row>
            <i-col class="title" :md="20" :lg="20">
              <h2 style="display: inline-block;font-size:18px">市对县专项工作督查</h2>
            </i-col>
            <i-col class="title" :md="4" :lg="4">
              <Button type="success" style="float:right">备注</Button>
            </i-col>
          </Row>
          <div style="margin-top:20px">
            <Table
              highlight-row
              stripe
              border
              ref="currentRowTable"
              :columns="columns3"
              :data="data1"
            ></Table>
          </div>
        </Card>
      </i-col>
      <Spin size="large" fix v-if="false"></Spin>

      <!-- 正向激励 -->
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow style="height:530px">
          <div>
            <h2 style="font-size:18px">正向激励加分</h2>
            <p style="margin:20px 0">合计
              <count-to
                :end="incentiveTotalCount"
                style="margin:0 10px 0 20px;"
                count-class="count-style"
              />分数
            </p>
          </div>
          <Row class="incentive">
            <Col :span="20">
              <span>选择时间：</span>
              <DatePicker
                @on-change="incentiveDate"
                type="year"
                placeholder="请选择时间"
                style="width: 100px"
              ></DatePicker>
            </Col>
            <Col :span="4">
              <Button :loading="incentiveLoaidng" @click="incentiveSubmit" style="width:70px;">确定</Button>
            </Col>
          </Row>
          <!-- 判断对象里是不是有02月份那个值 -->
          <example
            v-if="incentiveEchartsData['02月']"
            :yName="'分'"
            :data="incentiveEchartsData"
            style="height:360px;"
          />
        </Card>
        <Spin size="large" fix v-if="!incentiveEchartsData['02月']"></Spin>
      </i-col>
    </Row>
    <!-- 福州市对永泰县绩效考核指标 -->
    <Row style>
      <Card shadow style="height: 600px;">
        <Row>
          <i-col :md="12" :lg="12">
            <h2 style="font-size:18px">福州市对永泰县绩效考核指标</h2>
          </i-col>
          <i-col :md="12" :lg="12" style="float:left"></i-col>
        </Row>
        <Row class="city-select">
          <Col :span="13">
            <span>选择时间：</span>
            <DatePicker
              @on-change="cityDate"
              type="month"
              placeholder="请选择时间"
              style="width: 100px;"
            ></DatePicker>
          </Col>
          <Col :span="6">
            <Select v-model="citySelectVal.value" style="width:70px;margin-left:5px;">
              <Option :value="'rank'">排名</Option>
              <Option :value="'score'">得分</Option>
            </Select>
          </Col>
          <Col :span="5">
            <Button
              :loading="cityBtnLoading"
              @click="citySubmit"
              style="width:70px;margin-left:5px;"
            >确定</Button>
          </Col>
        </Row>
        <div style="margin-top:60px">
          <bar-stack
            v-if="cityEchartsData.name.length"
            @clickData="getClickBar"
            :data="cityEchartsData"
            :title="'总分'"
            style="height: 510px;"
          />
        </div>
        <Spin size="large" fix v-if="cityLoading"></Spin>
      </Card>
    </Row>
    <!-- 各乡镇六抓六赛考核指标 -->
    <Row style="margin-top:20px">
      <Card shadow>
        <Row>
          <i-col :md="24" :lg="12">
            <h2 style="font-size:18px">各乡镇六抓六赛考核指标</h2>
          </i-col>
          <i-col :md="24" :lg="12">
            <Row style="float:right;width:540px">
              <Col :span="8">
                <span>选择时间：</span>
                <DatePicker
                  @on-change="sixDate"
                  type="month"
                  placeholder="请选择时间"
                  style="width:100px;"
                ></DatePicker>
              </Col>
              <Col :span="12">
                <Cascader
                  :data="selectIndexType"
                  change-on-select
                  @on-change="sixSelectIndex"
                  style="width:250px"
                ></Cascader>
              </Col>
              <Col :span="4">
                <Button
                  :loading="sixBtnLoading"
                  @click="sixSubmit"
                  style="width:70px;margin-left:5px;"
                >确定</Button>
              </Col>
            </Row>
          </i-col>
        </Row>
        <div style="margin-top:60px">
          <example :title="'总分'" :data="lineData" :yName="'项'" style="height: 510px;"/>
        </div>
        <Spin size="large" fix v-if="countyLoading">暂无数据</Spin>
      </Card>
    </Row>
    <!-- 各乡镇绩效考核指标 -->
    <Row>
      <Card shadow style="margin-top: 20px;">
        <Row>
          <i-col :lg="24">
            <h2 style="font-size:18px">各乡镇绩效考核指标</h2>
          </i-col>
          <i-col :lg="24" style="float:left">
            <Row style="float:right;width:540px">
              <Col :span="8">
                <span>选择时间：</span>
                <DatePicker
                  @on-change="countyDate"
                  type="month"
                  placeholder="请选择时间"
                  style="width:100px;"
                ></DatePicker>
              </Col>
              <Col :span="12">
                <Cascader
                  :data="selectIndexType"
                  change-on-select
                  @on-change="countySelectIndex"
                  style="width:250px"
                ></Cascader>
              </Col>
              <Col :span="4">
                <Button
                  :loading="countyBtnLoading"
                  @click="countySubmit"
                  style="width:70px;margin-left:5px;"
                >确定</Button>
              </Col>
            </Row>
          </i-col>
        </Row>
        <chart-bar v-if="barData['白云乡']" style="height: 500px;" :value="barData" text/>
      </Card>
      <Spin size="large" fix v-if="!countyLoading"></Spin>
    </Row>
    <!-- 测评模块 -->
    <Row :gutter="20" style="margin-top: 20px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <h2 style="font-size:18px">县直单位绩效管理民主测评得分情况</h2>
          <div class="tip-wrapper">
            <div class="tip-container" v-for="(item,index) in progress" :key="index">
              <p class="tip-title">{{item.title}}:{{item.souer}}分</p>
              <my-progress :color="item.color" :widthVal="item.souer/maxScore"></my-progress>
            </div>
          </div>
        </Card>
      </i-col>
    </Row>
    <!-- 模态框 -->
    <Modal v-model="isShowLineBar" scrollable width="800px" title="总分">
      <div class="city-model">
        <p class style="text-align: center;padding-bottom:10px;">
          所属区县：
          <span>{{lineBarData.name}}</span>
        </p>
        <p class="item">
          牵头单位：
          <span></span>
        </p>
        <p class="item">
          指标级别：
          <span></span>
        </p>
        <p class="item">
          二级指标所属类别：
          <span></span>
        </p>
        <p class="item">年份：
          <DatePicker type="year" placeholder="选择年份" style="width: 100px"></DatePicker>
        </p>
      </div>
      <char-line-bar style="height:380px;width:800px"></char-line-bar>
    </Modal>
  </div>
</template>

<script>
import { homeAjax } from "@/api/home";
import { cityAjax } from "@/api/city";
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar, CharLineBar } from "_c/charts";
import Example from "./example.vue";
import barStack from "./bar-stack";
import BgExample from "./bg-example.vue";
import BgBar from "./bg-bar.vue";
import { hasOneOf } from "@/libs/tools";
import Radar from "./radar";
import MyProgress from "./progress";
// 市对县指标考核 URL
const CITY_URL = "/index/indexCountryIndicators";
// 正向激励
const INCENTIVE_URL = "/index/indexIncentive";
// 测评模块
const WORL_URL = "/index/indexMeasurement";
// 县对乡镇URL
const COUNTY_URL = "/index/indexTown";
export default {
  name: "home",
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example,
    Radar,
    MyProgress,
    BgExample,
    BgBar,
    barStack,
    CharLineBar
  },
  data() {
    return {
      countySelectVal: {
        superiorIndexId: "", // 一级指标
        indexName: "", // 二级指标
        dateTime: "",
        monthTime: ""
      },
      sixSelectVal: {
        superiorIndexId: "", // 一级指标
        indexName: "", // 二级指标
        dateTime: "",
        monthTime: ""
      },
      selectIndexType: [
        // 搜索指标里的关联指标
        {
          label: "全部",
          value: "全部"
        }
      ],
      incentiveEchartsData: {}, // 正向激励
      incentiveTotalCount: 0, // 正向激励的项数
      incentiveLoaidng: false,
      incentiveData: {
        // 正向激励图标
        dateTime: ""
      },
      cityEchartsData: {
        // 市对县考核
        name: [],
        score: [],
        rank: []
      },
      cityLoading: true, // 市对县图表Loaidng
      countyLoading: true, // 县对乡镇图表Loaidng
      sixLoading: false, // 六抓六赛图表Loaidng
      cityBtnLoading: false, // 市对县按钮loading
      countyBtnLoading: false, // 县对乡镇按钮loading
      sixBtnLoading: false, // 六抓六赛按钮loading
      citySelectVal: {
        // 雷达图选择显示的数据
        value: "rank",
        monthTime: "", // 月份
        dateTime: "" // 年份
      },
      xzInex: 0,
      isShowLineBar: false,
      lineBarData: {},
      democracyData: {
        "1月": 50,
        "2月": 60,
        "3月": 40,
        "4月": 60,
        "5月": 40,
        "6月": 30,
        "7月": 40,
        "8月": 60,
        "9月": 40,
        "10月": 60,
        "11月": 80,
        "12月": 55
      },
      lineData: {
        葛岭镇: 80,
        城峰镇: 80,
        嵩口镇: 80,
        清凉镇: 80,
        梧桐镇: 80,
        樟城镇: 80,
        长庆镇: 80,
        同安镇: 80,
        大洋镇: 80,
        塘前乡: 80,
        富泉乡: 80,
        岭路乡: 80,
        赤锡乡: 80,
        洑口乡: 80,
        盖洋乡: 80,
        东洋乡: 80,
        霞拔乡: 80,
        盘谷乡: 80,
        红星乡: 80,
        白云乡: 80,
        丹云乡: 80
      }, // 折线图数据
      inforCardData: [
        {
          count: 100,
          color: "#9CCC65"
        },
        { count: 1, color: "#4DD0E1" },
        {
          count: 20,
          color: "#FFCA28"
        },
        { count: 657, color: "#FF8A65" },
        {
          count: 0,
          color: "#FFCA28"
        },
        { count: 14, color: "#9A66E4" }
      ],

      columns3: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "指标名称",
          key: "indexName",
          width: 180,
          ellipsis: true,
          render: (h, params) => {
            return h(
              "Tooltip",
              {
                props: {
                  content: params.row.indexName
                }
              },
              params.row.indexName
            );
          }
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
        }
      ],
      data1: [
        {
          indexName: "构建现代化公共文化服务区",
          cityResponUnit: "市文广新局",
          leadUnit: "县科技文体局",
          maxPoint: 3,
          point: 2
        },
        {
          indexName: "新型智慧城市标杆创建工作",
          cityResponUnit: "智慧福州",
          leadUnit: "智慧永泰",
          maxPoint: 10,
          point: 5
        },
        {
          indexName: "数字城管及12345诉求办理",
          cityResponUnit: "智慧福州",
          leadUnit: "智慧永泰",
          maxPoint: 5,
          point: 4
        },
        {
          indexName: "消防工作落实情况",
          cityResponUnit: "市消防支队",
          leadUnit: "县消防支队",
          maxPoint: 6,
          point: 2
        },
        {
          indexName: "审计查出问题整改落实",
          cityResponUnit: "市审计局",
          leadUnit: "县审计局",
          maxPoint: 10,
          point: 5
        },
        {
          indexName: "支持电网建设工作",
          cityResponUnit: "市经信委",
          leadUnit: "县商务局",
          maxPoint: 10,
          point: 5
        },
        {
          indexName: "防震减灾工作落实情况",
          cityResponUnit: "市地震局",
          leadUnit: "县地震局",
          maxPoint: 10,
          point: 10
        },
        {
          indexName: "温泉资源综合开发",
          cityResponUnit: "市旅游委",
          leadUnit: "县旅游委",
          maxPoint: 10,
          point: 5
        }
      ],
      maxScore: 0, // 最高的分数作为条形最大宽度
      progress: [],
      barData: {}
    };
  },
  methods: {
    countySubmit() {},
    countyDate(date) {
      var time = date.split("-");
      this.countySelectVal.dateTime = time[0];
      this.countySelectVal.monthTime = time[1];
    },
    countySelectIndex(value) {
      if (value[1] !== undefined) {
        this.countySelectVal.indexName = value[1];
      } else {
        this.countySelectVal.superiorIndexId =
          value[0] === "全部" ? "" : value[0]; // 选择为全部时 是一个空的字符串
        this.countySelectVal.indexName = "";
      }
    },
    sixSubmit() {
      console.log(this.sixSelectVal);
    },
    sixDate(date) {
      var time = date.split("-");
      this.sixSelectVal.dateTime = time[0];
      this.sixSelectVal.monthTime = time[1];
    },
    // 六赛指标选择
    sixSelectIndex(value) {
      // 选择不是undefind的时候为[1]
      if (value[1] !== undefined) {
        this.sixSelectVal.indexName = value[1];
      } else {
        this.sixSelectVal.superiorIndexId = value[0] === "全部" ? "" : value[0]; // 选择为全部时 是一个空的字符串
        this.sixSelectVal.indexName = "";
      }
    },
    // 正向激励选择时间
    incentiveDate(date) {
      this.incentiveData.dateTime = date;
    },
    // 正向激励提交
    incentiveSubmit() {
      this.incentiveLoaidng = true;
      this.incentiveEchartsData = {};

      this._getHomeData(this.incentiveData, INCENTIVE_URL).then(result => {
        this.incentiveLoaidng = false;
        this.incentiveTotalCount = 0;
        result.list.forEach(item => {
          this.incentiveEchartsData[item.monthTime + "月"] = item.point || 0;
        });
        this.incentiveTotalCount = parseInt(result.point) || 0;
        this.incentiveEchartsData = Object.assign(
          this.incentiveEchartsData,
          {}
        );
      });
    },
    // 市对县时间选择
    cityDate(date) {
      var time = date.split("-");
      this.citySelectVal.dateTime = time[0];
      this.citySelectVal.monthTime = time[1];
    },
    // 市对县提交
    citySubmit() {
      this.cityBtnLoading = true;
      this.cityLoading = true;
      this.cityEchartsData = {
        name: [],
        score: [],
        rank: []
      };
      this._getHomeData(this.citySelectVal, CITY_URL).then(result => {
        this.cityBtnLoading = false;
        this.cityLoading = false;
        if (result.length) {
          result.forEach(item => {
            this.cityEchartsData["name"].push(item.indexName);
            this.cityEchartsData["score"].push(item.finalScore);
            this.cityEchartsData["rank"].push(item.alternateField1);
          });
        } else {
          this.$Notice.warning({
            title: "选择有误",
            desc: "暂无数据！请重新选择！"
          });
          this.cityEchartsData = {
            name: [0],
            score: [0],
            rank: [0]
          };
        }
      });
    },
    barSelect(name) {},
    // 市对县柱状图点击事件
    getClickBar(val) {
      // this.isShowLineBar = true;
      // this.lineBarData = val;
    },
    _getHomeData(formData, url) {
      let keyOne = "indexFilter";
      return new Promise((resolve, reject) => {
        homeAjax({ formData, url, keyOne })
          .then(result => {
            if (result.data.code === "200") {
              resolve(result.data.results);
            } else {
              reject(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  mounted() {},
  created() {
    this._getHomeData(this.citySelectVal, CITY_URL).then(result => {
      this.cityBtnLoading = false;
      this.cityLoading = false;
      result.forEach(item => {
        this.cityEchartsData["name"].push(item.indexName);
        this.cityEchartsData["score"].push(item.finalScore);
        this.cityEchartsData["rank"].push(item.alternateField1);
      });
    });
    this._getHomeData(this.incentiveData, INCENTIVE_URL).then(result => {
      result.list.forEach(item => {
        this.incentiveEchartsData[item.monthTime + "月"] = item.point;
      });
      this.incentiveTotalCount = parseInt(result.point);
      this.incentiveEchartsData = Object.assign(this.incentiveEchartsData, {});
    });
    this._getHomeData(this.incentiveData, WORL_URL).then(result => {
      if (result.length) {
        console.log(result, 111);
        result.forEach((item, index) => {
          if (index === 0) {
            this.maxScore = item.finalScore;
            console.log(this.maxScore);
          }
          // 测评对象 条形颜色
          var color = [
            "#2196F3",
            "#66BB6A",
            "#FF7043",
            "#FFC107",
            "#8D6E63",
            "#AB47BC",
            "#F44336"
          ];
          var group = Object.assign(
            {},
            {
              title: item.evalutedObj,
              color: color[index],
              souer: item.finalScore
            }
          );
          this.progress.push(group);
        });
      }
    });
    this._getHomeData(this.countySelectVal, COUNTY_URL).then(result => {
      var indexList = result.indexMap;
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
        this.selectIndexType.push(data);
      });
      result.list.forEach(item => {
        this.barData[item.townName] = item.score;
      });
      console.log(this.barData, 123);
    });
  },
  watch: {
    selectIndexType: {
      handler(newVal) {
        this.selectIndexType = newVal;
      },
      deep: true
    }
  }
  // computed: {
  //   access () {
  //     return this.$store.state.user.access;
  //   },
  //   viewAccessAll () {
  //     return hasOneOf(['super_admin', 'admin'], this.access);
  //   },
  //   viewAccessSuper () {
  //     return hasOneOf(['sssssss'], this.access);
  //   }
  // }
};
</script>

<style>
.count-style {
  font-size: 30px;
}
.header-nav {
  position: relative;
}
.head-title {
  position: absolute;
  left: 15px;
  top: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
}
.sub-text {
  position: absolute;
  left: 15px;
  top: 45px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
}
.blod-font {
  font-size: 25px;
}
.xz-index-warpper {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 99;
}
.xz-index-warpper .xz-index-item {
  display: inline-block;
  padding: 2px 10px;
  margin-left: 30px;
  vertical-align: top;
  line-height: 25px;
  font-size: 16px;
}
.xz-index-warpper .xz-index-item .xz-index-icon {
  padding-left: 5px;
  color: #000;
  vertical-align: baseline;
  font-size: 16px;
}
.xz-index-warpper .xzIndexActive {
  color: rgba(86, 216, 151, 1);
  background: rgba(86, 216, 151, 0.1);
  border-bottom: 2px solid rgba(86, 216, 151, 1);
}

.tip-wrapper {
  margin-top: 30px;
}
.tip-wrapper .tip-container {
  margin-top: 20px;
}
.tip-wrapper .tip-container .tip-title {
  font-size: 16px;
}
.city-model .item {
  display: inline-block;
  padding-left: 45px;
}
.select-nav {
  float: right;
}
.city-select {
  position: absolute;
  top: 10px;
  right: 15px;
  z-index: 100;
}
.incentive {
  position: absolute;
  top: 10px;
  right: 40px;
  z-index: 100;
}
</style>
