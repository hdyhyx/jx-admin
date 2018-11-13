<template>
  <div>
    <Row>
      <Card>
          <div style="margin-top: 6px">
              <span>查找事项：</span>
              <Input search placeholder="请输入搜索内容" style="width: auto">
                  <Icon type="ios-search" slot="suffix" />
              </Input>
              <Button  style="margin-left:20px" type="info" @click="isShowMatters()">增加事项</Button>
          </div>
          <!-- <div style="margin-top: 10px">
              <span>历史搜索：</span>
              <Button>永泰县指标</Button>
              <Button  style="margin-left:10px" type="info">各乡镇指标</Button>
          </div> -->
        </Card>
    </Row>
    <Row style="margin-top:10px">
      <Card>
         <Table border :columns="columns7"  :data="data6"></Table>
      <div style="margin-top:15px;margin-left:35%">
          <Page :total="100" show-elevator />
      </div>
      </Card>
    </Row>
    <Row :gutter="20" style="margin-top: 20px;" >
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow >
          <chart-pie style="height: 400px;" :value="pieData" text="加分类别占比"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow >
           <example style="height: 400px;" :title="exampleTitle"/>
        </Card>
      </i-col>
    </Row>
    <!-- 查看模态框 -->
    <Modal v-model="lookContent">
      <p slot="header" style="color:#2db7f5;text-align:center">
          <Icon type="ios-information-circle" size="20"></Icon>
          <span>查看事项</span>
      </p>
      <div style="font-size:15px">
        <div style="margin-bottom:5px">
          事项名称：<span style="color:#000">{{lookRowContent.name}}</span>
         </div>
        <div style="margin-bottom:5px">
         表彰机关：<span style="color:#000">{{lookRowContent.recognition}}</span>
       </div>
       <div style="margin-bottom:5px">
         被表彰机关：<span style="color:#000">{{lookRowContent.honored}}</span>
       </div>
       <div style="margin-bottom:5px">
        证明材料名称：<span style="color:#000">{{lookRowContent.material}}</span>
       </div>
       <div style="margin-bottom:5px">
        证明材料附件：
        <div style="text-align:center;border-bottom:1px solid #C0C0C0;padding-bottom:10px">
         <img :src="lookRowContent.imageUrl" width="350px" height="200px">
        </div>
        <div style="margin-bottom:5px;margin-top:10px">
        加分类别：<span style="color:#000;padding-left:60%">加分分值：<strong>0.3</strong></span>
        </div>
        <div>
          <Button  shape="circle" disabled>第 1 类</Button>
          <Button  shape="circle" style="margin-left:20px" disabled>第 2 类</Button>
          <Button  shape="circle" style="margin-left:20px" disabled>第 3 类</Button>
          <Button  shape="circle" style="margin-left:20px" disabled>第 4 类</Button>
          <Button type="info" shape="circle" style="margin-left:20px">第 5 类</Button>
        </div>
       </div>
       <div style="margin-top:10px">
          <Card dis-hover>
              <div  style="margin-bottom:5px">
                <span>第1类：</span><span style="color:#000">受到中共中央、国务院表彰、或中央机关、国家部委通报表扬，或以文件形式推广其经验做法的。</span>
              </div>
              <div  style="margin-bottom:5px">
                <span>第2类：</span><span style="color:#000">受到省委、省政府、省机关效能建设领导小组通报表扬的，或以文件形式推广其经验做法的。</span>
              </div>
              <div  style="margin-bottom:5px">
                <span>第3类：</span><span style="color:#000">受到党和国家领导人、中央机关、国家部委主要负责人批示肯定的。</span>
              </div>
              <div  style="margin-bottom:5px">
                <span>第4类：</span><span style="color:#000">综合或单项工作在全国排名1-5名或被评为优秀的。</span>
              </div>
              <div  style="margin-bottom:5px">
                <span>第5类：</span><span style="color:#000">在全国性会议上做先进发言的。</span>
              </div>
          </Card>
       </div>
      </div>
      <div slot="footer">
          <Button type="info" size="large" @click="confirmClose">确定</Button>
      </div>
    </Modal>
    <!-- 增加修改模态框 -->
    <Modal
        v-model="addMatters"
        :title="addMattersTitle"
        :loading="MattersLoading"
        @on-ok="asyncOK">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
          <FormItem label="事项名称" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入事项名称"></Input>
          </FormItem>
          <FormItem label="表彰机关" prop="recognition">
              <Input v-model="formValidate.recognition" placeholder="请输入表彰机关名称"></Input>
          </FormItem>
          <FormItem label="被表彰单位" prop="honored">
              <Input v-model="formValidate.honored" placeholder="请输入被表彰单位名称"></Input>
          </FormItem>
          <FormItem label="证明材料名称" prop="material">
              <Input v-model="formValidate.material" placeholder="请输入证明材料名称"></Input>
          </FormItem>
          <FormItem label="证明材料附件" prop="image" >
            <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
              <Modal title="View Image" v-model="visible">
                <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
            </Modal>
          </FormItem>
          <FormItem label="选择加分类别" prop="plusCategory">
              <Select v-model="formValidate.plusCategory" placeholder="请选择加分类别">
                  <Option value="plusCategory_1">第 1 类</Option>
                  <Option value="plusCategory_2">第 2 类</Option>
                  <Option value="plusCategory_3">第 3 类</Option>
                  <Option value="plusCategory_4">第 4 类</Option>
                  <Option value="plusCategory_6">第 5 类</Option>
              </Select>
          </FormItem>
          <FormItem label="加分分值" prop="materialVal">
              <Input v-model="formValidate.materialVal" placeholder="请填写加分分值"></Input>
          </FormItem>
          <div style="margin-top:10px">
              <Card dis-hover>
                  <div  style="margin-bottom:5px">
                    <span>第1类：</span><span style="color:#000">受到中共中央、国务院表彰、或中央机关、国家部委通报表扬，或以文件形式推广其经验做法的。</span>
                  </div>
                  <div  style="margin-bottom:5px">
                    <span>第2类：</span><span style="color:#000">受到省委、省政府、省机关效能建设领导小组通报表扬的，或以文件形式推广其经验做法的。</span>
                  </div>
                  <div  style="margin-bottom:5px">
                    <span>第3类：</span><span style="color:#000">受到党和国家领导人、中央机关、国家部委主要负责人批示肯定的。</span>
                  </div>
                  <div  style="margin-bottom:5px">
                    <span>第4类：</span><span style="color:#000">综合或单项工作在全国排名1-5名或被评为优秀的。</span>
                  </div>
                  <div  style="margin-bottom:5px">
                    <span>第5类：</span><span style="color:#000">在全国性会议上做先进发言的。</span>
                  </div>
              </Card>
          </div>
        </Form>
    </Modal>
  </div>
