<template>
  <div>
    <Row>
      <Card>
        <Tabs>
            <TabPane label="全部">
              <Table border :columns="columns7" :data="data6"></Table>
              <div style="margin:20px; 0">
                  <Page :total="100" show-elevator />
              </div>
            </TabPane>
            <TabPane label="未审核">未审核</TabPane>
            <TabPane label="已审核">已审核</TabPane>
            <TabPane label="回退">回退</TabPane>
            <TabPane label="作废">作废</TabPane>
        </Tabs>
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
          title: '状态',
          key: 'state',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.state)
            ]);
          }
        },
        {
          title: '审批内容',
          key: 'content'
        },
        {
          title: '提交单位',
          key: 'submitUnit'
        },
        {
          title: '责任单位',
          key: 'dutyUnit'
        },
        {
          title: '提交日期',
          width: 150,
          key: 'submitDate'
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
          state: '已审核',
          submitUnit: '招商办',
          submitDate: '2018-10-05',
          dutyUnit: '工商局',
          content: '2018年1-3月份绩效审核'
        },
        {
          state: '已审核',
          submitUnit: '招商办',
          submitDate: '2018-10-05',
          dutyUnit: '工商局',
          content: '2018年1-3月份绩效审核'
        },
        {
          state: '已审核',
          submitUnit: '招商办',
          submitDate: '2018-10-05',
          dutyUnit: '工商局',
          content: '2018年1-3月份绩效审核'
        },
        {
          state: '已审核',
          submitUnit: '招商办',
          submitDate: '2018-10-05',
          dutyUnit: '工商局',
          content: '2018年1-3月份绩效审核'
        },
        {
          state: '已审核',
          submitUnit: '招商办',
          submitDate: '2018-10-05',
          dutyUnit: '工商局',
          content: '2018年1-3月份绩效审核'
        },
        {
          state: '已审核',
          submitUnit: '招商办',
          submitDate: '2018-10-05',
          dutyUnit: '工商局',
          content: '2018年1-3月份绩效审核'
        },
        {
          state: '已审核',
          submitUnit: '招商办',
          submitDate: '2018-10-05',
          dutyUnit: '工商局',
          content: '2018年1-3月份绩效审核'
        },
        {
          state: '已审核',
          submitUnit: '招商办',
          submitDate: '2018-10-05',
          dutyUnit: '工商局',
          content: '2018年1-3月份绩效审核'
        },
        {
          state: '已审核',
          submitUnit: '招商办',
          submitDate: '2018-10-05',
          dutyUnit: '工商局',
          content: '2018年1-3月份绩效审核'
        },
        {
          state: '已审核',
          submitUnit: '招商办',
          submitDate: '2018-10-05',
          dutyUnit: '工商局',
          content: '2018年1-3月份绩效审核'
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
</script>
