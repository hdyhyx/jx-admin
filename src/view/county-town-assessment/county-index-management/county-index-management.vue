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
                    <FormItem label="责任单位">
                        <Input search placeholder="请输入搜索内容" v-model="searchData.responsibilityUnit" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                  <i-col :xs="24" :md="12" :lg="6"  v-show="searchData.indexType==='二级指标'" >
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
        </div>
        <div style="margin-top: 10px">
            <span>增加指标：</span>
            <Button   @click="addTarget($event)" >乡镇指标</Button>
        </div>
      </Card>
    </Row>
    <!-- 指标内容 -->
    <Row style="margin-top:20px">
        <Card>
          <div>
            <Table :loading="TableOneLoading" border :columns="colIndexOne" :data="indexOne" v-if="isIndexOne"></Table>
            <Table :loading="TableTwoLoading" border :columns="colIndexTwo" :data="indexTwo" v-if="isIndexTwo"></Table>
            <!-- <Table :loading="lealThreeLoading" border :columns="columns7" :data="data6"></Table> -->
          </div>
          <div style="width:100%">
             <Page @on-change="pageNumberChange" :page-size="pageSize"  :total="pageTotal" @on-page-size-change="pageSizeChange" show-elevator show-sizer />
          </div>
        </Card>
    </Row>
  <!-- Excel导入 -->
    <div>
      <Card title="导入EXCEL">
        <Row>
           <i-col :xs="24" :md="12" :lg="6">
            <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
              <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
            </Upload>
           </i-col>
          <!-- <i-col :xs="24" :md="12" :lg="6">
            <Button type="primary" :loading="UploadLoadingBtn" @click="updateExcel">
                <span v-if="!UploadLoadingBtn">确认添加</span>
                <span v-else>Loading...</span>
            </Button>
           </i-col> -->
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
    <!-- 模态框  增加指标-->
    <Modal
        v-model="addIndex"
        :title="targetName"
        width='700px'
         @on-cancel="closeAddIndex"
       >
        <Form ref="formCountyList" :model="formCountyList" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称指标" prop="indexName">
              <Input v-model="formCountyList.indexName" placeholder="请输入指标名称" style="width:500px"></Input>
          </FormItem>
          <FormItem label="指标等级" prop="indexType">
              <Select v-model="formCountyList.indexType" placeholder="请选择指标等级" style="width:500px">
                  <Option value="一级指标">一级指标</Option>
                  <Option value="二级指标">二级指标</Option>
                  <Option value="三级指标">三级指标</Option>
              </Select>
          </FormItem>
          <FormItem label="上级指标" prop="superior" v-if="isFormFlase">
              <Select v-model="formCountyList.superiorIndexId" placeholder="请选择上级指标" style="width:500px">
                  <Option value="经济发展">经济发展</Option>
                  <Option value="有效投资">有效投资</Option>
                  <Option value="机制创新">机制创新</Option>
                  <Option value="创新驱动">创新驱动</Option>
                  <Option value="生态文明">生态文明</Option>
                  <Option value="民生保障">民生保障</Option>
              </Select>
          </FormItem>
          <FormItem label="牵头单位" prop="leadUnit" v-if="isFormFlase">
              <Input v-model="formCountyList.leadUnit" placeholder="请输入牵头单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="责任单位" prop="responsibilityUnit" v-if="isFormFlase">
              <Input v-model="formCountyList.responsibilityUnit" placeholder="请输入责任单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="权数值" prop="weight">
              <Input v-model="formCountyList.weight" placeholder="请输入权数值" style="width:500px"></Input>
          </FormItem>
          <FormItem label="乡镇权数" style="width:100%" v-if="isFormFlase">
          <div class="villages-towns">
            <ul>
              <li class="item">
                <div class="item-title" >塘前</div>
                <InputNumber style="width:71px" v-model="formCountyList.tangQ"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title">葛岭</div>
                <InputNumber style="width:71px" v-model="formCountyList.geL"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title">樟城</div>
                <InputNumber style="width:71px" v-model="formCountyList.zhangC"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title" >城锋</div>
                <InputNumber style="width:71px" v-model="formCountyList.chengF"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title">清凉</div>
                <InputNumber style="width:71px" v-model="formCountyList.qingL"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title">福泉</div>
                <InputNumber style="width:71px" v-model="formCountyList.fuQ"></InputNumber>
              </li>
                            <li class="item">
                <div class="item-title" >岭路</div>
                <InputNumber style="width:71px" v-model="formCountyList.lingL"></InputNumber>
              </li>
            </ul>
            <ul>
              <li class="item">
                <div class="item-title" >盖洋</div>
                <InputNumber style="width:71px" v-model="formCountyList.gaiY"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title">长庆</div>
                <InputNumber style="width:71px" v-model="formCountyList.changQ"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title">东洋</div>
                <InputNumber style="width:71px" v-model="formCountyList.dongY"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title" >霞拔</div>
                <InputNumber style="width:71px" v-model="formCountyList.xiaB"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title">同安</div>
                <InputNumber style="width:71px" v-model="formCountyList.tongA"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title">大洋</div>
                <InputNumber style="width:71px" v-model="formCountyList.daY"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title" >盘谷</div>
                <InputNumber style="width:71px" v-model="formCountyList.panG"></InputNumber>
              </li>
            </ul>
            <ul>
              <li class="item">
                <div class="item-title" >伏口</div>
                <InputNumber style="width:71px" v-model="formCountyList.fuK"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title">红星</div>
                <InputNumber style="width:71px" v-model="formCountyList.hongX"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title">白云</div>
                <InputNumber style="width:71px" v-model="formCountyList.baiY"></InputNumber>
              </li>
              <li class="item">
                <div class="item-title" >丹云</div>
                <InputNumber  style="width:71px" v-model="formCountyList.danY"></InputNumber >
              </li>
              <li class="item">
                <div class="item-title">赤锡</div>
                <InputNumber  style="width:71px" v-model="formCountyList.chiX"></InputNumber >
              </li>
              <li class="item">
                <div class="item-title">梧桐</div>
                <InputNumber  style="width:71px" v-model="formCountyList.wuT"></InputNumber >
              </li>
              <li class="item">
                <div class="item-title" >嵩口</div>
                <InputNumber  :min="0"  style="width:71px" v-model="formCountyList.songK"></InputNumber >
              </li>
            </ul>
          </div>
          </FormItem>
        </Form>
        <div slot="footer">
            <Button type="success" :loading="submitloading" style="width:120px" @click="BtnSubmit('formCountyList')">
              <span v-if="!submitloading">提交</span>
              <span v-else>提交中...</span>
            </Button>
            <Button @click="closeAddIndex">取消</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import excel from '@/libs/excel';
