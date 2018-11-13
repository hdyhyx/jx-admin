<style lang="less">
@import "./common.less";
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
                <FormItem label="方向">
                    <Select v-model="searchData.direction" placeholder="请选择方向">
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
    <Row>
      <Card>
        <Table stripe border :columns="columns1" :data="data1"></Table>
        <div style="margin-top:20px;margin-left:40%">
          <Page :total="100" />
        </div>
      </Card>
    </Row>
      <div>
        <Card title="导入EXCEL">
          <Row>
            <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
              <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
            </Upload>
          </Row>
          <Row>
            <div class="ivu-upload-list-file" v-if="file !== null">
              <Icon type="ios-stats"></Icon>
                {{ file.name }}
              <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
            </div>
          </Row>
          <Row>
            <transition name="fade">
              <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
                <div v-if="progressPercent == 100">
                  <Icon type="ios-checkmark-circle"></Icon>
                  <span>成功</span>
                </div>
              </Progress>
            </transition>
          </Row>
        </Card>
        <Row class="margin-top-10">
          <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
        </Row>
      </div>
  </div>
</template>
<script>
import excel from '@/libs/excel';
export default {
  data () {
    return {
      // updata 上传
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableData: [],
      tableTitle: [],
      // 数据
      tableLoading: false,
      pageTotal: 0,
      pageSize: 10,
      pageNumber: 1,
      searchData: {
        ducyUnit: '',
        leadUnit: '',
        indexName: '',
        direction: ''
      },
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
      columns1: [
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
          title: '权数上限',
          width: 100,
          key: 'weight_max'
        },
        {
          title: '实际权数',
          width: 100,
          key: 'actual_weight'
        },
        {
          title: '得分率',
          width: 100,
          key: 'score'
        },
        {
          title: '排名',
          width: 60,
          key: 'rank'
        },
        {
          title: '方向',
          width: 60,
          key: 'direction'
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
    },
    rowClassName (row, index) {},
    initUpload () {
      this.file = null;
      this.showProgress = false;
      this.loadingProgress = 0;
      this.tableData = [];
      this.tableTitle = [];
    },
    handleUploadFile () {
      this.initUpload();
    },
    handleRemove () {
      this.initUpload();
      this.$Message.info('上传的文件已删除！');
    },
    handleBeforeUpload (file) {
      const fileExt = file.name
        .split('.')
        .pop()
        .toLocaleLowerCase();
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file);
        this.file = file;
      } else {
        this.$Notice.warning({
          title: '文件类型错误',
          desc:
            '文件：' +
            file.name +
            '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
        });
      }
      return false;
    },
    // 读取文件
    readFile (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadstart = e => {
        this.uploadLoading = true;
        this.tableLoading = true;
        this.showProgress = true;
      };
      reader.onprogress = e => {
        this.progressPercent = Math.round((e.loaded / e.total) * 100);
      };
      reader.onerror = e => {
        this.$Message.error('文件读取出错');
      };
      reader.onload = e => {
        this.$Message.info('文件读取成功');
        const data = e.target.result;
        const { header, results } = excel.read(data, 'array');
        console.log(header, results);
        const tableTitle = header.map(item => {
          return { title: item, key: item };
        });
        this.tableData = results;
        this.tableTitle = tableTitle;
        this.uploadLoading = false;
        this.tableLoading = false;
        this.showRemoveFile = true;
      };
    }
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
