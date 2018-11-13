<template>
  <div>
    <Row>
     <Card>
          <Form ref="searchData" :model="searchData" :rules="searchReg" :label-width="80">
            <Row>
              <i-col :xs="12" :md="12" :lg="6" >
                <FormItem label="文件状态" prop="state">
                    <Select v-model="searchData.state" placeholder="请选择指标等级" style="width:185px">
                        <Option value="全部">全部</Option>
                        <Option value="已读">已反馈</Option>
                        <Option value="未读">未反馈</Option>
                    </Select>
                </FormItem>
              </i-col>
              <i-col :xs="12" :md="12" :lg="6">
                <FormItem label="接收单位">
                    <Input search placeholder="请输入搜索内容" v-model="searchData.receiveUnit" style="width: auto">
                        <Icon type="ios-search" slot="suffix" />
                    </Input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col :xs="12" :md="12" :lg="6">
                <FormItem label="时间选择">
                    <DatePicker type="date"  v-model="searchData.date"   placeholder="请选择时间"></DatePicker>
                </FormItem>
              </i-col>
              <i-col :xs="12" :md="12" :lg="6" >
                <FormItem label="标题">
                    <Input search placeholder="请输入指标名称" v-model="searchData.title" style="width: auto">
                        <Icon type="ios-search" slot="suffix" />
                    </Input>
                </FormItem>
              </i-col>
            </Row>
                <FormItem>
                  <Button type="primary" @click="seachSubmit('searchData')">提交搜索</Button>
                  <Button @click="seachReset('searchData')" style="margin-left: 8px">重置</Button>
              </FormItem>
          </Form>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
         <Table border :columns="columns7" :data="data6"></Table>
         <div style="margin-top:20px;">
            <Page :total="100" show-elevator />
         </div>
      </Card>
    </Row>
    <!-- 审核模态框 -->
    <Modal
        v-model="addIndex"
        width='500px'>
        <div slot="header">
          <h2 style=" text-align:center;">察访核验工作</h2>
        </div>
        <div class="content">
          <p class="content-item">发送单位：<span class="item-text">{{inboxContent.unit}}</span></p>
          <p class="content-item">标题：<span class="item-text">{{inboxContent.theTitle}}</span></p>
          <p class="content-item">发送时间：<span class="item-text">{{inboxContent.dateSend}}</span></p>
          <div class="big-input">你说的阿萨德阿萨德奥术大师大所大所大所大所大所大所多大萨达四大四大打算大声大声道</div>
          <Form ref="formInline" :model="scoreItem" :rules="scoreItemReg" inline>
              <FormItem prop="score" label="得分" :label-width="50">
                  <Input type="text" v-model="scoreItem.score" placeholder="请输入得分"></Input>
              </FormItem>
          </Form>
        </div>
        <div slot="footer">
            <Button type="primary" style="width:200px">
              <Icon type="ios-cloud-download-outline" size="17"/>
              下载附件
            </Button>
            <Button type="success" :loading="submitloading" style="width:120px" @click="BtnSubmit('formInline')">
              <span v-if="!submitloading">提交</span>
              <span v-else>提交中...</span>
            </Button>
            <Button @click="closeAddIndex">取消</Button>
        </div>
    </Modal>

  </div>
</template>
<script>
export default {
  data () {
    return {
      addIndex: false, // 显示增加模态框
      submitloading: false,
      inboxContent: {},
      scoreItem: {
        score: ''
      },
      scoreItemReg: {
        score: [
          {
            required: true,
            message: '请输入分数',
            trigger: 'blur'
          }
        ]
      },
      searchData: {
        state: '',
        receiveUnit: '',
        date: '',
        title: ''
      },
      searchReg: {
        state: [
          {
            required: true,
            message: '请选择指标等级',
            trigger: 'change'
          }
        ]
      },
      ruleValidate: {
        indexName: [
          {
            required: true,
            message: '请输入指标名称',
            trigger: 'blur'
          }
        ],
        Level: [
          {
            required: true,
            message: '请选择指标等级',
            trigger: 'change'
          }
        ]
      },
      columns7: [
        {
          title: '发送单位',
          key: 'unit',
          width: 300,
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.unit)
            ]);
          }
        },

        {
          title: '标题',
          key: 'theTitle'
        },
        {
          title: '收到时间',
          width: 150,
          key: 'dateSend'
        },
        {
          title: '反馈状态',
          width: 150,
          key: 'feedback'
        },
        {
          title: '操作', // <Icon type="ios-trash-outline" />
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      console.log(params.row);
                      this.inboxContent = params.row;
                      this.addIndex = true;
                    }
                  }
                },
                '查看'
              ),
              h(
                'Icon',
                {
                  props: {
                    type: 'ios-trash-outline',
                    size: 28
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                'Delete'
              )
            ]);
          }
        }
      ],
      data6: [
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          feedback: '已反馈',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          feedback: '未反馈',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          feedback: '已反馈',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          feedback: '已反馈',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          feedback: '未反馈',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          feedback: '已反馈',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          feedback: '已反馈',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          feedback: '未反馈',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          feedback: '已反馈',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          feedback: '已反馈',
          theTitle: '2018年1-3月份绩效审核'
        }
      ]
    };
  },
  methods: {
    closeAddIndex () {
      this.addIndex = false;
    },
    BtnSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.submitloading = true;

          this.$Message.success('Success!');
          setTimeout(() => {
            this.submitloading = false;
            this.addIndex = false;
          }, 2000);
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    seachSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('成功');
        } else {
          this.$Message.error('带*不可为空');
        }
      });
    },
    seachReset (name) {
      this.$refs[name].resetFields();
    },
    remove (index) {
      this.data6.splice(index, 1);
    }
  }
};
</script>
<style>
.content {
  padding: 0 40px;
  line-height: 25px;
  font-size: 14px;
}
.content .content-item {
  color: #808695;
}
.content .content-item .item-text {
  padding-left: 10px;
  color: #17233d;
}
.download {
  margin: 20px;
}
.content .big-input {
  margin: 10px 0;
  padding: 5px;
  height: 200px;
  overflow: hidden;
  overflow-y: scroll;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid #dcdee2;
}
</style>
