<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="12" :lg="6"  style="height: 160px;padding-bottom: 10px;">
        <infor-card shadow :icon-size="36" :color="inforCardData[0].color">
          <div class="henader-nav">
            <h2 class="head-title"><count-to :decimals="1" :end="inforCardData[0].count" count-class="count-style"/></h2>
            <p class="sub-text">县绩效考核总分</p>
            <div style="margin-top:50px">
              <bg-example style="height:70px;"></bg-example>
            </div>
          </div>
        </infor-card>
      </i-col>
      <i-col :xs="12" :md="12" :lg="6"  style="height: 160px;padding-bottom: 10px;">
        <infor-card shadow :icon-size="36" :color="inforCardData[1].color">
          <div class="henader-nav">
            <h2 class="head-title">第 <count-to :end="inforCardData[1].count" count-class="count-style"/> 名</h2>
            <p class="sub-text">县绩效考核成绩市排名情况 </p>
            <div style="margin-top:70px">
              <bg-bar style="height:120px;"></bg-bar>
            </div>
          </div>
        </infor-card>
      </i-col>
      <i-col :xs="12" :md="12" :lg="6"  style="height: 160px;padding-bottom: 10px;">
        <infor-card shadow :icon-size="36" :color="inforCardData[2].color">
          <div class="henader-nav">
            <h2 class="head-title blod-font">六抓六赛</h2>
            <p class="sub-text">排名末三乡镇</p>
          </div>
          <Row style="margin-top:70px;color:#fff;font-size:14px">
            <i-col :xs="8" :md="8" :lg="8">
              <p>第19名</p>
              <p style="font-size:18px;">红星乡</p>
            </i-col>
            <i-col :xs="8" :md="8" :lg="8">
              <p>第20名</p>
              <h2 style="font-size:18px;">红星乡</h2>
            </i-col>
            <i-col :xs="8" :md="8" :lg="8">
              <p>第21名</p>
              <h2 style="font-size:18px;">红星乡</h2>
            </i-col>
          </Row>
        </infor-card>
      </i-col>
      <i-col :xs="12" :md="12" :lg="6"  style="height: 160px;padding-bottom: 10px;">
      <infor-card shadow :icon-size="36" :color="inforCardData[3].color">
          <div class="henader-nav">
            <h2 class="head-title blod-font">专项工作督查</h2>
            <p class="sub-text">扣分单位</p>
          </div>
          <div>....</div>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;" >
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <!-- <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie> -->
          <radar style="height:500px"></Radar>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow style="height:530px">
          <!-- <chart-bar style="height: 500px;" :value="barData" text="每周用户活跃量"/> -->
          <Row>
           <i-col class="title" :md="20" :lg="20">
              <h2 style="display: inline-block;font-size:18px">市对县专项工作督查</h2>
           </i-col>
           <i-col class="title" :md="4" :lg="4">
            <Button type="success" style="margin-bottom: 5px;margin-right:0">备注</Button>
           </i-col>
          </Row>
          <div>
            <Table highlight-row stripe border ref="currentRowTable" :columns="columns3" :data="data1"></Table>
          </div>
        </Card>
      </i-col>
    </Row>
    <Row v-if="viewAccessAll">
      <Card shadow>
        <Row class="xz-index-warpper">
          <div class="xz-index-item" @click="IndexActive(index)" :class="{xzIndexActive:index===xzInex}" v-for="(item,index) in xzIndexList" :key="index" v-if="index===index">{{item}}
          </div>
        </Row>
        <div style="margin-top:80px">
          <example style="height: 510px;"/>
        </div>
      </Card>
    </Row>
    <Row>
      <Card shadow style="margin-top: 20px;">
        <Row>
          <i-col :lg="12">
            <h2 style="font-size:18px">各乡镇绩效考核指标</h2>
          </i-col>
          <i-col :lg="12">
            <Menu mode="horizontal"  active-name="1" @on-select="barSelect">
              <MenuItem name="1">
              <Icon type="ios-stats"  :size="20" />
                  总分
              </MenuItem>
              <MenuItem name="2">
                  <Icon type="md-trending-up" :size="20" />
                  经济发展
              </MenuItem>
              <Submenu name="3">
                  <template slot="title">
                      <Icon type="logo-yen" />
                      有效投资
                  </template>
                      <MenuItem name="3-1">新增和启动</MenuItem>
                      <MenuItem name="3-2">活跃分析</MenuItem>
                      <MenuItem name="3-3">时段分析</MenuItem>
                      <MenuItem name="3-4">用户留存</MenuItem>
                      <MenuItem name="3-5">流失用户</MenuItem>
              </Submenu>
              <MenuItem name="4">
                  <Icon type="ios-construct"  />
                  创新驱动
              </MenuItem>
              <MenuItem name="5">
                  <Icon type="md-infinite" :size="20"/>
                  生态文明
              </MenuItem>
              <MenuItem name="6">
                  <Icon type="ios-people" :size="20" />
                  政务服务
              </MenuItem>
          </Menu>
          </i-col>
        </Row>
        <chart-bar style="height: 500px;" :value="barData" text="每周用户活跃量"/>
      </Card>
    </Row>
    <Row :gutter="20" style="margin-top: 20px;" >
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
        <h2  style="font-size:18px">
          县直单位绩效管理民主测评得分情况
        </h2>
        <div class="tip-wrapper">
          <div class="tip-container" v-for="(item,index) in progress" :key="index">
            <p class="tip-title">{{item.title}}:{{item.souer}}分</p>
            <MyProgress :color="item.color" :widthVal="item.souer"></MyProgress>
          </div>
        </div>
          <!-- <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie> -->
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow style="height:520px">
        <div>
          <h2  style="font-size:18px">
          县直单位绩效管理民主测评得分情况
          </h2>
          <p style="font-size:18px;color:#999;margin-top:30px">总加分</p>
          <h1 style="margin-bottom:10px;margin-top:5px">2.1625 分</h1>
        </div>
          <example style="height:340px;"/>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card';
