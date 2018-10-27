<template>
  <div>
    <Row>
      <Card>
        <div style="margin-top: 6px">
              <Form ref="searchData" :model="searchData" :rules="searchReg" :label-width="80">
                <Row>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="指标等级" prop="level">
                        <Select v-model="searchData.level" placeholder="请选择指标等级" style="width:185px">
                            <Option value="一级指标">一级指标</Option>
                            <Option value="二级指标">二级指标</Option>
                            <Option value="三级指标">三级指标</Option>
                        </Select>
                    </FormItem>
                  </i-col>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="责任单位">
                        <Input search placeholder="请输入搜索内容" v-model="searchData.ducyUnit" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                </Row>
                <Row>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="牵头单位">
                        <Input search placeholder="请输入牵头单位" v-model="searchData.leadUnit" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="指标名称">
                        <Input search placeholder="请输入指标名称" v-model="searchData.indexName" style="width: auto">
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
        <div style="margin-top: 10px">
            <span>增加指标：</span>
            <Button   @click="addTarget($event)" >永泰县指标</Button>
        </div>
      </Card>
    </Row>
    <!-- 指标内容 -->
    <Row style="margin-top:20px">
        <Card>
          <div>
            <Table :loading="lealOneLoading" border :columns="colIndexOne" :data="indexOne" v-if="isIndexOne"></Table>
            <Table :loading="lealTwoLoading" border :columns="colIndexTwo" :data="indexTwo" v-if="searchData.level==='二级指标'" ></Table>
            <Table :loading="lealThreeLoading" border :columns="columns7" :data="data6" v-if="searchData.level==='三级指标'"></Table>
          </div>
          <div style="width:100%">
            <Page style="margin-top:10px;" :total="100" show-elevator />
          </div>
        </Card>
    </Row>

    <!-- 模态框  增加指标-->
    <Modal
        v-model="addIndex"
        :title="targetName"
        :loading="loading"
        width='700px'
        @on-ok="asyncOK">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称指标" prop="indexName">
              <Input v-model="formValidate.indexName" placeholder="请输入指标名称" style="width:500px"></Input>
          </FormItem>
          <FormItem label="指标等级" prop="Level">
              <Select v-model="formValidate.Level" placeholder="请选择指标等级" style="width:500px">
                  <Option value="一级指标">一级指标</Option>
                  <Option value="二级指标">二级指标</Option>
                  <Option value="三级指标">三级指标</Option>
              </Select>
          </FormItem>
          <FormItem label="上级指标" prop="superior" v-if="isFormFlase">
              <Select v-model="formValidate.superior" placeholder="请选择上级指标" style="width:500px">
                  <Option value="经济发展">经济发展</Option>
                  <Option value="有效投资">有效投资</Option>
                  <Option value="机制创新">机制创新</Option>
                  <Option value="创新驱动">创新驱动</Option>
                  <Option value="生态文明">生态文明</Option>
                  <Option value="民生保障">民生保障</Option>
              </Select>
          </FormItem>
          <FormItem label="牵头单位" prop="leadUnit" v-if="isFormFlase">
              <Input v-model="formValidate.leadUnit" placeholder="请输入牵头单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="责任单位" prop="dutyUint" v-if="isFormFlase">
              <Input v-model="formValidate.dutyUint" placeholder="请输入责任单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="分值" prop="score" v-if="isFormTrue">
              <Input v-model="formValidate.score" placeholder="请输入责任单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="标准值" prop="standard" v-if="isFormFlase">
              <Input v-model="formValidate.standard" placeholder="请输入标准值" style="width:500px"></Input>
          </FormItem>
          <FormItem label="方向" prop="direction" v-if="isFormFlase">
               <Select v-model="formValidate.direction" placeholder="请选择方向" style="width:500px">
                  <Option value="+">+</Option>
                  <Option value="-">-</Option>
               </Select>
          </FormItem>
          <FormItem label="权数" prop="weight" v-if="isFormFlase">
              <Input v-model="formValidate.weight" placeholder="请输入权数值" style="width:500px"></Input>
          </FormItem>
        </Form>
    </Modal>

  </div>
