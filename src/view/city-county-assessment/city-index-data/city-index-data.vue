<style lang="less">
@import "./../common.less";
</style>
<template>
  <div>
    <Row>
      <Card>
          <Form ref="searchData" :model="searchData" :rules="searchReg" :label-width="100">
            <Row>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="指标搜索" prop="seachLevel_1">
                      <Cascader :data="data" change-on-select @on-change="selectIndex"></Cascader>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="责任单位">
                    <Input search placeholder="请输入搜索内容" v-model="searchData.ducyUnit" style="width: auto">
                        <Icon type="ios-search" slot="suffix" />
                    </Input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="牵头单位">
                    <Input search placeholder="请输入搜索内容" v-model="searchData.leadUnit" style="width: auto">
                        <Icon type="ios-search" slot="suffix" />
                    </Input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="审核状态">
                    <Select v-model="searchData.auditState" placeholder="请选择方向" style="width: auto">
                        <Option value="未审核">未审核</Option>
                        <Option value="已审核">已审核</Option>
                    </Select>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="方向">
                    <Select v-model="searchData.direction" placeholder="请选择方向" style="width: auto">
                        <Option value="+">+</Option>
                        <Option value="-">-</Option>
                    </Select>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="6" >
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
        </Card>
    </Row>
    <!-- 指标数据 -->
    <Row style="margin-top:20px">
      <Card>
        <Table stripe border :columns="columns1" :data="data1"></Table>
        <div style="margin-top:20px;margin-left:40%">
          <Page :total="100" />
        </div>
      </Card>
    </Row>
    <!-- 模态框 -->
    <Modal
        v-model="addIndex"
        :title="'指标得分填写'"
        width='700px'
        >
        <div>
        <Form  ref="formValidate" :model="formValidate" :rules="regForm" >
          <Row>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="一级指标" prop="weight"  :label-width="60">
                    <Input v-model="formValidate.weight" placeholder="请输入权数值" ></Input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="一级分值" prop="weight"  :label-width="80">
                    <Input v-model="formValidate.weight" placeholder="请输入权数值"></Input>
                </FormItem>
              </i-col>
          </Row>
          <Row>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="二级指标" prop="weight"  :label-width="60">
                    <Input v-model="formValidate.weight" placeholder="请输入权数值" ></Input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="标准值" prop="weight"  :label-width="80">
                    <Input v-model="formValidate.weight" placeholder="请输入权数值"></Input>
                </FormItem>
              </i-col>
          </Row>
          <Row>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="牵头单位" prop="weight"  :label-width="60">
                    <Input v-model="formValidate.weight" placeholder="请输入权数值" ></Input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="责任单位" prop="weight"  :label-width="80">
                    <Input v-model="formValidate.weight" placeholder="请输入权数值"></Input>
                </FormItem>
              </i-col>
          </Row>
          <Row>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="权数上限" prop="weight"  :label-width="60">
                    <Input v-model="formValidate.weight" placeholder="请输入权数值" ></Input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="得分率" prop="weight"  :label-width="80">
                    <Input v-model="formValidate.weight" placeholder="请输入权数值"></Input>
                </FormItem>
              </i-col>
          </Row>
          <Row>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="得分" prop="score"  :label-width="60">
                    <InputNumber :max="100" :min="0" v-model="formValidate.score"></InputNumber>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="排名" prop="rank"  :label-width="80">
                    <Input v-model="formValidate.weight" placeholder="请输入权数值"></Input>
                </FormItem>
              </i-col>
          </Row>
        </Form>
        </div>
        <div slot="footer">
            <Button type="success" size="large" :loading="ModalLoading" @click="asyncOK">审核通过</Button>
            <Button size="large" @click="closeAudit">取消</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import excel from '@/libs/excel';
