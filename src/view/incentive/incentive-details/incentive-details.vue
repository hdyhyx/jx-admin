<template>
  <div>
    <Row>
      <Card>
        <Row>
          <i-col :xs="24" :md="24" :lg="12">
            <Row style="margin-bottom:20px">
              <h2>正向激励详细情况</h2>
            </Row>
            <Row>
              <i-col :xs="24" :md="12" :lg="12">
                <Tag type="dot" color="primary">事项名称</Tag>
                <span>{{incentiveItem.incentive}}</span>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12">
                <Tag type="dot" color="primary">加分类别</Tag>
                <span>{{incentiveItem.pointsType}}</span>
              </i-col>
            </Row>
            <Row style="margin-top:20px">
              <i-col :xs="24" :md="12" :lg="12">
                <Tag type="dot" color="primary">表彰单位</Tag>
                <span>{{incentiveItem.recognitionUnit}}</span>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12">
                <Tag type="dot" color="primary">被表彰单位</Tag>
                <span>{{incentiveItem.commendedUnit}}</span>
              </i-col>
            </Row>
            <Row style="margin-top:20px">
              <i-col :xs="24" :md="12" :lg="12">
                <Tag type="dot" color="primary">加分分值</Tag>
                <span>{{incentiveItem.point}}</span>
              </i-col>
              <i-col :xs="24" :md="12" :lg="12">
                <Tag type="dot" color="primary">年份</Tag>
                <span>{{incentiveItem.dateTime}}</span>
              </i-col>
            </Row>
            <Row style="margin-top:20px">
              <i-col :xs="24" :md="12" :lg="12">
                <Tag type="dot" color="primary">审核状态</Tag>
                <span>{{incentiveItem.audit | auditState}}</span>
              </i-col>
            </Row>
            <Row style="margin-top:20px">
              <i-col :xs="24" :md="24" :lg="24">
                <Tag type="dot" color="primary">证明材料名称</Tag>
                <span>{{incentiveItem.fileName}}</span>
              </i-col>
            </Row>
            <Row v-if="audit" style="margin:20px 0">
              <i-col :xs="24" :md="12" :lg="24">
                <Tag type="dot" color="error">回退原因</Tag>
                <Input
                  v-model="reason"
                  type="textarea"
                  style="z-index:10;padding:10px 20px 0 0"
                  :rows="3"
                  placeholder="如果进行回退操作。请说明回退原因"
                />
              </i-col>
            </Row>
          </i-col>
          <Row>
            <i-col :xs="24" :md="24" :lg="12">
              <Carousel v-model="value2" style="height:500px">
                <CarouselItem v-for="(item ,index) in incentiveItem.fileList" :key="index">
                  <div class="demo-carousel">
                    <img class="demo-img" :src="HOST+item.url" width="100%" height="auto">
                  </div>
                </CarouselItem>
              </Carousel>
            </i-col>
          </Row>
        </Row>
      </Card>
    </Row>
    <Row style="margin-top:20px" v-if="audit">
      <Card>
        <Button type="success" :loading="isAuditLoading" @click="submitAudit">审核通过</Button>
        <Button
          type="error"
          :loading="isReasonLoading"
          @click="submitReason"
          style="margin-left:10px"
        >回退</Button>
      </Card>
    </Row>
  </div>
</template>
<script>
import { incentiveAjax } from "@/api/city";
import { HOST } from "@/libs/util";
export default {
  data() {
    return {
      value2: 0, // 轮播的起始播放
      isAuditLoading: false, // 提交通过LOADING
      isReasonLoading: false, // 退回通过LOADING
      incentiveItem: "", // 事项数据
      audit: false, // 是否
      reason: "", // 回退原因
      HOST: "" // http//192.....
    };
  },
  methods: {
    submitAudit() {
      this.isAuditLoading = true;
      const url = "/incentive/pass";
      this._incentiveAjax(url, this.incentiveItem);
    },
    submitReason() {
      if (this.reason === "") {
        this.$Message.error("请填写回退原因");
        retrun;
      }
      this.incentiveItem = Object.assign(this.incentiveItem, {
        reason: this.reason
      });
      console.log(this.incentiveItem);
      this.isReasonLoading = true;
      const url = "/incentive/noPass";
      this._incentiveAjax(url, this.incentiveItem);
    },
    // AJAX
    _incentiveAjax(url, formData, pageSize, pageNumber) {
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      const keyOne = "incentiveEntity";
      const keyTwo = "";
      incentiveAjax({ url, formData, keyOne, keyTwo })
        .then(result => {
          console.log(result);
          if (result.data.code === "200") {
            this.$Message.success("操作成功");
            this.isAuditLoading = false;
            this.isReasonLoading = false;
          } else {
            this.$Message.error("操作失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
    auditState(value) {
      var text = "";
      switch (value) {
        case "0":
          text = "未审核";
          break;
        case "1":
          text = "已审核";
          break;
        case "2":
          text = "回退";
          break;
        default:
          break;
      }
      return text;
    }
  },
  created() {
    this.HOST = HOST;
    var param = this.$route.params;
    this.incentiveItem = param.incentiveItem;
    this.audit = param.audit;
  }
};
</script>
<style>
.demo-img {
  height: 100%;
}
.ivu-carousel-list {
  height: 500px;
}
.ivu-carousel-track {
  height: 500px;
}
.ivu-carousel-item {
  height: 500px;
}
.demo-carousel {
  height: 500px;
}
</style>
