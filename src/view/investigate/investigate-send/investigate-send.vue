<template>
  <div>
    <Row>
      <Card>
        <div style="margin-top: 6px">
            <span>指标管理：</span>
            <Input search placeholder="请输入搜索内容" style="width: auto">
                <Icon type="ios-search" slot="suffix" />
            </Input>
        </div>
        <div style="margin-top:10px">
            <span>按时间查找：</span>
            <Button>七天内</Button>
            <Button style="margin: 0 20px">一个月内</Button>
            <Button>三个月内</Button>
        </div>
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
      columns7: [
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
                      this.show(params.index);
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
    show (index) {
      this.$Modal.info({
        title: '查看内容',
        content: `单位名称：${this.data6[index].unit}<br>发送时间：${
          this.data6[index].dateSend
        }<br>反馈状态：${this.data6[index].feedback}
        <br>标题：${this.data6[index].theTitle}
        `
      });
    },
    remove (index) {
      this.data6.splice(index, 1);
    }
  }
};
</script>
<style>
</style>
