<template>
  <div>
    <!-- 搜索 -->
    <Row>
      <Card>
        <div style="margin-top: 6px">
              <Form ref="searchData" :model="searchData" :rules="searchReg" :label-width="100">
                <Row>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="选择审核状态" prop="audit">
                        <Select v-model="searchData.audit" placeholder="请选择指标等级" style="width:185px">
                            <Option value="全部">全部</Option>
                            <Option value="已审核">已审核</Option>
                            <Option value="未审核">未审核</Option>
                            <Option value="退回">退回</Option>
                            <Option value="作废">作废</Option>
                        </Select>
                    </FormItem>
                  </i-col>
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
      </Card>
    </Row>
    <!-- 指标内容 -->
    <Row style="margin-top:20px">
        <Card>
          <div>
            <Table :loading="lealTwoLoading" border :columns="colIndexTwo" :data="indexTwo"></Table>
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
        width='700px'
        >
        <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称指标" prop="indexName">
              <Input v-model="formValidate.indexName" placeholder="请输入指标名称" style="width:500px"></Input>
          </FormItem>
          <FormItem label="指标等级" prop="Level">
              <Select v-model="formValidate.indexVal" placeholder="请选择指标等级" style="width:500px">
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
          <FormItem label="权数" prop="weight" v-if="isFormFlase">
              <Input v-model="formValidate.weight" placeholder="请输入权数值" style="width:500px"></Input>
          </FormItem>
        </Form>
        </div>
        <div slot="footer">
            <Button type="success" size="large" :loading="loading" @click="asyncOK">审核通过</Button>
            <Button type="warning" size="large">退回</Button>
            <Button type="error" size="large">作废</Button>
            <Button size="large" @click="closeAudit">取消</Button>
        </div>
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
      loading: false, // 增加模态框确定loading
      TableOneLoading: true,
      isFormFlase: false,
      isFormTrue: true,
      isFormWeight: false,
      targetName: '',
      searchData: {
        audit: '',
        ducyUnit: '',
        lead: '',
        indexName: '',
        level: ''
      },
      colIndexTwo: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '指标等级',
          key: 'indexVal',
          width: 100
        },
        {
          title: '上级指标',
          key: 'superior',
          width: 150
        },
        {
          title: '指标名称',
          key: 'indexName'
        },
        {
          title: '牵头单位',
          key: 'leadUnit'
        },
        {
          title: '责任单位',
          key: 'dutyUint'
        },
        {
          title: '权数',
          key: 'weight',
          width: 70
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          fixed: 'right',
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
                      console.log(params);
                      this.formValidate = params.row;
                      this.addIndex = true;
                      this.isFormFlase = true;
                      this.isFormTrue = false;
                      this.targetName = '乡镇指标审核';
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
      indexTwo: [
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyUint: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyUint: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyUint: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyUint: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyUint: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyUint: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyUint: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyUint: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyUint: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyUint: '科技文体局',
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
        audit: [
          {
            required: true,
            message: '请选择审核结果',
            trigger: 'change'
          }
        ]
      },
      formValidate: {
        indexName: '',
        indexVal: '',
        superior: '',
        leadUnit: '',
        dutyUint: '',
        weight: '',
        score: ''
      }
    };
  },
  methods: {
    asyncOK () {
      console.log(this.formValidate);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
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
      this.addIndex = true;
      this.$refs['formValidate'].resetFields();
    },
    handleSubmit (e) {
      console.log(e);
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
    TableOneOk () {
      setTimeout(() => {
        this.modal6 = false;
      }, 2000);
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
