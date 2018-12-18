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
            <h2 class="head-title">第
              <count-to :end="inforCardData[1].count" count-class="count-style"/>名
            </h2>
            <p class="sub-text">县绩效考核成绩市排名情况</p>
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
            <h2 class="head-title blod-font">指标预警</h2>
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
      <!-- 未录入指标单位 -->
      <i-col :xs="24" :md="12" :lg="6" style="height: 160px;padding-bottom: 10px;">
        <infor-card shadow :icon-size="36" :color="inforCardData[3].color">
          <div class="henader-nav">
            <h2 class="head-title blod-font">未录入指标单位</h2>
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
    <!-- 雷达图 -->
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <radar style="height:500px"></radar>
        </Card>
        <Spin size="large" fix v-if="true"></Spin>
      </i-col>
      <!-- 正向激励 -->
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow style="height:520px">
          <div>
            <h2 style="font-size:18px">正向激励加分</h2>
            <p style="font-size:18px;color:#999;margin-top:20px">总加分</p>
            <count-to :end="0" style="margin-left:20px;" count-class="count-style"/>分
          </div>
          <example :yName="'项'" :data="democracyData" style="height:340px;"/>
        </Card>
        <Spin size="large" fix v-if="true"></Spin>
      </i-col>
    </Row>
    <!-- 福州市对永泰县绩效考核指标 -->
    <Row style>
      <Card shadow>
        <Row>
          <i-col :md="24" :lg="24">
            <h2 style="font-size:18px">福州市对永泰县绩效考核指标</h2>
          </i-col>
          <i-col :md="24" :lg="24" style="float:left">
            <Menu mode="horizontal" class="select-nav" active-name="1" @on-select="barSelect">
              <MenuItem name="1">
                <Icon type="ios-stats" :size="20"/>总分
              </MenuItem>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="md-trending-up" :size="20"/>经济发展
                </template>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="logo-yen"/>有效投资
                </template>
              </Submenu>
              <MenuItem name="4">
                <Icon type="ios-construct"/>创新驱动
              </MenuItem>
              <MenuItem name="5">
                <Icon type="md-infinite" :size="20"/>生态文明
              </MenuItem>
              <MenuItem name="6">
                <Icon type="ios-people" :size="20"/>政务服务
              </MenuItem>
            </Menu>
          </i-col>
        </Row>
        <div style="margin-top:60px">
          <barStack @clickData="getClickBar" :title="'总分'" style="height: 510px;"/>
        </div>
        <Spin size="large" fix v-if="true"></Spin>
      </Card>
    </Row>
    <!-- 各乡镇六抓六赛考核指标 -->
    <Row style="margin-top:20px">
      <Card shadow>
        <Row>
          <i-col :lg="24">
            <h2 style="font-size:18px">各乡镇六抓六赛考核指标</h2>
          </i-col>
          <i-col :lg="24" style="float:left">
            <Menu mode="horizontal" class="select-nav" active-name="1" @on-select="barSelect">
              <MenuItem name="1">
                <Icon type="ios-stats" :size="20"/>总分
              </MenuItem>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="md-trending-up" :size="20"/>经济发展
                </template>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="logo-yen"/>有效投资
                </template>
              </Submenu>
              <MenuItem name="4">
                <Icon type="ios-construct"/>创新驱动
              </MenuItem>
              <MenuItem name="5">
                <Icon type="md-infinite" :size="20"/>生态文明
              </MenuItem>
              <MenuItem name="6">
                <Icon type="ios-people" :size="20"/>政务服务
              </MenuItem>
            </Menu>
          </i-col>
        </Row>
        <div style="margin-top:60px">
          <example :title="'总分'" :data="lineData" :yName="'项'" style="height: 510px;"/>
        </div>
        <Spin size="large" fix v-if="true"></Spin>
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
            <Menu mode="horizontal" class="select-nav" active-name="1" @on-select="barSelect">
              <MenuItem name="1">
                <Icon type="ios-stats" :size="20"/>总分
              </MenuItem>
              <MenuItem name="2">
                <Icon type="md-trending-up" :size="20"/>经济发展
              </MenuItem>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="logo-yen"/>有效投资
                </template>
              </Submenu>
              <MenuItem name="4">
                <Icon type="ios-construct"/>创新驱动
              </MenuItem>
              <MenuItem name="5">
                <Icon type="md-infinite" :size="20"/>生态文明
              </MenuItem>
              <MenuItem name="6">
                <Icon type="ios-people" :size="20"/>政务服务
              </MenuItem>
            </Menu>
          </i-col>
        </Row>
        <chart-bar style="height: 500px;" :value="barData" text="每周用户活跃量"/>
      </Card>
      <Spin size="large" fix v-if="true"></Spin>
    </Row>
    <!-- 测评模块 -->
    <Row :gutter="20" style="margin-top: 20px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <h2 style="font-size:18px">县直单位绩效管理民主测评得分情况</h2>
          <div class="tip-wrapper">
            <div class="tip-container" v-for="(item,index) in progress" :key="index">
              <p class="tip-title">{{item.title}}:{{item.souer}}分</p>
              <MyProgress :color="item.color" :widthVal="item.souer"></MyProgress>
            </div>
          </div>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow style="height:517px">
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
      <Spin size="large" fix v-if="true"></Spin>
    </Row>
    <!-- 模态框 -->
    <Modal v-model="isShowLineBar" scrollable width="800px" title="总分">
      <div class="city-model">
        <p class="item">
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
      xzInex: 0,
      isShowLineBar: false,
      lineBarData: {},
      democracyData: {
        lineName: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ], // x轴
        lineData: [80, 50, 60, 66, 40, 80, 60, 45, 66, 50, 40, 60] // 数据
      },
      lineData: {
        lineName: [
          "葛岭镇",
          "城峰镇",
          "嵩口镇",
          "清凉镇",
          "梧桐镇",
          "樟城镇",
          "长庆镇",
          "同安镇",
          "大洋镇",
          "塘前乡",
          "富泉乡",
          "岭路乡",
          "赤锡乡",
          "洑口乡",
          "盖洋乡",
          "东洋乡",
          "霞拔乡",
          "盘谷乡",
          "红星乡",
          "白云乡",
          "丹云乡"
        ], // x轴
        lineData: [
          80,
          50,
          60,
          66,
          40,
          80,
          60,
          45,
          66,
          50,
          40,
          60,
          40,
          40,
          50,
          50,
          45,
          20,
          60,
          50,
          45
        ] // 数据
      }, // 折线图数据
      inforCardData: [
        {
          count: 100,
          color: "#9CCC65"
        },
        { count: 1, color: "#4DD0E1" },
        {
          title: "新增问答",
          icon: "md-help-circle",
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
      xzIndexList: [
        "总分",
        "经济发展",
        "有效投资",
        "创新驱动",
        "生态文明",
        "生命保障",
        "政务服务"
      ],
      columns3: [
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
      progress: [
        {
          title: "财政局",
          color: "#2196F3",
          souer: 60
        },
        {
          title: "建设局",
          color: "#66BB6A",
          souer: 60
        },
        {
          title: "交通局",
          color: "#FFC107",
          souer: 60
        },
        {
          title: "国土资源局",
          color: "#FF7043",
          souer: 60
        },
        {
          title: "人事局",
          color: "#F44336",
          souer: 60
        },
        {
          title: "宗教局",
          color: "#AB47BC",
          souer: 60
        },
        {
          title: "档案局",
          color: "#8D6E63",
          souer: 60
        }
      ],
      barData: {
        葛岭镇: 98,
        城峰镇: 90,
        嵩口镇: 75,
        清凉镇: 85,
        梧桐镇: 80,
        樟城镇: 88,
        长庆镇: 93,
        同安镇: 79,
        大洋镇: 80,
        塘前乡: 83,
        富泉乡: 65,
        岭路乡: 88,
        赤锡乡: 66,
        洑口乡: 77,
        盖洋乡: 90,
        东洋乡: 91,
        霞拔乡: 84,
        盘谷乡: 86,
        红星乡: 96,
        白云乡: 97,
        丹云乡: 98
      }
    };
  },
  methods: {
    IndexActive(index) {
      console.log(index);
      this.xzInex = index;
    },
    barSelect(name) {
      console.log(name);
    },
    getClickBar(val) {
      console.log(val);
      this.isShowLineBar = true;
      this.lineBarData = val;
    }
  },
  mounted() {
    //
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
</style>
