<template>
  <div>
    <Row>
      <Card>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="收件人" prop="addressee" style="width:300px">
            <Select placeholder="请输入收件单位" v-model="formValidate.addressee" style="width: auto">
              <Option v-for="item in getDepartmentList" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="察访核验对象" prop="type" style="width:300px">
            <Select placeholder="选择察访核验对象" v-model="formValidate.type" style="width: auto">
              <Option value="0">对全县察访核验</Option>
              <Option value="1">对单位或乡镇察访核验</Option>
            </Select>
          </FormItem>
          <FormItem label="截止日期" prop="endTime">
            <DatePicker
              type="date"
              :value="formValidate.endTime"
              @on-change="selectDateTime"
              placeholder="请选择截止日期"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="上传附件">
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
                @click="removeFile"
                :loading="loadingStatus"
              >{{ loadingStatus ? '删除中' : '删除文件' }}</Button>
            </div>
          </FormItem>
          <FormItem label="内容" prop="content">
            <Input v-model="formValidate.content" type="textarea" placeholder="具体内容"/>
          </FormItem>
          <FormItem>
            <Button type="primary" :loading="submitLoading" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="error" @click="handleReset('formValidate')" style="margin-left:10px">重置</Button>
          </FormItem>
        </Form>
      </Card>
    </Row>
  </div>
</template>
<script>
import { investigateAjax } from "@/api/investigate";
import { deleteAjax } from "@/api/city";
// 添加文件
const INSERT_URL = "/check/send";
export default {
  data() {
    return {
      file: null,
      loadingStatus: false,
      updateLoading: false,
      submitLoading: false,
      formValidate: {
        title: "", // 标题
        type: "",
        addressee: "", // 收件人
        content: "", // 内容
        endTime: "" // 截止日期
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        addressee: [
          {
            required: true,
            message: "请输入收件人",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请输入察访核验对象",
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: true,
            message: "请选择截止日期",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入具体内容",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          // url
          var url = INSERT_URL;
          // formdata
          var formData = Object.assign(this.formValidate, {
            file: this.file === null ? "" : this.file.response.results.fileId
          });
          // key
          var keyOne = "checkEntity";
          investigateAjax({ url, formData, keyOne }).then(res => {
            if (res.data.code === "200") {
              this.submitLoading = false;
              this.$Message.success("发送成功");
              this.file = null;
              // 上传成功重置input框
              this.handleReset();
            } else {
              this.message.error("发送失败！请刷新页面后重试");
            }
          });
        } else {
          this.$Message.error("带*必须填写!");
        }
      });
    },
    handleReset() {
      this.$refs["formValidate"].resetFields();
      this.submitLoading = false;
    },
    // 截止日期
    selectDateTime(date) {
      this.formValidate.endTime = date;
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
    removeFile() {
      this._emptyFile(this.file.response.results.fileId);
    },
    _emptyFile(formData) {
      this.loadingStatus = true;
      // 已数组的格式传给后台
      formData = [formData];
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
    }
  },
  computed: {
    getDepartmentList() {
      return this.$store.state.user.departmentList;
    }
  },
  destroyed() {
    if (this.file !== null) {
      this._emptyFile(this.file.response.results.fileId);
    }
  }
};
</script>
