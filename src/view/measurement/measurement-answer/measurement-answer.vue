<template>
  <div>
    <Row class="details" v-if="testDetails">
      <Card>
        <p slot="title" class="details-title">测评统计结果</p>
        <Row>
          <Col :span="8">
            <Row class="details-name">
              <Col :span="8" class="title">测评名称：</Col>
              <Col :span="16">{{testDetails.name}}</Col>
            </Row>
          </Col>
        </Row>
        <Row style="margin-top:20px">
          <Col :span="8">
            <Row class="details-name">
              <Col :span="8" class="title">已测评人数：</Col>
              <Col :span="16">{{testDetails.answerPeople}}</Col>
            </Row>
          </Col>
        </Row>
        <Row style="margin-top:20px">
          <Col :span="12" v-for="(item,index) in testResult" :key="index">
            <div style="background:#eee;padding: 20px">
              <Card :bordered="false">
                <p>{{item.answer}}</p>
              </Card>
            </div>
          </Col>
        </Row>
      </Card>
    </Row>
    <Row v-else>
      <Card>暂无数据</Card>
    </Row>
  </div>
</template>
<script>
import { measurementAjax } from "@/api/measurement";
const QUERY_URL = "/assessmentTest/queryForAnswer";
const KEY_ONE = "measurementInformationFilter";
export default {
  data() {
    return {
      params: "",
      testResult: "",
      testDetails: ""
    };
  },
  methods: {
    _getmeasurementData(url, keyOne, formData, keyTwo = "") {
      measurementAjax({ url, keyOne, formData, keyTwo })
        .then(result => {
          console.log(result);
          if (result.data.code === "200") {
            this.testResult = result.data.results;
            console.log(this.testResult);
            this.testDetails = this.testResult[0];
          } else {
            this.$Message.error(result.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.params = Object.assign(
      {},
      {
        id: this.$route.params.data.id
      }
    );
    this._getmeasurementData(QUERY_URL, KEY_ONE, this.params);
  }
};
</script>
<style >
.details .ivu-card-head {
  padding: 0;
}
.details .ivu-card-head p,
.ivu-card-head-inner {
  color: #ffffff;
  line-height: 50px;
  height: 50px;
  font-size: 16px;
}
.details-title {
  background: #2d8cf0;
  color: #ffffff;
  text-align: center;
}
.details-name {
  height: 30px;
  text-align: center;
  border-bottom: 1px solid #dcdee2;
}
.details-name .title {
  color: #808695;
}
.topic-warpper {
}
.topic-warpper .title {
  display: inline-block;
}
.topic-option {
  padding: 0 20px;
}
.topic {
  margin: 10px 0 0 20px;
}
.topic-count {
  padding: 0 10px;
  font-size: 12px;
}
</style>