import { getToken } from '@/libs/util';
import { getIndexList, AddIndex, updateIndex, removeIndex } from '@/api/city';
const token = getToken();
const inspectionType = 'county'; // 添加这个属性区分这个是县对乡镇的查询
export default {
  data () {
    return {
      addIndex: false, // 显示增加模态框
      isIndexOne: true, // 显示指标等级一
      isIndexTwo: false, // 显示指标等级二
      submitloading: false, // 增加模态框确定loading
      TableOneLoading: true, // 指标等级一Loading
      TableTwoLoading: true, // 指标等级二Loading
      isFormFlase: false, // 二级指标显示input
      isFormTrue: true, // 一级指标显示input
      targetName: '指标增加',
      pageTotal: 0,
      pageSize: 10,
      pageNumber: 1,
      searchData: {
        indexType: '一级指标',
        responsibilityUnit: '',
        leadUnit: '',
        indexName: ''
      },
      // 上传表格
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableData: [],
      tableTitle: [],
      tableLoading: false,
      UploadLoadingBtn: false,
      colIndexOne: [
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
          title: '分值',
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
                      this.addIndex = true;
                      this.isFormfalse = true;
                      this.isFormTrue = false;
                      this.targetName = '编辑指标';
                      let row = params.row;
                      if (params.row.id !== '') {
                        this.formCountyList = row;
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
      colIndexTwo: [
        {
          title: '指标等级',
          key: 'indexType',
          width: 100,
          fixed: 'left'
        },
        {
          title: '指标名称',
          key: 'indexName',
          width: 150
        },
        {
          title: '上级指标',
          key: 'superiorIndexId',
          width: 150
        },
        {
          title: '权数',
          key: 'weight',
          width: 70
        },
        {
          title: '塘前',
          key: '塘前乡',
          width: 70
        },
        {
          title: '葛岭',
          key: '葛岭镇',
          width: 70
        },
        {
          title: '樟城',
          key: '樟城镇',
          width: 70
        },
        {
          title: '城峰',
          key: '城峰镇',
          width: 70
        },
        {
          title: '清凉',
          key: '清凉镇',
          width: 70
        },
        {
          title: '福泉',
          key: '福泉镇',
          width: 70
        },
        {
          title: '岭路',
          key: '岭路乡',
          width: 70
        },
        {
          title: '赤锡',
          key: '赤锡乡',
          width: 70
        },
        {
          title: '梧桐',
          key: '梧桐镇',
          width: 70
        },
        {
          title: '嵩口',
          key: '嵩口镇',
          width: 70
        },
        {
          title: '洑口',
          key: '洑口乡',
          width: 70
        },
        {
          title: '盖洋',
          key: '盖洋乡',
          width: 70
        },
        {
          title: '长庆',
          key: '长庆镇',
          width: 70
        },
        {
          title: '东洋',
          key: '东洋乡',
          width: 70
        },
        {
          title: '霞拔',
          key: '霞拔乡',
          width: 70
        },
        {
          title: '同安',
          key: '同安镇',
          width: 70
        },
        {
          title: '大洋',
          key: '大洋乡',
          width: 70
        },
        {
          title: '盘谷',
          key: '盘谷乡',
          width: 70
        },
        {
          title: '红星',
          key: '红星镇',
          width: 70
        },
        {
          title: '白云',
          key: '白云乡',
          width: 70
        },
        {
          title: '丹云',
          key: '丹云乡',
          width: 70
        },
        {
          title: '牵头单位',
          key: 'leadUnit',
          width: 150
        },
        {
          title: '责任单位',
          key: 'responsibilityUnit',
          width: 150
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
                      this.addIndex = true;
                      this.formCountyList = params.row;
                      console.log(this.formCountyList);
                      this.isFormFlase = true;
                      this.isFormTrue = false;
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
      indexOne: [],
      indexTwo: [],
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
      searchReg: {
        indexType: [
          {
            required: true,
            message: '请选择指标等级',
            trigger: 'change'
          }
        ]
      },
      formCountyList: {
        indexName: '',
        indexType: '一级指标',
        responsibilityUnit: '',
        superiorIndexId: '',
        leadUnit: '',
        weight: '',
        score: '',
        tangQ: '', // 塘前
        geL: '', // 葛岭
        zhangC: '', // 樟城
        chengF: '', // 城峰
        qingL: '', // 清凉
        fuQ: '', // 福泉
        lingL: '', // 岭路
        chiX: '', // 赤锡
        wuT: '', // 梧桐
        songK: '', // 嵩口
        fuK: '', // 伏口
        gaiY: '', // 盖洋
        changQ: '', // 长庆
        dongY: '', // 东洋
        xiaB: '', // 霞拔
        tongA: '', // 同安
        daY: '', // 大洋
        panG: '', // 盘谷
        hongX: '', // 红星
        baiY: '', // 白云
        danY: '0' // 丹云
      }
    };
  },
  methods: {
    closeAddIndex () {
      this.addIndex = false;
    },
    // 指标提交
    BtnSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.submitloading = true;
          // 根据 targetName 判断是修改还是编辑
          if (this.targetName === '指标增加') {
            this._addIndexCounty(token, this.formCountyList)
              .then(res => {
                if (res.code === '200') {
                  this.$Message.success('成功');
                  this.submitloading = false;
                  // 按照填入的indexType刷新页面
                  if (this.formCountyList.indexType === '一级指标') {
                    let indexType = {
                      indexType: this.formCountyList.indexType,
                      inspectionType: 'county' // 添加这个属性区分这个是县对乡镇的查询
                    };
                    this._getCountyList(
                      token,
                      indexType,
                      this.pageSize,
                      this.pageNumber
                    ).then(res => {
                      this.indexOne = res.results.list;
                      this.addIndex = false;
                    });
                  } else if (this.formCountyList.indexType === '二级指标') {
                    let indexType = {
                      indexType: this.formCountyList.indexType,
                      inspectionType: 'county'
                    };
                    this._getCountyList(
                      token,
                      indexType,
                      this.pageSize,
                      this.pageNumber
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
            this._updateIndexCounty(token, this.formCountyList).then(res => {
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
    // 删除
    remove (params) {
      this.$Modal.confirm({
        title: '删除指标',
        content: '<p>删除后将无法恢复</p>',
        onOk: () => {
          this._removeIndexCounty(token, {
            id: params.row.id
          }).then(res => {
            if (res.code === '200') {
              // 删除成功 刷新页面
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
      this.targetName = '指标增加';
      this.addIndex = true;
      this.resetForm();
    },
    // 提交搜索
    seachSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.TableOneLoading = true;
          this.TableTwoLoading = true;
          // 清除formCityList表单
          this.resetForm();
          this.pageTotal = 0;
          this.pageSize = 10;
          this.pageNumber = 1;
          this._getCountyList(
            token,
            this.searchData,
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
    seachReset (name) {
      this.$refs[name].resetFields();
      this.searchData = {
        indexType: '一级指标',
        responsibilityUnit: '',
        leadUnit: '',
        indexName: ''
      };
    },
    resetForm () {
      this.$refs['formCountyList'].resetFields();
      this.formCountyList = {
        indexName: '',
        indexType: '',
        superiorIndexId: '',
        leadUnit: '',
        responsibilityUnit: '',
        weight: '',
        score: '',
        tangQ: '', // 塘前
        geL: '', // 葛岭
        zhangC: '', // 樟城
        chengF: '', // 城峰
        qingL: '', // 情侣
        fuQ: '', // 福泉
        lingL: '', // 岭路
        chiX: '', // 赤锡
        wuT: '', // 梧桐
        songK: '', // 嵩口
        fuK: '', // 伏口
        gaiY: '', // 盖洋
        changQ: '', // 长庆
        dongY: '', // 东洋
        xiaB: '', // 霞拔
        tongA: '', // 同安
        daY: '', // 大洋
        panG: '', // 盘谷
        hongX: '', // 红星
        baiY: '', // 白云
        danY: '' // 丹云
      };
    },
    // 页码
    pageNumberChange (number) {
      this.pageNumber = number;
      this._getCountyList(
        token,
        this.searchData,
        this.pageSize,
        this.pageNumber
      ).then(res => {
        if (res.code === '200') {
          // 按照IndexType类别 填入不同Tabel里
          if (
            this.formCountyList.indexType === '一级指标' ||
            this.searchData.indexType === '一级指标'
          ) {
            this.indexOne = res.results.list;
            console.log(this.indexOne);
            this.$Message.success('查询成功');
          } else if (
            this.formCountyList.indexType === '二级指标' ||
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
    // 一页的个数
    pageSizeChange (pageSize) {
      this.pageSize = pageSize;
      this._getCountyList(
        token,
        this.searchData,
        this.pageSize,
        this.pageNumber
      ).then(res => {
        if (res.code === '200') {
          // 按照IndexType类别 填入不同Tabel里
          if (
            this.formCountyList.indexType === '一级指标' ||
            this.searchData.indexType === '一级指标'
          ) {
            this.indexOne = res.results.list;
          } else if (
            this.formCountyList.indexType === '二级指标' ||
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
    // 查询数据
    _getCountyList (token, form, pageSize, pageNumber) {
      const url = '/api/townIndicators';
      console.log(form);
      let formData = Object.assign(form, {
        pageSize: pageSize,
        pageNumber: pageNumber
      });
      return new Promise((resolve, reject) => {
        getIndexList({ token, formData, url, inspectionType }).then(res => {
          if (res.data.code === '200') {
            resolve(res.data);
          } else {
            reject(err);
          }
        });
      });
    },
    // 添加数据
    _addIndexCounty (token, formData) {
      const url = '/api/townIndicators';
      return new Promise((resolve, reject) => {
        AddIndex({ token, formData, url, inspectionType }).then(res => {
          if (res.data.code === '200') {
            resolve(res.data);
          } else {
            reject(eer);
          }
        });
      });
    },
    // 更新修改
    _updateIndexCounty (token, formData) {
      const url = '/api/townIndicators';
      return new Promise((resolve, reject) => {
        updateIndex({ token, formData, url, inspectionType }).then(res => {
          if (res.data.code === '200') {
            resolve(res.data);
          } else {
            reject();
          }
        });
      });
    },
    // 删除
    _removeIndexCounty (token, formData) {
      const url = '/api/townIndicators';
      return new Promise((resolve, reject) => {
        removeIndex({ token, formData, url, inspectionType }).then(res => {
          if (res.data.code === '200') {
            resolve(res.data);
          } else {
            reject(eer);
          }
        });
      });
    },
    // Excel导入
    // 上传elcel
    initUpload () {
      this.file = null;
      this.showProgress = false;
      this.loadingProgress = 0;
      this.tableData = [];
      this.tableTitle = [];
    },
    // 点击上传触发函数
    handleUploadFile () {
      this.initUpload();
    },
    // 删除Excel
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
        var { header, results } = excel.read(data, 'array');
        header = header.slice(0, 26);
        var tableTitle = header.map((item, i) => {
          return { title: results[0][item], key: item };
        });
        // 验证表头
        const regExcel = err => {
          this.$Notice.error({
            title: 'Excel格式错误',
            desc: 'Excel："' + err + '"   格式错误,请核对Excel模块。'
          });
          results = ''; // 表内容
          tableTitle = ''; // 表头
          this.uploadLoading = false;
          this.tableLoading = false;
          this.showRemoveFile = true;
        };
        // 对Excel行进处理 提醒用户是不是导入Excel模板错误
        for (let i = 0; i < tableTitle.length; i++) {
          if (tableTitle[i].key === 'indexTypeOne') {
            if (tableTitle[i].title !== '一级指标') {
              regExcel('一级指标');
              return;
            }
          } else if (tableTitle[i].key === 'indexTypeTwo') {
            if (tableTitle[i].title !== '二级指标') {
              regExcel('二级指标');
              return;
            }
          } else if (tableTitle[i].key === 'weightOne') {
            if (tableTitle[i].title !== '一级权数') {
              regExcel('一级权数');
              return;
            }
          } else if (tableTitle[i].key === 'weightTwo') {
            if (tableTitle[i].title !== '二级权数') {
              regExcel('二级权数');
              return;
            }
          } else if (tableTitle[i].key === 'leadUnit') {
            if (tableTitle[i].title !== '牵头单位') {
              regExcel('牵头单位');
              return;
            }
          } else if (tableTitle[i].key === 'responsibilityUnit') {
            if (tableTitle[i].title !== '责任单位') {
              regExcel('责任单位');
              return;
            }
          }
        }
        this.tableData = results.slice(1);
        this.tableTitle = tableTitle;
        this.uploadLoading = false;
        this.tableLoading = false;
        this.showRemoveFile = true;
      };
    }
  },
  watch: {
    formCountyList: {
      handler (newVal) {
        if (newVal.indexType === '一级指标') {
          this.isFormFlase = false;
          this.isFormTrue = true;
        } else if (newVal.indexType === '二级指标') {
          this.isFormFlase = true;
          this.isFormTrue = false;
        }
      },
      deep: true
    }
  },
  created () {
    this._getCountyList(
      token,
      this.formCountyList,
      this.pageSize, // 页数
      this.pageNumber // 码数
    ).then(res => {
      var indexList = res.results.firstIndex;
      this.pageTotal = parseInt(res.results.pageTotal + 1) * 10;
      this.indexOne = res.results.list;
      this.TableOneLoading = false;
    });
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
