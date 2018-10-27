<template>
  <div>
    <Row>
      <Card>
        <div style="margin-top: 6px">
              <Form ref="searchData" :model="searchData" :rules="searchReg" :label-width="80">
                <Row>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="指标等级" prop="level">
                        <Select v-model="searchData.level" placeholder="请选择指标等级" style="width:185px">
                            <Option value="一级指标">一级指标</Option>
                            <Option value="二级指标">二级指标</Option>
                            <Option value="三级指标">三级指标</Option>
                        </Select>
                    </FormItem>
                  </i-col>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="责任单位">
                        <Input search placeholder="请输入搜索内容" v-model="searchData.ducyUnit" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                </Row>
                <Row>
                  <i-col :xs="12" :md="12" :lg="6" >
                    <FormItem label="牵头单位">
                        <Input search placeholder="请输入牵头单位" v-model="searchData.leadUnit" style="width: auto">
                            <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </FormItem>
                  </i-col>
                  <i-col :xs="12" :md="12" :lg="6" >
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
            <Table :loading="lealOneLoading" border :columns="colIndexOne" :data="indexOne" v-if="isIndexOne"></Table>
            <Table :loading="lealTwoLoading" border :columns="colIndexTwo" :data="indexTwo" v-if="searchData.level==='二级指标'" ></Table>
            <Table :loading="lealThreeLoading" border :columns="columns7" :data="data6" v-if="searchData.level==='三级指标'"></Table>
          </div>
          <div style="width:100%">
            <Page style="margin-top:10px;" :total="100" show-elevator />
          </div>
        </Card>
    </Row>

    <!-- 模态框  增加指标-->
    <Modal
        v-model="addIndex"
        :title="targetName"
        :loading="loading"
        width='700px'
        @on-ok="asyncOK">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称指标" prop="indexName">
              <Input v-model="formValidate.indexName" placeholder="请输入指标名称" style="width:500px"></Input>
          </FormItem>
          <FormItem label="指标等级" prop="Level">
              <Select v-model="formValidate.Level" placeholder="请选择指标等级" style="width:500px">
                  <Option value="一级指标">一级指标</Option>
                  <Option value="二级指标">二级指标</Option>
                  <Option value="三级指标">三级指标</Option>
              </Select>
          </FormItem>
          <FormItem label="上级指标" prop="superior" v-if="isFormFlase">
              <Select v-model="formValidate.superior" placeholder="请选择上级指标" style="width:500px">
                  <Option value="经济发展">经济发展</Option>
                  <Option value="有效投资">有效投资</Option>
                  <Option value="机制创新">机制创新</Option>
                  <Option value="创新驱动">创新驱动</Option>
                  <Option value="生态文明">生态文明</Option>
                  <Option value="民生保障">民生保障</Option>
              </Select>
          </FormItem>
          <FormItem label="牵头单位" prop="leadUnit" v-if="isFormFlase">
              <Input v-model="formValidate.leadUnit" placeholder="请输入牵头单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="责任单位" prop="dutyUint" v-if="isFormFlase">
              <Input v-model="formValidate.dutyUint" placeholder="请输入责任单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="分值" prop="score" v-if="isFormTrue">
              <Input v-model="formValidate.score" placeholder="请输入责任单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="权数" prop="weight" v-if="isFormFlase">
              <Input v-model="formValidate.weight" placeholder="请输入权数值" style="width:500px"></Input>
          </FormItem>
          <FormItem label="乡镇权数" style="width:100%" v-if="isFormFlase">
          <div class="villages-towns">
            <ul>
              <li class="item">
                <div class="item-title" >塘前</div>
                <Input style="width:71px" v-model="formValidate.tangQ"></Input>
              </li>
              <li class="item">
                <div class="item-title">葛岭</div>
                <Input style="width:71px" v-model="formValidate.geL"></Input>
              </li>
              <li class="item">
                <div class="item-title">樟城</div>
                <Input style="width:71px" v-model="formValidate.zhangC"></Input>
              </li>
              <li class="item">
                <div class="item-title" >城锋</div>
                <Input style="width:71px" v-model="formValidate.chengF"></Input>
              </li>
              <li class="item">
                <div class="item-title">清凉</div>
                <Input style="width:71px" v-model="formValidate.qingL"></Input>
              </li>
              <li class="item">
                <div class="item-title">福泉</div>
                <Input style="width:71px" v-model="formValidate.fuQ"></Input>
              </li>
                            <li class="item">
                <div class="item-title" >岭路</div>
                <Input style="width:71px" v-model="formValidate.lingL"></Input>
              </li>
            </ul>
            <ul>
              <li class="item">
                <div class="item-title" >盖洋</div>
                <Input style="width:71px" v-model="formValidate.gaiY"></Input>
              </li>
              <li class="item">
                <div class="item-title">长庆</div>
                <Input style="width:71px" v-model="formValidate.changQ"></Input>
              </li>
              <li class="item">
                <div class="item-title">东洋</div>
                <Input style="width:71px" v-model="formValidate.dongY"></Input>
              </li>
              <li class="item">
                <div class="item-title" >霞拔</div>
                <Input style="width:71px" v-model="formValidate.xiaB"></Input>
              </li>
              <li class="item">
                <div class="item-title">同安</div>
                <Input style="width:71px" v-model="formValidate.tongA"></Input>
              </li>
              <li class="item">
                <div class="item-title">大洋</div>
                <Input style="width:71px" v-model="formValidate.daY"></Input>
              </li>
              <li class="item">
                <div class="item-title" >盘谷</div>
                <Input style="width:71px" v-model="formValidate.panG"></Input>
              </li>
            </ul>
            <ul>
              <li class="item">
                <div class="item-title" >伏口</div>
                <Input style="width:71px" v-model="formValidate.fuK"></Input>
              </li>
              <li class="item">
                <div class="item-title">红星</div>
                <Input style="width:71px" v-model="formValidate.hongX"></Input>
              </li>
              <li class="item">
                <div class="item-title">白云</div>
                <Input style="width:71px" v-model="formValidate.baiY"></Input>
              </li>
              <li class="item">
                <div class="item-title" >丹云</div>
                <Input style="width:71px" v-model="formValidate.danY"></Input>
              </li>
              <li class="item">
                <div class="item-title">赤锡</div>
                <Input style="width:71px" v-model="formValidate.chiX"></Input>
              </li>
              <li class="item">
                <div class="item-title">梧桐</div>
                <Input style="width:71px" v-model="formValidate.wuT"></Input>
              </li>
              <li class="item">
                <div class="item-title" >嵩口</div>
                <Input style="width:71px" v-model="formValidate.songK"></Input>
              </li>
            </ul>
          </div>
          </FormItem>
        </Form>
    </Modal>

  </div>
