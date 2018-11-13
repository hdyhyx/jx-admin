<template>
  <div>
    <Row>
      <Card>
        <div style="margin-top: 6px">
              <Form ref="searchData" :model="searchData" :rules="searchReg" :label-width="80">
                <Row>
                  <i-col :xs="24" :md="12" :lg="6" >
                    <FormItem label="指标等级" prop="indexType">
                        <Select v-model="searchData.indexType" placeholder="请选择指标等级" style="width:185px">
                            <Option value="一级指标">一级指标</Option>
                            <Option value="二级指标">二级指标</Option>
                            <Option value="三级指标">三级指标</Option>
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
                  <i-col :xs="24" :md="12" :lg="6" v-show="searchData.indexType==='二级指标'">
                    <FormItem label="牵头单位">
                        <Input search placeholder="请输入牵头单位" v-model="searchData.leadUnit" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                  <i-col :xs="24" :md="12" :lg="6" v-show="searchData.indexType==='二级指标'">
                    <FormItem label="责任单位">
                        <Input search placeholder="请输入搜索内容" v-model="searchData.ducyUnit" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                </Row>
                <Row>
                </Row>
                    <FormItem>
                      <Button type="primary" @click="seachSubmit('searchData')">提交搜索</Button>
                      <Button @click="seachReset('searchData')" style="margin-left: 8px">重置</Button>
                  </FormItem>
              </Form>
        </div>
        <div style="margin-top: 10px;margin-left:10px">
            <span>增加指标：</span>
            <Button   @click="addTarget($event)" >永泰县指标</Button>
        </div>
      </Card>
    </Row>
    <!-- 指标内容 -->
    <Row style="margin-top:20px">
        <Card>
          <div>
            <Table :loading="TableOneLoading" border :columns="colIndexOne" :data="indexOne" v-if="isIndexOne"></Table>
            <Table :loading="TableTwoLoading" border :columns="colIndexTwo" :data="indexTwo" v-if="isIndexTwo" ></Table>
            <Table :loading="TableThreeLoading" border :columns="columns7" :data="data6" v-if="searchData.indexType==='三级指标'"></Table>
          </div>
          <div style="margin:20px 0;margin-left:35%;">
                <Page @on-change="pageNumberChange" :page-size="pageSize"  :total="pageTotal" @on-page-size-change="pageSizeChange" show-elevator show-sizer />
          </div>
        </Card>
    </Row>

    <!-- 模态框  增加指标-->
    <Modal
        v-model="addIndex"
        :title="targetName"
        @on-cancel="closeAddIndex"
        width='700px'>
        <Form ref="formCityList" :model="formCityList" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称指标" prop="indexName">
              <Input v-model="formCityList.indexName" placeholder="请输入指标名称" style="width:500px"></Input>
          </FormItem>
          <FormItem label="指标等级" prop="indexType">
              <Select v-model="formCityList.indexType" placeholder="请选择指标等级" style="width:500px">
                  <Option value="一级指标">一级指标</Option>
                  <Option value="二级指标">二级指标</Option>
                  <Option value="三级指标">三级指标</Option>
              </Select>
          </FormItem>
          <FormItem label="上级指标" prop="superiorIndexId" v-if="isFormFlase">
              <Select v-model="formCityList.superiorIndexId" placeholder="请选择上级指标" style="width:500px">
                  <Option value="经济发展">经济发展</Option>
                  <Option value="有效投资">有效投资</Option>
                  <Option value="机制创新">机制创新</Option>
                  <Option value="创新驱动">创新驱动</Option>
                  <Option value="生态文明">生态文明</Option>
                  <Option value="民生保障">民生保障</Option>
              </Select>
          </FormItem>
          <FormItem label="牵头单位" prop="leadUnit" v-if="isFormFlase">
              <Input v-model="formCityList.leadUnit" placeholder="请输入牵头单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="责任单位" prop="dutyUint" v-if="isFormFlase">
              <Input v-model="formCityList.responsibilityUnit" placeholder="请输入责任单位" style="width:500px"></Input>
          </FormItem>
          <!-- <FormItem label="分值" prop="score" v-if="isFormTrue">
              <Input v-model="formCityList.score" placeholder="请输入分值" style="width:500px"></Input>
          </FormItem> -->
          <FormItem label="标准值" prop="standard" v-if="isFormFlase">
              <Input v-model="formCityList.standardValue" placeholder="请输入标准值" style="width:500px"></Input>
          </FormItem>
          <FormItem label="方向" prop="direction" v-if="isFormFlase">
               <Select v-model="formCityList.direction" placeholder="请选择方向" style="width:500px">
                  <Option value="+">+</Option>
                  <Option value="-">-</Option>
               </Select>
          </FormItem>
          <FormItem label="权数" prop="weight">
              <Input v-model="formCityList.weight" placeholder="请输入权数值" style="width:500px"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
              <Button type="success" :loading="submitloading" style="width:120px" @click="BtnSubmit($event)">
                <span v-if="!submitloading">提交</span>
                <span v-else>提交中...</span>
              </Button>
              <Button @click="closeAddIndex">取消</Button>
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
      addIndex: false, // 显示增加模态框
      isIndexOne: true, // 是否指标等级一
      isIndexTwo: false, // 是否指标等级二
      submitloading: false, // 增加模态框loading
      TableOneLoading: true, // 表格loading 一级指标
      TableTwoLoading: true, // 表格loading 二级指标
      isFormFlase: false, // form表单显示
      isFormTrue: true, // 一级指标显示Input
      isFormWeight: false, // 二级指标显示Input
      targetName: '', // 增加或者编辑的Title
      pageTotal: 0, // 总页数
      pageSize: 10, // 条数
      pageNumber: 1, // 页码
      indexOne: [], // 一级指标数据
      indexTwo: [], // 二级指标数据
      searchData: {
        // 搜索数据
        indexType: '一级指标',
        ducyUnit: '',
        lead: '',
        indexName: ''
      },
      colIndexOne: [
        // 一级指标 表格表头
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '指标等级',
          key: 'indexType',
          width: 300
        },
        {
          title: '指标名称',
          key: 'indexName'
        },
        {
          title: '权数值',
          key: 'weight'
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
                      // 显示模态框
                      this.addIndex = true;
                      let row = params.row;
                      if (params.row.id !== '') {
                        this.formCityList = row;
                      } else {
                        this.$Message.error('刷新页面后尝试此操作');
                        return;
                      }
                      this.isFormFlase = false;
                      this.isFormTrue = true;
                      this.targetName = '编辑指标';
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
                      this.remove(params);
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
        // 二级指标 表格表头
        {
          title: '指标等级',
          key: 'indexType',
          width: 100
        },
        {
          title: '指标名称',
          key: 'indexName'
        },
        {
          title: '上级单位',
          key: 'superiorIndexId'
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
          title: '标准值',
          key: 'standardValue'
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
                      this.isFormfalse = true;
                      this.isFormTrue = false;
                      this.targetName = '编辑指标';
                      console.log(this.isFormTrue, this.isFormfalse);
                      let row = params.row;
                      if (params.row.id !== '') {
                        this.formCityList = row;
                      } else {
                        this.$Message.error('刷新页面后尝试此操作');
                      }
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
                      this.remove(params);
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ],
      // 验证添加或者编辑表单
      ruleValidate: {
        indexName: [
          {
            required: true,
            message: '请输入指标名称',
            trigger: 'blur'
          }
        ],
        indexType: [
          {
            required: true,
            message: '请选择指标等级',
            trigger: 'change'
          }
        ]
      },
      // 验证搜索
      searchReg: {
        indexType: [
          {
            required: true,
            message: '请选择指标等级',
            trigger: 'change'
          }
        ]
      },
      // 表单
      formCityList: {
        indexName: '', // 指标名称
        indexType: '一级指标', // 指标类型
        superiorIndexId: '', // 上级单位 一级指标没有上级单位
        leadUnit: '', // 牵头单位
        responsibilityUnit: '', // 责任单位
        score: '', // 分数
        standardValue: '', // 标准值
        direction: '', // 方向
        weight: '' // 权数
      }
    };
  },
  methods: {
    // 关闭模态框增加或者编辑
    closeAddIndex () {
      this.addIndex = false;
    },
    // 添加指标 编辑指标
    BtnSubmit (e) {
      this.$refs['formCityList'].validate(valid => {
        if (valid) {
          this.submitloading = true;
          if (this.targetName === '永泰县指标增加') {
            this._addIndexCity(token, this.formCityList)
              .then(res => {
                if (res.code === '200') {
                  this.$Message.success('成功');
                  this.submitloading = false;
                  // 按照填入的indexType刷新页面
                  if (this.formCityList.indexType === '一级指标') {
                    let indexType = {
                      indexType: this.formCityList.indexType,
                      pageSize: this.pageSize
                    };
                    this._getCityList(
                      token,
                      indexType,
                      this.pageSize,
                      this.page
                    ).then(res => {
                      this.indexOne = res.results.list;
                      this.addIndex = false;
                    });
                  } else if (this.formCityList.indexType === '二级指标') {
                    console.log(this.formCityList.indexType);
                    let indexType = {
                      indexType: this.formCityList.indexType
                    };
                    this._getCityList(
                      token,
                      indexType,
                      this.pageSize,
                      this.page
                    ).then(res => {
                      this.indexTwo = res.results.list;
                      this.addIndex = false;
                      this.isIndexOne = false;
                      this.isIndexTwo = true;
                      this.TableTwoLoading = false;
                    });
                  }
                  this.addIndex = false;
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else if (this.targetName === '编辑指标') {
            this._updateIndexCity(token, this.formCityList).then(res => {
              if (res.code === '200') {
                this.submitloading = false;
                this.addIndex = false;
                this.$Message.success('修改成功');
              }
            });
          }
        } else {
          this.$Message.error('带*为必填项');
        }
      });
    },
    // 删除指标
    remove (params) {
      this.$Modal.confirm({
        title: '删除指标',
        content: '<p>删除后将无法恢复</p>',
        onOk: () => {
          this._removeIndexCity(token, { id: params.row.id }).then(res => {
            if (res.code === '200') {
              // 删除成功重新调用 seachSubmit
              this.$Message.success('删除成功');
              this.seachSubmit('searchData');
            } else {
              this.$Message.error('操作失败');
            }
          });
        },
        onCancel: () => {
          this.$Message.info('已取消');
        }
      });
    },
    // 打开模态框
    addTarget (e) {
      this.targetName = '永泰县指标增加';
      // 清除INPUT框
      this.resetInput();
      this.isFormFlase = false;
      this.isFormTrue = true;
      this.addIndex = true;
    },
    // 搜索查询
    seachSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.TableOneLoading = true;
          this.TableTwoLoading = true;
          // 清除formCityList表单
          this.resetInput();
          this.pageTotal = 0;
          this.pageSize = 10;
          this.pageNumber = 1;
          const formData = Object.assign(this.formCityList, this.searchData);
          this._getCityList(
            token,
            formData,
            this.pageSize,
            this.pageNumber
          ).then(res => {
            if (res.code === '200') {
              // 按照IndexType类别 填入不同Tabel里
              if (this.searchData.indexType === '一级指标') {
                this.$Message.success('查询成功');
                this.indexOne = res.results.list;
                this.pageTotal = parseInt(res.results.pageTotal + 1) * 10;
                this.TableOneLoading = false;
                this.isIndexOne = true;
                this.isIndexTwo = false;
              } else if (this.searchData.indexType === '二级指标') {
                this.isIndexOne = false;
                this.TableTwoLoading = false;
                this.isIndexTwo = true;
                this.$Message.success('查询成功');
                this.indexTwo = res.results.list;
                this.pageTotal = parseInt(res.results.pageTotal + 1) * 10;
              }
            } else {
              this.$Message.error('查询失败');
            }
          });
        } else {
          this.$Message.error('带*不可为空');
        }
      });
    },
    // 重置搜索
    seachReset (name) {
      this.searchData = {
        indexType: '一级指标',
        ducyUnit: '',
        lead: '',
        indexName: ''
      };
    },
    // 重置表单
    resetInput () {
      if (this.formCityList.indexType !== '') {
        this.$refs['formCityList'].resetFields();
        this.formCityList = {
          indexName: '',
          indexType: '',
          superiorIndexId: '',
          leadUnit: '',
          responsibilityUnit: '',
          score: '',
          standardValue: '',
          direction: '',
          weight: ''
        };
      }
    },
    // 页码
    pageNumberChange (number) {
      this.pageNumber = number;
      this._getCityList(
        token,
        this.searchData,
        this.pageSize,
        this.pageNumber
      ).then(res => {
        if (res.code === '200') {
          // 按照IndexType类别 填入不同Tabel里
          if (
            this.formCityList.indexType === '一级指标' ||
            this.searchData.indexType === '一级指标'
          ) {
            this.indexOne = res.results.list;
            this.$Message.success('查询成功');
          } else if (
            this.formCityList.indexType === '二级指标' ||
            this.searchData.indexType === '二级指标'
          ) {
            this.indexTwo = res.results.list;
            this.$Message.success('查询成功');
          }
        } else {
          this.$Message.error('查询失败');
        }
      });
    },
    // 页数
    pageSizeChange (pageSize) {
      this.pageSize = pageSize;
      this._getCityList(
        token,
        this.searchData,
        this.pageSize,
        this.pageNumber
      ).then(res => {
        if (res.code === '200') {
          // 按照IndexType类别 填入不同Tabel里
          if (this.formCityList.indexType === '一级指标') {
            this.indexOne = res.results.list;
          } else if (this.formCityList.indexType === '二级指标') {
            this.indexTwo = res.results.list;
            this.$Message.success('查询成功');
          }
        } else {
          this.$Message.error('查询失败');
        }
      });
    },
    // 获取数据
    _getCityList (token, form, pageSize, pageNumber) {
      console.log(pageSize, pageNumber);
      const url = '/api/countryIndicators';
      let formData = Object.assign(form, {
        pageSize: pageSize,
        pageNumber: pageNumber
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
    // 添加指标
    _addIndexCity (token, formData) {
      const url = '/api/countryIndicators';
      return new Promise((resolve, reject) => {
        AddIndex({ token, formData, url }).then(res => {
          if (res.data.code === '200') {
            resolve(res.data);
          } else {
            reject();
          }
        });
      });
    },
    // 修改指标
    _updateIndexCity (token, formData) {
      const url = '/api/countryIndicators';
      return new Promise((resolve, reject) => {
        updateIndex({ token, formData, url }).then(res => {
          if (res.data.code === '200') {
            resolve(res.data);
          } else {
            reject();
          }
        });
      });
    },
    // 删除
    _removeIndexCity (token, formData) {
      const url = '/api/countryIndicators';
      return new Promise((resolve, reject) => {
        removeIndex({ token, formData, url }).then(res => {
          if (res.data.code === '200') {
            resolve(res.data);
          } else {
            reject();
          }
        });
      });
    }
  },
  watch: {
    formCityList: {
      handler (newVal) {
        if (newVal.indexType !== undefined) {
          if (newVal.indexType === '一级指标') {
            this.isFormFlase = false;
            this.isFormTrue = true;
          } else if (newVal.indexType === '二级指标') {
            this.isFormFlase = true;
            this.isFormTrue = false;
            this.formCityList.score = '';
          }
        }
      },
      deep: true
    }
  },
  created () {
    this._getCityList(
      token,
      this.formCityList,
      this.pageSize,
      this.pageNumber
    ).then(res => {
      var indexList = res.results.firstIndex;
      this.pageTotal = parseInt(res.results.pageTotal + 1) * 10;
      this.indexOne = res.results.list;
      this.TableOneLoading = false;
    });
  }
};
</script>
