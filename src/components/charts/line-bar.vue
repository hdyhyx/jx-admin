<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts';
import tdTheme from './theme.json';
import { on, off } from '@/libs/tools';
echarts.registerTheme('tdTheme', tdTheme);
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    };
  },
  methods: {
    resize () {
      this.dom.resize();
    }
  },
  mounted () {
    this.$nextTick(() => {
      // let xAxisData = Object.keys(this.value);
      // let seriesData = Object.values(this.value);
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['权数', '排名']
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '权数',
            min: 0,
            max: 1000,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '排名',
            min: 1,
            max: 21,
            axisLabel: {
              formatter: '{value} 名'
            },
            inverse: true
          }
        ],
        series: [
          {
            name: '权数',
            type: 'bar',
            barWidth: 25,
            data: [880, 550, 780, 765, 900, 750, 820, 860, 888, 650, 950, 660]
          },
          {
            name: '排名',
            type: 'line',
            yAxisIndex: 1,
            data: [4, 6, 5, 6, 4, 3, 2, 1, 5, 6, 9, 10]
          }
        ]
      };
      this.dom = echarts.init(this.$refs.dom, 'tdTheme');
      this.dom.setOption(option);
      on(window, 'resize', this.resize);
    });
  },
  beforeDestroy () {
    off(window, 'resize', this.resize);
  }
};
</script>
