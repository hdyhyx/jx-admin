<style lang="less">
@import "./../common.less";
</style>
<template>
  <div>
    <Row>
      <Card>
        <!-- 搜索 -->
          <Form ref="searchData" :model="searchData"  :label-width="100">
            <Row>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="指标搜索" prop="superiorIndexId">
                      <Cascader :data="selectIndexType" change-on-select @on-change="selectIndex"></Cascader>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="责任单位">
                    <Input search placeholder="请输入搜索内容" v-model="searchData.responsibilityUnit" style="width: auto">
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
                    <Select v-model="searchData.audit" placeholder="请选择审核状态" style="width: 150px">
                        <Option value="5">全部</Option>
                        <Option value="4">未填写</Option>
                        <Option value="0">未审核</Option>
                        <Option value="1">责任人已审核</Option>
                        <Option value="2">管理员已审核</Option>
                        <Option value="3">退回</Option>
                    </Select>
                </FormItem>
              </i-col>
            <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="选择年份">
                  <DatePicker type="year" format="yyyy" @on-change="handlerFormat" placeholder="请选择指标年份" style="width:185px"></DatePicker>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="方向">
                    <Select v-model="searchData.direction" placeholder="请选择方向" style="width: 150px">
                        <Option value="+">+</Option>
                        <Option value="-">-</Option>
                    </Select>
                </FormItem>
              </i-col>
            </Row>
                <FormItem>
                 <!-- 10是pageSize,1当前页 -->
                  <Button type="primary" @click="seachSubmit(10,1)">提交搜索</Button>
                  <Button @click="seachReset('searchData')" style="margin-left: 8px">重置</Button>
              </FormItem>
          </Form>
        </Card>
    </Row>
    <!-- 指标数据 -->
    <Row style="margin-top:20px">
      <Card>
        <Table stripe border :columns="columns1" :loading="tableLoading" :data="cityIndexList"></Table>
        <div style="margin-top:20px;margin-left:40%">
            <Page @on-change="pageNumberChange" :current="pageCurrent" :page-size="pageSize"  :total="pageTotal" @on-page-size-change="pageSizeChange" show-elevator show-sizer />
        </div>
      </Card>
    </Row>
    <!-- 模态框 -->
    <Modal
        v-model="indexModal"
        :title="'指标得分填写'"
        width='700px'
        >
        <div>
        <Form  ref="formCityData" :model="formCityData">
          <Row>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="一级指标"  :label-width="60">
                    <Input v-model="formCityData.superiorIndexId" disabled  placeholder="指标名称" ></Input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="权数" prop="weight"  :label-width="80">
                    <Input v-model="formCityData.weight" disabled  placeholder="权数" ></Input>
                </FormItem>
              </i-col>
          </Row>
          <Row>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="二级指标"  :label-width="60">
                    <Input v-model="formCityData.indexName" disabled  placeholder="二级指标" ></Input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="标准值"  :label-width="80">
                    <Input v-model="formCityData.standardValue" disabled  placeholder="标准值"></Input>
                </FormItem>
              </i-col>
          </Row>
          <Row>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="牵头单位" :label-width="60">
                    <Input v-model="formCityData.leadUnit" disabled  placeholder="牵头单位" ></Input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="责任单位" :label-width="80">
                    <Input v-model="formCityData.responsibilityUnit" disabled  placeholder="责任单位"></Input>
                </FormItem>
              </i-col>
          </Row>
          <Row>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="得分"  :label-width="60">
                    <Input  v-model="formCityData.score"></Input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="排名"  :label-width="80">
                   <Input   v-model="formCityData.alternateField1"></Input>
                </FormItem>
              </i-col>
          </Row>
          <Row>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="填入时间"  :label-width="60">
                  <DatePicker type="month" format="yyyy-MM" :value="selectTime" @on-change="selectMonth" placeholder="Select month" style="width: 200px"></DatePicker>
                </FormItem>
              </i-col>
          </Row>
        </Form>
        </div>
        <div slot="footer">
            <Button type="success" size="large" :loading="ModalLoading" @click="submitForm">确认提交</Button>
            <Button size="large" @click="closeAudit">取消</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import { getToken } from '@/libs/util';
