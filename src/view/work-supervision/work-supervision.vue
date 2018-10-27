<template>
  <div>
    <Row>
      <Card>
        <Row>
          <Col :xs="12" :md="12" :lg="4">
            <div>
              <span>查找项目：</span>
              <Input search placeholder="请输入搜索内容" style="width: auto">
                  <Icon type="ios-search" slot="suffix" />
              </Input>
            </div>
          </Col>
          <Col :xs="12" :md="12" :lg="20">
              <Button type="primary" style="margin-left:10px;width:150px" @click="handleAdd">增加项目</Button>
              <Button  type="success" style="margin-left:10px;width:150px">备注</Button>
          </Col>
        </Row>
      </Card>
    </Row>
    <Row style="margin-top:20px">
       <Card>
          <Table highlight-row ref="currentRowTable" :columns="columns3" :data="data1"></Table>
          <div style="margin-top:20px;">
            <Page :total="100" show-elevator />
         </div>
       </Card>
    </Row>
    <!-- 增加项目 -->
    <Modal
        v-model="isAddProject"
        title="Title"
        :loading="loading"
        @on-ok="asyncOK">
        <p>After you click ok, the dialog box will close in 2 seconds.</p>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isAddProject: false,
      loading: false,
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
          title: '扣分上限/实际扣分',
          key: 'score',
          width: 240,
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
        },
        {
          title: '工作目标牵头单位',
          key: 'leadUnit'
        },
        {
          title: '市考核责任单位',
          key: 'cityDutyUnit'
        },
        {
          title: '考核配合单位',
          key: 'coordinateUnit'
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
      data1: [
        {
          indexName: '构建现代公共文化服务体系',
          score: '0.3/0.3',
          leadUnit: '县科技文体局',
          cityDutyUnit: '市文广新局',
          coordinateUnit: '工商局',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系',
          score: '0.3/0.3',
          leadUnit: '县科技文体局',
          cityDutyUnit: '市文广新局',
          coordinateUnit: '工商局',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系',
          score: '0.3/0.3',
          leadUnit: '县科技文体局',
          cityDutyUnit: '市文广新局',
          coordinateUnit: '工商局',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系',
          score: '0.3/0.3',
          leadUnit: '县科技文体局',
          cityDutyUnit: '市文广新局',
          coordinateUnit: '工商局',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系',
          score: '0.3/0.3',
          leadUnit: '县科技文体局',
          cityDutyUnit: '市文广新局',
          coordinateUnit: '工商局',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系',
          score: '0.3/0.3',
          leadUnit: '县科技文体局',
          cityDutyUnit: '市文广新局',
          coordinateUnit: '工商局',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系',
          score: '0.3/0.3',
          leadUnit: '县科技文体局',
          cityDutyUnit: '市文广新局',
          coordinateUnit: '工商局',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系',
          score: '0.3/0.3',
          leadUnit: '县科技文体局',
          cityDutyUnit: '市文广新局',
          coordinateUnit: '工商局',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系',
          score: '0.3/0.3',
          leadUnit: '县科技文体局',
          cityDutyUnit: '市文广新局',
          coordinateUnit: '工商局',
          date: '2016-10-03'
        },
        {
          indexName: '构建现代公共文化服务体系',
          score: '0.3/0.3',
          leadUnit: '县科技文体局',
          cityDutyUnit: '市文广新局',
          coordinateUnit: '工商局',
          date: '2016-10-03'
        }
      ]
    };
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '查看内容',
        content: 'hello world'
      });
    },
    remove (index) {
      this.data1.splice(index, 1);
    },
    asyncOK () {
      setTimeout(() => {
        this.modal6 = false;
      }, 2000);
    },
    handleAdd () {
      this.isAddProject = true;
    }
  }
};
</script>
