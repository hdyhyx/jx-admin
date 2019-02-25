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
      dom: null
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    yName: {
      type: String,
      default: "权数"
    },
    data: {
      type: [Array, Object],
      default: () => []
    }
  },
  created() {},
  methods: {
    resize() {
      this.dom.resize();
    }
  },
  mounted() {
    var xAxisData = [];
    var seriesData = [];
    for (let i = 0; i < this.data.length; i++) {
      xAxisData.push(this.data[i].name);
      seriesData.push(this.data[i].score);
    }
    const option = {
      title: {
        text: this.title,
        x: "center"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: "8%",
        left: "1%",
        right: "2%",
        bottom: "1%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "(" + this.yName + ")",
          minInterval: 1
        }
      ],
      series: [
        {
          name: this.yName,
          type: "line",
          stack: "总量",
          symbol: "circle",
          symbolSize: 10,
          lineStyle: {
            normal: {
              color: "rgba(86, 216, 151,1)",
              width: 3
            }
          },

          itemStyle: {
            normal: {
              color: "rgba(86, 216, 151,1)", // 折线点的颜色
              lineStyle: {
                color: "#386db3" // 折线的颜色
              }
            }
          },
          areaStyle: {
            normal: {
              color: "rgba(86, 216, 151, 0.4)"
            }
          },
          data: seriesData
        }
      ]
    };
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom);
      this.dom.setOption(option);
      on(window, "resize", this.resize);
    });
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