</template>
<script>
export default {
  data () {
    return {
      addIndex: false, // 显示增加模态框
      TableOne: false,
      isIndexOne: true, // 显示指标等级一
      loading: true, // 增加模态框确定loading
      TableOneLoading: true,
      lealOneLoading: false, // 表格Loading
      lealTwoLoading: false,
      lealThreeLoading: false,
      isFormFlase: false,
      isFormTrue: true,
      isFormWeight: false,
      targetName: '',
      searchData: {
        level: '',
        ducyUnit: '',
        lead: '',
        indexName: ''
      },
      colIndexOne: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '指标等级',
          key: 'target',
          width: 300
        },
        {
          title: '指标名称',
          key: 'indexName'
        },
        {
          title: '分值',
          key: 'score'
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
                      this.formValidate.indexName = params.row.indexName;
                      this.formValidate.Level = params.row.target;
                      this.formValidate.score = params.row.score;
                      this.isFormFlase = false;
                      this.isFormTrue = true;
                      this.targetName = '编辑一级指标';
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
                      this.remove(params.index);
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
          key: 'indexVal',
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
          key: 'superior',
          width: 150
        },
        {
          title: '权数',
          key: 'weight',
          width: 70
        },
        {
          title: '塘前',
          key: '塘前',
          width: 70
        },
        {
          title: '葛岭',
          key: '葛岭',
          width: 70
        },
        {
          title: '樟城',
          key: '葛岭',
          width: 70
        },
        {
          title: '城锋',
          key: '城锋',
          width: 70
        },
        {
          title: '清凉',
          key: '清凉',
          width: 70
        },
        {
          title: '福泉',
          key: '福泉',
          width: 70
        },
        {
          title: '岭路',
          key: '岭路',
          width: 70
        },
        {
          title: '赤锡',
          key: '赤锡',
          width: 70
        },
        {
          title: '梧桐',
          key: '梧桐',
          width: 70
        },
        {
          title: '嵩口',
          key: '嵩口',
          width: 70
        },
        {
          title: '伏口',
          key: '伏口',
          width: 70
        },
        {
          title: '盖洋',
          key: '盖洋',
          width: 70
        },
        {
          title: '梧桐',
          key: '梧桐',
          width: 70
        },
        {
          title: '长庆',
          key: '长庆',
          width: 70
        },
        {
          title: '东洋',
          key: '东洋',
          width: 70
        },
        {
          title: '霞拔',
          key: '霞拔',
          width: 70
        },
        {
          title: '同安',
          key: '同安',
          width: 70
        },
        {
          title: '大洋',
          key: '大洋',
          width: 70
        },
        {
          title: '盘谷',
          key: '盘谷',
          width: 70
        },
        {
          title: '红星',
          key: '红星',
          width: 70
        },
        {
          title: '白云',
          key: '白云',
          width: 70
        },
        {
          title: '丹云',
          key: '丹云',
          width: 70
        },
        {
          title: '牵头单位',
          key: 'leadUnit',
          width: 150
        },
        {
          title: '责任单位',
          key: 'dutyName',
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
                      this.formValidate = {
                        indexName: params.row.indexName,
                        Level: params.row.indexVal,
                        superior: params.row.superior,
                        leadUnit: params.row.leadUnit,
                        dutyUint: params.row.dutyName,
                        score: '',
                        weight: params.row.weight
                      };
                      console.log(this.formValidate);
                      this.isFormFlase = true;
                      this.isFormTrue = false;
                      this.targetName = '编辑二级指标';
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
                      this.remove(params.index);
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ],
      indexOne: [
        {
          target: '一级指标',
          indexName: '经济发展',
          score: 235
        },
        {
          target: '一级指标',
          indexName: '有效投资',
          score: 170
        },
        {
          target: '一级指标',
          indexName: '机制创新',
          score: 55
        },
        {
          target: '一级指标',
          indexName: '创新驱动',
          score: 90
        },
        {
          target: '一级指标',
          indexName: '生态文明',
          score: 110
        },
        {
          target: '一级指标',
          indexName: '民生保障',
          score: 169
        },
        {
          target: '一级指标',
          indexName: '政务服务',
          score: 171
        }
      ],
      indexTwo: [
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        },
        {
          indexVal: '二级指标',
          leadUnit: '科技文体局',
          indexName: '地方财政收入增长率',
          dutyName: '科技文体局',
          superior: '经济发展',
          standard: '前三年加权平均值',
          direction: '+',
          weight: 30
        }
      ],
      ruleValidate: {
        indexName: [
          {
            required: true,
            message: '请输入指标名称',
            trigger: 'blur'
          }
        ],
        Level: [
          {
            required: true,
            message: '请选择指标等级',
            trigger: 'change'
          }
        ]
      },
      searchReg: {
        level: [
          {
            required: true,
            message: '请选择指标等级',
            trigger: 'change'
          }
        ]
      },
      formValidate: {
        indexName: '',
        Level: '',
        superior: '',
        leadUnit: '',
        dutyUint: '',
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
      }
    };
  },
  methods: {
    asyncOK () {
      console.log(this.formValidate);
      setTimeout(() => {
        this.addIndex = false;
      }, 2000);
    },
    show (index) {
      console.log(index);
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove (index) {
      this.data6.splice(index, 1);
    },
    addTarget (e) {
      this.targetName = e.target.innerText + '增加';
      this.addIndex = true;
      this.$refs['formValidate'].resetFields();
    },
    handleSubmit (e) {
      console.log(e);
    },
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
    seachReset (name) {
      this.$refs[name].resetFields();
    },
    TableOneOk () {
      setTimeout(() => {
        this.modal6 = false;
      }, 2000);
    }
  },
  watch: {
    formValidate: {
      handler (newVal) {
        console.log(newVal);
        if (newVal.Level === '一级指标') {
          this.isFormFlase = false;
          this.isFormTrue = true;
        } else if (newVal.Level === '二级指标') {
          this.isFormFlase = true;
          this.isFormTrue = false;
        }
      },
      deep: true
    },
    searchData: {
      handler (newVal) {
        if (newVal.level === '一级指标') {
          this.isIndexOne = true;
        } else if (newVal.level === '二级指标') {
          this.isIndexOne = false;
        } else {
          this.isIndexOne = false;
        }
      },
      deep: true
    }
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
