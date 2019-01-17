<template>
  <div>
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="搜索事项" prop="name">
                <Input
                  v-model="searchData.incentive"
                  suffix="ios-search"
                  placeholder="请输入事项名称"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="加分类别" prop="name">
                <Select v-model="searchData.pointsType" style="width:200px" clearable>
                  <Option value="1">第 1 类</Option>
                  <Option value="2">第 2 类</Option>
                  <Option value="3">第 3 类</Option>
                  <Option value="4">第 4 类</Option>
                  <Option value="5">第 5 类</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="表彰机关" prop="name">
                <Input
                  v-model="searchData.recognitionUnit"
                  placeholder="请输入表彰机关"
                  style="width: auto"
                ></Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="被表彰机关" prop="name">
                <Input
                  v-model="searchData.commendedUnit"
                  placeholder="请输入被表彰机关"
                  style="width: auto"
                ></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="审核状态" prop="name">
                <Select v-model="searchData.audit" style="width:200px" clearable>
                  <Option value="0">全部</Option>
                  <Option value="1">已审核</Option>
                  <Option value="2">未审核</Option>
                  <Option value="3">回退</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="年份">
                <DatePicker
                  type="year"
                  format="yyyy"
                  @on-change="searchSelectYear"
                  placeholder="按年份搜索"
                  style="width:185px"
                  v-model="searchData.dateTime"
                ></DatePicker>
              </FormItem>
            </i-col>
          </Row>
          <FormItem>
            <Button
              type="primary"
              style="marigin:0 20px"
              :loading="searchLoading"
              @click="searchSubmit(10,1)"
            >提交搜索</Button>
            <Button @click="submitReset">重置搜索</Button>
          </FormItem>
          <Row>
            <i-col :xs="24" :md="12" :lg="3">
              <Button type="success" @click="appendMatter">添加事项</Button>
            </i-col>
          </Row>
        </Form>
      </Card>
    </Row>
    <Row style="margin-top:10px">
      <Card>
        <Table border :columns="incentiveHead" :loading="tabelLoading" :data="incentiveData"></Table>
        <div style="margin-top:15px;margin-left:35%">
          <Page
            @on-change="pageNumberChange"
            :page-size="pageSize"
            :total="pageTotal"
            @on-page-size-change="pageSizeChange"
            show-elevator
            show-sizer
          />
        </div>
      </Card>
    </Row>
    <Row :gutter="20" style="margin-top: 20px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie v-if="pieData.length" style="height: 400px;" :value="pieData" text="加分类别占比"></chart-pie>
          <Spin size="large" fix v-if="isPieLoading"></Spin>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <example
            v-if="lineData.lineName.length"
            style="height: 400px;"
            :title="exampleTitle"
            :data="lineData"
            :yName="'项'"
          />
          <Spin size="large" fix v-if="isExampleLoading"></Spin>
        </Card>
      </i-col>
    </Row>
    <!-- 增加修改模态框 -->
    <Drawer
      :title="DrawerTitle"
      v-model="isShowMatters"
      width="820"
      :mask-closable="false"
      :styles="styles"
      @on-close="closeDrawer"
    >
      <Form ref="matters" :model="mattersForm" :rules="mattersReg" :label-width="110">
        <Row>
          <i-col :xs="24" :md="12" :lg="12">
            <FormItem label="事项名称" prop="incentive">
              <Input style="width:auto" v-model="mattersForm.incentive" placeholder="请输入事项名称"></Input>
            </FormItem>
          </i-col>
          <i-col :xs="24" :md="12" :lg="12">
            <FormItem label="加分类别" prop="pointsType">
              <Select v-model="mattersForm.pointsType" placeholder="请选择加分类别">
                <Option value="1">第 1 类</Option>
                <Option value="2">第 2 类</Option>
                <Option value="3">第 3 类</Option>
                <Option value="4">第 4 类</Option>
                <Option value="5">第 5 类</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col :xs="24" :md="12" :lg="12">
            <FormItem label="表彰机关" prop="recognitionUnit">
              <Input v-model="mattersForm.recognitionUnit" placeholder="请输入表彰机关名称"></Input>
            </FormItem>
          </i-col>
          <i-col :xs="24" :md="12" :lg="12">
            <FormItem label="被表彰单位" prop="commendedUnit">
              <Input v-model="mattersForm.commendedUnit" placeholder="请输入被表彰单位名称"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col :xs="24" :md="12" :lg="12">
            <FormItem label="加分分值" prop="point">
              <InputNumber
                v-model="mattersForm.point"
                :max="10"
                :min="0"
                :step="0.1"
                style="width:auto"
              ></InputNumber>
            </FormItem>
          </i-col>
          <i-col :xs="24" :md="12" :lg="12">
            <FormItem label="年份" prop="dateTime">
              <DatePicker
                type="year"
                format="yyyy"
                v-model="mattersForm.dateTime"
                placeholder="请选择年份"
                style="width: 200px"
                @on-change="formSelectYear"
              ></DatePicker>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col :xs="24" :md="12" :lg="12">
            <FormItem label="证明材料名称" prop="fileName">
              <Input v-model="mattersForm.fileName" placeholder="请输入证明材料名称"></Input>
            </FormItem>
          </i-col>
          <i-col :xs="24" :md="12" :lg="12"></i-col>
        </Row>
        <FormItem label="证明材料附件" prop="image">
          <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
            <template v-if="item.status === 'finished'">
              <img :src="HOST+item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <!-- action="/upload/fileUpload"  线上
              action="api/upload/fileUpload" 本地
          -->
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
            action="/upload/fileUpload"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="View Image" v-model="visible">
            <img :src="HOST + imgName " v-if="visible" style="width: 100%">
          </Modal>
        </FormItem>
        <FormItem label="回退原因" v-if="mattersForm.reason !== null">
          <Input
            v-model="mattersForm.reason"
            disabled
            type="textarea"
            placeholder="Enter something..."
          />
        </FormItem>
        <div style="margin-top:10px">
          <Card dis-hover>
            <div style="margin-bottom:5px">
              <span>
                <Tag type="dot" color="primary">第1类</Tag>
              </span>
              <span style="color:#000">受到中共中央、国务院表彰、或中央机关、国家部委通报表扬，或以文件形式推广其经验做法的。</span>
            </div>
            <div style="margin-bottom:5px">
              <span>
                <Tag type="dot" color="success">第2类</Tag>
              </span>
              <span style="color:#000">受到省委、省政府、省机关效能建设领导小组通报表扬的，或以文件形式推广其经验做法的。</span>
            </div>
            <div style="margin-bottom:5px">
              <span>
                <Tag type="dot" color="error">第3类</Tag>
              </span>
              <span style="color:#000">受到党和国家领导人、中央机关、国家部委主要负责人批示肯定的。</span>
            </div>
            <div style="margin-bottom:5px">
              <span>
                <Tag type="dot" color="warning">第4类</Tag>
              </span>
              <span style="color:#000">综合或单项工作在全国排名1-5名或被评为优秀的。</span>
            </div>
            <div style="margin-bottom:5px">
              <span>
                <Tag type="dot" color="#9e9e9e">第5类</Tag>
              </span>
              <span style="color:#000">在全国性会议上做先进发言的。</span>
            </div>
          </Card>
        </div>
      </Form>
      <div class="demo-drawer-footer">
        <Button type="primary" :loading="submitLoading" @click="submitDrawer">上传提交</Button>
        <Button style="margin-right: 8px" @click="closeDrawer">关闭</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { HOST } from "@/libs/util";
