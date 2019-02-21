<template>
  <div>
    <Row>
      <Card>
        <Row>
          <Form :model="formData">
            <FormItem label="权限选择：">
              <Select v-model="formData.access" style="width:200px">
                <Option value="admin">管理员</Option>
                <Option value="responsible">责任人</Option>
                <Option value="agent">经办人</Option>
              </Select>
            </FormItem>
          </Form>
          <Button>提交</Button>
        </Row>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
        <Form :model="formAccess">
          <Row>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="市对县绩效考核指标">
                <i-switch v-model="formAccess.cityAccess" @on-change="cityChange" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="市对县指标管理">
                <i-switch v-model="formAccess.cityIndexManagement" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="市对县指标考核数据">
                <i-switch v-model="formAccess.cityIndexData" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="指标审核审批">
                <i-switch v-model="formAccess.cityIndexAduit" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="县对乡镇绩效考核指标">
                <i-switch v-model="formAccess.countyAccess" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="县对乡镇指标管理">
                <i-switch v-model="formAccess.countyIndexManagement" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="县对乡镇指标考核数据">
                <i-switch v-model="formAccess.countyIndexData" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="指标审核审批">
                <i-switch v-model="formAccess.countyIndexAduit" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="六抓六赛绩效考核指标">
                <i-switch v-model="formAccess.sixAccess" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="六抓六赛指标管理">
                <i-switch v-model="formAccess.sixIndexManagement" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="六抓六赛数据考核">
                <i-switch v-model="formAccess.sixIndexData" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="指标审核审批">
                <i-switch v-model="formAccess.sixIndexAduit" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="正向激励">
                <i-switch v-model="formAccess.incentivesAccess" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="正向激励">
                <i-switch v-model="formAccess.incentivesWatch" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="正向激励审核审批">
                <i-switch v-model="formAccess.incentivesAduit" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="察访核验工作">
                <i-switch v-model="formAccess.investigateAccess" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="已发送邮件">
                <i-switch v-model="formAccess.investigateSend" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="已收到邮件">
                <i-switch v-model="formAccess.investigateReceived" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="编写邮件">
                <i-switch v-model="formAccess.investigateEdit" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="工作督查">
                <i-switch v-model="formAccess.workSupervisionAccess" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="督查指标管理">
                <i-switch v-model="formAccess.workManagement" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="督查考核数据">
                <i-switch v-model="formAccess.workData" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="督查审核审批">
                <i-switch v-model="formAccess.workAduit" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="测评模块">
                <i-switch v-model="formAccess.measurementAccess" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="测评数据管理">
                <i-switch v-model="formAccess.measurementData" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col :xs="12" :sm="12" :md="6" :lg="4">
              <FormItem label="测评数据结果">
                <i-switch v-model="formAccess.measurementResult" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        access: ""
      },
      formAccess: {
        cityAccess: "",
        cityIndexManagement: "", // 指标管理
        cityIndexData: "", // 指标数据考核
        cityIndexAduit: "", // 指标审核
        countyAccess: "",
        countyIndexManagement: "",
        countyIndexData: "",
        countyIndexAduit: "",
        sixAccess: "",
        sixIndexManagement: "",
        sixIndexData: "",
        sixIndexAduit: "",
        incentivesAccess: "", // 主权限
        incentivesWatch: "", // 正向激励查看
        incentivesAduit: "",
        investigateAccess: "",
        investigateSend: "", // 发失邮件
        investigateReceived: "", // 收到邮件
        investigateEdit: "", // 编辑邮件
        workSupervisionAccess: "", // 工作督查
        workManagement: "",
        workData: "",
        workAduit: "",
        measurementAccess: "", // 测评
        measurementData: "",
        measurementResult: ""
      }
    };
  },
  methods: {
    cityChange(state) {
      console.log(state);
    }
  }
};
</script>
<style>
</style>
