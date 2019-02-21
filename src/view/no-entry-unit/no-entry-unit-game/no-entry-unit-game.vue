<template>
  <div>
    <Row>
      <Card>
        <Form ref="searchData" :model="searchData" :rules="searchReg" :label-width="100">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="指标搜索" prop="superiorIndexId">
                <Input
                  search
                  placeholder="请输入指标名称"
                  v-model="searchData.indexName"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="责任单位">
                <Input
                  search
                  placeholder="请输入搜索内容"
                  v-model="searchData.ducyUnit"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix"/>
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="牵头单位">
                <Input
                  search
                  placeholder="请输入牵头单位"
                  v-model="searchData.leadUnit"
                  style="width: auto"
                ></Input>
              </FormItem>
            </i-col>
          </Row>
          <FormItem>
            <Button type="primary" @click="seachSubmit(10,1)">提交搜索</Button>
            <Button @click="seachReset('searchData')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </Card>
    </Row>
    <Row style="margin-top:20px;">
      <Card>
        <Row style="margin-bottom:20px;">
          <i-col :xs="24" :md="24" :lg="12">
            <Tag type="dot" color="primary">已选中：</Tag>
            <div class="selectAarry">
              <div class="select-contaier">
                <Tag
                  style="margin:5px 0"
                  v-for="(item,index) in selectList"
                  :key="index"
                  :name="item.indexName"
                >{{ item.indexName}}</Tag>
              </div>
            </div>
          </i-col>
          <i-col :xs="24" :md="24" :lg="12">
            <div style="margin:40px 0 0 40px">
              <span>填写截止日期：</span>
              <DatePicker
                type="date"
                format="yyyy-MM-dd"
                v-model="endTime"
                @on-change="handlerFormat"
                placeholder="请选择截止日期"
                style="width: 200px"
              ></DatePicker>
              <span style="margin-left:10px">预警类型：</span>
              <Select style="width:100px" v-model="warnType">
                <Option value="0">月度</Option>
                <Option value="1">季度</Option>
                <Option value="2">半年度</Option>
                <Option value="3">年度</Option>
              </Select>
            </div>
            <div style="text-align: center;margin-top:20px">
              <Button
                :loading="submitLoading"
                @click="submitIndex"
                type="success"
                style="margin-left:10px"
                :disabled="!selectList.length"
              >提交</Button>
            </div>
          </i-col>
        </Row>
        <Table
          :loading="tableLoading"
          @on-select-all="selectAll"
          @on-select-all-cancel="selectAllCancel"
          border
          stripe
          @on-select="selectRow"
          @on-select-cancel="selectCancel"
          ref="selection"
          :columns="columns1"
          :data="indexData"
        ></Table>
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
import { countyAjax } from "@/api/city";
import { noEntryAjax } from "@/api/no-entry";
export default {
  data() {
    return {
      submitLoading: false,
      tableLoading: true,
      endTime: "", // 预警时间
      warnType: "0", // 0 月度,1季度，2 半年 ，3年度
      selectList: [], // 选中的数据
      pageTotal: 10, // 总页数
      pageSize: 10, // 页数
      pageNumber: 1, // 页码
      searchData: {
        indexType: "二级指标",
        superiorIndexId: "", // 一级指标
        leadUnit: "", // 牵头单位
        indexName: "", // 二级指标
        responsibilityUnit: "", // 责任单位
        dateTime: "" // 年份
      },
      selectIndexType: [
        // 搜索指标里的关联指标
        {
          label: "全部",
          value: "全部"
        }
      ],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "一级指标",
          key: "superiorIndexId"
        },
        {
          title: "二级指标",
          key: "superiorIndexId",
          render: (h, params) => {
            const row = params.row;
            var color = row.endTime === null ? "primary" : "success";
            var text = row.indexName;

            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "牵头单位",
          render: (h, params) => {
            const row = params.row;
            var color = "";
            var text = row.mainUnit === null ? row.leadUnit : row.mainUnit;
            if (text === null || text === "") {
              text = "-";
            }
            return h("div", text);
          }
        },
        {
          title: "责任单位",
          key: "responsibilityUnit"
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
          title: "截止日期",
          key: "endTime",
          width: 100,
          render: (h, params) => {
            var endTime =
              params.row.endTime === null ? "-" : params.row.endTime;
            return h("div", endTime);
          }
        }
      ],
      indexData: [],
      searchReg: {
        seachLevel_1: [
          {
            required: true,
            message: "请选择审核结果",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handlerFormat(dateTime) {
      this.endTime = dateTime;
    },
    // 提交全选指标
    submitIndex() {
      if (this.endTime === "") {
        this.$Message.warning("请选择指标填写截止日期");
        return;
      }
      this.submitLoading = true;

      var url = "warning/setSixEndTime";
      var keyOne = "sixIndicatorsEntityList";
      var formData = Object.assign(
        {},
        {
          endTime: this.endTime,
          warnType: this.warnType,
          list: []
        }
      );
      this.selectList.forEach(item => {
        formData["list"].push({ id: item.id });
      });
      noEntryAjax({ formData, url, keyOne })
        .then(result => {
          this.submitLoading = false;
          if (result.data.code === "200") {
            this.$Message.success("设置成功");
            this.selectList = [];
            this.endTime = "";
            this._getCountyList(
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
    },
    // 页码
    pageNumberChange(pageNumber) {
      this.pageNumber = pageNumber;
      this._getCountyList(this.searchData, this.pageSize, this.pageNumber);
    },
    // 页数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._getCountyList(this.searchData, this.pageSize, this.pageNumber);
    },
    selectAllCancel(selection) {
      this.selectList = selection;
    },
    selectAll(selection) {
      this.selectList = selection;
    },
    // TABEL多选
    selectRow(selection, row) {
      this.selectList.push(row);
    },
    selectCancel(selection, row) {
      this.selectList = selection;
    },
    // 提交搜索
    seachSubmit(pageSize, pageNumber) {
      this.tableLoading = true;
      this._getCountyList(this.searchData, this.pageSize, this.pageNumber);
      this.$Message.success("成功");
    },
    // 重置搜索
    seachReset(name) {
      this.$refs[name].resetFields();
    },
    _getCountyList(form, pageSize, pageNumber) {
      const url = "/sixIndicators/query";
      const keyOne = "sixIndicatorsFilter";
      let formData = Object.assign(form, {
        pageSize,
        pageNumber
      });
      countyAjax({ formData, url, keyOne }).then(result => {
        if (result.data.code === "200") {
          console.log(result);
          this.pageTotal = parseInt(result.data.results.pageTotal) * 10; // 总页数
          this.indexData = result.data.results.list;
          this.tableLoading = false;
        } else {
        }
      });
    }
  },
  created() {
    this._getCountyList(this.searchData, this.pageSize, this.pageNumber);
  }
};
</script>
<style>
.selectAarry {
  padding: 5px 10px 10px 10px;
  border: 1px solid #dcdee2;
  border-radius: 5px;
}
.select-contaier {
  min-height: 60px;
}
</style>
