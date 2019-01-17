<template>
  <div>
    <Row>
      <Card>
        <Form ref="searchData" :model="searchData" :label-width="80">
          <Row>
            <i-col :xs="12" :md="12" :lg="6">
              <FormItem label="文件状态" prop="state">
                <Select v-model="searchData.status" placeholder="请选择指标等级" style="width:185px">
                  <Option value="0">未读</Option>
                  <Option value="1">已读</Option>
                  <Option value="2">未审核</Option>
                  <Option value="3">未评分</Option>
                  <Option value="4">回退</Option>
                  <Option value="5">办结</Option>
                  <Option value="6">逾期</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="12" :md="12" :lg="6">
              <FormItem label="收件单位">
                <Select placeholder="请输入收件单位" v-model="searchData.addressee" style="width: 150px">
                  <Option v-for="item in getDepartmentList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col :xs="12" :md="12" :lg="6">
              <FormItem label="收到时间">
                <DatePicker
                  type="date"
                  @on-change="searchTime"
                  v-model="searchData.date"
                  placeholder="请选择时间"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col :xs="12" :md="12" :lg="6">
              <FormItem label="标题">
                <Input search placeholder="请输入标题" v-model="searchData.title" style="width: auto">
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
          </Row>
          <FormItem>
            <Button type="primary" :loading="searchLoading" @click="searchSubmit(10,1)">提交搜索</Button>
            <Button @click="seachReset('searchData')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card>
        <Table border :loading="tabelLoading" :columns="tabelTitle" :data="tabelData"></Table>
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
import { investigateAjax } from "@/api/investigate";
import { deleteAjax } from "@/api/city";
// 添加文件
const INSERT_URL = "/check/send";
// 查询
const QUERY_URL = "/check/query";
export default {
  data() {
    return {
      watchEmail: false, // 显示增加模态框
      searchLoading: false, // 搜索提交loading
      tabelLoading: false, // 表格loading
      investigateItem: {}, // 单条数据
      pageTotal: 10,
      pageSize: 10,
      pageNumber: 1,
      submitloading: false,
      inboxContent: {},
      scoreItem: {
        score: ""
      },
      scoreItemReg: {
        score: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur"
          }
        ]
      },
      searchData: {
        addressee: "",
        receiveUnit: "",
        gmt_create: "", // 日期搜索
        title: ""
      },
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        fontWeight: "600",
        marginBottom: "16px"
      },
      tabelTitle: [
        {
          title: "收件单位",
          key: "addressee",
          width: 300,
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.addressee)
            ]);
          }
        },

        {
          title: "标题",
          key: "title"
        },
        {
          title: "收到时间",
          width: 150,
          key: "gmtCreate"
        },
        {
          title: "截止时间",
          width: 150,
          key: "endTime",
          render: (h, params) => {
            return h("div", {}, params.row.endTime + " 23:59:59");
          }
        },
        {
          title: "反馈状态",
          width: 150,
          key: "status",
          render: (h, params) => {
            var statusVal = "";
            switch (params.row.status) {
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
            return h("div", {}, statusVal);
          }
        },
        {
          title: "操作", // <Icon type="ios-trash-outline" />
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
                        name: "investigate_watchEmail",
                        params: {
                          investigateItem: params.row
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
      tabelData: []
    };
  },
  methods: {
    // 搜素日期
    searchTime(date) {
      this.searchData.gmt_create = date;
    },
    // 页码
    pageNumberChange(pageNumber) {
      this.pageNumber = pageNumber;
      this._getInvesigateData(
        QUERY_URL,
        this.searchData,
        this.pageSize,
        this.pageNumber
      );
    },
    // 页数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._getInvesigateData(
        QUERY_URL,
        this.searchData,
        this.pageSize,
        this.pageNumber
      );
    },
    closeWatchEmail() {
      this.watchEmail = false;
    },
    searchSubmit(pageSize, pageNumber) {
      this.pageSize = pageSize;
      this.pageNumber = pageNumber;
      this.searchLoading = true;
      this._getInvesigateData(
        QUERY_URL,
        this.searchData,
        this.pageSize,
        this.pageNumber
      );
    },
    seachReset() {
      this.searchLoading = false;
      this.searchData = {
        addressee: "",
        receiveUnit: "",
        gmt_create: "", // 日期搜索
        title: ""
      };
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    // ajax
    _getInvesigateData(url, formData, pageSize, pageNumber) {
      this.tabelLoading = true;
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      const keyOne = "checkFilter";
      investigateAjax({ url, formData, keyOne }).then(result => {
        this.tabelLoading = false;
        this.searchLoading = false;
        if (result.data.code === "200") {
          this.tabelData = result.data.results.list;
          this.departmentList = result.data.results.department;
          this.pageTotal = parseInt(result.data.results.pageTotal) * 10;
          this.$Message.success("查询成功");
        } else {
          this.$Message.error("查询失败");
        }
      });
    }
  },
  computed: {
    getDepartmentList() {
      return this.$store.state.user.departmentList;
    }
  },
  created() {
    this._getInvesigateData(QUERY_URL, "", this.pageSize, this.pageNumber);
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
