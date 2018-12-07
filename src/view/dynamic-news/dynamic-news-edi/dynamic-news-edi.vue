<template>
  <div>
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :label-width="80">
          <Row>
            <i-col :xs="24" :md="8" :lg="6">
              <FormItem label="搜索标题" prop="name">
                <Input
                  v-model="searchData.incentive"
                  suffix="ios-search"
                  placeholder="请输入新闻标题"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="8" :lg="6">
              <FormItem label="新闻年份">
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
            <i-col :xs="24" :md="8" :lg="6">
              <FormItem label="新闻月份" prop="name">
                <Input
                  v-model="searchData.commendedUnit"
                  placeholder="请输入被表彰机关"
                  style="width: auto"
                ></Input>
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
              <Button type="success" @click="showEdiDrawer">编辑新闻</Button>
            </i-col>
          </Row>
        </Form>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
        <Table border :columns="newsHead" :loading="tabelLoading" :data="newsContent"></Table>
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
    <!-- 左边抽屉 -->
    <Drawer
      title="动态编辑"
      width="1000"
      :mask-closable="false"
      v-model="isShowEditor"
      :styles="styles"
      @on-close="closeDrawer"
    >
      <div>
        <Form ref="news" :model="newsData" :rules="newsReg" style="margin:20px 0;">
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="新闻标题" prop="title">
                <Input v-model="newsData.title" style="width:400px" placeholder="请输入标题"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <editor ref="editor" :value="newsData.content" @on-change="newsHandleChange"/>
          </Row>
          <Row style="margin-top:20px">
            <i-col :xs="24" :md="12" :lg="12">
              <FormItem label="上传附件">
                <Upload
                  :max-size="10240"
                  :show-upload-list="false"
                  :format="['rar','zip','7z']"
                  :before-upload="handBefore"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :on-success="handleSuccess"
                  action="/api/upload/fileUpload"
                >
                  <Button
                    :disabled="file !==null"
                    :loading="updateLoading"
                    icon="ios-cloud-upload-outline"
                  >选择上传文件</Button>
                </Upload>
                <div v-if="file !== null">
                  文件名称: {{ file.name }}
                  <Button
                    type="text"
                    @click="deleteFile"
                    :loading="loadingStatus"
                  >{{ loadingStatus ? '删除中' : '删除文件' }}</Button>
                </div>
              </FormItem>
            </i-col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="发布日期" style="margin:20px 0">
                <DatePicker
                  type="date"
                  v-model="newsData.editTime"
                  @on-change="selectNewsDate"
                  placeholder="选择发布日期"
                  style="width: 200px"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Button
              type="primary"
              @click="newsSubmit"
              :loading="submitLoading"
              style="margin-top:20px"
            >完成编辑</Button>
            <Button type="error" @click="closeDrawer" style="margin-top:20px;margin-left:20px">关闭</Button>
          </Row>
        </Form>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { getTest } from "@/api/user";