import { getIndexList, AddIndex, updateIndex, removeIndex } from '@/api/city';
const token = getToken();
export default {
  data () {
    return {
      ModalLoading: false, // 模态框Loading
      indexModal: false, // 模态框显示
      tableLoading: true, // 表格loading
      pageTotal: 0, // 总页数
      pageSize: 10, // 页数
      pageNumber: 1, // 页码
      pageCurrent: 1, // 当前页
      selectTime: '', // form表单里月份选择器
      searchData: {
        superiorIndexId: '', // 一级指标
        leadUnit: '', // 牵头单位
        indexName: '', // 二级指标
        responsibilityUnit: '', // 责任单位
        audit: '', // 审核状态
        direction: '', // 方向
        year: '' // 年份
      },
      formCityData: {
        score: null, // 得分
        alternateField1: '', // 排名
        superiorIndexId: '', // 一级指标
        leadUnit: '', // 牵头单位
        responsibilityUnit: '', // 责任单位
        direction: '', // 方向
        audit: '', // 审核状态
        fristWeight: '', // 一级指标权数
        actualWeight: '', // 实际权数
        weight: '', // 权数
        monthTime: '', // 月份
        yearTime: '' // 年月
      },
      cityIndexList: [], // Tabel数据
      selectIndexType: [
        // 搜索指标里的关联指标
        {
          label: '全部',
          value: '全部'
        }
      ],
      columns1: [
        // 表头
        {
          title: '一级指标',
          key: 'superiorIndexId',
          minWidth: 70,
          ellipsis: true,
          tooltip: true
        },
        {
          title: '二级指标',
          key: 'indexName',
          minWidth: 70
        },
        {
          title: '标准值',
          key: 'standardValue',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '牵头单位',
          key: 'leadUnit'
        },
        {
          title: '责任单位',
          key: 'responsibilityUnit'
        },
        {
          title: '审核状态',
          maxWidth: 100,
          key: 'audit',
          render: (h, params) => {
            const row = params.row;
            var color = '';
            var text = '';
            switch (row.audit) {
              case '0':
                color = 'warning';
                text = '未审核';
                break;
              case '1':
                color = 'primary';
                text = '责任人审核';
                break;
              case '2':
                color = 'success';
                text = '管理员审核';
                break;
              case '3':
                color = 'error';
                text = '回退';
                break;
              default:
                color = '#9e9e9e'; // 未填写
                text = '未填写';
                break;
            }
            return h(
              'Tag',
              {
                props: {
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: '权数上限',
          maxWidth: 70,
          key: 'weight'
        },
        {
          title: '实际权数',
          maxWidth: 70,
          key: 'finalScore'
        },
        {
          title: '得分',
          maxWidth: 80,
          key: 'score'
        },
        {
          title: '排名',
          maxWidth: 60,
          key: 'alternateField1' // 排名
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
            var text = '';
            var color = '';
            if (params.row.audit === '0' || params.row.audit === null) {
              isDisabled = false;
              text = '填写分数';
            } else if (params.row.audit === '3') {
              text = '重新填写';
              color = 'error';
              isDisabled = false;
            } else if (params.row.audit === '1' || params.row.audit === '2') {
              isDisabled = true;
              color = 'primary';
              text = '不可填写';
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
                      this.indexModal = true;
                      console.log(params.row);
                      var date = [params.row.dateTime, params.row.monthTime];
                      this.selectTime = date.join('-');
                      console.log(this.selectTime);
                      this.formCityData = Object.assign(
                        this.formCityData,
                        params.row
                      );
                    }
                  }
                },
                text
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    selectMonth (date) {
      this.selectTime = date;
      var i = date.indexOf('-');
      this.formCityData.yearTime = date.substring(0, i);
      this.formCityData.monthTime = date.substring(i + 1);
      console.log(this.formCityData);
    },
    handlerFormat (year) {
      this.searchData.year = year;
    },
    // 表格显示条数
    pageSizeChange (size) {
      this.pageSize = size;
      this.tableLoading = true;
      this._getCityList(token, this.searchData, this.pageSize, this.pageNumber)
        .then(result => {
          this.pageTotal = parseInt(result.results.pageTotal) * 10;
          this.cityIndexList = result.results.list;
          this.tableLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 页数改变
    pageNumberChange (number) {
      this.pageNumber = number;
      this.pageCurrent = number;
      this.tableLoading = true;
      this._getCityList(token, this.searchData, this.pageSize, this.pageNumber)
        .then(result => {
          this.pageTotal = parseInt(result.results.pageTotal) * 10;
          this.cityIndexList = result.results.list;
          this.tableLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 关闭模态框
    closeAudit () {
      this.indexModal = false;
    },
    // 确认提交分数
    submitForm () {
      console.log(true || false);
      if (
        this.formCityData.yearTime === '' ||
        this.formCityData.score === null ||
        this.formCityData.alternateField1 === ''
      ) {
        this.$Message.error('请填写完整');
        return;
      }
      this.ModalLoading = true;
      this._addCityIndex(token, this.formCityData).then(result => {
        this.ModalLoading = false;
        this.indexModal = false;
      });
    },
    // 指标管理关联 on-change
    selectIndex (value) {
      if (value[1] !== undefined) {
        this.searchData.indexName = value[1];
        this.searchData.superiorIndexId = value[0] === '全部' ? '' : value[0]; // 选择为全部时 是一个空的字符串
      } else {
        this.searchData.superiorIndexId = value[0] === '全部' ? '' : value[0]; // 选择为全部时 是一个空的字符串
        this.searchData.indexName = '';
      }
    },
    // 提交搜索  pagesize显示条数  pageNumber页码
    seachSubmit (pageSize, pageNumber) {
      this.tableLoading = true;
      this._getCityList(token, this.searchData, pageSize, pageNumber)
        .then(result => {
          this.pageTotal = parseInt(result.results.pageTotal) * 10;
          this.cityIndexList = result.results.list;
          this.tableLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重置搜索
    seachReset (name) {
      this.$refs[name].resetFields();
      this.searchData = {
        superiorIndexId: '', // 一级指标
        leadUnit: '', // 牵头单位
        indexName: '', // 二级指标
        responsibilityUnit: '', // 责任单位
        audit: '', // 审核状态
        direction: ''
      };
    },
    // 获取city指标
    _getCityList (token, form, pageSize, pageNumber) {
      const url = '/api/countryIndicators/queryInspection';
      let formData = Object.assign(form, {
        pageSize,
        pageNumber
      });
      return new Promise((resolve, reject) => {
        getIndexList({ token, formData, url }).then(res => {
          if (res.data.code === '200') {
            resolve(res.data);
          } else {
            reject();
          }
        });
      });
    },
    // 添加分数、排名
    _addCityIndex (token, formData) {
      const url = '/api/countryIndicators/insertScore';
      return new Promise((resolve, reject) => {
        AddIndex({ token, formData, url })
          .then(result => {
            if (result.data.code === '200') {
              resolve(result.data);
            } else {
              reject();
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  created () {
    this._getCityList(token, this.searchData, this.pageSize, this.pageNumber)
      .then(result => {
        var indexList = result.results.indexMap;
        indexList.forEach(list => {
          let children = [];
          if (list.secondIndex !== undefined) {
            list.secondIndex.forEach(item => {
              let listChild = Object.assign(
                {},
                {
                  label: item.indexName,
                  value: item.indexName
                }
              );
              children.push(listChild);
            });
          }
          let data = Object.assign(
            {},
            {
              label: list.firstName.indexName,
              value: list.firstName.id,
              children
            }
          );
          this.selectIndexType.push(data);
        });
        this.pageTotal = parseInt(result.results.pageTotal) * 10;
        this.cityIndexList = result.results.list;
        this.tableLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    selectIndexType: {
      handler (newVal) {
        this.selectIndexType = newVal;
      },
      deep: true
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
