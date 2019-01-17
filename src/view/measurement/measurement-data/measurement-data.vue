<template>
  <div>
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="试卷名称" prop="name">
                <Input
                  v-model="searchData.name"
                  suffix="ios-search"
                  placeholder="请输入测评试卷名称"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="测评类型">
                <Select clearable v-model="searchData.type" style="width:200px">
                  <Option value="0">指定对象</Option>
                  <Option value="1">不指定对象</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="开始时间">
                <DatePicker
                  type="date"
                  format="yyyy-MM-dd"
                  @on-change="searchSelectStart"
                  placeholder="按年份搜索"
                  style="width:185px"
                  v-model="searchData.startTime"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="截止时间">
                <DatePicker
                  type="date"
                  format="yyyy-MM-dd"
                  @on-change="searchSelectEnd"
                  placeholder="按年份搜索"
                  style="width:185px"
                  v-model="searchData.endTime"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="测评对象" prop="testObj" v-show="false || searchData.type === '0'">
                <Select v-model="searchData.testObj" multiple style="width:200px">
                  <Option
                    v-for="item in testObj"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
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
        </Form>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
        <Button @click="insertMeasurement">添加测评</Button>
        <Table
          border
          highlight-row
          :loading="tabelLoading"
          ref="currentRowTable"
          :columns="tabelTitle"
          :data="tabelContent"
        ></Table>
        <div style="margin-top:20px;margin-left:35%">
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
  </div>
</template>
<script>
import { measurementAjax } from "@/api/measurement";
// 查询
const QUERY_URL = "/assessmentTest/query";
// 删除
const DELETE_URL = "/assessmentTest/delete";
export default {
  data() {
    return {
      tabelLoading: false,
      searchLoading: false,
      searchData: {
        testObj: [],
        name: "", //
        type: "", //
        startTime: "", // 审核状态
        endTime: "" // 指标名称
      },
      tabelTitle: [
        {
          title: "测评标题",
          key: "name"
        },
        {
          title: "测评类型",
          key: "type",
          render: (h, params) => {
            var text = params.row.type === "0" ? "指定对象" : "不指定对象";

            return h("div", [h("strong", text)]);
          }
        },
        {
          title: "测评对象",
          key: "testObj"
        },
        {
          title: "开始时间",
          key: "startTime"
        },
        {
          title: "截止时间",
          key: "endTime"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "measurement_pages",
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "删除测试",
                        content: "<p>删除后将无法恢复！</p>",
                        loading: true,
                        onOk: () => {
                          var formData = Object.assign(
                            {},
                            {
                              id: params.row.id
                            }
                          );
                          var url = DELETE_URL;
                          var keyOne = "measurementInformationEntity";
                          var keyTwo = "";
                          measurementAjax({ formData, url, keyOne, keyTwo })
                            .then(result => {
                              this.$Modal.remove();
                              if (
                                result.data.code === "200" &&
                                result.data !== undefined
                              ) {
                                this.$Message.success("删除成功");
                                this._getMeasurementData(
                                  this.searchData,
                                  this.pageSize,
                                  this.pageNumber
                                );
                              } else {
                                this.$Message.error(result.data.message);
                              }
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tabelContent: [],
      searchReg: {},
      pageTotal: 10,
      pageNumber: 1,
      pageSize: 10,
      testObj: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ]
    };
  },
  filters: {
    optionName(value) {
      var subTitle = "";
      switch (value) {
        case 0:
          subTitle = "选项A：";
          break;
        case 1:
          subTitle = "选项B：";
          break;
        case 2:
          subTitle = "选项C：";
          break;
        case 3:
          subTitle = "选项D：";
          break;
        case 4:
          subTitle = "选项E：";
          break;
        default:
          subTitle = "选项F：";
          break;
      }
      return subTitle;
    }
  },
  methods: {
    inserOption(vla) {
      var i = 1;
      this.options.push(i++);
    },
    // 添加测评
    insertMeasurement() {
      this.$router.push({
        name: "measurement_pages",
        params: {}
      });
    },
    // 开始日期
    searchSelectStart(date) {
      this.searchData.startTime = date;
    },
    // 截止日期
    searchSelectEnd(date) {
      this.searchData.endTime = date;
    },
    // 页码
    pageNumberChange(pageNumber) {
      this.pageNumber = pageNumber;
    },
    // 页数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    submitReset() {
      this.searchData = {
        cityResponUnit: "", // 责任单位
        leadUnit: "", // 牵头单位
        indexName: "", // 指标名称
        dateTime: "", // 年份
        audit: ""
      };
      this.searchLoading = false;
    },
    // 搜索提交
    searchSubmit(pageSize, pageNumber) {
      this.pageSize = pageSize;
      this.pageNumber = pageNumber;
      this.searchLoading = true;
      this._getMeasurementData(this.searchData, this.pageSize, this.pageNumber);
    },
    // 查询
    _getMeasurementData(searchData, pageSize, pageNumber) {
      this.tabelLoading = true;
      var url = QUERY_URL;
      var keyOne = "measurementInformationFilter";
      var keyTwo = "";
      var formData = Object.assign(searchData, {
        pageSize: pageSize,
        pageNumber: pageNumber
      });
      measurementAjax({ formData, url, keyOne, keyTwo })
        .then(result => {
          this.tabelLoading = false;
          this.searchLoading = false;
          console.log(result);
          if (result.data.code === "200" && result.data !== undefined) {
            this.tabelContent = result.data.results.list;
            this.pageTotal = parseInt(result.data.results.pageTotal);
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
    this._getMeasurementData(this.searchData, this.pageSize, this.pageNumber);
  }
};
</script>
<style>
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
