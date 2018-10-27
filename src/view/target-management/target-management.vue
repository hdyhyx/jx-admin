<template>
  <div>
    <Row>
      <Card>
        <div style="margin-top: 6px">
            <span>指标管理：</span>
            <Input search placeholder="请输入搜索内容" style="width: auto">
                <Icon type="ios-search" slot="suffix" />
            </Input>
        </div>
        <div style="margin-top: 10px">
            <span>增加指标：</span>
            <Button   @click="addTarget($event)" >永泰县指标</Button>
            <Button  style="margin-left:10px"  @click="addTarget($event)" >各乡镇指标</Button>
        </div>
      </Card>
    </Row>
    <!-- 指标内容 -->
    <Row style="margin-top:20px">
        <Card>
          <div>
          </div>
          <div>
            <Table :loading="TableLoading" border :columns="columns7" :data="data6"></Table>
          </div>
          <div style="width:100%">
            <Page style="margin-top:10px;" :total="100" show-elevator />
          </div>
        </Card>

    </Row>

    <!-- 模态框 -->
    <Modal
        v-model="addIndex"
        :title="targetName"
        :loading="loading"
        width='700px'
        @on-ok="asyncOK">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="名称指标" prop="TatgetName">
              <Input v-model="formValidate.TatgetName" placeholder="请输入指标名称" style="width:500px"></Input>
          </FormItem>
          <FormItem label="指标等级" prop="Level">
              <Select v-model="formValidate.Level" placeholder="请选择指标等级" style="width:500px">
                  <Option value="Level_1">一级指标</Option>
                  <Option value="Level_2">二级指标</Option>
                  <Option value="Level_3">三级指标</Option>
              </Select>
          </FormItem>
          <FormItem label="上级指标" prop="superior">
              <Select v-model="formValidate.superior" placeholder="请选择上级指标" style="width:500px">
                  <Option value="economic">经济发展</Option>
                  <Option value="effective">有效投资</Option>
                  <Option value="mechanism">机制创新</Option>
                  <Option value="innovation">创新驱动</Option>
                  <Option value="ecological">生态文明</Option>
                  <Option value="people">民生保障</Option>
              </Select>
          </FormItem>
          <FormItem label="牵头单位" prop="unit">
              <Input v-model="formValidate.unit" placeholder="请输入牵头单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="责任单位" prop="duty">
              <Input v-model="formValidate.duty" placeholder="请输入责任单位" style="width:500px"></Input>
          </FormItem>
          <FormItem label="各乡镇权数" prop="duty" :label-width='90'>
          </FormItem>
          <div class="villages-towns">
            <ul>
              <li class="item">
                <div class="item-title" >塘前</div>
                <Input style="width:50px" v-model="formValidate.tangQ"></Input>
              </li>
              <li class="item">
                <div class="item-title">葛岭</div>
                <Input style="width:50px" v-model="formValidate.geL"></Input>
              </li>
              <li class="item">
                <div class="item-title">樟城</div>
                <Input style="width:50px" v-model="formValidate.zhangC"></Input>
              </li>
              <li class="item">
                <div class="item-title" >城锋</div>
                <Input style="width:50px" v-model="formValidate.chengF"></Input>
              </li>
              <li class="item">
                <div class="item-title">清凉</div>
                <Input style="width:50px" v-model="formValidate.qingL"></Input>
              </li>
              <li class="item">
                <div class="item-title">福泉</div>
                <Input style="width:50px" v-model="formValidate.fuQ"></Input>
              </li>
                            <li class="item">
                <div class="item-title" >岭路</div>
                <Input style="width:50px" v-model="formValidate.lingL"></Input>
              </li>
                            <li class="item">
                <div class="item-title">赤锡</div>
                <Input style="width:50px" v-model="formValidate.chiX"></Input>
              </li>
              <li class="item">
                <div class="item-title">梧桐</div>
                <Input style="width:50px" v-model="formValidate.wuT"></Input>
              </li>
                            <li class="item">
                <div class="item-title" >嵩口</div>
                <Input style="width:50px" v-model="formValidate.songK"></Input>
              </li>
              <li class="item">
                <div class="item-title" >伏口</div>
                <Input style="width:50px" v-model="formValidate.fuK"></Input>
              </li>
            </ul>
            <ul>
              <li class="item">
                <div class="item-title" >盖洋</div>
                <Input style="width:50px" v-model="formValidate.gaiY"></Input>
              </li>
              <li class="item">
                <div class="item-title">长庆</div>
                <Input style="width:50px" v-model="formValidate.changQ"></Input>
              </li>
              <li class="item">
                <div class="item-title">东洋</div>
                <Input style="width:50px" v-model="formValidate.dongY"></Input>
              </li>
              <li class="item">
                <div class="item-title" >霞拔</div>
                <Input style="width:50px" v-model="formValidate.xiaB"></Input>
              </li>
              <li class="item">
                <div class="item-title">同安</div>
                <Input style="width:50px" v-model="formValidate.tongA"></Input>
              </li>
              <li class="item">
                <div class="item-title">大洋</div>
                <Input style="width:50px" v-model="formValidate.daY"></Input>
              </li>
              <li class="item">
                <div class="item-title" >盘谷</div>
                <Input style="width:50px" v-model="formValidate.panG"></Input>
              </li>
              <li class="item">
                <div class="item-title">红星</div>
                <Input style="width:50px" v-model="formValidate.hongX"></Input>
              </li>
              <li class="item">
                <div class="item-title">白云</div>
                <Input style="width:50px" v-model="formValidate.baiY"></Input>
              </li>
              <li class="item">
                <div class="item-title" >丹云</div>
                <Input style="width:50px" v-model="formValidate.danY"></Input>
              </li>
              <!-- <li class="item">
                <div class="item-title" >白云乡</div>
                <Input style="width:50px"></Input>
              </li> -->
            </ul>
          </div>
        </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addIndex: false,
      loading: true,
      TableLoading: false,
      targetName: '',
      columns7: [
        {
          title: '指标等级',
          key: 'target',
          width: 100,
          filters: [
            {
              label: '一级指标',
              value: 1
            },
            {
              label: '二级指标',
              value: 2
            },
            {
              label: '三级指标',
              value: 3
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.target === '一级指标';
            } else if (value === 2) {
              return row.target === '二级指标';
            } else if (value === 3) {
              return row.target === '三级指标';
            }
          }
        },
        {
          title: '权数',
          key: 'weight',
          width: 70
        },
        {
          title: '牵头单位',
          key: 'unit'
        },
        {
          title: '指标名称',
          key: 'targetName'
        },
        {
          title: '责任单位',
          key: 'dutyName'
        },
        {
          title: 'Action',
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
                      this.show(params.index);
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
      data6: [
        {
          target: '一级指标',
          weight: 30,
          unit: '科技文体局',
          targetName: '创新驱动（90分）',
          dutyName: '科技文体局'
        },
        {
          target: '一级指标',
          weight: 30,
          unit: '科技文体局',
          targetName: '创新驱动（90分）',
          dutyName: '科技文体局'
        },
        {
          target: '一级指标',
          weight: 30,
          unit: '科技文体局',
          targetName: '创新驱动（90分）',
          dutyName: '科技文体局'
        },
        {
          target: '二级指标',
          weight: 26,
          unit: '水利局',
          targetName: '创新驱动（90分）',
          dutyName: '水利局'
        },
        {
          target: '二级指标',
          weight: 30,
          unit: '水利局',
          targetName: '创新驱动（90分）',
          dutyName: '水利局'
        },
        {
          target: '二级指标',
          weight: 26,
          unit: '水利局',
          targetName: '创新驱动（90分）',
          dutyName: '水利局'
        },
        {
          target: '二级指标',
          weight: 30,
          unit: '水利局',
          targetName: '创新驱动（90分）',
          dutyName: '水利局'
        },
        {
          target: '三级指标',
          weight: 26,
          unit: '水利局',
          targetName: '创新驱动（90分）',
          dutyName: '水利局'
        },
        {
          target: '三级指标',
          weight: 26,
          unit: '环保局',
          targetName: '创新驱动（90分）',
          dutyName: '水利局'
        },
        {
          target: '三级指标',
          weight: 26,
          unit: '环保局',
          targetName: '创新驱动（90分）',
          dutyName: '水利局'
        }
      ],
      ruleValidate: {
        TatgetName: [
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
        ],
        superior: [
          {
            required: true,
            message: '请选择指标等级',
            trigger: 'change'
          }
        ],
        unit: [
          {
            required: true,
            message: '请输入牵头单位',
            trigger: 'blur'
          }
        ],
        duty: [
          {
            required: true,
            message: '请输入责任单位',
            trigger: 'blur'
          }
        ]
      },
      formValidate: {
        TatgetName: '',
        Level: '',
        superior: '',
        unit: '',
        duty: '',
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
      console.log(e.target.innerText);
      this.targetName = e.target.innerText + '增加';
      this.addIndex = true;
    },
    handleSubmit (e) {
      console.log(e);
    }
  }
};
</script>
<style>
.villages-towns {
  margin: -20px 0 30px 50px;
}
.villages-towns ul {
  list-style-type: none;
}
.villages-towns .item {
  display: inline-block;
}
.villages-towns .item .item-title {
  width: 50px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: rgba(14, 238, 238, 0.5);
  border: 1px solid rgba(14, 238, 238, 1);
  color: #ffffff;
}
</style>
