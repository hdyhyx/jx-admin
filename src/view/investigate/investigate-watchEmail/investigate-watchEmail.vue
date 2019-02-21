<template>
  <div v-if="detailsItem">
    <Row>
      <Card>
        <p slot="title" ref="wacthBody">
          <Icon type="ios-send" color="#2b85e4" size="35"/>查看邮件
          <Button @click="loadWord" style="float:right">下载本页</Button>
        </p>
        <p class="content">
          <Row>
            <Col :span="24">
              <Tag type="dot" color="primary">邮件标题：</Tag>
              {{detailsItem.title}}
            </Col>
          </Row>
          <Row style="margin-top:20px">
            <Col :span="12">
              <Tag type="dot" color="primary">收件单位：</Tag>
              {{detailsItem.addressee}}
            </Col>
            <Col :span="12">
              <Tag type="dot" color="primary">发送日期：</Tag>
              {{detailsItem.gmtCreate}}
            </Col>
          </Row>
          <Row style="margin-top:20px">
            <Col :span="12">
              <Tag type="dot" color="primary">审核状态：</Tag>
              {{detailsItem.status|status}}
            </Col>
            <Col :span="12">
              <Tag type="dot" color="primary">截止日期：</Tag>
              {{detailsItem.endTime}} 23:59:59
            </Col>
          </Row>
          <Row style="margin-top:20px">
            <Col :span="12">
              <Tag type="dot" color="primary">是否附件：</Tag>
              {{detailsItem.fileUrl?'是':'否'}}
            </Col>
            <Col :span="12" v-if="detailsItem.fileUrl!==null">
              <Tag type="dot" color="primary">下载附件：</Tag>
              <Button type="text">{{detailsItem.fileName}}</Button>
              <Button type="primary" @click="loadFile(detailsItem.fileUrl)">下载</Button>
            </Col>
          </Row>
          <Row style="margin-top:20px">
            <Col :span="12" v-if="detailsItem.point!==null">
              <Tag type="dot" color="primary">核验分值：</Tag>
              {{detailsItem.point}}
            </Col>
            <Col :span="12">
              <Tag type="dot" color="primary">察访核验对象：</Tag>
              {{detailsItem.type==='0'?'对全县察访核验':'对部门或乡镇察访核验'}}
            </Col>
          </Row>
          <Row style="margin-top:20px">
            <Col :span="24">
              <Tag type="dot" color="primary">邮件内容：</Tag>
              <div style="padding:0 20px">{{detailsItem.content}}</div>
            </Col>
          </Row>
        </p>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
        <Row>
          <Col :span="24">
            <Tag type="dot" color="success">转批信息</Tag>请
            <span style="font-size:15px;font-weight:600;padding:0 10px">{{detailsItem.addressee}}</span>于
            <span
              style="font-size:15px;font-weight:600;padding:0 10px;color:#e91e63"
            >{{detailsItem.endTime}} 23:59:59</span>前转批
          </Col>
        </Row>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
        <Row v-if="!info.lenth">
          <Col :span="2">
            <Tag type="dot" color="primary">办理信息</Tag>
          </Col>
          <Col :span="22">
            <div v-for="(item,idx) in info" :key="idx">
              <div class="info-wrapper">
                <p class="info-title">
                  <strong>{{item.inbox}}</strong>
                  <span>{{item.status|status}}</span>
                </p>
                <p class="info-content">
                  <span>{{item.content}}</span>
                  <span class="info-date">{{item.replyTime}}</span>
                </p>
                <p style="margin-top:20px" v-if="item.fileName!==null">
                  <Tag type="dot" color="primary">下载附件</Tag>
                  <Button type="text">{{item.fileName}}</Button>
                  <Button type="primary" @click="loadFile(item.fileUrl)">下载</Button>
                  <Button style="margin-left:10px" type="error" @click="removeFile(item.fileId)">删除</Button>
                </p>
              </div>
              <Divider dashed/>
            </div>
          </Col>
        </Row>
      </Card>
    </Row>
    <Row style="margin-top:20px" v-if="detailsItem.status !=='5'">
      <Card>
        <Row v-if="accessAgent">
          <Col :span="2">
            <Tag type="dot" color="primary">回复</Tag>
          </Col>
          <Col :span="22">
            <Input v-model="replyText" type="textarea" placeholder="请输入回复内容"/>
            <div style="margin-top:20px;">
              <Upload
                :max-size="10240"
                :show-upload-list="false"
                :format="['rar','zip','7z']"
                :before-upload="handBefore"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :on-success="handleSuccess"
                action="/upload/fileUpload"
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
                  @click="removeFile(file.response.results.fileId)"
                  :loading="loadingStatus"
                >{{ loadingStatus ? '删除中' : '删除文件' }}</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row v-if="accessAdmin">
          <Col :span="2">
            <Tag type="dot" color="primary">审核分数</Tag>
          </Col>
          <Col :span="22">
            <InputNumber :max="100" :min="-100" :step="0.1" v-model="point"></InputNumber>
          </Col>
        </Row>
        <Row style="margin-top:20px">
          <div style="text-align:center">
            <Button
              v-if=" detailsItem.status !=='4'"
              :loading="submitLoading"
              @click="submitEmail"
              type="primary"
              style="margin-right:20px"
            >{{submitText}}</Button>
            <Button
              v-if="accessRespons"
              :loading="backLoading"
              @click="backEmail"
              type="error"
              style="margin-right:20px"
            >回退</Button>
            <Button
              v-if="accessAgent"
              :loading="backLoading"
              @click="updateEmail"
              type="warning"
              style="margin-right:20px"
            >修改</Button>
            <Button
              :loading="refreshLoading"
              @click="refreshEmail"
              type="success"
              style="margin-right:20px"
            >刷新</Button>
          </div>
        </Row>
        <Row></Row>
      </Card>
    </Row>
  </div>