import CountTo from '_c/count-to';
import { ChartPie, ChartBar } from '_c/charts';
import Example from './example.vue';
import BgExample from './bg-example.vue';
import BgBar from './bg-bar.vue';
import { hasOneOf } from '@/libs/tools';
import Radar from './radar';
import MyProgress from './progress';
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example,
    Radar,
    MyProgress,
    BgExample,
    BgBar
  },
  data () {
    return {
      xzInex: 0,
      inforCardData: [
        {
          title: '新增用户',
          icon: 'md-person-add',
          count: 93.1,
          color: '#9CCC65'
        },
        { title: '累计点击', icon: 'md-locate', count: 5, color: '#4DD0E1' },
        {
          title: '新增问答',
          icon: 'md-help-circle',
          count: 142,
          color: '#FFCA28'
        },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#FF8A65' },
        {
          title: '新增互动',
          icon: 'md-chatbubbles',
          count: 12,
          color: '#FFCA28'
        },
        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      xzIndexList: [
        '总分',
        '经济发展',
        '有效投资',
        '创新驱动',
        '生态文明',
        '生命保障',
        '政务服务'
      ],
      columns3: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '指标名称',
          key: 'indexName'
        },
        {
          title: '工作目标牵头单位',
          key: 'leadUnit'
        },
        {
          title: '扣分上限/实际扣分',
          key: 'score',
          width: 160,
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {
                  style: {
                    position: 'relative',
                    width: '120px',
                    height: '20px',
                    marginRight: '5px',
                    fontSize: '16px',
                    lineHeight: '20px',
                    textAlign: 'center',
                    background: '#999',
                    color: '#fff'
                  },
                  on: {
                    click: () => {
                      console.log(params.row.score);
                    }
                  }
                },
                params.row.score
              ),
              h(
                'div',
                {
                  style: {
                    position: 'absolute',
                    marginTop: '-20px',
                    width: '50px',
                    height: '20px',
                    background: '#FF6975'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                ''
              )
            ]);
          }
        }
      ],
      data1: [
        {
          indexName: '构建现代公共文化服务体系 ',
          leadUnit: '县科技文体局',
          score: '0.3/0.3',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系 ',
          leadUnit: '县科技文体局',
          score: '0.3/0.3',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系 ',
          leadUnit: '县科技文体局',
          score: '0.3/0.3',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系 ',
          leadUnit: '县科技文体局',
          score: '0.3/0.3',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系 ',
          leadUnit: '县科技文体局',
          score: '0.3/0.3',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系 ',
          leadUnit: '县科技文体局',
          score: '0.3/0.3',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系 ',
          leadUnit: '县科技文体局',
          score: '0.3/0.3',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系 ',
          leadUnit: '县科技文体局',
          score: '0.3/0.3',
          date: '2016-10-03'
        }
      ],
      progress: [
        {
          title: '财政局',
          color: '#2196F3',
          souer: 60
        },
        {
          title: '建设局',
          color: '#66BB6A',
          souer: 60
        },
        {
          title: '交通局',
          color: '#FFC107',
          souer: 60
        },
        {
          title: '国土资源局',
          color: '#FF7043',
          souer: 60
        },
        {
          title: '人事局',
          color: '#F44336',
          souer: 60
        },
        {
          title: '宗教局',
          color: '#AB47BC',
          souer: 60
        },
        {
          title: '档案局',
          color: '#8D6E63',
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
    IndexActive (index) {
      console.log(index);
      this.xzInex = index;
    },
    barSelect (name) {
      console.log(name);
    }
  },
  mounted () {
    //
  },
  computed: {
    access () {
      return this.$store.state.user.access;
    },
    viewAccessAll () {
      return hasOneOf(['super_admin', 'admin'], this.access);
    },
    viewAccessSuper () {
      return hasOneOf(['sssssss'], this.access);
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
</style>
