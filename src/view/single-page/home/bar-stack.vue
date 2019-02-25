<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "serviceRequests",
  data() {
    return {
      dom: null,
      barData: 0,
      colors: ["#2d8cf0", "#14CC82"]
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: () => {}
    },
    yName: {
      type: String,
      default: "权数"
    }
  },
  watch: {
    barData(val) {}
  },
  created() {},
  methods: {
    resize(val) {
      this.dom.resize();
    },
    bar() {
      console.log(this.data);
      const option = {
        color: this.colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["得分", "排名"],
          x: "right"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false
            },
            data: this.data.name,
            axisLabel: {
              interval: 0,
              rotate: 0,
              textStyle: {
                fontSize: 12
              },
              formatter: function(params, index) {
                var newParamsName = "";
                var splitNumber = 5;
                var action = false;
                var activeId = action ? 0 : -1;
                var splitNum = [3, 3, 4, 6];
                var paramsNameNumber = params && params.length;
                if (paramsNameNumber >= 10) {
                  params = params.substring(0, 8);
                  params += ".....";
                }
                if (paramsNameNumber <= 4) {
                  splitNumber = splitNum[0] || 4;
                } else {
                  params = params && params.slice(0, 21);
                }

                var provideNumber = splitNumber; // 一行显示几个字
                var rowNumber =
                  Math.ceil(paramsNameNumber / provideNumber) || 0;
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p === rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;
                  }
                } else {
                  newParamsName = params;
                }
                let arr = newParamsName.split("\n");
                return arr.join("\n");
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "得分",
            type: "bar",
            data: this.data.score,
            barWidth: "50",
            markLine: {
              lineStyle: {
                normal: {
                  type: "dashed"
                }
              }
            }
          },
          {
            name: "排名",
            type: "line",
            data: this.data.rank
          }
        ]
      };
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option, true);
        on(window, "resize", this.resize);
        this.dom.on("click", params => {
          this.$emit("clickData", params);
        });
      });
    }
  },
  mounted() {
    this.bar();
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
