<template>
  <div>
    <!-- 首页顶部四个框 -->
    <Row :gutter="20" style="height:120px">
      <!-- 县绩效考核总分 -->
      <i-col :xs="24" :md="12" :lg="6" style="height: 160px;padding-bottom: 10px;">
        <infor-card shadow :icon-size="36" :color="'#9CCC65'">
          <div class="henader-nav">
            <h2 class="head-title">
              <count-to
                v-if="inforCardData.length"
                :decimals="1"
                :end="inforCardData[0].count"
                count-class="count-style"
              />
            </h2>
            <p class="sub-text">市对县指标得分</p>
            <div style="margin-top:50px">
              <bg-example style="height:70px;"></bg-example>
            </div>
          </div>
        </infor-card>
      </i-col>
      <i-col :xs="24" :md="12" :lg="6" style="height: 160px;padding-bottom: 10px;">
        <infor-card shadow :icon-size="36" :color="'#4DD0E1'">
          <div class="henader-nav">
            <h2 class="head-title">
              <count-to
                v-if="inforCardData.length"
                :decimals="1"
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
        <infor-card shadow :icon-size="36" :color="'#FFCA28'">
          <div class="henader-nav">
            <h2 class="head-title blod-font">察访核验</h2>
          </div>
          <Row style="margin-top:50px;color:#fff;font-size:14px">
            <i-col :xs="12" :md="12" :lg="12">
              <p>市对县察访核验扣分</p>
              <p style="font-size:18px; margin-top:10px;">
                <count-to
                  v-if="inforCardData.length"
                  :decimals="1"
                  :end="inforCardData[2].cityCount"
                  style="margin:0 10px;"
                  count-class="count-style"
                />分
              </p>
            </i-col>
            <i-col :xs="12" :md="12" :lg="12">
              <p>县对部门察访核验扣分</p>
              <p style="font-size:18px; margin-top:10px;">
                <count-to
                  v-if="inforCardData.length"
                  :decimals="1"
                  :end="inforCardData[2].countyCount"
                  style="margin:0 10px;"
                  count-class="count-style"
                />分
              </p>
            </i-col>
          </Row>
        </infor-card>
      </i-col>
      <!-- 未录入指标单位 -->
      <i-col :xs="24" :md="12" :lg="6" style="height: 160px;padding-bottom: 10px;">
        <infor-card shadow :icon-size="36" :color="'#FF8A65'">
          <Row style="color:#fff;font-size:14px">
            <i-col :xs="8" :md="8" :lg="12">
              <h2 style="font-weight: 500">专项工作督查</h2>
              <p style="text-align:center">扣分</p>
              <p style="font-size:18px; margin-top:10px;">
                <count-to
                  v-if="inforCardData.length"
                  :decimals="1"
                  :end="inforCardData[3].count"
                  count-class="count-style"
                  style="margin:0 10px;"
                />分
              </p>
            </i-col>
            <i-col :xs="8" :md="8" :lg="12">
              <h2 style="font-weight: 500">测评模块</h2>
              <p style="text-align:center">得分</p>
              <p style="font-size:18px; margin-top:10px;">
                <count-to
                  v-if="inforCardData.length"
                  :decimals="1"
                  :end="inforCardData[4].count"
                  count-class="count-style"
                  style="margin:0 10px;"
                />分
              </p>
            </i-col>
          </Row>
        </infor-card>
      </i-col>
    </Row>
    <Row style="margin-top:40px">
      <i-col :xs="24" :md="24" :lg="24">
        <Card>
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in newsLoopData" :key="index">
              <div @click="watchNews(item)" class="demo-carousel">{{item.title}}</div>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </Card>
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
            <i-col class="title" :md="4" :lg="4"></i-col>
          </Row>
          <div style="margin-top:20px">
            <Table
              highlight-row
              stripe
              border
              height="400"
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
              <Button
                :loading="incentiveSubmitLoaidng"
                @click="incentiveSubmit"
                type="success"
                style="width:70px;"
              >确定</Button>
            </Col>
          </Row>
          <!-- 判断对象里是不是有02月份那个值 -->
          <example
            v-if="incentiveEchartsShow"
            :yName="'分'"
            :data="incentiveEchartsData"
            style="height:360px;"
          />
        </Card>
        <Spin size="large" fix v-if="incentiveLoading"></Spin>
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
          <Col :span="18">
            <span>选择时间：</span>
            <DatePicker
              @on-change="cityDate"
              type="month"
              placeholder="请选择时间"
              style="width: 100px;"
            ></DatePicker>
          </Col>
          <Col :span="6">
            <Button
              :loading="cityBtnLoading"
              type="success"
              @click="citySubmit"
              style="width:70px;"
            >确定</Button>
          </Col>
        </Row>
        <div style="margin-top:20px">
          <Row style="text-align: right;">
            <RadioGroup @on-change="cityChange" v-model="citySort" type="button" size="large">
              <Radio label="正序"></Radio>
              <Radio label="倒序"></Radio>
            </RadioGroup>
          </Row>
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
      <Card shadow style="height:620px">
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
                  :value="sixDateDefault"
                  :clearable="false"
                  type="month"
                  placeholder="请选择时间"
                  style="width:100px;"
                ></DatePicker>
              </Col>
              <Col :span="12">
                <Cascader
                  v-model="xisIndex"
                  :data="xisSelectType"
                  change-on-select
                  @on-change="sixSelectIndex"
                  style="width:250px"
                ></Cascader>
              </Col>
              <Col :span="4">
                <Button
                  type="success"
                  :disabled="sixSelectVal.indexName===''"
                  :loading="sixBtnLoading"
                  @click="sixSubmit"
                  style="width:70px;margin-left:5px;"
                >确定</Button>
              </Col>
            </Row>
          </i-col>
        </Row>
        <div style="margin-top:20px">
          <Row style="text-align: right;">
            <RadioGroup @on-change="sixChange" v-model="sixSort" type="button" size="large">
              <Radio label="正序"></Radio>
              <Radio label="倒序"></Radio>
            </RadioGroup>
          </Row>
          <example
            v-if="sixEchartsShow"
            :title="xisEchartsName"
            :data="lineData"
            :yName="'分'"
            style="height: 510px;"
          />
        </div>
        <Spin size="large" fix v-if="sixLoading"></Spin>
      </Card>
    </Row>
    <!-- 各乡镇绩效考核指标 -->
    <Row>
      <Card shadow style="margin-top: 20px;height:640px">
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
                  :value="counDateDefault"
                  type="month"
                  placeholder="请选择时间"
                  :clearable="false"
                  style="width:100px;"
                ></DatePicker>
              </Col>
              <Col :span="12">
                <Cascader
                  v-model="countyIndex"
                  :data="selectIndexType"
                  change-on-select
                  @on-change="countySelectIndex"
                  style="width:250px"
                ></Cascader>
              </Col>
              <Col :span="4">
                <Button
                  type="success"
                  :disabled="countySelectVal.indexName===''"
                  :loading="countyBtnLoading"
                  @click="countySubmit"
                  style="width:70px;margin-left:5px;"
                >确定</Button>
              </Col>
            </Row>
          </i-col>
        </Row>
        <div>
          <Row style="float:left;position: absolute;right:30px;top:100px;z-index:99">
            <RadioGroup @on-change="countyChange" v-model="countySort" type="button" size="large">
              <Radio label="正序"></Radio>
              <Radio label="倒序"></Radio>
            </RadioGroup>
          </Row>
          <chart-bar
            :subtext="countyEchartsName"
            v-if="countyEchartsShow"
            style="height: 500px;"
            :value="barData"
            text
          />
          <Spin size="large" fix v-if="countyLoading"></Spin>
        </div>
      </Card>
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
    <Drawer
      v-if="newsItem !==null"
      width="55%"
      :closable="false"
      :styles="styles"
      v-model="showNews"
    >
      <h2 style="text-align: center;">{{newsItem.title}}</h2>
      <p style="font-size:14px;padding-left:10px;">发布日期：{{newsItem.editTime}}</p>
      <Divider style="margin:15px 0"/>
      <div class="news-content" v-html="newsItem.content"></div>
      <Divider/>
      <div class="demo-drawer-footer">
        <Button :size="buttonSize" v-if="newsItem.num !==null" type="text">附件：{{newsItem.num}}</Button>
        <Button
          :size="buttonSize"
          type="primary"
          icon="ios-download-outline"
          v-if="newsItem.fileUrl !==null"
          style="margin:0 50px 0 10px"
        >
          <a style="color:#fff" :href="host+newsItem.fileUrl">下载附件</a>
        </Button>

        <Button
          :size="buttonSize"
          style="float:right;margin-right:10px"
          @click="showNews = false"
        >关闭新闻</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
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
import { HOST } from "@/libs/util";
// 市对县指标考核 URL
const CITY_URL = "/index/indexCountryIndicators";
// 正向激励
const INCENTIVE_URL = "/index/indexIncentive";
// 测评模块
const WORL_URL = "/index/indexMeasurement";
// 县对乡镇URL
const COUNTY_URL = "/index/indexTown";
// 六抓六赛
const XIS_URL = "/index/indexSix";
// 工作督查
const WORK_URL = "/index/indexWork";
// 首页 TOP
const TOP_URL = "/index/indexTop";
// 新闻轮播
const LOOP_URL = "/index/news";
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
    CharLineBar,
    swiper,
    swiperSlide
  },
  data() {
    return {
      citySort: "",
      sixSort: "",
      countySort: "正序",
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        preventClicks: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      host: "",
      newsLoop: 0,
      newsItem: "", // 单条新闻
      newsLoopData: [],
      buttonSize: "large", // 按钮样式
      autoplay: false,
      showNews: false, // 新闻侧边栏
      autoplaySpeed: 4000,
      dots: "none",
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
      incentiveEchartsData: [], // 正向激励
      incentiveEchartsShow: false,
      incentiveLoading: true,
      incentiveTotalCount: 0, // 正向激励的项数
      incentiveSubmitLoaidng: false,
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
      xisIndex: [], // 六抓六赛已选择指标
      xisSelectType: [], // 六抓六赛 选择指标
      sixBtnLoading: false, // 六抓六赛按钮loading
      sixDateDefault: "", // 默认时间
      sixLoading: false, // 六抓六赛图表Loaidng
      sixEchartsShow: false, // 六抓六赛图标显示
      xisEchartsName: "",
      selectIndexType: [], // 县对乡镇 选择指标
      countyIndex: [], // 县对乡镇选择指标
      countyEchartsShow: false, // 县对乡镇的图标显示
      counDateDefault: "", // 默认时间
      countyEchartsName: "", // 县对乡镇显示指标名
      countyLoading: true, // 县对乡镇图表Loaidng
      countyBtnLoading: false, // 县对乡镇按钮loading
      cityLoading: true, // 市对县图表Loaidng
      cityBtnLoading: false, // 市对县按钮loading
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
      lineData: [], // 折线图数据
      inforCardData: [],

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
            var actualPoint = params.row.score === null ? 0 : params.row.score;
            if (params.row.score !== null) {
              pressWidth = (params.row.score / params.row.maxPoint) * 160;
            } else {
              pressWidth = 0;
            }
            return h("div", [
              h(
                "div",
                {
                  style: {
                    position: "relative",
                    left: "-18px",
                    width: pressWidth + "px",
                    height: "40px",
                    lineHeight: "40px",
                    marginRight: "5px",
                    background: "rgb(255, 105, 117)",
                    fontSize: "15px",
                    color: "#fff",
                    textAlign: "center"
                  }
                },
                actualPoint + "   /   " + params.row.maxPoint
              )
            ]);
          }
        },
        {
          title: "市考核责任单位",
          key: "cityResponUnit",
          width: 140
        },
        {
          title: "工作目标牵头单位",
          key: "leadUnit",
          width: 160
        }
      ],
      data1: [],
      maxScore: 0, // 最高的分数作为条形最大宽度
      progress: [],
      barData: [],
      styles: {
        // 侧边栏样式
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      townDefault: [
        {
          name: "葛岭镇",
          score: 0
        },
        {
          name: "城峰镇",
          score: 0
        },
        {
          name: "嵩口镇",
          score: 0
        },

        {
          name: "清凉镇",
          score: 0
        },

        {
          name: "梧桐镇",
          score: 0
        },
        {
          name: "樟城镇",
          score: 0
        },

        {
          name: "长庆镇",
          score: 0
        },
        {
          name: "同安镇",
          score: 0
        },
        {
          name: "大洋镇",
          score: 0
        },
        {
          name: "塘前乡",
          score: 0
        },
        {
          name: "富泉乡",
          score: 0
        },
        {
          name: "岭路乡",
          score: 0
        },
        {
          name: "赤锡乡",
          score: 0
        },
        {
          name: "岭路乡",
          score: 0
        },
        {
          name: "盖洋乡",
          score: 0
        },
        {
          name: "东洋乡",
          score: 0
        },
        {
          name: "洑口乡",
          score: 0
        },
        {
          name: "霞拔乡",
          score: 0
        },
        {
          name: "盘谷乡",
          score: 0
        },
        {
          name: "红星乡",
          score: 0
        },
        {
          name: "白云乡",
          score: 0
        },
        {
          name: "丹云乡",
          score: 0
        }
      ]
    };
  },
  methods: {
    cityChange(value) {
      this.cityEchartsShow = false;
      this.cityLoading = true;
      this.cityEchartsData = {
        // 市对县考核
        name: [],
        score: [],
        rank: []
      };
      if (value === "正序") {
        this.citySelectVal = Object.assign(this.citySelectVal, {
          type: "0"
        });
        this._getHomeData(this.citySelectVal, CITY_URL).then(result => {
          this.cityBtnLoading = false;
          this.cityLoading = false;
          if (result) {
            result.forEach(item => {
              this.cityEchartsData["name"].push(item.indexName);
              this.cityEchartsData["score"].push(item.finalScore);
              this.cityEchartsData["rank"].push(item.alternateField1);
            });
          }
        });
      } else {
        this.citySelectVal = Object.assign(this.citySelectVal, {
          type: "1"
        });
        this._getHomeData(this.citySelectVal, CITY_URL).then(result => {
          this.cityBtnLoading = false;
          this.cityLoading = false;
          if (result) {
            result.forEach(item => {
              this.cityEchartsData["name"].push(item.indexName);
              this.cityEchartsData["score"].push(item.finalScore);
              this.cityEchartsData["rank"].push(item.alternateField1);
            });
          }
        });
      }
    },
    sixChange(value) {
      this.sixEchartsShow = false;
      this.sixLoading = true;
      this.lineData = [];

      if (value === "正序") {
        this.sixSelectVal = Object.assign(this.sixSelectVal, {
          type: "0"
        });
        this._getHomeData(this.sixSelectVal, XIS_URL).then(result => {
          console.log(result);
          this.sixLoading = false;
          // 如果有数据显示
          if (result.list.length) {
            result.list.forEach(item => {
              var dataObj = Object.assign(
                {},
                {
                  name: item.townName,
                  score: item.score
                }
              );
              this.lineData.push(dataObj);
            });
            this.countyEchartsName = result.list[0].indexName;
            this.counDateDefault =
              result.list[0].dateTime + "-" + result.list[0].monthTime;
            // 没有数据的默认为0
          }
          this.sixEchartsShow = true;
        });
      } else {
        this.sixSelectVal = Object.assign(this.sixSelectVal, {
          type: "1"
        });
        this._getHomeData(this.sixSelectVal, XIS_URL).then(result => {
          this.sixLoading = false;
          // 如果有数据显示
          if (result.list.length) {
            result.list.forEach(item => {
              var dataObj = Object.assign(
                {},
                {
                  name: item.townName,
                  score: item.score
                }
              );
              this.lineData.push(dataObj);
            });
            this.countyEchartsName = result.list[0].indexName;
            this.counDateDefault =
              result.list[0].dateTime + "-" + result.list[0].monthTime;
            // 没有数据的默认为0
          }
          this.sixEchartsShow = true;
        });
      }
    },
    countyChange(value) {
      this.countyEchartsShow = false;
      this.countyLoading = true;

      if (value === "正序") {
        this.countySelectVal = Object.assign(this.countySelectVal, {
          type: "0"
        });
        this._getHomeData(this.countySelectVal, COUNTY_URL).then(result => {
          this.countyLoading = false;
          this.barData = [];
          // 如果有数据显示
          if (result.list.length) {
            result.list.forEach(item => {
              var dataObj = Object.assign(
                {},
                {
                  name: item.townName,
                  score: item.score
                }
              );
              this.barData.push(dataObj);
            });
            this.countyEchartsName = result.list[0].indexName;
            this.counDateDefault =
              result.list[0].dateTime + "-" + result.list[0].monthTime;
            // 没有数据的默认为0
          }
          this.countyEchartsShow = true;
        });
      } else {
        this.countySelectVal = Object.assign(this.countySelectVal, {
          type: "1"
        });
        this._getHomeData(this.countySelectVal, COUNTY_URL).then(result => {
          this.countyLoading = false;
          this.barData = [];
          // 如果有数据显示
          if (result.list.length) {
            result.list.forEach(item => {
              var dataObj = Object.assign(
                {},
                {
                  name: item.townName,
                  score: item.score
                }
              );
              this.barData.push(dataObj);
            });
            this.countyEchartsName = result.list[0].indexName;
            this.counDateDefault =
              result.list[0].dateTime + "-" + result.list[0].monthTime;
            // 没有数据的默认为0
          }
          this.countyEchartsShow = true;
        });
      }
    },
    watchNews(item) {
      this.showNews = true;
      this.newsItem = item;
    },
    countySubmit() {
      this.countyLoading = true;
      this.countyBtnLoading = true;
      this.countyEchartsShow = false;
      this.barData = [];
      if (this.countySelectVal.dateTime === "") {
        var time = this.counDateDefault.split("-");
        this.countySelectVal.dateTime = time[0];
        this.countySelectVal.monthTime = time[1];
      }
      this._getHomeData(this.countySelectVal, COUNTY_URL).then(result => {
        console.log(result.list);
        this.countyLoading = false;
        this.countyBtnLoading = false;
        // 如果有数据显示
        if (result.list.length) {
          result.list.forEach(item => {
            var dataObj = Object.assign(
              {},
              {
                name: item.townName,
                score: item.score
              }
            );
            this.barData.push(dataObj);
          });
          this.countyEchartsName = result.list[0].indexName;
          this.counDateDefault =
            result.list[0].dateTime + "-" + result.list[0].monthTime;
          this.countyEchartsName = result.list[0].indexName;
          this.counDateDefault =
            result.list[0].dateTime + "-" + result.list[0].monthTime;
          // 没有数据的默认为0
        } else {
          this.countyEchartsName = "暂无数据";
          this.barData = this.townDefault;
        }
        this.countyEchartsShow = true;
      });
    },
    countyDate(date) {
      var time = date.split("-");
      this.countySelectVal.dateTime = time[0];
      this.countySelectVal.monthTime = time[1];
      this.selectIndexType = [];
      this.countyIndex = [];
      this._getHomeData(this.countySelectVal, COUNTY_URL).then(result => {
        var indexList = result.indexMap;
        if (indexList.length) {
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
        } else {
          this.selectIndexType.push({
            label: "暂无数据",
            value: "暂无数据"
          });
        }
      });
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
      this.sixLoading = true;
      this.sixBtnLoading = true;
      this.sixEchartsShow = false;
      this.lineData = [];
      if (this.sixSelectVal.dateTime === "") {
        var time = this.sixDateDefault.split("-");
        this.sixSelectVal.dateTime = time[0];
        this.sixSelectVal.monthTime = time[1];
      }
      this._getHomeData(this.sixSelectVal, XIS_URL).then(result => {
        this.sixLoading = false;
        this.sixBtnLoading = false;
        // 如果有数据显示
        if (result.list.length) {
          result.list.forEach(item => {
            var dataObj = Object.assign(
              {},
              {
                name: item.townName,
                score: item.score
              }
            );
            this.lineData.push(dataObj);
          });
          this.xisEchartsName = result.list[0].indexName;
          this.sixDateDefault =
            result.list[0].dateTime + "-" + result.list[0].monthTime;
          // 没有数据的默认为0
        } else {
          this.xisEchartsName = "暂无数据";
          this.lineData = this.townDefault;
        }
        this.sixEchartsShow = true;
      });
    },
    sixDate(date) {
      var time = date.split("-");
      this.sixSelectVal.dateTime = time[0];
      this.sixSelectVal.monthTime = time[1];
      this.xisIndex = []; // 六抓六赛已选择指标
      this.xisSelectType = []; // 六抓六赛 选择指标
      this._getHomeData(this.sixSelectVal, XIS_URL).then(result => {
        var indexList = result.indexMap;
        if (indexList.length) {
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
            this.xisSelectType.push(data);
          });
        } else {
          this.xisSelectType.push({
            label: "暂无数据",
            value: "暂无数据"
          });
        }
      });
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
      this.incentiveSubmitLoaidng = true;
      this.incentiveEchartsData = {};

      this._getHomeData(this.incentiveData, INCENTIVE_URL).then(result => {
        this.incentiveSubmitLoaidng = false;
        this.incentiveTotalCount = 0;
        result.list.forEach(item => {
          this.incentiveEchartsData[item.monthTime + "月"] = item.point || 0;
        });
        this.incentiveTotalCount =
          result.point === null ? 0 : parseInt(result.point);
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
      if (result) {
        result.forEach(item => {
          this.cityEchartsData["name"].push(item.indexName);
          this.cityEchartsData["score"].push(item.finalScore);
          this.cityEchartsData["rank"].push(item.alternateField1);
        });
      } else {
        this.cityEchartsData = {
          name: ["暂无数据"],
          score: [0],
          rank: [0]
        };
      }
    });
    this._getHomeData(this.incentiveData, INCENTIVE_URL).then(result => {
      this.incentiveLoading = false;

      result.list.forEach(item => {
        var dataObj = Object.assign(
          {},
          {
            name: item.monthTime + "月",
            score: item.point
          }
        );
        this.incentiveEchartsData.push(dataObj);
      });

      this.incentiveTotalCount =
        result.point === null ? 0 : parseInt(result.point);
      this.incentiveEchartsData = Object.assign(this.incentiveEchartsData, {});
      this.incentiveEchartsShow = true;
    });
    this._getHomeData(this.incentiveData, WORL_URL).then(result => {
      if (result.length) {
        result.forEach((item, index) => {
          if (index === 0) {
            this.maxScore = item.finalScore;
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
      this.countyLoading = false;
      var indexList = result.indexMap;
      if (indexList.length) {
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
      } else {
        this.selectIndexType.push({
          value: "暂无数据",
          label: "暂无数据"
        });
      }
      // 如果有数据显示
      if (result.list.length) {
        result.list.forEach(item => {
          var dataObj = Object.assign(
            {},
            {
              name: item.townName,
              score: item.score
            }
          );
          this.barData.push(dataObj);
        });
        this.countyEchartsName = result.list[0].indexName;
        this.counDateDefault =
          result.list[0].dateTime + "-" + result.list[0].monthTime;
        // 没有数据的默认为0
      } else {
        this.countyEchartsName = "暂无数据";
        this.barData = this.townDefault;
      }
      this.countyEchartsShow = true;
    });
    // 六抓六赛
    this._getHomeData(this.sixSelectVal, XIS_URL).then(result => {
      var indexList = result.indexMap;
      if (indexList.length) {
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
          this.xisSelectType.push(data);
        });
      } else {
        this.xisSelectType.push({
          value: "暂无数据",
          label: "暂无数据"
        });
      }
      // 如果有数据显示
      if (result.list.length) {
        console.log(result.list);
        result.list.forEach(item => {
          var dataObj = Object.assign(
            {},
            {
              name: item.townName,
              score: item.score
            }
          );
          this.lineData.push(dataObj);
        });
        this.xisEchartsName = result.list[0].indexName;
        this.sixDateDefault =
          result.list[0].dateTime + "-" + result.list[0].monthTime;
        // 没有数据的默认为0
      } else {
        this.xisEchartsName = "暂无数据";
        this.lineData = this.townDefault;
      }
      this.sixEchartsShow = true;
    });
    // 工作督查表格
    var formData = {};
    this._getHomeData(formData, WORK_URL).then(result => {
      if (result) {
        this.data1 = result;
      } else {
        this.data1 = [];
      }
    });
    this._getHomeData(formData, TOP_URL).then(result => {
      console.log(result);
      this.inforCardData = [
        {
          count: result.countryScore,
          color: "#9CCC65"
        },
        { count: result.incentive, color: "#4DD0E1" },
        {
          cityCount:
            result.check[0].point === null
              ? 0
              : parseInt(result.check[0].point),
          countyCount:
            result.check[1].point === null
              ? 0
              : parseInt(result.check[1].point),
          color: "#FFCA28"
        },
        { count: result.work, color: "#FF8A65" },
        {
          count: result.measurement === null ? 0 : result.measurement.finalScore
        }
      ];
    });
    this._getHomeData(formData, LOOP_URL).then(result => {
      this.newsLoopData = result;
    });
    this.host = HOST;
  },
  watch: {
    selectIndexType: {
      handler(newVal) {
        this.selectIndexType = newVal;
      },
      deep: true
    }
  }
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
.demo-carousel {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  color: rgb(255, 105, 117);
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