</template>
<script>
export default {
  data () {
    return {
      addIndex: false, // 显示增加模态框
      TableOne: false,
      isIndexOne: true, // 显示指标等级一
      loading: true, // 增加模态框确定loading
      TableOneLoading: true,
      lealOneLoading: false, // 表格Loading
      lealTwoLoading: false,
      lealThreeLoading: false,
      isFormFlase: false,
      isFormTrue: true,
      isFormWeight: false,
      targetName: '',
      searchData: {
        level: '',
        ducyUnit: '',
        lead: '',
        indexName: ''
      },
      colIndexOne: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '指标等级',
          key: 'target',
          width: 300
        },
        {
          title: '指标名称',
          key: 'indexName'
        },
        {
          title: '分值',
          key: 'score'
        },
        {
          title: 'Action',
          key: 'action',
          width: 300,
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
                    marginRight: '20px'
                  },
                  on: {
                    click: () => {
                      this.addIndex = true;
                      this.formValidate.indexName = params.row.indexName;
                      this.formValidate.Level = params.row.target;
                      this.formValidate.score = params.row.score;
                      this.isFormFlase = false;
                      this.isFormTrue = true;
                      this.targetName = '编辑一级指标';
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
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
      colIndexTwo: [
        {
          title: '指标等级',
          key: 'indexVal',
          width: 100
        },
        {
          title: '指标名称',
          key: 'indexName'
        },
        {
          title: '上级单位',
          key: 'superior'
        },
        {
          title: '牵头单位',
          key: 'leadUnit'
        },
        {
          title: '责任单位',
          key: 'dutyName'
        },
        {
          title: '标准值',
          key: 'standard'
        },
        {
          title: '权数',
          key: 'weight'
        },
        {
          title: '方向',
          key: 'direction',
          width: 80,
          align: 'center'
        },
        {
          title: '操作',
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
                      this.addIndex = true;
                      this.formValidate = {
                        indexName: params.row.indexName,
                        Level: params.row.indexVal,
                        superior: params.row.superior,
                        leadUnit: params.row.leadUnit,
                        standard: params.row.standard,
                        dutyUint: params.row.dutyName,
                        score: '',
                        direction: params.row.direction,
                        weight: params.row.weight
                      };
                      this.isFormFlase = true;
                      this.isFormTrue = false;
                      this.targetName = '编辑二级指标';
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
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
      indexOne: [
        {
          target: '一级指标',
          indexName: '经济发展',
          score: 235
        },
        {
          target: '一级指标',
          indexName: '有效投资',
          score: 170
        },
        {
          target: '一级指标',
          indexName: '机制创新',
          score: 55
        },
        {
          target: '一级指标',
          indexName: '创新驱动',
          score: 90
        },
        {
          target: '一级指标',
          indexName: '生态文明',
          score: 110
        },
        {
          target: '一级指标',
          indexName: '民生保障',
          score: 169
        },
        {
          target: '一级指标',
          indexName: '政务服务',
          score: 171
        }
      ],
      indexTwo: [
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '电力局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        }
      ],
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
      searchReg: {
        level: [
          {
            required: true,
            message: '请选择指标等级',
            trigger: 'change'
          }
        ]
      },
      formValidate: {
        indexName: '',
        Level: '',
        superior: '',
        leadUnit: '',
        dutyUint: '',
        score: '',
        standard: '',
        direction: '',
        weight: ''
      }
    };
  },
  methods: {
    asyncOK () {
      setTimeout(() => {
        this.addIndex = false;
      }, 2000);
    },
    show (index) {
      console.log(index);
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove (index) {
      this.data6.splice(index, 1);
    },
    addTarget (e) {
      this.targetName = e.target.innerText + '增加';
      if (this.formValidate.Level !== '') {
        this.$refs['formValidate'].resetFields();
        this.formValidate = {
          indexName: '',
          Level: '',
          superior: '',
          leadUnit: '',
          dutyUint: '',
          score: '',
          standard: '',
          direction: '',
          weight: ''
        };
      }
      this.isFormFlase = false;
      this.isFormTrue = true;
      this.addIndex = true;
    },
    handleSubmit (e) {
      console.log(e);
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
    TableOneOk () {
      setTimeout(() => {
        this.modal6 = false;
      }, 2000);
    }
  },
  watch: {
    formValidate: {
      handler (newVal) {
        if (newVal.Level !== undefined) {
          if (newVal.Level === '一级指标') {
            this.isFormFlase = false;
            this.isFormTrue = true;
          } else if (newVal.Level === '二级指标') {
            this.isFormFlase = true;
            this.isFormTrue = false;
          }
        }
      },
      deep: true
    },
    searchData: {
      handler (newVal) {
        if (newVal.level === '一级指标') {
          this.isIndexOne = true;
        } else if (newVal.level === '二级指标') {
          this.isIndexOne = false;
        } else {
          this.isIndexOne = false;
        }
      },
      deep: true
    }
  }
};
</script>