import Editor from "_c/editor";
import { newsAjax, deleteAjax } from "@/api/city";
export default {
  data() {
    return {
      file: null, // 上传文件
      isShowEditor: false, // 抽屉
      searchLoading: false, // 搜索Loading
      submitLoading: false, // 提交新闻loading
      tabelLoading: false, // 表格loading
      loadingStatus: false, // 文件删除loading
      updateLoading: false, // 文件上传Loaidng
      fileId: [], // 上传文件Id
      pageTotal: 10, // 总页数
      pageSize: 10, // 显示页数
      pageNumber: 1, // 页码
      searchData: {
        newsTitle: "", // 事项名称
        dateTime: "", // 年份
        monthTime: "" // 月份
      },
      newsData: {
        title: "", // 标题
        content: "", // 内容
        dateTime: "", // 年份
        monthTime: "", // 月份
        editTime: "", // 日期
        url: "" // 根据后台要求 文件Id 取名为URL
      },
      newsReg: {
        title: [
          {
            required: true,
            message: "请输入事项名称",
            trigger: "blur"
          }
        ]
      },
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      newsHead: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "新闻标题",
          key: "newsTitle"
        },
        {
          title: "新闻内容",
          key: "newsContent"
        },
        {
          title: "发布日期",
          key: "newsDate"
        },
        {
          title: "操作",
          key: "audit",
          width: 100,
          align: "center",
          render: (h, params) => {}
        }
      ],
      newsContent: []
    };
  },
  methods: {
    newsHandleChange(html, text) {
      this.newsData.content = html;
    },
    searchSubmit() {},
    submitReset() {},
    pageNumberChange() {},
    pageSizeChange() {},
    // 提交新闻编辑
    newsSubmit() {
      if (this.newsData.editTime === "") {
        return this.$Message.error("请选择发布日期");
      }
      this.$refs["news"].validate(valid => {
        if (valid) {
          // 获取上传文件Id
          if (this.file !== null) {
            this.newsData.url = this.fileId[0];
          }
          const url = "/News/insert";
          this.submitLoading = true;
          this._newsAjax(url, this.newsData, "", "").then(result => {
            this.submitLoading = false;
            if (result.code === "200") {
              this.$Message.success("编辑成功");
              // 如果上传成功 清空上传文件
              this.file = null;
              if (this.file === null) {
                this.isShowEditor = false;
              }
            } else {
              this.$Message.error("编辑失败！请重新尝试");
            }
          });
        } else {
          this.$Message.error("请填写完整");
        }
      });
    },
    // 新闻时间选择
    selectNewsDate(date) {
      this.newsData.editTime = date; // 发布时间
      var dataArr = date.split("-"); // 字符串转化数组 2018-01-01
      this.newsData.dateTime = dataArr[0]; // 年份
      this.newsData.monthTime = dataArr[1]; // 月份
    },
    // 关闭编辑新闻
    closeDrawer() {
      if (this.file !== null) {
        this._emptyFile(this.fileId);
      }
      this.isShowEditor = false;
      // 清空富文本内容
      this.$refs.editor.setHtml("");
      this.$refs["news"].resetFields();
      this.newsData = {
        title: "", // 标题
        content: "", // 内容
        dateTime: "", // 年份
        monthTime: "", // 月份
        editTime: "", // 日期
        url: [] // 根据后台要求 文件Id 取名为URL
      };
    },
    // 删除文件
    deleteFile() {
      this._emptyFile(this.fileId);
    },
    // 验证文件类型
    handleFormatError(file) {
      this.$Notice.warning({
        title: "上传文件失败",
        desc: "文件" + file.name + "不是zrz、zip或者7z"
      });
      this.updateLoading = false;
    },
    // 验证文件大小
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "上传文件失败",
        desc: "文件" + file.name + "不能超出10M"
      });
      this.updateLoading = false;
    },
    // 上传文件成功
    handleSuccess(res, file) {
      this.updateLoading = false;
      if (res.code === "200") {
        this.file = file;
        this.fileId = [this.file.response.results.fileId];
        this.$Message.success("上传成功");
      } else {
        this.$Message.error("上传失败");
      }
    },
    // 上传文件之前的钩子
    handBefore() {
      this.updateLoading = true;
    },
    // 打开新闻编辑
    showEdiDrawer() {
      this.isShowEditor = true;
    },
    // 搜索年份
    searchSelectYear() {},
    // 删除上传文件
    _emptyFile(formData) {
      this.loadingStatus = true;
      const url = "/upload/delete";
      deleteAjax({ formData, url })
        .then(result => {
          this.loadingStatus = false;
          if (result.data.code === "200") {
            this.$Message.success("删除成功");
            this.file = null;
          } else {
            this.$Message.error("删除失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _newsAjax(url, formData, pageSize, pageNumber) {
      const keyOne = "newsEntity";
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      return new Promise((resolve, reject) => {
        newsAjax({ url, formData, keyOne })
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
    }
  },
  components: {
    Editor
  }
};
</script>
<style scoped>
</style>
