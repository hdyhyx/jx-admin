<template>
  <div>
    <Row>
      <Card>
        <Row>
          <Col :xs="24" :md="12" :lg="4">
            <div>
              <span>查找项目：</span>
              <Input search placeholder="请输入搜索内容" style="width: auto">
                  <Icon type="ios-search" slot="suffix" />
              </Input>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="20">
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
        v-model="addProject"
        :title="'专项工作督查'">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" inline>
          <FormItem label="名称指标" prop="indexName">
              <Input v-model="formValidate.indexName" placeholder="请输入指标名称" style="width:300px" ></Input>
          </FormItem>
          <FormItem label="市考核责任单位" prop="leadUnit" >
              <Input v-model="formValidate.leadUnit" placeholder="请输入市考核责任单位"  style="width:300px"  ></Input>
          </FormItem>
          <FormItem label="市考核责任单位" prop="dutyUint">
              <Input v-model="formValidate.dutyUint" placeholder="请输入市考核责任单位"  style="width:300px" ></Input>
          </FormItem>
          <FormItem label="扣分值" prop="score">
              <Input v-model="formValidate.score" placeholder="请输入扣分值"  style="width:300px" ></Input>
          </FormItem>
          <FormItem label="考核配合单位" prop="standard" >
              <Input v-model="formValidate.standard" placeholder="请输入考核配合单位"  style="width:300px" ></Input>
          </FormItem>
        </Form>
        <div slot="footer">
                <Button type="success" :loading="submitloading" style="width:120px" @click="BtnSubmit('formValidate')">
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
      isAddProject: false,
      loading: false,
      submitloading: false,
      addProject: false,
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
      formValidate: {
        indexName: '',
        leadUnit: '',
        dutyUint: '',
        score: '',
        Cooperate: ''
      },
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
                      this.addProject = true;
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
    closeAddIndex () {
      this.addProject = false;
    },
    BtnSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('成功');
          this.submitloading = true;
          console.log(this.formValidate);
          setTimeout(() => {
            this.submitloading = false;
            this.addProject = false;
          }, 2000);
        } else {
          this.$Message.error('带*为必填项');
        }
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
      this.addProject = true;
    }
  }
};
</script>
