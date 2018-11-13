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
                        <Option value="已读">已读</Option>
                        <Option value="未读">未读</Option>
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
  </div>
</template>
<script>
export default {
  data () {
    return {
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
      columns7: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '单位',
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
          title: '发送时间',
          width: 150,
          key: 'dateSend'
        },
        {
          title: '文件状态',
          width: 150,
          key: 'dateEnd'
        },
        {
          title: '操作', // <Icon type="ios-trash-outline" />
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Icon',
                {
                  props: {
                    type: 'ios-eye-outline',
                    size: 28
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                'View'
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
          dateEnd: '已读',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          dateEnd: '已读',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          dateEnd: '已读',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          dateEnd: '未读',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          dateEnd: '已读',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          dateEnd: '已读',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          dateEnd: '未读',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          dateEnd: '未读',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          dateEnd: '未读',
          theTitle: '2018年1-3月份绩效审核'
        },
        {
          unit: '招商办',
          dateSend: '2018-10-05',
          dateEnd: '未读',
          theTitle: '2018年1-3月份绩效审核'
        }
      ]
    };
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '查看内容',
        content: `单位名称：${this.data6[index].unit}<br>发送时间：${
          this.data6[index].dateSend
        }<br>定制时间：${this.data6[index].dateEnd}
        <br>标题：${this.data6[index].theTitle}
        `
      });
    },
    remove (index) {
      this.data6.splice(index, 1);
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
    }
  }
};
</script>
<style>
</style>
