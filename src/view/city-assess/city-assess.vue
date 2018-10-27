<style lang="less">
@import "./common.less";
</style>
<template>
  <div>
    <Row>
      <Card>
        <Table :row-class-name="rowClassName" border :columns="columns1" :data="data1"></Table>
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
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableData: [],
      tableTitle: [],
      tableLoading: false,
      columns1: [
        {
          title: '一级指标',
          key: 'level_1'
        },
        {
          title: '二级指标',
          key: 'level_2'
        },
        {
          title: '标准局',
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
          level_1: '1.经济发展（235分）',
          level_2: '地方财政收入增长率',
          standard: '前三年加 权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '',
          rank: '',
          direction: '-'
        },
        {
          level_1: '1.经济发展（235分）',
          level_2: '服务业增长率',
          standard: '前三年加 权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '',
          rank: '',
          direction: '-'
        },
        {
          level_1: '1.经济发展（235分）',
          level_2: '每万元投资产出GDP（元）',
          standard: '前三年加 权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '',
          rank: '',
          direction: '-'
        },
        {
          level_1: '1.经济发展（235分）',
          level_2: '社会消费品零售总额增长率',
          standard: '前三年加 权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '',
          rank: '',
          direction: '-'
        },
        {
          level_1: '1.经济发展（235分）',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '',
          rank: '',
          direction: '-'
        },
        {
          level_1: '2.有效投资（170分）',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '',
          rank: '',
          direction: '-'
        },
        {
          level_1: '3.机制创新（55分）',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '',
          rank: '',
          direction: '-'
        },
        {
          level_1: '4.创新驱动（60分）',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '',
          rank: '',
          direction: '-'
        },
        {
          level_1: '5.生态文明（110分）',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '',
          rank: '',
          direction: '-'
        },
        {
          level_1: '6.民生保障（169分）',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '',
          rank: '',
          direction: '-'
        },
        {
          level_1: '7.政务服务（171分）',
          level_2: '规模以上工业增长值增长率',
          standard: '前三年加权平均值',
          pull_unit: '科技文体局',
          duty_unit: '科技文体局',
          weight_max: '10',
          actual_weight: '',
          score: '',
          rank: '',
          direction: '+'
        }
      ]
    };
  },
  methods: {
    rowClassName (row, index) {
      if (row.level_1 === '1.经济发展（235分）') {
        return 'demo-table-red-row';
      } else if (row.level_1 === '2.有效投资（170分）') {
        return 'demo-table-indigo-row';
      } else if (row.level_1 === '3.机制创新（55分）') {
        return 'demo-table-info-row';
      } else if (row.level_1 === '4.创新驱动（60分）') {
        return 'demo-table-cyan-row';
      } else if (row.level_1 === '5.生态文明（110分）') {
        return 'demo-table-teal-row';
      } else if (row.level_1 === '6.民生保障（169分）') {
        return 'demo-table-green-row';
      }
      return 'demo-table-brown-row';
    },
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
