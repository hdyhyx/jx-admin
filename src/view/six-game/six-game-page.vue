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
            </Row>
            <Row>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="牵头单位">
                    <Input search placeholder="请输入牵头单位" v-model="searchData.leadUnit" style="width: auto">
                        <Icon type="ios-search" slot="suffix" />
                    </Input>
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
        <Table border stripe :columns="columns1" :data="data1"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1"></Page>
            </div>
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
      searchData: {
        seachLevel_1: '',
        seachLevel_2: '',
        ducyUnit: '',
        leadUnit: '',
        indexName: ''
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
          key: '一级指标',
          width: 190,
          fixed: 'left',
          render: (h, params) => {
            const row = params.row;
            var color = '';
            var text = row.一级指标 + '（' + row.得分 + '）';
            // if (row.一级指标 === '经济发展') {
            //   color = '#e91e63';
            // } else if (row.一级指标 === '有效投资') {
            //   color = '#9c27b0';
            // }
            switch (row.一级指标) {
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
          key: '二级指标',
          width: 200,
          fixed: 'left'
        },
        {
          title: '权数',
          key: '权数',
          width: 60
        },
        {
          title: '塘前',
          key: '塘前',
          width: 60
        },
        {
          title: '葛岭',
          key: '葛岭',
          width: 60
        },
        {
          title: '樟城',
          key: '葛岭',
          width: 60
        },
        {
          title: '城锋',
          key: '城锋',
          width: 60
        },
        {
          title: '清凉',
          key: '清凉',
          width: 60
        },
        {
          title: '福泉',
          key: '福泉',
          width: 60
        },
        {
          title: '岭路',
          key: '岭路',
          width: 60
        },
        {
          title: '赤锡',
          key: '赤锡',
          width: 60
        },
        {
          title: '梧桐',
          key: '梧桐',
          width: 60
        },
        {
          title: '嵩口',
          key: '嵩口',
          width: 60
        },
        {
          title: '伏口',
          key: '伏口',
          width: 60
        },
        {
          title: '盖洋',
          key: '盖洋',
          width: 60
        },
        {
          title: '梧桐',
          key: '梧桐',
          width: 60
        },
        {
          title: '长庆',
          key: '长庆',
          width: 60
        },
        {
          title: '东洋',
          key: '东洋',
          width: 60
        },
        {
          title: '霞拔',
          key: '霞拔',
          width: 60
        },
        {
          title: '同安',
          key: '同安',
          width: 60
        },
        {
          title: '大洋',
          key: '大洋',
          width: 60
        },
        {
          title: '盘谷',
          key: '盘谷',
          width: 60
        },
        {
          title: '红星',
          key: '红星',
          width: 60
        },
        {
          title: '白云',
          key: '白云',
          width: 60
        },
        {
          title: '丹云',
          key: '丹云',
          width: 60
        },
        {
          title: '责任单位',
          key: '责任单位',
          width: 120,
          fixed: 'right'
        },
        {
          title: '牵头单位',
          key: '牵头单位',
          width: 120,
          fixed: 'right'
        }
      ],
      data1: [
        {
          一级指标: '经济发展',
          得分: '235',
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
          牵头单位: '工商局',
          date: '2016-10-03'
        },
        {
          一级指标: '经济发展',
          得分: '235',
          二级指标: '服务业增加增长率',
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
          牵头单位: '工商局',
          date: '2016-10-03'
        },
        {
          一级指标: '有效投资',
          得分: '170',
          二级指标: '固定资产投资增长率',
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
          牵头单位: '工商局',
          date: '2016-10-03'
        },
        {
          一级指标: '有效投资',
          得分: '170',
          二级指标: '先进制造业投资增长率',
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
          牵头单位: '工商局',
          date: '2016-10-03'
        },
        {
          一级指标: '机制创新',
          得分: '90',
          二级指标: '研究与试验发展经费支出占GDP比重（错年值）',
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
          牵头单位: '工商局',
          date: '2016-10-03'
        },
        {
          一级指标: '机制创新',
          得分: '90',
          二级指标: '改建和技术投资增长率',
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
          牵头单位: '工商局',
          date: '2016-10-03'
        },
        {
          一级指标: '生态文明',
          得分: '110',
          二级指标: '生态环境保护目标任务完成率',
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
          牵头单位: '工商局',
          date: '2016-10-03'
        },
        {
          一级指标: '生态文明',
          得分: '110',
          二级指标: '落实河长制成效',
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
          牵头单位: '工商局',
          date: '2016-10-03'
        },
        {
          一级指标: '民生保障',
          得分: '110',
          二级指标: '工业企业产品质量抽查合格率（不含食品）',
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
          牵头单位: '工商局',
          date: '2016-10-03'
        },
        {
          一级指标: '民生保障',
          得分: '110',
          二级指标: '食品安全满意率',
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
          牵头单位: '工商局',
          date: '2016-10-03'
        },
        {
          一级指标: '政务服务',
          得分: '110',
          二级指标: '依法行政',
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
          牵头单位: '工商局',
          date: '2016-10-03'
        },
        {
          一级指标: '政务服务',
          得分: '110',
          二级指标: '行政服务质量',
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
          牵头单位: '工商局',
          date: '2016-10-03'
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
    // 上传EXEL
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
