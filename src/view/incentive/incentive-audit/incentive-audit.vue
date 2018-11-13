<template>
  <div>
    <Row>
      <Card>
        <div style="margin-top: 6px">
              <Form ref="searchData" :model="searchData" :rules="searchReg" :label-width="100">
                <Row>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="选择审核状态" prop="audit">
                        <Select v-model="searchData.audit" placeholder="请选择审核状态" style="width:185px">
                            <Option value="全部">全部</Option>
                            <Option value="已审核">已审核</Option>
                            <Option value="未审核">未审核</Option>
                            <Option value="退回">退回</Option>
                            <Option value="作废">作废</Option>
                        </Select>
                    </FormItem>
                  </i-col>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="表彰类型" prop="citeType">
                        <Select v-model="searchData.citeType" placeholder="请选择表彰类型" style="width:185px">
                            <Option value="1类">1类</Option>
                            <Option value="2类">2类</Option>
                            <Option value="3类">3类</Option>
                            <Option value="4类">4类</Option>
                            <Option value="4类">5类</Option>
                        </Select>
                    </FormItem>
                  </i-col>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="表彰单位">
                        <Input search placeholder="请输入表彰单位" v-model="searchData.citeUnit" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                </Row>
                <Row>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="被表彰单位">
                        <Input search placeholder="请输入被表彰单位" v-model="searchData.byCiteUnit" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="事项名称">
                        <Input search placeholder="请输入事项名称" v-model="searchData.mattersName" style="width: auto">
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
        </div>
        <!-- <div style="margin-top: 10px">
            <span>增加指标：</span>
            <Button   @click="addTarget($event)" >乡镇指标</Button>
        </div> -->
      </Card>
    </Row>
    <!-- 指标内容 -->
    <Row style="margin-top:10px">
      <Card>
         <Table border :columns="columns7"  :data="data6"></Table>
      <div style="margin-top:15px;margin-left:35%">
          <Page :total="100" show-elevator />
      </div>
      </Card>
    </Row>
     <!-- 查看模态框 -->
    <Modal v-model="lookContent">
      <p slot="header" style="color:#2db7f5;text-align:center">
          <Icon type="ios-information-circle" size="20"></Icon>
          <span>查看事项</span>
      </p>
      <div style="font-size:15px">
        <div style="margin-bottom:10px">
          事项名称：<span style="color:#000">{{lookRowContent.name}}</span>
         </div>
        <div style="margin-bottom:10px">
         表彰机关：<span style="color:#000">{{lookRowContent.recognition}}</span>
       </div>
       <div style="margin-bottom:10px">
         被表彰机关：<span style="color:#000">{{lookRowContent.honored}}</span>
       </div>
       <div style="margin-bottom:10px">
        证明材料名称：<span style="color:#000">{{lookRowContent.material}}</span>
       </div>
       <div style="margin-bottom:10px">
        证明材料附件：
        <div style="text-align:center;border-bottom:1px solid #C0C0C0;padding-bottom:10px">
         <img :src="lookRowContent.imageUrl" width="350px" height="220px">
        </div>
        <div style="margin-bottom:5px;margin-top:10px">
        加分类别：
        <span>
          <Button type="info" shape="circle" style="margin-left:20px">第 5 类</Button>
        </span>
        </div>
        <div style="margin-top:10px">加分分值：<strong>0.3</strong></div>
       </div>
      </div>
      <div slot="footer">
          <Button type="success" size="large" @click="passAudit">审核通过</Button>
          <Button type="warning" size="large" @click="backAudit">退回</Button>
          <Button type="error" size="large" @click="invalidAudit">作废</Button>
          <Button  size="large" @click="lookContent=false">取消</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
export default {
  data () {
    return {
      addIndex: false, // 显示增加模态框
      loading: false, // 增加模态框确定loading
      lookContent: false,
      lookRowContent: '',
      searchData: {
        audit: '',
        citeType: '',
        citeUnit: '',
        byCiteUnit: '',
        mattersName: ''
      },
      columns7: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '事项名称',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ]);
          }
        },
        {
          title: '正名材料',
          key: 'material',
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%'
                }
              },
              params.row.material
            );
          }
        },
        {
          title: '表彰机关',
          key: 'recognition',
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%'
                }
              },
              params.row.recognition
            );
          }
        },
        {
          title: '被表彰单位',
          key: 'honored'
        },
        {
          title: '审核状态',
          key: 'auditState',
          align: 'center'
        },
        {
          title: '加分类别',
          key: 'plusCategory',
          width: 90
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              // <Icon type="md-trash" /><Icon type="md-eye" />
              h('Icon', {
                props: {
                  type: 'md-eye',
                  size: '24'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.lookRow(params.row);
                  }
                }
              }),
              // h(
              //   'Icon',
              //   {
              //     props: {
              //       type: 'md-create',
              //       size: '24'
              //     },
              //     style: {
              //       marginRight: '5px'
              //     },
              //     on: {
              //       click: () => {
              //         this.isShowMatters(params.row);
              //       }
              //     }
              //   },
              //   '编辑'
              // ),
              h(
                'Icon',
                {
                  props: {
                    type: 'md-trash',
                    size: 24
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ],
      data6: [
        {
          name: '生态文明',
          recognition: '福州人民政府福',
          honored: '永泰县',
          plusCategory: '3',
          auditState: '未审核',
          material: '牌匾、环保部2017年48号公告',
          imageUrl:
            'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          auditState: '已审核',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          auditState: '已审核',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          auditState: '已审核',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          auditState: '作废',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          auditState: '退回',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          auditState: '退回',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          auditState: '已审核',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          auditState: '已审核',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          auditState: '已审核',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        }
      ],
      searchReg: {
        audit: [
          {
            required: true,
            message: '请选择审核状态',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    backAudit () {},
    passAudit () {},
    invalidAudit () {},
    lookRow (e) {
      console.log(e);
      this.lookRowContent = e;
      this.lookContent = true;
    },
    remove (index) {
      this.data6.splice(index, 1);
    },
    seachSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.searchData);
          this.$Message.success('成功');
        } else {
          this.$Message.error('带*不可为空');
        }
      });
    },
    seachReset (name) {
      this.$refs[name].resetFields();
    },
    closeAudit () {
      this.addIndex = false;
    }
  },
  watch: {
    formValidate: {
      handler (newVal) {
        if (newVal.Level === '一级指标') {
          this.isFormFlase = false;
          this.isFormTrue = true;
        } else if (newVal.Level === '二级指标') {
          this.isFormFlase = true;
          this.isFormTrue = false;
        }
      },
      deep: true
    },
    searchData: {
      handler (newVal) {},
      deep: true
    }
  }
};
</script>
<style>
.villages-towns {
  margin: 0px 0 30px 0px;
}
.villages-towns ul {
  list-style-type: none;
}
.villages-towns .item {
  display: inline-block;
}
.villages-towns .item .ivu-input {
  font-size: 14px;
}
.villages-towns .item .item-title {
  width: 71px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background: #03a9f4;
  color: #ffffff;
}
</style>
