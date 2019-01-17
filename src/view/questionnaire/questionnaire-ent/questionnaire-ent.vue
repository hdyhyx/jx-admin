<template>
  <div class="questionnaire">
    <Row type="flex">
      <Col :span="12">
        <div class="lf-tp-img"></div>
      </Col>
      <Col :span="12">
        <div class="rg-tp-img"></div>
      </Col>
    </Row>
    <Row type="flex" justify="space-around">
      <Col :xs="24" :md="12" :lg="12">
        <div class="wrapper">
          <div class="note-content" @click="routerLink('note')">
            <div class="note-border">
              <div class="note-bg">
                <h2 class="title">短信用户</h2>
                <div class="content-img"></div>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col :xs="24" :md="12" :lg="12">
        <div class="wrapper">
          <div class="note-content" @click="routerLink('random')">
            <div class="note-border">
              <div class="note-bg">
                <h2 class="title">随机用户</h2>
                <div class="random-img"></div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
    <Row type="flex">
      <Col :lg="12">
        <div class="lf-bm-img"></div>
      </Col>
      <Col :lg="12">
        <div class="rg-bm-img"></div>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    routerLink(info) {
      this.$router.push({
        name: "test_page",
        params: {
          option: info
        }
      });
    }
  }
};
</script>
<style>
.questionnaire {
  width: 100%;
  height: 100%;
  text-align: center;
  overflow-y: scroll;
}
.wrapper {
  height: 750px;
  position: relative;
}
.wrapper .title {
  padding: 100px 0;
  font-size: 35px;
  letter-spacing: 5px;
  color: #ffffff;
}
.lf-tp-img {
  background: url("../../../assets/qusetionnaire/bg.png");
  margin: 10px 0 0 10px;
  width: 31px;
  height: 31px;
  background-size: cover;
  background-position: center;
}
.rg-tp-img {
  float: right;
  background: url("../../../assets/qusetionnaire/bg.png");
  margin: 10px 20px 0 0;
  width: 31px;
  height: 31px;
  background-size: cover;
  background-position: center;
}
.lf-bm-img {
  background: url("../../../assets/qusetionnaire/bg.png");
  margin: 0 0 20px 10px;
  width: 31px;
  height: 31px;
  background-size: cover;
  background-position: center;
}
.rg-bm-img {
  float: right;
  background: url("../../../assets/qusetionnaire/bg.png");
  margin: 0 20px 0px 0px;
  width: 31px;
  height: 31px;
  background-size: cover;
  background-position: center;
}
.wrapper .note-content {
  width: 477px;
  height: 670px;
  background: #c5c8ce;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  cursor: pointer;
}
.wrapper .note-content:hover {
  background: #5cadff;
}
.wrapper .note-content .content-img {
  width: 250px;
  height: 300px;
  margin: 0 auto;
  background: url("../../../assets/qusetionnaire/note.png");
  background-size: 100% 100%;
  background-position: center;
}
.random-img {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  background: url("../../../assets/qusetionnaire/random.png");
  background-size: cover;
  background-position: center;
}
.wrapper .note-content .note-border {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.note-content .note-border .note-bg {
  width: 100%;
  height: 100%;
  background: #808695;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #808695;
}
.note-content .note-border .note-bg:hover {
  background: #2b85e4;
  box-shadow: 5px 5px 5px #2b85e4;
}
@media screen and (max-width: 1500px) {
  .wrapper {
    height: 550px;
    position: relative;
  }
  .wrapper .note-content {
    width: 350px;
    height: 500px;
  }
  .wrapper .title {
    padding: 80px 0;
    font-size: 30px;
  }
  .wrapper .note-content .random-img {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    background: url("../../../assets/qusetionnaire/random.png");
    background-size: cover;
    background-position: center;
  }
  .wrapper .note-content .content-img {
    width: 160px;
    height: 200px;
    margin: 0 auto;
    background: url("../../../assets/qusetionnaire/note.png");
    background-size: 100% 100%;
    background-position: center;
  }
}
</style>
