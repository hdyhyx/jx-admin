<style lang="less">
@import "./common.less";
</style>
<template>
  <div>
    <Row>
      <Card>
          <div style="margin-top: 6px">
              <span>查找题型：</span>
              <Input search placeholder="请输入搜索内容" style="width: auto">
                  <Icon type="ios-search" slot="suffix" />
              </Input>
          </div>
          <div style="margin-top: 10px">
              <span>历史搜索：</span>
              <Button>永泰县指标</Button>
              <Button  style="margin-left:10px">各乡镇指标</Button>
          </div>
        </Card>
    </Row>
    <Row>
      <Card>
        <Table border stripe :columns="columns1" :data="data1"></Table>
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
    <Row class="margin-top:10px">
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
          title: '二级指标',
          key: '二级指标',
          width: 100
        },
        {
          title: '权数',
          key: '权数'
        },
        {
          title: '塘前',
          key: '塘前'
        },
        {
          title: '葛岭',
          key: '葛岭'
        },
        {
          title: '樟城',
          key: '葛岭'
        },
        {
          title: '城锋',
          key: '城锋'
        },
        {
          title: '清凉',
          key: '清凉'
        },
        {
          title: '福泉',
          key: '福泉'
        },
        {
          title: '岭路',
          key: '岭路'
        },
        {
          title: '赤锡',
          key: '赤锡'
        },
        {
          title: '梧桐',
          key: '梧桐'
        },
        {
          title: '嵩口',
          key: '嵩口'
        },
        {
          title: '伏口',
          key: '伏口'
        },
        {
          title: '盖洋',
          key: '盖洋'
        },
        {
          title: '梧桐',
          key: '梧桐'
        },
        {
          title: '长庆',
          key: '长庆'
        },
        {
          title: '东洋',
          key: '东洋'
        },
        {
          title: '霞拔',
          key: '霞拔'
        },
        {
          title: '同安',
          key: '同安'
        },
        {
          title: '大洋',
          key: '大洋'
        },
        {
          title: '盘谷',
          key: '盘谷'
        },
        {
          title: '红星',
          key: '红星'
        },
        {
          title: '白云',
          key: '白云'
        },
        {
          title: '丹云',
          key: '丹云'
        },
        {
          title: '责任单位',
          key: '责任单位',
          width: 120
        }
      ],
      data1: [
        {
          二级指标: '地方财政收入增长率',
          权数: 18,
          塘前: '30',
          城锋: '30',
          葛岭: '23',
          清凉: '30',
          福泉: '30',
          岭路: '23',
          赤锡: '30',
          梧桐: '30',
          嵩口: '23',
          伏口: '30',
          盖洋: '30',
          长庆: '23',
          东洋: '30',
          霞拔: '30',
          同安: '23',
          大洋: '30',
          红星: '30',
          盘谷: '23',
          白云: '30',
          丹云: '30',
          责任单位: '水利局',
          date: '2016-10-03'
        },
        {
          二级指标: '地方财政收入增长率',
          权数: 18,
          塘前: '30',
          城锋: '30',
          葛岭: '23',
          清凉: '30',
          福泉: '30',
          岭路: '23',
          赤锡: '30',
          梧桐: '30',
          嵩口: '23',
          伏口: '30',
          盖洋: '30',
          长庆: '23',
          东洋: '30',
          霞拔: '30',
          同安: '23',
          大洋: '30',
          红星: '30',
          盘谷: '23',
          白云: '30',
          丹云: '30',
          责任单位: '水利局',
          date: '2016-10-03'
        },
        {
          二级指标: '地方财政收入增长率',
          权数: 18,
          塘前: '30',
          城锋: '30',
          葛岭: '23',
          清凉: '30',
          福泉: '30',
          岭路: '23',
          赤锡: '30',
          梧桐: '30',
          嵩口: '23',
          伏口: '30',
          盖洋: '30',
          长庆: '23',
          东洋: '30',
          霞拔: '30',
          同安: '23',
          大洋: '30',
          红星: '30',
          盘谷: '23',
          白云: '30',
          丹云: '30',
          责任单位: '水利局',
          date: '2016-10-03'
        },
        {
          二级指标: '地方财政收入增长率',
          权数: 18,
          塘前: '30',
          城锋: '30',
          葛岭: '23',
          清凉: '30',
          福泉: '30',
          岭路: '23',
          赤锡: '30',
          梧桐: '30',
          嵩口: '23',
          伏口: '30',
          盖洋: '30',
          长庆: '23',
          东洋: '30',
          霞拔: '30',
          同安: '23',
          大洋: '30',
          红星: '30',
          盘谷: '23',
          白云: '30',
          丹云: '30',
          责任单位: '水利局',
          date: '2016-10-03'
        },
        {
          二级指标: 'John Brown',
          权数: 18,
          塘前: '30',
          责任单位: '水利局',
          date: '2016-10-03'
        },
        {
          二级指标: 'John Brown',
          权数: 18,
          塘前: '30',
          责任单位: '水利局',
          date: '2016-10-03'
        },
        {
          二级指标: 'John Brown',
          权数: 18,
          塘前: '30',
          责任单位: '水利局',
          date: '2016-10-03'
        },
        {
          二级指标: 'John Brown',
          权数: 18,
          塘前: '30',
          责任单位: '水利局',
          date: '2016-10-03'
        }
      ]
    };
  },
  methods: {
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
        // Eexl 导入
        results.forEach((item, index) => {
          this.data1.push(item);
        });
        this.data1.push(results[0]);
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
@import "./common.less";
</style>