export default {
  data () {
    return {
      // 数据
      ModalLoading: false,
      addIndex: false,
      tableLoading: false,
      pageTotal: 0,
      pageSize: 10,
      pageNumber: 1,
      searchData: {
        superiorIndexId: '',
        leadUnit: '',
        indexName: '',
        direction: '',
        auditState: ''
      },
      formValidate: {},
      searchReg: {
        seachLevel_1: [
          {
            required: true,
            message: '请选择审核结果',
            trigger: 'change'
          }
        ]
      },
      regForm: {
        score: [
          {
            required: true,
            message: '请填写得分',
            trigger: 'blur'
          }
        ],
        rank: [
          {
            required: true,
            message: '请填写排名',
            trigger: 'blur'
          }
        ]
      },
      data: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '经济发展',
          label: '经济发展',
          children: [
            {
              value: '地方财政收入增长率',
              label: '地方财政收入增长率'
            },
            {
              value: '服务业增加增长率',
              label: '服务业增加增长率'
            },
            {
              value: '每万元投资产出GDP',
              label: '每万元投资产出GDP'
            }
          ]
        },
        {
          value: ' 有效投资',
          label: '有效投资',
          children: [
            {
              value: '固定资产投资增长率',
              label: '固定资产投资增长率'
            },
            {
              value: '先进制造业投资增长率',
              label: '先进制造业投资增长率'
            }
          ]
        }
      ],
      columns1: [
        {
          title: '一级指标',
          key: 'level_1',
          render: (h, params) => {
            const row = params.row;
            var color = '';
            var text = row.level_1 + '（' + row.score + '）';
            switch (row.level_1) {
              case '经济发展':
                color = '#e91e63';
                break;
              case '有效投资':
                color = '#9c27b0';
                break;
              case '机制创新':
                color = '#673ab7';
                break;
              case '创新驱动':
                color = '#3f51b5';
                break;
              case '生态文明':
                color = '#2196f3';
                break;
              case '民生保障':
                color = '#4caf50';
                break;
              case '政务服务':
                color = '#00bcd4';
                break;
              default:
                break;
            }
            return h(
              'Tag',
              {
                props: {
                  type: 'dot',
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: '二级指标',
          key: 'level_2'
        },
        {
          title: '标准值',
          key: 'standard'
        },
        {
          title: '牵头单位',
          key: 'pull_unit'
        },
        {
          title: '责任单位',
          key: 'duty_unit'
        },
        {
          title: '审核状态',
          maxWidth: 90,
          key: 'auditState'
        },
        {
          title: '权数上限',
          maxWidth: 70,
          key: 'weight_max'
        },
        {
          title: '实际权数',
          maxWidth: 70,
          key: 'actual_weight'
        },
        {
          title: '得分率',
          maxWidth: 80,
          key: 'score'
        },
        {
          title: '排名',
          maxWidth: 60,
          key: 'rank'
        },
        {
          title: '方向',
          maxWidth: 60,
          key: 'direction'
        },
        {
          title: '操作',
          key: 'action',
          maxWidth: 100,
          align: 'center',
          render: (h, params) => {
            var isDisabled = '';
            if (params.row.auditState === '已审核') {
              isDisabled = true;
            } else {
              isDisabled = false;
            }
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: isDisabled
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.addIndex = true;
                    }
                  }
                },
                '填入分数'
              )
            ]);
          }
        }
      ],
      data1: [
        {
          level_1: '经济发展',
          level_2: '地方财政收入增长率',
          standard: '前三年加 权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '235',
          rank: '',
          direction: '-'
        },
        {
          level_1: '经济发展',
          level_2: '服务业增长率',
          standard: '前三年加 权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '235',
          rank: '',
          direction: '-'
        },
        {
          level_1: '经济发展',
          level_2: '每万元投资产出GDP（元）',
          standard: '前三年加 权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '235',
          rank: '',
          direction: '-'
        },
        {
          level_1: '经济发展',
          level_2: '社会消费品零售总额增长率',
          standard: '前三年加 权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '235',
          rank: '',
          direction: '-'
        },
        {
          level_1: '经济发展',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '235',
          rank: '',
          direction: '-'
        },
        {
          level_1: '有效投资',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '170',
          rank: '',
          direction: '-'
        },
        {
          level_1: '机制创新',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '110',
          rank: '',
          direction: '-'
        },
        {
          level_1: '创新驱动',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '90',
          rank: '',
          direction: '-'
        },
        {
          level_1: '生态文明',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '110',
          rank: '',
          direction: '-'
        },
        {
          level_1: '民生保障',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '140',
          rank: '',
          direction: '-'
        },
        {
          level_1: '政务服务',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '80',
          rank: '',
          direction: '+'
        }
      ]
    };
  },
  methods: {
    // 关闭模态框
    closeAudit () {
      this.addIndex = false;
    },
    // 确认提交分数
    asyncOK () {
      this.ModalLoading = true;
      setTimeout(() => {
        this.ModalLoading = false;
        this.addIndex = false;
      }, 2000);
    },
    // 指标管理关联 on-change
    selectIndex (value) {
      console.log(value);
      if (value[1] !== undefined) {
        this.searchData.seachLevel_2 = value[1];
        this.searchData.seachLevel_1 = value[0];
      } else {
        this.searchData.seachLevel_1 = value[0];
        this.searchData.seachLevel_2 = '';
      }
    },
    // 提交搜索
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
    // 重置搜索
    seachReset (name) {
      this.$refs[name].resetFields();
    },
    rowClassName (row, index) {}
  }
};
</script>
<style>
.ivu-table .demo-table-red-row td:nth-child(1) {
  background-color: #ef9a9a;
  color: #fff;
}
.ivu-table .demo-table-indigo-row td:nth-child(1) {
  background-color: #7986cb;
  color: #fff;
}
.ivu-table .demo-table-info-row td:nth-child(1) {
  background-color: #64b5f6;
  color: #fff;
}
.ivu-table .demo-table-cyan-row td:nth-child(1) {
  background-color: #4dd0e1;
  color: #fff;
}
.ivu-table .demo-table-teal-row td:nth-child(1) {
  background-color: #4db6ac;
  color: #fff;
}
.ivu-table .demo-table-green-row td:nth-child(1) {
  background-color: #81c784;
  color: #fff;
}
.ivu-table .demo-table-brown-row td:nth-child(1) {
  background-color: #bcaaa4;
  color: #fff;
}
.ivu-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-name {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table .demo-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
</style>