import { ChartPie } from "_c/charts";
import { incentiveAjax, deleteAjax } from "@/api/city";
import example from "@/view/single-page/home/example.vue";
export default {
  data() {
    return {
      HOST: "", // HTTP//192....
      exampleTitle: "各月获得表彰项目数量",
      isShowMatters: false, // 增加修改模态框
      addMattersTitle: "", // title
      lookRowContent: {}, // 看一行内容
      DrawerTitle: "",
      pageTotal: 10, // 总页数
      pageSize: 10, // 页数
      pageNumber: 1, // 页码
      pieData: [], // 饼图数据
      lineData: {
        lineName: [], // x轴
        lineData: [] // 数据
      }, // 折线图数据
      searchLoading: false, // 搜索Loading
      submitLoading: false, // 提交Loading
      tabelLoading: true, // 表格Loading
      isExampleLoading: false, // 折线图Loaidng
      isPieLoading: true, // 饼图Loading
      searchData: {
        incentive: "", // 事项名称
        pointsType: "", // 加分类别
        recognitionUnit: "", // 表彰机关
        commendedUnit: "", // 被表彰机关
        audit: "", // 审核状态,
        dateTime: "" // 年份
      },
      // 表单
      mattersForm: {
        incentive: "", // 事项名称
        pointsType: "", // 加分类别
        recognitionUnit: "", // 表彰机关
        commendedUnit: "", // 被表彰机关
        audit: "", // 审核状态,
        dateTime: null, // 年份
        point: null, // 分值
        fileName: "", // 证明材料名称
        fileId: [], // 材料附件Id
        reason: null
      },
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      searchReg: {},
      mattersReg: {
        incentive: [
          {
            required: true,
            message: "请输入事项名称",
            trigger: "blur"
          }
        ],
        recognitionUnit: [
          {
            required: true,
            message: "请输入表彰机关名称",
            trigger: "blur"
          }
        ],
        commendedUnit: [
          {
            required: true,
            message: "请输入被表彰单位名称",
            trigger: "blur"
          }
        ],
        fileName: [
          { required: true, message: "请输入证明材料名称", trigger: "blur" }
        ],
        pointsType: [
          {
            required: true,
            message: "请选择加分类别",
            trigger: "change"
          }
        ],
        materialVal: [
          {
            required: true,
            message: "请填写加分分值",
            trigger: "blur"
          }
        ],
        dateTime: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ]
      },
      incentiveHead: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "事项名称",
          key: "incentive"
        },
        {
          title: "表彰机关",
          key: "recognitionUnit"
        },
        {
          title: "被表彰单位",
          key: "commendedUnit"
        },
        {
          title: "加分类别",
          key: "pointsType",
          maxWidth: 90
        },
        {
          title: "审批状态",
          key: "audit",
          width: 100,
          align: "center",
          render: (h, params) => {
            var color = "";
            var text = "";
            var isDisabled = false;
            switch (params.row.audit) {
              case "0":
                color = "default";
                text = "未审核";
                break;
              case "1":
                color = "success";
                text = "已审核";
                break;
              case "2":
                color = "error";
                text = "回退";
                break;
              default:
                break;
            }
            return h(
              "Button",
              {
                props: {
                  type: color,
                  disabled: isDisabled
                }
              },
              text
            );
          }
        },
        {
          title: "正名材料",
          key: "fileName"
        },
        {
          title: "操作",
          key: "action",
          width: 190,
          align: "center",
          render: (h, params) => {
            var isDisabled = false;
            if (params.row.audit === "1") {
              isDisabled = true;
            }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "incentive_details",
                        params: {
                          incentiveItem: params.row,
                          audit: false // 带参数 判断是否进行审批操作
                        }
                      });
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    disabled: isDisabled
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.isShowMatters = true;
                      this.DrawerTitle = "正向激励-编辑";
                      var row = params.row;
                      this.mattersForm = Object.assign(row, {
                        point: parseInt(row.point)
                      });
                      this.mattersForm = JSON.parse(
                        JSON.stringify(this.mattersForm)
                      );
                      // 获取图片信息
                      this.uploadList = row.fileList;
                      this.$refs.upload.fileList = this.uploadList;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Icon",
                {
                  props: {
                    type: "md-trash",
                    size: 24
                  },
                  on: {
                    click: () => {
                      this.removeIncentive(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      incentiveData: [],
      // upload
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  components: {
    ChartPie,
    example
  },
  methods: {
    submitReset() {
      this.submitLoading = false;
      this.searchData = {
        incentive: "", // 事项名称
        pointsType: "", // 加分类别
        recognitionUnit: "", // 表彰机关
        commendedUnit: "", // 被表彰机关
        audit: "", // 审核状态,
        dateTime: "" // 年份
      };
    },
    // 搜索
    searchSubmit(pageSize, pageNumber) {
      this._getIncentive(this.searchData, pageSize, pageNumber);
    },
    // form表单选择年份
    formSelectYear(year) {
      this.mattersForm.dateTime = year;
    },
    // 关闭抽屉
    closeDrawer() {
      this.isShowMatters = false;
      this.submitLoading = false;
      this.$refs["matters"].resetFields();
      if (this.DrawerTitle === "正向激励-添加") {
        var formData = this.getImageList();
        if (formData.length) {
          const url = "/upload/delete";
          deleteAjax({ formData, url })
            .then(result => {
              if (result.data.code === "200") {
                // 清空updateList
                this.$refs.upload.fileList.splice(0, this.uploadList.length);
              } else {
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        // 清空updateList
        this.uploadList = this.$refs.upload.fileList;
      }
    },
    // 抽屉里的提交按钮
    submitDrawer() {
      var url = "";
      // 获取上传图片的Id
      if (!this.getImageList().length) {
        this.$Message.error("佐证材料不能为空");
        return;
      }
      this.mattersForm = Object.assign(this.mattersForm, {
        fileId: this.getImageList().join(",")
      });
      // 根据DrawerTitle
      if (this.DrawerTitle === "正向激励-添加") {
        url = "/incentive/insert";
      } else if (this.DrawerTitle === "正向激励-编辑") {
        url = "/incentive/update";
      }
      this.$refs["matters"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          const keyOne = "incentiveEntity";
          this._incentiveAjax(url, this.mattersForm, keyOne).then(result => {
            this.submitLoading = false;
            if (result.code === "200") {
              this.isShowMatters = false;
              this._getIncentive("", this.pageSize, this.pageNumber);
              this.$Message.success("添加成功");
            } else {
              this.$Message.error("添加失败!");
            }
          });
        } else {
          this.$Message.error("带*未必填项");
        }
      });
    },
    // 删除
    removeIncentive(id) {
      this.$Modal.confirm({
        content: "<p>删除后将无法找回</p>",
        onOk: () => {
          const url = "/incentive/delete";
          const keyOne = "incentiveEntity";
          this._incentiveAjax(url, id, keyOne, "", "").then(result => {
            if (result.code === "200") {
              this._getIncentive(
                this.searchData,
                this.pageSize,
                this.pageNumber
              );
            } else {
              this.$Message.error("删除失败！请刷新页面后尝试");
            }
          });
        }
      });
    },
    // 页码
    pageNumberChange(pageNumber) {
      this.pageNumber = pageNumber;
      this._getIncentive(this.searchData, this.pageSize, this.pageNumber);
    },
    // 页数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._getIncentive(this.searchData, this.pageSize, this.pageNumber);
    },
    // 添加事项
    appendMatter() {
      this.isShowMatters = true;
      this.DrawerTitle = "正向激励-添加";
      this.$refs.upload.fileList.splice(0, this.uploadList.length);
      // 清除ID
      this.$refs["matters"].resetFields();
      if (this.mattersForm.id !== undefined) {
        this.mattersForm.id = "";
      }
    },
    // 搜索框年份选择
    searchSelectYear(year) {
      this.searchData.dateTime = year;
    },
    // AJAX
    _incentiveAjax(url, formData, keyOne, pageSize, pageNumber) {
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      const keyTwo = "";
      return new Promise((resolve, reject) => {
        incentiveAjax({ formData, url, keyOne, keyTwo })
          .then(result => {
            if (result.data !== undefined) {
              resolve(result.data);
            } else {
              reject(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 搜索
    _getIncentive(formData, pageSize, pageNumber) {
      this.tabelLoading = true;
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      const url = "/incentive/query";
      const keyOne = "incentiveFilter";
      const keyTwo = "";
      incentiveAjax({ formData, url, keyOne, keyTwo })
        .then(result => {
          this.tabelLoading = false;
          this.incentiveData = [];
          if (result.data.code === "200") {
            result.data.results.list.forEach(item => {
              this.incentiveData.push(item.incentive);
            });
            this.pageTotal = parseInt(result.data.results.total) * 10;
            this.$Message.success("查询成功");
          } else {
            this.$Message.error("查询失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上传图片========================
    getImageList() {
      const fileList = this.$refs.upload.fileList;
      var idList = [];
      fileList.forEach(item => {
        idList.push(item.id);
      });
      return idList;
    },
    // 查看图片
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      // 从服务器上删除
      const formData = [file.id];
      const url = "/upload/delete";
      deleteAjax({ formData, url })
        .then(result => {
          if (result.data.code === "200") {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
          } else {
            this.$Message.error("删除图片失败！请刷新页面重试");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSuccess(res, file, fileList) {
      file.name = file.name;
      file.url = file.response.results.fileUrl;
      file.id = file.response.results.fileId;
      this.uploadList = this.$refs.upload.fileList;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "上传图片格式错误",
        desc: "图片 " + file.name + " 格式错误, 请换成JPG/PNG."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "上传图片失败",
        desc: "图片 " + file.name + " 大小超出了2M"
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传5张图片"
        });
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  },
  created() {
    this.HOST = HOST;
    // 获取tabel数据
    this._getIncentive(this.searchData, this.pageSize, this.pageNumber);
    // 饼图数据
    const keyOne = "incentiveFilter";
    var pieUrl = "/incentive/pointType";
    this._incentiveAjax(pieUrl, this.searchData, keyOne, "", "").then(
      result => {
        if (result.code === "200") {
          var pie = []; // 饼图
          var lineName = []; // 则线图
          var lineData = [];
          result.results.pointType.forEach(item => {
            var obj = Object.assign(
              {},
              {
                value: item.num === null ? 0 : itemnum,
                name: item.pointsType + "类"
              }
            );
            pie.push(obj);
          });
          result.results.monthType.forEach(item => {
            lineName.push(item.monthTime + "月");
            lineData.push(item.num);
          });
          this.lineData = Object.assign(
            {},
            {
              lineName,
              lineData
            }
          );
          this.pieData = pie;
          this.isPieLoading = false;
        }
      }
    );
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
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
