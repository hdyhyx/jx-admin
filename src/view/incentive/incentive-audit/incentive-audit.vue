<template>
  <div>
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="搜索事项" prop="name">
                <Input
                  v-model="searchData.incentive"
                  suffix="ios-search"
                  placeholder="请输入事项名称"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="加分类别" prop="name">
                <Select v-model="searchData.pointsType" style="width:200px" clearable>
                  <Option value="1">第 1 类</Option>
                  <Option value="2">第 2 类</Option>
                  <Option value="3">第 3 类</Option>
                  <Option value="4">第 4 类</Option>
                  <Option value="5">第 5 类</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="表彰机关" prop="name">
                <Input
                  v-model="searchData.recognitionUnit"
                  placeholder="请输入表彰机关"
                  style="width: auto"
                ></Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="被表彰机关" prop="name">
                <Input
                  v-model="searchData.commendedUnit"
                  placeholder="请输入被表彰机关"
                  style="width: auto"
                ></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="审核状态" prop="name">
                <Select v-model="searchData.audit" style="width:200px" clearable>
                  <Option value="0">全部</Option>
                  <Option value="2">未审核</Option>
                  <Option value="3">回退</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="年份">
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
    <Row style="margin-top:10px">
      <Card>
        <Table border :columns="incentiveHead" :loading="tabelLoading" :data="incentiveData"></Table>
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
  </div>
</template>
<script>
import { incentiveAjax } from "@/api/city";
export default {
  data() {
    return {
      pageTotal: 10, // 总页数
      pageSize: 10, // 页数
      pageNumber: 1, // 页码
      searchLoading: false, // 搜索Loading
      tabelLoading: true, // 表格Loading
      searchData: {
        incentive: "", // 事项名称
        pointsType: "", // 加分类别
        recognitionUnit: "", // 表彰机关
        commendedUnit: "", // 被表彰机关
        audit: "", // 审核状态,
        dateTime: "" // 年份
      },
      // 表单
      searchReg: {},
      incentiveHead: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "事项名称",
          key: "incentive"
        },
        {
          title: "表彰机关",
          key: "recognitionUnit"
        },
        {
          title: "被表彰单位",
          key: "commendedUnit"
        },
        {
          title: "加分类别",
          key: "pointsType",
          maxWidth: 90
        },
        {
          title: "审批状态",
          key: "audit",
          width: 100,
          align: "center",
          render: (h, params) => {
            var color = "";
            var text = "";
            var isDisabled = false;
            switch (params.row.audit) {
              case "0":
                color = "default";
                text = "未审核";
                break;
              case "1":
                color = "success";
                text = "已审核";
                isDisabled = true;
                break;
              case "2":
                color = "error";
                text = "回退";
                break;
              default:
                break;
            }
            return h(
              "Button",
              {
                props: {
                  type: color,
                  disabled: isDisabled
                }
              },
              text
            );
          }
        },
        {
          title: "证明材料",
          key: "fileName"
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "incentive_details",
                        params: {
                          incentiveItem: params.row,
                          audit: true
                        }
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      incentiveData: []
    };
  },
  methods: {
    submitReset() {
      this.submitLoading = false;
      this.searchData = {
        incentive: "", // 事项名称
        pointsType: "", // 加分类别
        recognitionUnit: "", // 表彰机关
        commendedUnit: "", // 被表彰机关
        audit: "", // 审核状态,
        dateTime: "" // 年份
      };
    },
    // 搜索
    searchSubmit(pageSize, pageNumber) {
      this._getIncentive(this.searchData, pageSize, pageNumber);
    },
    // form表单选择年份
    formSelectYear(year) {
      this.mattersForm.dateTime = year;
    },
    // 关闭抽屉
    closeDrawer() {
      this.isShowMatters = false;
      this.submitLoading = false;
    },
    // 页码
    pageNumberChange(pageNumber) {
      this.pageNumber = pageNumber;
      this._getIncentive(this.searchData, this.pageSize, this.pageNumber);
    },
    // 页数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._getIncentive(this.searchData, this.pageSize, this.pageNumber);
    },
    // 添加事项
    appendMatter() {
      this.isShowMatters = true;
    },
    // 搜索框年份选择
    searchSelectYear(year) {
      this.searchData.dateTime = year;
    },

    // 搜索
    _getIncentive(formData, pageSize, pageNumber) {
      this.tabelLoading = true;
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      const url = "/incentive/audit";
      const keyOne = "incentiveFilter";
      const keyTwo = "";
      incentiveAjax({ formData, url, keyOne, keyTwo })
        .then(result => {
          this.tabelLoading = false;
          this.incentiveData = [];
          if (result.data.code === "200") {
            result.data.results.list.forEach(item => {
              this.incentiveData.push(item.incentive);
            });
            this.pageTotal = parseInt(result.data.results.total) * 10;
            this.$Message.success("查询成功");
          } else {
            this.$Message.error("查询失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // 获取tabel数据
    this._getIncentive(this.searchData, this.pageSize, this.pageNumber);
    // 饼图数据
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
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
