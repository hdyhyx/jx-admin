<template>
  <div>
    <!-- 新闻内容 -->
    <Row>
      <Card>
        <Row>
          <div @click="openNews(hotNews)" v-if="hotNews !== null">
            <Alert show-icon>
              {{hotNews.title}}
              <Icon type="md-flame" slot="icon"></Icon>
              <template slot="desc">发布日期：{{hotNews.editTime}}</template>
            </Alert>
          </div>
          <div v-if="hotNews === null">
            <Alert show-icon>暂无数据
              <Icon type="md-flame" slot="icon"></Icon>
            </Alert>
          </div>
        </Row>
        <Row>
          <i-col :xs="24" :md="24" :lg="18">
            <div v-for="(year,index) in newsData" :key="index">
              <h2 style="color:#2d8cf0">{{year.dateTime}}</h2>
              <div v-for="(list,j) in year.list" :key="j">
                <Card :bordered="false" :dis-hover="true">
                  <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    {{list.monthTime}}月
                  </p>
                  <div v-for="(item,i) in list.list" :key="i">
                    <p class="item-high" @click="openNews(item)">
                      {{item.title}}
                      <Icon type="ios-loop-strong"></Icon>
                      <span class="news-date-time">{{item.editTime}}</span>
                    </p>
                  </div>
                </Card>
              </div>
            </div>
            <Spin size="large" fix v-if="newsListLoading"></Spin>
          </i-col>
        </Row>
        <Page
          :total="pageTotal"
          show-sizer
          :page-size="pageSize"
          :page-number="pageNumber"
          :page-size-opts="pageSizeArr"
          @on-page-size-change="pageSizeChange"
          @on-change="pageNumberChange"
          style="margin-left:35%"
        />
      </Card>
    </Row>
    <!-- 新闻模态框 -->
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
import { HOST } from "@/libs/util";
import { newsAjax } from "@/api/city";
// 查询URL
const queryUrl = "/News/watchNews";
export default {
  data() {
    return {
      host: "", // 文件IP地址
      buttonSize: "large", // 按钮样式
      pageSize: 3, // 显示几个月份的
      pageTotal: null, // 总页数
      pageNumber: 1, // 页码
      showNews: false, // 查看新闻
      hotNews: null, // 置顶新闻
      newsListLoading: false, // 新闻Loading
      newsData: null, // 新闻列表
      newsItem: null, // 新闻
      pageSizeArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 显示的条数
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      },
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      }
    };
  },
  methods: {
    openNews(item) {
      this.showNews = true;
      this.newsItem = item;
    },
    // 页码
    pageNumberChange(pageNumber) {
      this.pageNumber = pageNumber;
      this._getNewsData("", queryUrl, this.pageSize, this.pageNumber);
    },
    // 页数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._getNewsData("", queryUrl, this.pageSize, this.pageNumber);
    },
    _getNewsData(formData, url, pageSize, pageNumber) {
      this.newsListLoading = true;
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      const keyOne = "newsFilter";
      newsAjax({ formData, url, keyOne })
        .then(result => {
          this.newsListLoading = false;
          if (result.data.code === "200") {
            this.searchLoading = false;
            this.newsData = result.data.results.list;
            this.hotNews = result.data.results.top;
            this.pageTotal =
              parseInt(result.data.results.pageTotal) * this.pageSize;
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
    this.host = HOST;
    this._getNewsData("", queryUrl, this.pageSize, this.pageNumber);
  }
};
</script>

<style>
.ivu-card-head {
  padding: 5px 16px;
}
.ivu-card-head p,
.ivu-card-head-inner {
  font-size: 16px;
}
.item-high {
  margin-bottom: 10px;
  font-size: 16px;
  color: #17233d;
}
.item-high:hover {
  color: #5cadff;
}
.news-date-time {
  padding-left: 50px;
  font-size: 14px;
  color: #808695;
}
.news-content {
  padding: 0 10px;
  font-size: 15px;
}
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  background: #fff;
}
.ivu-alert-with-desc .ivu-alert-message {
  font-size: 24px;
}
</style>
