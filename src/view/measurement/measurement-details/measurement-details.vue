<template>
  <div>
    <Row class="details">
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
              <Col :span="8" class="title">需测评人数：</Col>
              <Col :span="16">{{testDetails.totalPeople}}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col
            :span="8"
            style="height:330px;margin-top:20px;"
            v-for="(item,index) in testResult"
            :key="index"
          >
            <div class="topic-warpper">
              <h3 class="title">{{item.question}}</h3>
              <span class="topic-option">({{item.type==='0'?'单选':'多选'}})</span>
            </div>
            <p class="topic" v-if="item.optionA!==''">
              <Tag type="dot" color="primary">{{item.optionA}}</Tag>
              <span class="topic-count">{{item.optionANum}}</span>
            </p>
            <p class="topic" v-if="item.optionB!==''">
              <Tag type="dot" color="primary">{{item.optionB}}</Tag>
              <span class="topic-count">{{item.optionBNum}}</span>
            </p>
            <p class="topic" v-if="item.optionC!==''">
              <Tag type="dot" color="primary">{{item.optionC}}</Tag>
              <span class="topic-count">{{item.optionCNum}}</span>
            </p>
            <p class="topic" v-if="item.optionD!==''">
              <Tag type="dot" color="primary">{{item.optionD}}</Tag>
              <span class="topic-count">{{item.optionDNum}}</span>
            </p>
            <p class="topic" v-if="item.optionE!==''">
              <Tag type="dot" color="primary">{{item.optionE}}</Tag>
              <span class="topic-count">{{item.optionENum}}</span>
            </p>
            <p class="topic" v-if="item.optionF!==''">
              <Tag type="dot" color="primary">{{item.optionF}}</Tag>
              <span class="topic-count">{{item.optionFNum}}</span>
            </p>
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
</template>
<script>
import { measurementAjax } from "@/api/measurement";
const QUERY_URL = "/answer/queryForAnswerCount";
const KEY_ONE = "answerFilter";
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
          if (result.data.code === "200") {
            this.testResult = result.data.results;
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