</template>
<script>
import { ChartPie, ChartBar } from '_c/charts';
import example from '@/view/single-page/home/example.vue';
export default {
  data () {
    return {
      exampleTitle: '各月获得表彰项目数量',
      lookContent: false, // 查看模态框
      addMatters: false, // 增加修改模态框
      addMattersTitle: '',
      MattersLoading: true,
      lookRowContent: {},
      // upload
      defaultList: [
        {
          name: 'a42bdcc1178e62b4694c830f028db5c0',
          url:
            'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          name: 'bc7521e033abdd1e92222d733590f104',
          url:
            'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      imgName: '',
      visible: false,
      uploadList: [],
      // 表单
      formValidate: {
        name: '',
        recognition: '',
        honored: '',
        material: '',
        plusCategory: '',
        materialVal: ''
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: '请输入事项名称',
            trigger: 'blur'
          }
        ],
        recognition: [
          {
            required: true,
            message: '请输入表彰机关名称',
            trigger: 'blur'
          }
        ],
        honored: [
          {
            required: true,
            message: '请输入被表彰单位名称',
            trigger: 'blur'
          }
        ],
        material: [
          { required: true, message: '请输入证明材料名称', trigger: 'blur' }
        ],
        plusCategory: [
          {
            required: true,
            message: '请选择加分类别',
            trigger: 'change'
          }
        ],
        image: [
          {
            required: true
          }
        ],
        materialVal: [
          {
            required: true,
            message: '请填写加分分值',
            trigger: 'blur'
          }
        ]
      },
      pieData: [
        { value: 335, name: '1类' },
        { value: 310, name: '2类' },
        { value: 234, name: '3类' },
        { value: 135, name: '4类' },
        { value: 1548, name: '5类' }
      ],
      columns7: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '事项名称',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ]);
          }
        },
        {
          title: '表彰机关',
          key: 'recognition',
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%'
                }
              },
              params.row.recognition
            );
          }
        },
        {
          title: '被表彰单位',
          key: 'honored'
        },
        {
          title: '加分类别',
          key: 'plusCategory',
          width: 90
        },
        {
          title: '正名材料',
          key: 'material',
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%'
                }
              },
              params.row.material
            );
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              // <Icon type="md-trash" /><Icon type="md-eye" />
              h('Icon', {
                props: {
                  type: 'md-eye',
                  size: '24'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.lookRow(params.row);
                  }
                }
              }),
              h(
                'Icon',
                {
                  props: {
                    type: 'md-create',
                    size: '24'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.isShowMatters(params.row);
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Icon',
                {
                  props: {
                    type: 'md-trash',
                    size: 24
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
          name: '生态文明',
          recognition: '福州人民政府福',
          honored: '永泰县',
          plusCategory: '3',
          material: '牌匾、环保部2017年48号公告',
          imageUrl:
            'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        },
        {
          name: '生态文明',
          recognition: '福州人民政府',
          honored: '永泰县',
          plusCategory: '3',
          material: '牌匾、环保部2017年48号公告',
          imageUrl: 'https://....'
        }
      ]
    };
  },
  components: {
    ChartPie,
    ChartBar,
    example
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove (index) {
      var isLoading = true;
      this.$Modal.confirm({
        title: '删除后将无法恢复！',
        onOk: () => {
          this.data6.splice(index, 1);
        }
      });
    },
    lookRow (e) {
      console.log(e);
      this.lookRowContent = e;
      this.lookContent = true;
    },
    confirmClose () {
      this.lookContent = false;
      this.lookRowContent = {};
    },
    asyncOK () {
      setTimeout(() => {
        this.addMatters = false;
      }, 2000);
    },
    isShowMatters (e) {
      // 显示form表单清空
      this.formValidate = {
        name: '',
        recognition: '',
        honored: '',
        material: '',
        plusCategory: '',
        materialVal: ''
      };
      if (e !== undefined) {
        this.addMattersTitle = '编辑事项';
        this.formValidate.name = e.name;
        this.formValidate.recognition = e.recognition;
        this.formValidate.honored = e.honored;
        this.formValidate.material = e.material;
        switch (e.plusCategory) {
          case '1':
            this.formValidate.plusCategory = 'plusCategory_1';
            break;
          case '2':
            this.formValidate.plusCategory = 'plusCategory_2';
            break;
          case '3':
            this.formValidate.plusCategory = 'plusCategory_3';
            break;
          case '4':
            this.formValidate.plusCategory = 'plusCategory_4';
            break;
          default:
            this.formValidate.plusCategory = 'plusCategory_5';
            break;
        }
        this.formValidate.materialVal = e.materialVal;
        this.addMatters = true;
      } else {
        this.addMattersTitle = '修改事项';
        this.addMatters = true;
      }
    },
    handleView (name) {
      console.log(name);
      this.imgName = name;
      this.visible = true;
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
      file.url =
        'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc:
          'File format of ' +
          file.name +
          ' is incorrect, please select jpg or png.'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      });
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传5张图片'
        });
      }
      return check;
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
