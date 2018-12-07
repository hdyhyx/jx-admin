<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" :bordered="false">
        <p slot="title" style="font-size:22px;color:#fff">永泰县绩效管理系统</p>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip"></p>
        </div>
      </Card>
    </div>
    <div class="title-wapper">
      <div class="top-border"></div>
      <h1 class="title">真抓实干、马上就办！</h1>
      <div class="bottom-border"></div>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    handleSubmit({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        if (res.code === "200") {
          this.getUserInfo().then(res => {
            this.$router.push({
              name: this.$config.homeName
            });
          });
        } else {
          this.$Message.error({
            content: res.message,
            duration: 5
          });
        }
      });
    }
  }
};
</script>

<style>
.ivu-card-head {
  padding: 27px 16px;
}
.ivu-card-head p,
.ivu-card-head-inner {
  height: 30px;
  line-height: 30px;
}
</style>
