<template>
  <div>
    <Row>
      <Card shadow>
        <p slot="title">市对县绩效考核指标</p>
        <Form ref="citySearchData" :model="citySearchData" :label-width="100">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="指标搜索" prop="superiorIndexId">
                <Input
                  search
                  placeholder="请输入指标名称"
                  v-model="citySearchData.indexName"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="牵头单位">
                <Select
                  clearable
                  placeholder="请输入牵头单位"
                  v-model="citySearchData.leadUnit"
                  style="width: 150px"
                >
                  <Option v-for="item in getDepartmentList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="预警类型">
                <Select style="width:100px" v-model="citySearchData.warnType">
                  <Option value="0">月度</Option>
                  <Option value="1">季度</Option>
                  <Option value="2">半年度</Option>
                  <Option value="3">年度</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem>
                <Button type="primary" @click="citySubmit(10,1)">提交搜索</Button>
                <Button @click="seachReset('city')" style="margin-left: 8px">重置</Button>
              </FormItem>
            </i-col>
          </Row>
        </Form>
        <Table :loading="cityLoading" border stripe :columns="cityTabelTile" :data="cityData"></Table>
        <div style="margin-top:15px;margin-left:35%">
          <Page
            @on-change="cityPageNumberChange"
            :page-size="cityPageSize"
            :total="cityPageTotal"
            @on-page-size-change="cityPageSizeChange"
            show-elevator
            show-sizer
          />
        </div>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card shadow>
        <p slot="title">县对乡镇绩效考核指标</p>
        <Form ref="contySearchData" :model="countySearchData" :label-width="100">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="指标搜索" prop="superiorIndexId">
                <Input
                  search
                  placeholder="请输入指标名称"
                  v-model="countySearchData.indexName"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="牵头单位">
                <Select
                  clearable
                  placeholder="请输入牵头单位"
                  v-model="countySearchData.leadUnit"
                  style="width: 150px"
                >
                  <Option v-for="item in getDepartmentList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="预警类型">
                <Select style="width:100px" v-model="countySearchData.warnType">
                  <Option value="0">月度</Option>
                  <Option value="1">季度</Option>
                  <Option value="2">半年度</Option>
                  <Option value="3">年度</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem>
                <Button type="primary" @click="countySubmit(10,1)">提交搜索</Button>
                <Button @click="seachReset('county')" style="margin-left: 8px">重置</Button>
              </FormItem>
            </i-col>
          </Row>
        </Form>
        <Table
          :loading="countyLoading"
          border
          stripe
          :columns="countyEndSixTitle"
          :data="countyData"
        ></Table>
        <div style="margin-top:15px;margin-left:35%">
          <Page
            @on-change="countyPageNumberChange"
            :page-size="countyPageSize"
            :total="countyPageTotal"
            @on-page-size-change="countyPageSizeChange"
            show-elevator
            show-sizer
          />
        </div>
      </Card>
    </Row>
    <Row style="margin-top:20px">
      <Card shadow>
        <p slot="title">六抓六赛绩效考核指标</p>
        <Form ref="sixSearchData" :model="sixSearchData" :label-width="100">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="指标搜索" prop="superiorIndexId">
                <Input
                  search
                  placeholder="请输入指标名称"
                  v-model="sixSearchData.indexName"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="牵头单位">
                <Select
                  clearable
                  placeholder="请输入牵头单位"
                  v-model="sixSearchData.leadUnit"
                  style="width: 150px"
                >
                  <Option v-for="item in getDepartmentList" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="预警类型">
                <Select style="width:100px" v-model="sixSearchData.warnType">
                  <Option value="0">月度</Option>
                  <Option value="1">季度</Option>
                  <Option value="2">半年度</Option>
                  <Option value="3">年度</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem>
                <Button type="primary" @click="sixSubmit(10,1)">提交搜索</Button>
                <Button @click="seachReset('six')" style="margin-left: 8px">重置</Button>
              </FormItem>
            </i-col>
          </Row>
        </Form>
        <Table :loading="sixLoading" border stripe :columns="countyEndSixTitle" :data="sixData"></Table>
        <div style="margin-top:15px;margin-left:35%">
          <Page
            @on-change="sixPageNumberChange"
            :page-size="sixPageSize"
            :total="sixPageTotal"
            @on-page-size-change="sixPageSizeChange"
            show-elevator
            show-sizer
          />
        </div>
      </Card>
    </Row>
  </div>
