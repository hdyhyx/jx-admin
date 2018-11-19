<style lang="less">
@import "./../common.less";
</style>
<template>
  <div>
    <Row>
      <Card>
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
                      <!-- 根据后端要求 ''为全部 'null'未未填写 0为未审核 1为已审核 2为退回 -->
                        <Option value="">全部</Option>
                        <Option value="null">未填写</Option>
                        <Option value="0">未审核</Option>
                        <Option value="1">已审核</Option>
                        <Option value="2">退回</Option>
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
                <FormItem label="一级权数"   :label-width="80">
                    <Input v-model="formCityData.fristWeight" disabled  placeholder="一级权数"></Input>
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
                <FormItem label="权数" prop="weight"  :label-width="60">
                    <Input v-model="formCityData.weight" disabled  placeholder="权数" ></Input>
                </FormItem>
              </i-col>
          </Row>
          <Row>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="得分" prop="score"  :label-width="60">
                    <InputNumber :max="100" :min="0"  v-model="formCityData.score"></InputNumber>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12" >
                <FormItem label="排名" prop="score"  :label-width="60">
                    <InputNumber :max="100" :min="0" v-model="formCityData.rank"></InputNumber>
                </FormItem>
              </i-col>
          </Row>
        </Form>
        </div>
        <div slot="footer">
            <Button type="success" size="large" :loading="ModalLoading" @click="asyncOK">确认提交</Button>
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
        score: 0, // 得分
        rank: 0, // 排名
        superiorIndexId: '', // 一级指标
        leadUnit: '', // 牵头单位
        responsibilityUnit: '', // 责任单位
        direction: '', // 方向
        audit: '', // 审核状态
        fristWeight: '', // 一级指标权数
        actualWeight: '', // 实际权数
        weight: ''
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
          render: (h, params) => {
            const row = params.row;
            var color = '';
            var index = row.superiorIndexId.indexOf('(');
            var col = row.superiorIndexId.slice(0, index);
            var text = row.superiorIndexId;
            this.selectIndexType.forEach(item => {
              console.log(item);
            });
            switch (col) {
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
          key: 'indexName'
        },
        {
          title: '标准值',
          key: 'standardValue'
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
            var text = row.audit;
            switch (text) {
              case '已审核':
                color = 'success';
                break;
              case '未审核':
                color = 'primary';
                break;
              case '退回':
                color = 'error';
                break;
              default:
                color = 'warning'; // 未填写
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
            if (params.row.audit === '已审核') {
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
                      this.indexModal = true;
                      this.formCityData = params.row;
                    }
                  }
                },
                '填入分数'
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    handlerFormat (year) {
      this.searchData.year = year;
    },
    // 表格显示条数
    pageSizeChange (size) {
      this.pageSize = size;
    },
    // 页数改变
    pageNumberChange (number) {
      this.pageNumber = number;
      this.pageCurrent = number;
    },
    // 关闭模态框
    closeAudit () {
      this.indexModal = false;
    },
    // 确认提交分数
    asyncOK () {
      this.ModalLoading = true;
      setTimeout(() => {
        this.ModalLoading = false;
        this.indexModal = false;
      }, 2000);
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
    // 删除指标
    _removeCityIndex (token, form) {
      const url = '';
      return new Promise((resolve, reject) => {
        removeIndex(token, form, url)
          .then(result => {
            if (res.data.code === '200') {
              resolve(res.data);
            } else {
              reject();
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 更新指标
    _updateCityIndex () {
      return new Promise((resolve, reject) => {
        updateIndex()
          .then(result => {
            if (res.data.code === '200') {
              resolve(res.data);
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
