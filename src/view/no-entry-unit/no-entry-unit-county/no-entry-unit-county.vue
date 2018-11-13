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
                      <Input search placeholder="请输入牵头单位" v-model="searchData.leadUnit" style="width: auto">
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
      <Row style="margin-top:20px;">
        <Card>
          <Row style="margin-bottom:20px;">
            <i-col :xs="24" :md="24" :lg="12">
              <div class="selectAarry">
                <Tag type="dot" color="primary">已选中：</Tag>
                <div>
                  <Tag style="margin:5px 0" v-for="item in selectList" :key="item" :name="item">{{ item}}</Tag>
                </div>
              </div>
            </i-col>
          </Row>
          <!-- <Table border stripe @on-selection-change="selectRow" ref="selection" :columns="columns4" :data="data1"></Table> -->
          <Table  border stripe @on-select="selectRow" @on-select-cancel="selectCancel"  ref="selection"  :columns="columns1" :data="data1"></Table>
        </Card>
      </Row>
    </div>
</template>
<script>
export default {
  data () {
    return {
      selectList: [],
      searchData: {
        seachLevel_1: '',
        seachLevel_2: '',
        ducyUnit: '',
        leadUnit: '',
        indexName: ''
      },
      columns1: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '一级指标',
          key: 'level_1',
          render: (h, params) => {
            const row = params.row;
            var color = '';
            var text = row.level_1 + '（' + row.score + '）';
            // if (row.一级指标 === '经济发展') {
            //   color = '#e91e63';
            // } else if (row.一级指标 === '有效投资') {
            //   color = '#9c27b0';
            // }
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
          title: '牵头单位',
          key: 'pull_unit'
        },
        {
          title: '责任单位',
          key: 'duty_unit'
        }
      ],
      data1: [
        {
          level_1: '经济发展',
          level_2: '地方财政收入增长率',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          score: '235'
        },
        {
          level_1: '经济发展',
          level_2: '服务业增长率',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          score: '235'
        },
        {
          level_1: '经济发展',
          level_2: '每万元投资产出GDP（元）',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          score: '235'
        },
        {
          level_1: '经济发展',
          level_2: '社会消费品零售总额增长率',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          score: '235'
        },
        {
          level_1: '经济发展',
          level_2: '规模以上工业增长值增长率',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          score: '235'
        },
        {
          level_1: '有效投资',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          score: '170'
        },
        {
          level_1: '机制创新',
          level_2: '规模以上工业增长值增长率',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          score: '110'
        },
        {
          level_1: '创新驱动',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          score: '90'
        },
        {
          level_1: '生态文明',
          level_2: '规模以上工业增长值增长率',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          score: '110'
        },
        {
          level_1: '民生保障',
          level_2: '规模以上工业增长值增长率',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          score: '140'
        },
        {
          level_1: '政务服务',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          score: '80'
        }
      ],
      searchReg: {
        seachLevel_1: [
          {
            required: true,
            message: '请选择审核结果',
            trigger: 'change'
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
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '二级指标',
          key: 'name'
        },
        {
          title: '牵头单位',
          key: 'age'
        },
        {
          title: '责任单位',
          key: 'address'
        }
      ]
    };
  },
  methods: {
    handleClose2 (event, name) {
      const index = this.selectList.indexOf(name);
      this.selectList.splice(index, 1);
      this.$refs.selection.selectAll(false);
    },
    // TABEL多选
    selectRow (selection, row) {
      console.log(selection);
      this.selectList.push(row.level_2);
      // selection.forEach(item => {
      //   this.selectList.push(item.level_2);
      // });
    },
    selectCancel (selection, row) {
      console.log(selection, row);
      const index = this.selectList.indexOf(row.level_2);
      this.selectList.splice(index, 1);
    },
    // 指标管理关联 on-change
    selectIndex (value) {
      console.log(value);
      this.searchData.seachLevel_1 = value[0];
      this.searchData.seachLevel_2 = value[1];
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
    }
  }
};
</script>
<style>
.selectAarry {
  padding: 5px 10px 10px 10px;
  border: 1px solid #dcdee2;
  border-radius: 5px;
}
</style>