</template>
<script>
import { investigateAjax, loadAjax } from "@/api/investigate";
import { deleteAjax } from "@/api/city";
import { hasOneOf } from "@/libs/tools";
import { HOST } from "@/libs/util";
// 下载URL
const LOAD_URL = "/check/downloadWord";
// 查询邮箱
const QUERY_URL = "/check/queryForEmail";
// 添加
const INSERT_URL = "/check/reply";
// 管理员
const POINT_URL = "/check/setPoint";
// 责任人 审核通过
const PASS_URL = "/check/pass";
// 责任人 审核回退
const NO_PASS_URL = "/check/noPass";
// 经办人修改
const UPDATE_URL = "/check/update";
export default {
  data() {
    return {
      emailId: "", // 邮件ID
      detailsItem: null, // 邮件
      updateLoading: false,
      loadingStatus: false,
      refreshLoading: false,
      submitLoading: false,
      backLoading: false,
      submitText: "",
      replyText: "",
      point: null,
      file: null,
      info: []
    };
  },
  methods: {
    refreshEmail() {
      this.refreshLoading = true;
      this.info = [];
      this.replyText = "";
      this.file = null;
      this.point = null;
      const KEY_TWO = "checkFilter"; // 进行查询
      this._getEmail(QUERY_URL, this.emailId, KEY_TWO);
    },
    // 更新
    updateEmail() {
      if (this.access[0] !== "agent") {
        this.$Message.error("回退权限不足");
        return;
      }
      const KEY_ONE = "checkEntity";
      var updateData = Object.assign(
        {},
        {
          id: this.info[0].id, // id
          mailId: this.detailsItem.mailId, // 邮件id
          content:
            this.replyText === "" ? this.info[0].content : this.replyText, // 回复
          file:
            this.file === null
              ? this.info[0].fileId
              : this.file.response.results.fileId, // 文件ID
          addressee: this.detailsItem.sender, // 单位
          correlationId: this.detailsItem.id,
          status: this.detailsItem.status
        }
      );
      this.backLoading = true;
      this._emailAjax(UPDATE_URL, updateData, KEY_ONE);
    },
    // 回退
    backEmail() {
      const KEY_ONE = "checkEntity";
      var noPass = Object.assign(
        {},
        {
          mailId: this.detailsItem.mailId,
          serialNumber: this.detailsItem.serialNumber,
          addressee: this.detailsItem.sender,
          correlationId: this.detailsItem.id,
          status: this.detailsItem.status
        }
      );
      this.backLoading = true;
      this._emailAjax(NO_PASS_URL, noPass, KEY_ONE);
    },
    // 提交
    submitEmail() {
      const KEY_ONE = "checkEntity";
      if (this.accessAgent) {
        if (this.replyText === "") {
          this.$Message.error("内容不可为空");
          return;
        }
        // 后台需要的数据
        var formData = Object.assign(
          {},
          {
            mailId: this.detailsItem.mailId, // 邮件id
            serialNumber: this.detailsItem.serialNumber,
            content: this.replyText, // 回复
            file: this.file === null ? "" : this.file.response.results.fileId, // 文件ID
            addressee: this.detailsItem.sender, // 单位
            correlationId: this.detailsItem.id,
            status: this.detailsItem.status
          }
        );
        this.submitLoading = true;
        this._emailAjax(INSERT_URL, formData, KEY_ONE);
      } else if (this.accessAdmin) {
        if (this.point === null) {
          this.$Message.error("内容不可为空");
          return;
        }
        var pointData = Object.assign(
          {},
          {
            mailId: this.detailsItem.mailId,
            serialNumber: this.detailsItem.serialNumber,
            content: this.replyText,
            file: this.file === null ? "" : this.file.response.results.fileId,
            addressee: this.detailsItem.sender,
            correlationId: this.detailsItem.id,
            status: this.detailsItem.status,
            point: this.point
          }
        );
        this.submitLoading = true;
        this._emailAjax(POINT_URL, pointData, KEY_ONE);
      } else if (this.accessRespons) {
        var pass = Object.assign(
          {},
          {
            mailId: this.detailsItem.mailId,
            serialNumber: this.detailsItem.serialNumber,
            addressee: this.detailsItem.sender,
            correlationId: this.detailsItem.id,
            status: this.detailsItem.status
          }
        );
        this.submitLoading = true;
        this._emailAjax(PASS_URL, pass, KEY_ONE);
      }
    },
    // 下载附件
    loadFile(url) {
      var a = document.createElement("a");
      a.href = HOST + url;
      a.click();
    },
    // 下载文件
    loadWord() {
      var url = LOAD_URL;
      var formData = {
        mailId: this.detailsItem.mailId
      };
      var keyOne = "checkFilter";
      loadAjax({ url, formData, keyOne })
        .then(result => {
          if (result.data.code === "200") {
            this.downloadFile(result.data.results);
            this.$Message.success("下载成功");
          } else {
            this.$Message.error(result.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上传文件
    handleSuccess(res, file) {
      this.updateLoading = false;
      if (res.code === "200") {
        this.$Notice.success({
          title: res.message,
          desc: "上传成功"
        });
        this.file = file;
      } else {
        this.$Notice.error({
          title: res.message,
          desc: res.results
        });
      }
    },
    // 验证上传格式
    handleFormatError(file) {
      this.updateLoading = false;
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "文件" + file.name + " 格式错误, 请选择xls或者xlsx"
      });
    },
    // 上传文件之前的钩子
    handBefore() {
      this.updateLoading = true;
    },
    handleMaxSize(file) {
      this.updateLoading = false;
      this.$Notice.warning({
        title: "文件太大",
        desc: "文件  " + file.name + "超过了10M"
      });
    },
    removeFile(fileId) {
      this._emptyFile(fileId);
    },
    _emptyFile(formData) {
      this.loadingStatus = true;
      // 已数组的格式传给后台
      var deleteFile = {
        id: this.info[0].id, // id
        file: this.info[0].fileId // 文件id
      };
      const url = "/check/deleteForFile";
      const KEY_ONE = "checkEntity";
      this._emailAjax(url, deleteFile, KEY_ONE);
    },
    // 动态创建FROM 表单进行文件下载
    downloadFile(url) {
      var watchBody = this.$refs.wacthBody;
      var form = document.createElement("form");
      form.setAttribute("method", "GET");
      form.setAttribute("action", HOST + url);
      watchBody.appendChild(form);
      form.submit();
    },
    // 邮件查询
    _getEmail(url, formData, keyOne) {
      investigateAjax({ url, formData, keyOne }).then(result => {
        if (result.data.code === "200") {
          this.refreshLoading = false;

          this.detailsItem = result.data.results[0];
          if (result.data.results.length > 1) {
            // list[0]为原件的数据 list[N]为邮件处理的数据
            for (var i = 1; result.data.results.length > i; i++) {
              var infoItme = Object.assign(
                {},
                {
                  id: result.data.results[i].id, // 本次邮件的Id
                  content: result.data.results[i].content, // 回复内容
                  replyTime: result.data.results[i].gmtCreate, // 回复时间
                  inbox: result.data.results[0].addressee, // 单位
                  status: result.data.results[0].status, // 处理邮件时候的状态
                  fileName: result.data.results[i].fileName, // 文件名
                  fileUrl: result.data.results[i].fileUrl, // 文件URL
                  fileId: result.data.results[i].file // 文件ID
                }
              );
              this.info.push(infoItme);
            }
          }
          this.$Message.success("查询成功");
        } else {
          this.$Message.error(result.data.message);
        }
      });
    },
    // 提交
    _emailAjax(url, formData, keyOne) {
      investigateAjax({ url, formData, keyOne }).then(result => {
        this.submitLoading = false;
        this.backLoading = false;
        this.loadingStatus = false;
        if (result.data.code === "200") {
          this.$Message.success("操作成功");
          // 提交成功清空文件
          this.file = null;
        } else {
          this.$Message.error(result.data.message);
        }
      });
    }
  },
  filters: {
    status(value) {
      var statusVal = "";
      switch (value) {
        case "0":
          statusVal = "未读";
          break;
        case "1":
          statusVal = "已读";
          break;
        case "2":
          statusVal = "未审核";
          break;
        case "3":
          statusVal = "未评分";
          break;
        case "4":
          statusVal = "回退";
          break;
        case "5":
          statusVal = "办结";
          break;
        case "6":
          statusVal = "逾期";
          break;
        default:
          break;
      }
      return statusVal;
    }
  },
  created() {
    this.emailId = {
      mailId: this.$route.params.investigateItem.mailId
    };
    const KEY_ONE = "checkFilter";
    this._getEmail(QUERY_URL, this.emailId, KEY_ONE);
  },
  mounted() {
    if (this.accessAdmin) {
      this.submitText = "提交分数";
    } else if (this.accessRespons) {
      this.submitText = "通过审核";
    } else if (this.accessAgent) {
      this.submitText = "提交回复";
    }
  },
  computed: {
    access() {
      return this.$store.state.user.access;
    },
    // 管理员
    accessAdmin() {
      return hasOneOf(["admin"], this.access);
    },
    // 责任人
    accessRespons() {
      return hasOneOf(["responsible"], this.access);
    },
    // 经办人
    accessAgent() {
      return hasOneOf(["agent"], this.access);
    }
  }
};
</script>
<style>
.ivu-card-head p,
.ivu-card-head-inner {
  height: 40px;
  line-height: 40px;
}
.info-wrapper {
}
.info-wrapper .info-title strong {
  padding: 10px;
}
.info-wrapper .info-content span {
  padding: 10px;
}
.info-wrapper .info-content {
  padding: 5px 0;
  margin-top: 10px;
  background: #eeeeee;
  font-size: 15px;
  line-height: 15px;
}
.info-wrapper .info-content .info-date {
  padding: 10px;
  font-size: 14px;
}
</style>
