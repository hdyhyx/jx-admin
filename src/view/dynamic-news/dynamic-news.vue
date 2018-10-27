<template>
  <div>
    <!-- 新闻内容 -->
      <Row>
        <Card>
          <p slot="title" style="font-size:20px">动态
          </p>
          <div class="btn-ide" @click="isEditor = true">
            <Button type="info">编辑新闻</Button>
          </div>
          <div v-for="(item,index) in newsList" :key="index">
            <Icon type="md-megaphone" :size="20"/>
              <span style="margin-left:10px">{{item.newsTime}}</span>
            <div class="news-list">
              <ul>
                <li class="news-item" v-for="(grounp,index) in item.news" :key="index">
                  <p class="news-item-text" @click="isNews(grounp)">{{grounp.title}}</p>
                  <span class="news-item-time">{{grounp.time}}</span>
                </li>
              </ul>
            </div>
            <Divider />
          </div>
          <Page :total="100" show-elevator style="margin-left:35%"/>
        </Card>
      </Row>
      <!-- 左边抽屉 -->
      <Drawer title="动态编辑"  width="1000"  :mask-closable="false" v-model="isEditor" :styles="styles">
        <div>
          <Form :model="newsData" style="margin:20px 0;">
            <Row :gutter="32">
              <Col span="12">
                <FormItem label="新闻标题">
                    <Input v-model="newsData.name" style="width:400px" placeholder="Enter something..."></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <editor ref="editor" :value="content" @on-change="handleChange"/>
            </Row>
            <Row :gutter="32">
              <Col span="12">
                  <FormItem label="发布日期" style="margin:20px 0">
                      <DatePicker type="date" @on-change="onChangeDate" placeholder="Select date" style="width: 200px"></DatePicker>
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Button type="primary" @click="changeContent" style="margin-top:20px">完成编辑</Button>
              <Button type="error"  @click="isEditor = false" style="margin-top:20px;margin-left:20px">关闭</Button>
            </Row>
          </Form>
        </div>
      </Drawer>
      <!-- 新闻模态框 -->
  </div>
</template>

<script>
import { getTest } from '@/api/user';
import Editor from '_c/editor';
export default {
  name: 'editor_page',
  components: {
    Editor
  },
  data () {
    return {
      content: '',
      ideHtml: '',
      i: 1,
      isEditor: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      newsData: {
        name: '',
        date: ''
      },
      newsList: [
        {
          newsTime: '十月',
          news: [
            {
              title: '外交部就习近平主席主持',
              time: '2018/10/24'
            },
            {
              title: '外交部就习近平主席主持',
              time: '2018/10/24'
            },
            {
              title: '外交部就习近平主席主持',
              time: '2018/10/24'
            },
            {
              title: '外交部就习近平主席主持',
              time: '2018/10/24'
            }
          ]
        },
        {
          newsTime: '九月',
          news: [
            {
              title: '外交部就习近平主席主持',
              time: '2018/9/24'
            },
            {
              title: '外交部就习近平主席主持',
              time: '2018/9/24'
            },
            {
              title: '外交部就习近平主席主持',
              time: '2018/9/24'
            },
            {
              title: '外交部就习近平主席主持',
              time: '2018/9/24'
            }
          ]
        },
        {
          newsTime: '八月',
          news: [
            {
              title: '外交部就习近平主席主持',
              time: '2018/8/24'
            },
            {
              title: '外交部就习近平主席主持',
              time: '2018/8/24'
            },
            {
              title: '外交部就习近平主席主持',
              time: '2018/8/24'
            },
            {
              title: '外交部就习近平主席主持',
              time: '2018/8/24'
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleChange (html, text) {
      this.ideHtml = html;
      console.log(this.ideHtml);
    },
    changeContent () {
      console.log(this.newsData.name === '', this.newsData.date === '');
      console.log(this.newsData.name === '' && this.newsData.date === '');
      console.log(true && false);
      if (this.newsData.name === '' || this.newsData.date === '') {
        return;
      }
      var arrayDate = this.newsData.date.split('-');
      var intMonth = parseInt(arrayDate[1], 10);
      var news = Object.assign(
        {},
        {
          newsTime: this.getMonth(intMonth) + '月',
          news: [
            {
              title: this.newsData.name,
              content: this.ideHtml,
              time: this.newsData.date
            }
          ]
        }
      );
      if (!news.newsTime !== 'undefined月') {
        this.newsList.map((item, index) => {
          if (item.newsTime === news.newsTime) {
            this.newsList[index].news.unshift(news.news[0]);
            this.i++;
            this.$refs.editor.setHtml('');
            news = '';
          } else if (this.i === 1) {
            this.newsList.push(news);
            this.i++;
            this.$refs.editor.setHtml('');
            news = '';
          }
        });
      }
    },
    onChangeDate (date) {
      this.newsData.date = date;
    },
    getMonth (index) {
      var month = [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
        '十',
        '十一',
        '十二'
      ];
      return month[index - 1];
    },
    isNews (item) {
      this.$Modal.info({
        title:
          item.title +
          `<span style="font-size:12px;font-weight:400;margin-left:200px;">发布日期：${
            item.time
          }</span>`,
        width: 800,
        content: item.content
      });
    }
  },
  created () {}
};
</script>

<style>
.news-list {
  margin: 10px 0 0 40px;
}
.news-list .news-item {
  line-height: 30px;
  cursor: pointer;
}
.news-list .news-item .news-item-text {
  display: inline-block;
  font-size: 16px;
}
.news-list .news-item:hover {
  color: #f44336 !important;
}
.news-list .news-item .news-item-time {
  margin-left: 30px;
}
.btn-ide {
  position: absolute;
  right: 20px;
  top: 10px;
}
.ivu-date-picker-cells {
  z-index: 10002;
}
.ivu-modal-confirm-head {
  text-align: center;
  border-bottom: 1px solid #999999;
}
</style>