</template>
<script>
import { getWarnAjax } from "@/api/no-entry";
export default {
  data() {
    return {
      // loading
      cityLoading: true,
      countyLoading: true,
      sixLoading: true,
      // search
      citySearchData: {
        leadUnit: "", // 牵头单位
        indexName: "", // 二级指标
        warnType: ""
      },
      countySearchData: {
        leadUnit: "", // 牵头单位
        indexName: "", // 二级指标
        warnType: ""
      },
      sixSearchData: {
        leadUnit: "", // 牵头单位
        indexName: "", // 二级指标
        warnType: ""
      },
      // 页数
      sixPageSize: 10,
      cityPageSize: 10,
      countyPageSize: 10,
      // 页码
      sixPageNumber: 1,
      cityPageNumber: 1,
      countyPageNumber: 1,
      // 总页码
      sixPageTotal: 10,
      cityPageTotal: 10,
      countyPageTotal: 10,
      // 数据
      cityTabelTile: [
        {
          title: "指标名称",
          key: "indexName"
        },
        {
          title: "牵头单位",
          key: "unit"
        },
        {
          title: "处理信息",
          render: (h, params) => {
            let text = "";
            switch (params.row.status) {
              case "0":
                text = "未处理";
                break;
              case "1":
                text = "已通知";
                break;
              case "2":
                text = "已处理";
                break;
              default:
                break;
            }
            return h("div", text);
          }
        },
        {
          title: "预警类型",
          render: (h, params) => {
            let text = "";
            switch (params.row.warnType) {
              case "0":
                text = "月份";
                break;
              case "1":
                text = "季度";
                break;
              case "2":
                text = "半年";
                break;
              case "3":
                text = "年度";
                break;

              default:
                text = "-";
                break;
            }
            return h("div", text);
          }
        },
        {
          title: "预警时间",
          key: "endTime"
        }
      ],
      countyEndSixTitle: [
        {
          title: "指标名称",
          key: "indexName"
        },

        {
          title: "牵头单位",
          key: "unit"
        },
        {
          title: "处理信息",
          render: (h, params) => {
            let text = "";
            switch (params.row.status) {
              case "0":
                text = "未处理";
                break;
              case "1":
                text = "已通知";
                break;
              case "2":
                text = "已处理";
                break;
              default:
                break;
            }
            return h("div", text);
          }
        },
        {
          title: "预警类型",
          render: (h, params) => {
            let text = "";
            switch (params.row.warnType) {
              case "0":
                text = "月份";
                break;
              case "1":
                text = "季度";
                break;
              case "2":
                text = "半年";
                break;
              case "3":
                text = "年度";
                break;

              default:
                text = "-";
                break;
            }
            return h("div", text);
          }
        },
        {
          title: "预警时间",
          key: "endTime"
        }
      ],
      cityData: [],
      countyData: [],
      sixData: []
    };
  },
  methods: {
    // 市对县查询
    citySubmit(pageSize, pageNumber) {
      this.cityPageSize = pageSize;
      this.cityPageNumber = pageNumber;
      this.cityLoading = true;
      this._getWarnCityData(this.citySearchData);
    },
    countySubmit(pageSize, pageNumber) {
      this.countyPageSize = pageSize;
      this.countyPageNumber = pageNumber;
      this.countyLoading = true;
      this._getWarnCountyData(this.countySearchData);
    },
    sixSubmit(pageSize, pageNumber) {
      this.sixPageSize = pageSize;
      this.sixPageNumber = pageNumber;
      this.sixLoading = true;
      this._getWarnSixData(this.sixSearchData);
    },
    // 重置表单
    seachReset(searchType) {
      console.log(searchType);
      if (searchType === "city") {
        this.citySearchData = {
          leadUnit: "", // 牵头单位
          indexName: "", // 二级指标
          warnType: ""
        };
      } else if (searchType === "county") {
        this.countySearchData = {
          leadUnit: "", // 牵头单位
          indexName: "", // 二级指标
          warnType: ""
        };
      } else {
        this.sixSearchData = {
          leadUnit: "", // 牵头单位
          indexName: "", // 二级指标
          warnType: ""
        };
      }
    },
    // 页码
    sixPageNumberChange(pageNumber) {
      this.sixPageNumber = pageNumber;
      this._getWarnSixData(this.sixSearchData);
    },
    cityPageNumberChange(pageNumber) {
      this.cityPageNumber = pageNumber;
      this._getWarnCityData(this.citySearchData);
    },
    countyPageNumberChange(pageNumber) {
      this.countyPageNumber = pageNumber;
      this._getWarnCountyData(this.countySearchData);
    },
    // 页数
    sixPageSizeChange(pageSize) {
      this.sixPageSize = pageSize;
      this._getWarnSixData(this.citySearchData);
    },
    cityPageSizeChange(pageSize) {
      this.cityPageSize = pageSize;
      this._getWarnCityData(this.citySearchData);
    },
    countyPageSizeChange(pageSize) {
      this.countyPageSize = pageSize;
      this._getWarnCountyData(this.cityPageSize);
    },
    // 获取市对县数据
    _getWarnCityData(formData) {
      formData = Object.assign(formData, {
        pageNumber: this.cityPageNumber,
        pageSize: this.cityPageSize
      });
      let keyOne = "warnFilter";
      let url = "/warning/queryForCount";
      getWarnAjax({ formData, keyOne, url })
        .then(result => {
          this.cityLoading = false;
          if (result.data.code === "200") {
            this.cityData = result.data.results.list;
            this.cityPageTotal = parseInt(result.data.results.pageTotal) * 10; // 总页数
          } else {
            this.$Message.error(result.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取乡镇指标数据
    _getWarnCountyData(formData) {
      formData = Object.assign(formData, {
        pageNumber: this.countyPageNumber,
        pageSize: this.countyPageSize
      });
      let keyOne = "warnFilter";
      let url = "/warning/queryForTown";
      getWarnAjax({ formData, keyOne, url })
        .then(result => {
          this.countyLoading = false;
          if (result.data.code === "200") {
            console.log(result);
            this.countyData = result.data.results.list;
            this.countyPageTotal = parseInt(result.data.results.pageTotal) * 10; // 总页数
            console.log(this.countyPageTotal);
          } else {
            this.$Message.error(result.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取六抓六赛数据
    _getWarnSixData(formData) {
      formData = Object.assign(formData, {
        pageNumber: this.sixPageNumber,
        pageSize: this.sixPageSize
      });
      let keyOne = "warnFilter";
      let url = "/warning/queryForSix";
      getWarnAjax({ formData, keyOne, url })
        .then(result => {
          this.sixLoading = false;
          if (result.data.code === "200") {
            console.log(result);
            this.sixData = result.data.results.list;
            this.sixPageTotal = parseInt(result.data.results.pageTotal) * 10; // 总页数
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
    this._getWarnCityData(this.citySearchData);
    this._getWarnCountyData(this.countySearchData);
    this._getWarnSixData(this.sixSearchData);
  },
  computed: {
    getDepartmentList() {
      return this.$store.state.user.departmentList;
    }
  }
};
</script>
<style>
</style>
